import { GripVertical, Type, Hash, Calendar, CheckSquare, List, Disc, Mail, Phone, Globe, AlignLeft, Heading } from "lucide-react";

interface FieldSelectorProps {
  fieldTypes: { type: string; label: string }[];
  onDragStart: (type: string) => void;
}

// Function to get appropriate icon based on field type
const getFieldIcon = (type: string) => {
  switch (type) {
    case "text":
      return <Type size={18} className="text-blue-500" />;
    case "number":
      return <Hash size={18} className="text-green-500" />;
    case "date":
      return <Calendar size={18} className="text-purple-500" />;
    case "checkbox":
      return <CheckSquare size={18} className="text-red-500" />;
    case "dropdown":
      return <List size={18} className="text-orange-500" />;
    case "radio":
      return <Disc size={18} className="text-pink-500" />;
    case "email":
      return <Mail size={18} className="text-teal-500" />; 
    case "tel":
      return <Phone size={18} className="text-indigo-500" />; 
    case "country":
      return <Globe size={18} className="text-yellow-500" />; 
    case "description":
      return <AlignLeft size={18} className="text-cyan-500" />; 
    case "heading":
      return <Heading size={18} className="text-violet-500" />; 
    default:
      return <GripVertical size={18} className="text-gray-500" />; 
  }
};

export const FieldSelector = ({ fieldTypes, onDragStart }: FieldSelectorProps) => {
  return (
    <aside className="fixed top-24 mt-3 bottom-0 left-0 w-64 bg-black/10 shadow-md border-r border-gray-200 p-5 overflow-y-auto">
      <h3 className=" text-xl font-semibold text-black ">Add Fields</h3>
      <hr className="w-full border-t-2 border-black my-4" />
      <div className="space-y-3 px-auto">
        {fieldTypes.map((field) => (
          <button
            key={field.type}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", field.type);
              onDragStart(field.type);
            }}
            aria-label={`Drag to add ${field.label}`}
            className="flex items-center justify-between space-x-3 w-full rounded-lg bg-gray-100 px-4 py-3 cursor-grab 
                       hover:bg-gray-200 shadow-sm border border-black border-b-4  hover:translate-x-1 hover:-translate-y-1 
                       transition-transform duration-200 ease-in-out"
          >
            
            <span className="text-gray-700 font-medium">{field.label}</span>
            <span>{getFieldIcon(field.type)}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};
