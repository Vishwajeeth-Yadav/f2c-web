import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowRightLeft, ArrowUpDown, Rows, SquarePen, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "./types";
import { FieldEditor } from "./FieldEditor";

interface FormLayoutProps {
  fields: Field[];
  editingFieldId: string | null;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FormLayout = ({
  fields,
  editingFieldId,
  setFields,
  setEditingFieldId,
}: FormLayoutProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Group fields by rowId
  const groupedFields = useMemo(() => {
    const groups = fields.reduce((acc, field) => {
      const rowId = field.rowId || `default-row-${field.id}`;
      if (!acc[rowId]) acc[rowId] = [];
      acc[rowId].push(field);
      return acc;
    }, {} as Record<string, Field[]>);

    // Sort fields within each row by their order property
    Object.keys(groups).forEach(rowId => {
      groups[rowId].sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    return groups;
  }, [fields]);

  // Dynamically derive rowIds based on groupedFields
  const rowIds = useMemo(() => Object.keys(groupedFields), [groupedFields]);

  // Define sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum drag distance before activation
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setIsDragging(true);
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setIsDragging(false);
      return;
    }

    // Handle vertical sorting of rows
    if (rowIds.includes(active.id as string) && rowIds.includes(over.id as string)) {
      const activeIndex = rowIds.indexOf(active.id as string);
      const overIndex = rowIds.indexOf(over.id as string);

      if (activeIndex !== overIndex) {
        const reorderedRowIds = arrayMove(rowIds, activeIndex, overIndex);
        
        // Create a mapping from old positions to new positions
        const rowPositionMap = rowIds.reduce((map, rowId, index) => {
          const newIndex = reorderedRowIds.indexOf(rowId);
          map[rowId] = newIndex;
          return map;
        }, {} as Record<string, number>);
        
        // Update fields to maintain their position within rows
        // but update the order of rows
        const updatedFields = [...fields];
        
        // Sort the fields based on the new row order
        updatedFields.sort((a, b) => {
          const aRowId = a.rowId || '';
          const bRowId = b.rowId || '';
          
          // If fields are in different rows, sort by row position
          if (aRowId !== bRowId) {
            return (rowPositionMap[aRowId] || 0) - (rowPositionMap[bRowId] || 0);
          }
          
          // If fields are in the same row, maintain their original order
          return (a.order || 0) - (b.order || 0);
        });
        
        setFields(updatedFields);
      }
      
      setActiveId(null);
      setIsDragging(false);
      return;
    }

    // Handle horizontal sorting within a row or moving between rows
    const activeField = fields.find(f => f.id === active.id);
    
    if (!activeField) {
      setActiveId(null);
      setIsDragging(false);
      return;
    }

    // Check if dropping on another field
    const overField = fields.find(f => f.id === over.id);
    
    if (overField) {
      // Handle moves between fields
      if (activeField.rowId === overField.rowId) {
        // Reorder fields within the same row
        const fieldsInRow = fields.filter(f => f.rowId === activeField.rowId);
        const activeIndexInRow = fieldsInRow.findIndex(f => f.id === activeField.id);
        const overIndexInRow = fieldsInRow.findIndex(f => f.id === overField.id);
        
        if (activeIndexInRow !== overIndexInRow) {
          const reorderedRowFields = arrayMove(fieldsInRow, activeIndexInRow, overIndexInRow);
          
          // Update the order property for all fields in the row - create a new array to ensure state update
          const updatedFields = [...fields];
          
          // Remove the fields from the original array that need to be updated
          const fieldsToUpdate = updatedFields.filter(field => field.rowId === activeField.rowId);
          const otherFields = updatedFields.filter(field => field.rowId !== activeField.rowId);
          
          // Update order for the fields in the row
          const updatedRowFields = reorderedRowFields.map((field, index) => ({
            ...field,
            order: index
          }));
          
          // Combine the updated fields with the other fields
          setFields([...otherFields, ...updatedRowFields]);
        }
      } else {
        // Move field to a different row
        const fieldsInTargetRow = fields.filter(f => f.rowId === overField.rowId);
        const newOrder = fieldsInTargetRow.length;
        
        const updatedFields = fields.map(f =>
          f.id === activeField.id ? { ...f, rowId: overField.rowId, order: newOrder } : f
        );
          
        setFields(updatedFields);
      }
    } else if (over.id === 'form-layout-drop-zone') {
      // Field was dragged to the container but not over another field
      // Create a new row for it
      const newRowId = uuidv4();
      const updatedFields = fields.map(f =>
        f.id === activeField.id ? { ...f, rowId: newRowId, order: 0 } : f
      );
      
      setFields(updatedFields);
    }

    setActiveId(null);
    setIsDragging(false);
  };

  // Handle drop event for adding new fields
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const fieldType = e.dataTransfer.getData("text/plain");
    if (!fieldType) return;

    const newRowId = uuidv4();
    const newField: Field = {
      id: `field-${Date.now()}`,
      type: fieldType as Field["type"],
      label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
      placeholder: "",
      options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
      rowId: newRowId,
      order: 0,
    };

    setFields(prev => [...prev, newField]);
    setEditingFieldId(newField.id);
  };

  // Find active field for drag overlay
  const activeField = activeId ? fields.find(f => f.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Drop Zone */}
      <div
        id="form-layout-drop-zone"
        className={`ml-64 p-4 min-h-[90vh] pb-10 w-auto transition-all duration-300 overflow-y-auto ${
          isDragging ? "bg-slate-200 border-2 border-dashed border-blue-500" : "bg-white"
        }`}
        onDrop={handleDrop}
        onDragOver={e => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <h3 className="mb-4 text-xl font-semibold text-slate-800">Form Layout</h3>
        {fields.length === 0 ? (
          <p className="text-slate-500">Drag and drop fields here to build your form.</p>
        ) : (
          <div className="space-y-4">
            {/* Vertical sorting for rows */}
            <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
              {rowIds.map(rowId => (
                <RowContainer
                  key={rowId}
                  rowId={rowId}
                  fields={groupedFields[rowId]}
                  editingFieldId={editingFieldId}
                  setFields={setFields}
                  setEditingFieldId={setEditingFieldId}
                  allFields={fields}
                />
              ))}
            </SortableContext>
          </div>
        )}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeField && (
          <div className="bg-white p-4 rounded-md border border-gray-300 shadow-md">
            {activeField.label || "Unknown Field"}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

// Row container component for horizontal sorting
const RowContainer = ({
  rowId,
  fields,
  editingFieldId,
  setFields,
  setEditingFieldId,
  allFields,
}: {
  rowId: string;
  fields: Field[];
  editingFieldId: string | null;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
  allFields: Field[];
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: rowId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Get field IDs for horizontal sorting
  const fieldIds = fields.map(field => field.id);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-md p-2 bg-gray-50"
    >
      <div
        className="flex items-center mb-2 text-sm text-gray-500 cursor-grab"
        {...attributes}
        {...listeners}
      >
        <ArrowUpDown size={16} className="mr-2" /> 
        <span className="text-xs">Row {rowId.substring(0, 4)}</span>
      </div>

      <SortableContext items={fieldIds} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-wrap gap-4">
          {fields.map(field => (
            <SortableField
              key={field.id}
              field={field}
              isEditing={editingFieldId === field.id}
              setFields={setFields}
              setEditingFieldId={setEditingFieldId}
              fields={allFields}
            />
          ))}
        </div>
      </SortableContext>
    </motion.div>
  );
};

// Sortable field component
const SortableField = ({
  field,
  isEditing,
  setFields,
  setEditingFieldId,
  fields,
}: {
  field: Field;
  isEditing: boolean;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
  fields: Field[];
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    setFields(prev => prev.filter(f => f.id !== field.id));
    if (isEditing) {
      setEditingFieldId(null);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="relative p-4 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-all w-72 flex-grow-0 flex-shrink-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
        >
          <ArrowRightLeft size={16} />
        </div>
        <div className="flex-1 text-left ml-2 font-medium text-gray-700 truncate">
          {field.label}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            onClick={() => setEditingFieldId(field.id)}
            title="Edit field"
          >
            <SquarePen size={16} className="text-blue-500" />
          </button>
          <button
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            onClick={handleDelete}
            title="Delete field"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 border-t pt-3"
          >
            <FieldEditor
              field={field}
              isEditing={isEditing}
              setFields={setFields}
              setEditingFieldId={setEditingFieldId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};