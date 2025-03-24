import { renderFieldComponent } from "./fieldRenderer";

interface PreviewProps {
    fields: any[];
  }
  
  export const Preview = ({ fields }: PreviewProps) => {
    return (
      <aside className="group hidden flex-1 min-h-screen flex-shrink-0 items-center justify-center overflow-hidden border-l border-slate-200 bg-slate-100 shadow-inner md:flex md:flex-col">
        <h3 className="font-semibold mb-4 px-4">Preview</h3>
        <form className="w-full max-w-sm px-4">
          {fields.map((field) => renderFieldComponent(field))}
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
      </aside>
    );
  };