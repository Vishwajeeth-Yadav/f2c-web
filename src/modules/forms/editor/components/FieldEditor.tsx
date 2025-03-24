import { renderFieldComponent } from "./fieldRenderer";
import { Field } from "./types";

interface FieldEditorProps {
  field: Field;
  isEditing: boolean;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FieldEditor = ({ field, isEditing, setFields, setEditingFieldId }: FieldEditorProps) => {
  if (!isEditing) {
    return (
      <div className="bg-slate-100 p-4 rounded-md mb-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-800">{field.label}</span>
          <button
            onClick={() => setEditingFieldId(field.id)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        {renderFieldComponent(field)}
      </div>
    );
  }

  return (
    <div className="bg-slate-200 p-4 rounded-md mb-4 ">
      <div className="mb-2">
        <label className="block text-sm font-medium text-slate-800 mb-1">Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) =>
            setFields((prev: Field[]) =>
              prev.map((f: Field) => (f.id === field.id ? { ...f, label: e.target.value } : f))
            )
          }
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-brand-dark focus:outline-none"
        />
      </div>
      {/* Add more configuration options based on field type */}
      <button
        onClick={() => setEditingFieldId(null)}
        className="text-sm text-blue-500 hover:text-blue-700"
      >
        Done
      </button>
    </div>
  );
};