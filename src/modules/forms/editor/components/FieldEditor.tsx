import { useState } from "react";
import { Field } from "./types";
import { Save, X } from "lucide-react";

interface FieldEditorProps {
  field: Field;
  isEditing: boolean;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  setEditingFieldId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FieldEditor = ({
  field,
  isEditing,
  setFields,
  setEditingFieldId,
}: FieldEditorProps) => {
  if (!isEditing) {
    return (
      <div className="bg-slate-100 p-4 rounded-md shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-800">{field.label}</span>
          <button
            onClick={() => setEditingFieldId(field.id)}
            className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
            aria-label={`Edit ${field.label}`}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  const [originalField, setOriginalField] = useState<Field>(field);

  return (
    <div className="bg-slate-200 p-4 rounded-md shadow-sm">
      {/* Label Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-800 mb-1">Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) =>
            setFields((prev) =>
              prev.map((f) =>
                f.id === field.id ? { ...f, label: e.target.value } : f
              )
            )
          }
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-brand-dark focus:outline-none transition-colors"
          placeholder="Enter field label"
        />
      </div>

      {/* Placeholder Input (Only for Text/Number Fields) */}
      {(field.type === "text" || field.type === "number") && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Placeholder
          </label>
          <input
            type="text"
            value={field.placeholder || ""}
            onChange={(e) =>
              setFields((prev) =>
                prev.map((f) =>
                  f.id === field.id ? { ...f, placeholder: e.target.value } : f
                )
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            placeholder="Enter placeholder text"
          />
        </div>
      )}

      {/* Radio Button Options */}
      {field.type === "radio" && (
        <div className="mb-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Options
          </label>
          {(field.options ?? []).map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={option.label}
                onChange={(e) => {
                  const updatedOptions = (field.options ?? []).map((opt, i) =>
                    i === index ? { ...opt, label: e.target.value } : opt
                  );
                  setFields((prev) =>
                    prev.map((f) =>
                      f.id === field.id ? { ...f, options: updatedOptions } : f
                    )
                  );
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                placeholder="Enter option label"
              />
              <button
                onClick={() => {
                  const updatedOptions = (field.options ?? []).filter((_, i) => i !== index);
                  setFields((prev) =>
                    prev.map((f) =>
                      f.id === field.id ? { ...f, options: updatedOptions } : f
                    )
                  );
                }}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newOption = {
                value: `option${(field.options ?? []).length + 1}`,
                label: "",
              };
              setFields((prev) =>
                prev.map((f) =>
                  f.id === field.id ? { ...f, options: [...(f.options ?? []), newOption] } : f
                )
              );
            }}
            className="text-blue-500 hover:underline"
          >
            Add Option
          </button>
        </div>
      )}

      {/* Required Checkbox */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="checkbox"
          checked={field.required ?? false}
          onChange={(e) =>
            setFields((prev) =>
              prev.map((f) =>
                f.id === field.id ? { ...f, required: e.target.checked } : f
              )
            )
          }
          id={`required - ${field.id}`}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={`required - ${field.id}`} className="text-sm text-slate-700">
          Required
        </label>
      </div>

      {/* Save/Cancel Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setEditingFieldId(null)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          aria-label="Save changes"
        >
          <Save size={16} className="mr-1" />
          Done
        </button>
        <button
          onClick={() => {
            setFields((prev) =>
              prev.map((f) => (f.id === field.id ? originalField : f))
            );
            setEditingFieldId(null);
          }}
          className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          aria-label="Cancel editing"
        >
          <X size={16} className="mr-1" />
          Cancel
        </button>
      </div>
    </div >
  );
};
