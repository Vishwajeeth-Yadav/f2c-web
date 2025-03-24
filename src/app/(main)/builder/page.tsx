// "use client";
// import { Button } from "@/modules/ui/components/button";
// import { Input } from "@/modules/ui/components/input";
// import { cn } from "@/modules/ui/lib/utils";
// import {
//   ArrowLeftIcon,
//   MailIcon,
//   PaintbrushIcon,
//   Rows3Icon,
//   SettingsIcon,
// } from "lucide-react";
// import { type JSX, useMemo, useState } from "react";
// import { TextField } from "@/modules/forms/components/TextField";
// import { DateField } from "@/modules/forms/components/DateField";
// import { NumberField } from "@/modules/forms/components/NumberField";
// import { RadioButtonField } from "@/modules/forms/components/RadioButtonField";

// export default function Builder() {
//   const [activeView, setActiveView] = useState("questions");
//   const [fields, setFields] = useState<
//     { id: string; type: string; label: string; placeholder?: string; options?: { value: string; label: string }[] }[]
//   >([]);
//   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

//   interface Tab {
//     id: "questions" | "settings" | "styling" | "followUps";
//     label: string;
//     icon: JSX.Element;
//     isPro?: boolean;
//   }

//   const tabsComputed = useMemo(() => {
//     const tabs: Tab[] = [
//       {
//         id: "questions",
//         label: "Layout",
//         icon: <Rows3Icon className="h-5 w-5" />,
//       },
//       {
//         id: "styling",
//         label: "Styling",
//         icon: <PaintbrushIcon className="h-5 w-5" />,
//       },
//       {
//         id: "settings",
//         label: "Settings",
//         icon: <SettingsIcon className="h-5 w-5" />,
//       },
//       {
//         id: "followUps",
//         label: "Follow Ups",
//         icon: <MailIcon className="h-5 w-5" />,
//       },
//     ];
//     return tabs;
//   }, []);

//   const fieldTypes = [
//     { type: "text", label: "Text Input" },
//     { type: "date", label: "Date Picker" },
//     { type: "radio", label: "Radio Buttons" },
//     { type: "number", label: "Number Input" },
//   ];

//   const renderFieldComponent = (field: { id: string; type: string; label: string; placeholder?: string; options?: any[] }) => {
//     switch (field.type) {
//       case "text":
//         return <TextField key={field.id} id={field.id} label={field.label} placeholder={field.placeholder || ""} />;
//       case "date":
//         return <DateField key={field.id} id={field.id} label={field.label} />;
//       case "radio":
//         return <RadioButtonField key={field.id} id={field.id} label={field.label} options={field.options ?? []} />;
//       case "number":
//         return <NumberField key={field.id} id={field.id} label={field.label} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <div className="flex h-full w-full flex-col">
//         {/* Header */}
//         <div className="border-b border-slate-200 bg-white px-5 py-2.5 sm:flex sm:items-center sm:justify-between">
//           <div className="flex h-full items-center space-x-2 whitespace-nowrap">
//             <Button size="sm" variant="secondary" className="h-full">
//               <ArrowLeftIcon />
//               Back
//             </Button>
//             <p className="hidden pl-4 font-semibold md:block">ubib /</p>
//             <Input
//               defaultValue="Product Market Fit (Superhuman)"
//               className="h-8 w-72 border-white py-0 hover:border-slate-200"
//             />
//           </div>
//           <div className="mt-3 flex sm:ml-4 sm:mt-0">
//             <Button variant="secondary" size="sm" className="mr-3" type="submit">
//               Save
//             </Button>
//             <Button className="mr-3" size="sm">
//               Save & Close
//             </Button>
//           </div>
//         </div>

//         <div className="relative z-0 flex flex-1 overflow-hidden">
//           {/* Builder Panel */}
//           <main className="relative z-0 w-1/2 flex-1 overflow-y-auto bg-slate-50 focus:outline-none">
//             {/* Tabs */}
//             <div className="fixed z-30 flex h-12 w-full items-center justify-center border-b bg-white md:w-1/2">
//               <nav className="flex h-full items-center space-x-4" aria-label="Tabs">
//                 {tabsComputed.map((tab) => (
//                   <button
//                     type="button"
//                     key={tab.id}
//                     onClick={() => setActiveView(tab.id)}
//                     className={cn(
//                       tab.id === activeView
//                         ? "border-brand-dark font-semibold text-slate-900"
//                         : "border-transparent text-slate-500 hover:text-slate-700",
//                       "flex h-full items-center border-b-2 px-3 text-sm font-medium"
//                     )}
//                   >
//                     {tab.icon && <div className="mr-2 h-5 w-5">{tab.icon}</div>}
//                     {tab.label}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {activeView === "questions" && (
//               <div className="flex mt-12 h-full">
//                 {/* Aside Bar */}
//                 <aside className="fixed top-[6rem] bottom-0 left-0 w-64 bg-white border-r border-slate-200 p-4">
//                   <h3 className="mb-4 font-semibold">Add Fields</h3>
//                   <div>
//                     {fieldTypes.map((field) => (
//                       <button
//                         key={field.type}
//                         draggable
//                         onDragStart={(e) => e.dataTransfer.setData("text/plain", field.type)}
//                         className="block w-full rounded-md bg-slate-100 px-4 py-2 mb-2 cursor-grab hover:bg-slate-200"
//                       >
//                         {field.label}
//                       </button>
//                     ))}
//                   </div>
//                 </aside>

//                 {/* Content Area */}
//                 <div
//                   className="ml-64 p-4 min-h-screen bg-white w-full"
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     const fieldType = e.dataTransfer.getData("text/plain");
//                     const newField = {
//                       id: `field-${Date.now()}`,
//                       type: fieldType,
//                       label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
//                       placeholder: "",
//                       options: fieldType === "radio" ? [{ value: "option1", label: "Option 1" }] : [],
//                     };
//                     setFields((prev) => [...prev, newField]);
//                     setEditingFieldId(newField.id); // Open configuration menu for the new field
//                   }}
//                   onDragOver={(e) => e.preventDefault()}
//                 >
//                   <h3 className="mb-4 font-semibold">Form Layout</h3>
//                   {fields.length === 0 ? (
//                     <p className="text-slate-500">Drag and drop fields here to build your form.</p>
//                   ) : (
//                     <div>
//                       {fields.map((field) => (
//                         <div key={field.id} className="mb-4">
//                           {editingFieldId === field.id ? (
//                             <div>
//                               <div className="mb-2">
//                                 <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
//                                 <input
//                                   type="text"
//                                   value={field.label}
//                                   onChange={(e) =>
//                                     setFields((prev) =>
//                                       prev.map((f) =>
//                                         f.id === field.id ? { ...f, label: e.target.value } : f
//                                       )
//                                     )
//                                   }
//                                   className="w-full px-3 py-2 border border-slate-300 rounded-md"
//                                 />
//                               </div>

//                               {field.type === "text" && (
//                                 <div className="mb-2">
//                                   <label className="block text-sm font-medium text-slate-700 mb-1">Placeholder</label>
//                                   <input
//                                     type="text"
//                                     value={field.placeholder || ""}
//                                     onChange={(e) =>
//                                       setFields((prev) =>
//                                         prev.map((f) =>
//                                           f.id === field.id ? { ...f, placeholder: e.target.value } : f
//                                         )
//                                       )
//                                     }
//                                     className="w-full px-3 py-2 border border-slate-300 rounded-md"
//                                   />
//                                 </div>
//                               )}

//                               {field.type === "radio" && (
//                                 <div className="mb-2">
//                                   <label className="block text-sm font-medium text-slate-700 mb-1">Options</label>
//                                   {/* Safely map over options */}
//                                   {(field.options ?? []).map((option, index) => (
//                                     <div key={index} className="flex items-center space-x-2 mb-2">
//                                       <input
//                                         type="text"
//                                         value={option.label}
//                                         onChange={(e) => {
//                                           // Safely update options
//                                           const updatedOptions = (field.options ?? []).map((opt, i) =>
//                                             i === index ? { ...opt, label: e.target.value } : opt
//                                           );
//                                           setFields((prev) =>
//                                             prev.map((f) =>
//                                               f.id === field.id ? { ...f, options: updatedOptions } : f
//                                             )
//                                           );
//                                         }}
//                                         className="w-full px-3 py-2 border border-slate-300 rounded-md"
//                                       />
//                                       <button
//                                         onClick={() => {
//                                           // Safely filter options
//                                           const updatedOptions = (field.options ?? []).filter((_, i) => i !== index);
//                                           setFields((prev) =>
//                                             prev.map((f) =>
//                                               f.id === field.id ? { ...f, options: updatedOptions } : f
//                                             )
//                                           );
//                                         }}
//                                         className="text-red-500 hover:underline"
//                                       >
//                                         Remove
//                                       </button>
//                                     </div>
//                                   ))}
//                                   {/* Add a new option */}
//                                   <button
//                                     onClick={() => {
//                                       const newOption = { value: `option${(field.options ?? []).length + 1}`, label: "" };
//                                       setFields((prev) =>
//                                         prev.map((f) =>
//                                           f.id === field.id ? { ...f, options: [...(f.options ?? []), newOption] } : f
//                                         )
//                                       );
//                                     }}
//                                     className="text-blue-500 hover:underline"
//                                   >
//                                     Add Option
//                                   </button>
//                                 </div>
//                               )}

//                               <button
//                                 onClick={() => setEditingFieldId(null)}
//                                 className="text-sm text-blue-500 hover:underline"
//                               >
//                                 Done
//                               </button>
//                             </div>
//                           ) : (
//                             <div>
//                               <div className="flex items-center justify-between">
//                                 <span className="font-medium">{field.label}</span>
//                                 <button
//                                   onClick={() => setEditingFieldId(field.id)}
//                                   className="text-sm text-blue-500 hover:underline"
//                                 >
//                                   Edit
//                                 </button>
//                               </div>
//                               {renderFieldComponent(field)}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeView === "settings" && (
//               <div className="flex flex-col items-center justify-center h-full">
//                 <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
//                 <p className="mt-2 text-slate-600">Customize your Form settings</p>
//               </div>
//             )}

//             {activeView === "styling" && (
//               <div className="flex flex-col items-center justify-center h-full">
//                 <h1 className="text-2xl font-semibold text-slate-800">Styling</h1>
//                 <p className="mt-2 text-slate-600">Customize your Form styling</p>
//               </div>
//             )}

//             {activeView === "followUps" && (
//               <div className="flex flex-col items-center justify-center h-full">
//                 <h1 className="text-2xl font-semibold text-slate-800">Follow Ups</h1>
//                 <p className="mt-2 text-slate-600">Create follow up questions</p>
//               </div>
//             )}
//           </main>

//           {/* Preview Panel */}
//           <aside className="group hidden flex-1 flex-shrink-0 items-center justify-center overflow-hidden border-l border-slate-200 bg-slate-100 shadow-inner md:flex md:flex-col">
//             <h3 className="font-semibold mb-4 px-4">Preview</h3>
//             <form className="w-full max-w-sm px-4">
//               {fields.map((field) => {
//                 switch (field.type) {
//                   case "text":
//                     return (
//                       <TextField
//                         key={field.id}
//                         id={field.id}
//                         label={field.label}
//                         placeholder={field.placeholder || ""}
//                       />
//                     );
//                   case "date":
//                     return <DateField key={field.id} id={field.id} label={field.label} />;
//                   case "radio":
//                     return (
//                       <RadioButtonField
//                         key={field.id}
//                         id={field.id}
//                         label={field.label}
//                         options={field.options ?? []}
//                       />
//                     );
//                   case "number":
//                     return <NumberField key={field.id} id={field.id} label={field.label} />;
//                   default:
//                     return null;
//                 }
//               })}
//               <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
//                 Submit
//               </button>
//             </form>
//           </aside>
//         </div>
//       </div>
//     </>
//   );
// }

'use client'
import { Header } from "@/modules/forms/components/Header";
import { FieldSelector } from "@/modules/forms/editor/components/FieldSelector";
import { FormLayout } from "@/modules/forms/editor/components/FormLayout";
import { Preview } from "@/modules/forms/editor/components/Preview";
import { Tabs } from "@/modules/forms/editor/components/Tabs";
import { MailIcon, PaintbrushIcon, Rows3Icon, SettingsIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function Builder() {
  const [activeView, setActiveView] = useState("questions");
  const [fields, setFields] = useState<any[]>([]);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  const tabsComputed = useMemo(() => {
    return [
      { id: "questions", label: "Layout", icon: <Rows3Icon className="h-5 w-5" /> },
      { id: "styling", label: "Styling", icon: <PaintbrushIcon className="h-5 w-5" /> },
      { id: "settings", label: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
      { id: "followUps", label: "Follow Ups", icon: <MailIcon className="h-5 w-5" /> },
    ];
  }, []);

  const fieldTypes = [
    { type: "text", label: "Text Input" },
    { type: "date", label: "Date Picker" },
    { type: "radio", label: "Radio Buttons" },
    { type: "number", label: "Number Input" },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="relative flex h-full  overflow-hidden">
        <div className="flex flex-1 flex-col w-1/2 bg-slate-50 ">
          <Tabs tabs={tabsComputed} activeView={activeView} setActiveView={setActiveView} />

          {activeView === "questions" && (
            <>
              
              <FieldSelector fieldTypes={fieldTypes} onDragStart={() => { }} />

              <FormLayout
                fields={fields}
                editingFieldId={editingFieldId}
                setFields={setFields}
                setEditingFieldId={setEditingFieldId}
              />
            </>
          )}
          {activeView === "settings" && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
              <p className="mt-2 text-slate-600">Customize your Form settings</p>
            </div>
          )}
          {activeView === "styling" && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-semibold text-slate-800">Styling</h1>
              <p className="mt-2 text-slate-600">Customize your Form styling</p>
            </div>
          )}
          {activeView === "followUps" && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-semibold text-slate-800">Follow Ups</h1>
              <p className="mt-2 text-slate-600">Create follow up questions</p>
            </div>
          )}
        </div>

        {/* Right Side (Preview Panel) */}
        <aside className="hidden md:block w-1/2 border-l  border-slate-200 bg-white shadow-inner">
          <Preview fields={fields} />
        </aside>
      </div>
    </div>
  );
}