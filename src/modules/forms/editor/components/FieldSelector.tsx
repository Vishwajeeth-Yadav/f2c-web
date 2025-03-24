interface FieldSelectorProps {
    fieldTypes: { type: string; label: string }[];
    onDragStart: (type: string) => void;
  }
  
  export const FieldSelector = ({ fieldTypes, onDragStart }: FieldSelectorProps) => {
    return (
      <aside className="fixed top-[6rem] bottom-0 left-0 w-64 bg-white border-r border-slate-200 p-4">
        <h3 className="mb-4 font-semibold">Add Fields</h3>
        <div>
          {fieldTypes.map((field) => (
            <button
              key={field.type}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", field.type);
                onDragStart(field.type);
              }}
              aria-label={`Drag to add ${field.label}`}
              className="block w-full rounded-md bg-slate-100 px-4 py-2 mb-2 cursor-grab hover:bg-slate-200"
            >
              {field.label}
            </button>
          ))}
        </div>
      </aside>
    );
  };