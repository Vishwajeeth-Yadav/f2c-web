// import { FieldEditor } from "./FieldEditor";
// import { Field } from "./types";

// interface FormLayoutProps {
//   fields: Field[];
//   editingFieldId: string | null;
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
//   setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
// }

//  export const FormLayout = ({ fields, editingFieldId, setFields, setEditingFieldId }: FormLayoutProps) => {
//     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       const fieldType = e.dataTransfer.getData("text/plain");
//       const newField = {
//         id: `field-${Date.now()}`,
//         type: fieldType,
//         label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
//         placeholder: "",
//         options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
//       };
//       setFields((prev:Field[]) => [...prev , newField])
//       setEditingFieldId(newField.id);
//     };

//     return (
//       <div
//         className="ml-64 p-4 min-h-screen bg-white w-auto"
//         onDrop={handleDrop}
//         onDragOver={(e) => e.preventDefault()}
//       >
//         <h3 className="mb-4 font-semibold">Form Layout</h3>
//         {fields.length === 0 ? (
//           <p className="text-slate-500">Drag and drop fields here to build your form.</p>
//         ) : (
//           <div className="">
//             {fields.map((field) => (
//               <FieldEditor
//                 key={field.id}
//                 field={field}
//                 isEditing={editingFieldId === field.id}
//                 setFields={setFields}
//                 setEditingFieldId={setEditingFieldId}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

import { useState } from "react";
import { FieldEditor } from "./FieldEditor";
import { Field } from "./types";
import { cn } from "@/modules/ui/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface FormLayoutProps {
  fields: Field[];
  editingFieldId: string | null;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FormLayout = ({ fields, editingFieldId, setFields, setEditingFieldId }: FormLayoutProps) => {

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const fieldType = e.dataTransfer.getData("text/plain");
    const newField = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
      placeholder: "",
      options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
    };
    setFields((prev: Field[]) => [...prev, newField]);
    setEditingFieldId(newField.id);
  };

  const [isDragging, setIsDragging] = useState(false);

  const onDragEnd = (result: any) => {
    if (!result.destination) return; 
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFields(items); 
  };

  return (
    <div
      className={cn(
        "ml-64 p-4 min-h-screen w-auto transition-all duration-300",
        isDragging ? "bg-slate-200 border-2 border-dashed border-blue-500" : "bg-white"
      )}
      onDrop={handleDrop}
      onDragOver={(e) => {
        setIsDragging(true);
        e.preventDefault();
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      <h3 className="mb-4 font-semibold text-slate-800">Form Layout</h3>
      {fields.length === 0 ? (
        <p className="text-slate-500">Drag and drop fields here to build your form.</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                <AnimatePresence>
                  {fields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-slate-100 p-4 rounded-md cursor-grab active:cursor-grabbing hover:bg-slate-200">
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FieldEditor
                              field={field}
                              isEditing={editingFieldId === field.id}
                              setFields={setFields}
                              setEditingFieldId={setEditingFieldId}
                            />
                          </motion.div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};