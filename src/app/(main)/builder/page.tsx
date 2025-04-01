
'use client'
import { Header } from "@/modules/forms/components/Header";
import { FieldSelector } from "@/modules/forms/editor/components/FieldSelector";
import { FormLayout } from "@/modules/forms/editor/components/FormLayout";
import { Preview } from "@/modules/forms/editor/components/Preview";
import { StylingTab } from "@/modules/forms/editor/components/StylingTab";
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
    { type: "mobile", label: "Mobile Input" },
    { type: "email", label: "Email Input" },
    { type: "country", label: "Country Input" },
    { type: "description", label: "Description Input" },
    { type: "heading", label: "Heading Input" },
  ];

  const [stylingOptions, setStylingOptions] = useState({
    backgroundColor: "#ffffff", // Default background color
    textColor: "#000000",       // Default text color
    fontFamily: "Arial",        // Default font family
    fontSize: "16px",           // Default font size
    padding: "8px",             // Default padding
    borderRadius: "6px",        // Default border radius
    borderColor: "#d1d5db",     // Default border color
    buttonColor: "#007bff",     // Default button color
    buttonTextColor:"#fff",
    labelFontSize: "14px",  
    headingSize:"20px", 
  });

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="relative flex h-full  overflow-hidden">
        <div className="flex flex-1 flex-col w-4/5 bg-slate-50 ">
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
            <StylingTab
              stylingOptions={stylingOptions}
              setStylingOptions={setStylingOptions} // Pass setter function
            />
          )}
          {activeView === "followUps" && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-semibold text-slate-800">Follow Ups</h1>
              <p className="mt-2 text-slate-600">Create follow up questions</p>
            </div>
          )}
        </div>

        {/* Right Side (Preview Panel) */}
        <aside className="hidden md:block w-2/5 border-l  border-slate-200 bg-white shadow-inner">
          <Preview fields={fields} stylingOptions={stylingOptions}/>
        </aside>
      </div>
    </div>
  );
}