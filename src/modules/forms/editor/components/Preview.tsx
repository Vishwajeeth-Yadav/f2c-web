import React, { useMemo } from 'react';
import { renderFieldComponent } from "./fieldRenderer";
import { Field } from "./types";

interface PreviewProps {
  fields: Field[];
  stylingOptions: any;
}

export const Preview = ({ fields, stylingOptions }: PreviewProps) => {
  // Default styling options
  const defaultStylingOptions = {
    backgroundColor: "#ffffff",
    buttonColor: "#007bff",
    buttonTextColor: "#ffffff",
  };

  const resolvedStylingOptions = { ...defaultStylingOptions, ...stylingOptions };

  // Group fields by rows and track row order
  const { groupedFields, rowOrder } = useMemo(() => {
    const groups: Record<string, Field[]> = {};
    const rowPositions: Record<string, number> = {};
    
    // First pass: find all rowIds and their first occurrence position
    fields.forEach((field: Field, index) => {
      const rowId = field.rowId || `no-row-${field.id}`;
      if (rowPositions[rowId] === undefined) {
        rowPositions[rowId] = index;
      }
    });
    
    // Second pass: group fields by rowId
    fields.forEach((field: Field) => {
      const rowId = field.rowId || `no-row-${field.id}`;
      if (!groups[rowId]) {
        groups[rowId] = [];
      }
      groups[rowId].push(field);
    });
    
    // Sort fields within each row by their order property
    Object.keys(groups).forEach(rowId => {
      groups[rowId].sort((a: Field, b: Field) => (a.order || 0) - (b.order || 0));
    });
    
    // Get sorted row order based on positions of first field in each row
    const sortedRowIds = Object.keys(groups).sort((a, b) => 
      (rowPositions[a] || 0) - (rowPositions[b] || 0)
    );
    
    return { 
      groupedFields: groups,
      rowOrder: sortedRowIds
    };
  }, [fields]);

  // Handle empty state
  if (fields.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full border-l border-slate-200 bg-slate-100 shadow-inner">
        <h1 className="text-4xl text-slate-900 italic animate-pulse">No Fields Added Yet</h1>
      </div>
    );
  }

  return (
    <aside className="flex-1 h-screen py-10 overflow-y-auto flex-shrink-0 border-l border-slate-200 bg-slate-100 shadow-inner flex flex-col items-center">
      <h3 className="font-semibold text-4xl text-center mb-6 px-4">Preview</h3>

      <form
        className="max-w-lg px-8 mb-10 shadow-md p-5 rounded-3xl w-full"
        style={{ background: resolvedStylingOptions.backgroundColor }}
      >
        <h3 className="font-semibold text-3xl text-center my-6">Form Title</h3>
        <div>
          {rowOrder.map(rowId => (
            <div key={rowId} className="flex space-x-4 mb-4">
              {groupedFields[rowId].map((field: Field) => (
                <div key={field.id} className="flex-1">
                  {renderFieldComponent(field, resolvedStylingOptions)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          className="mt-4 w-full py-2 rounded-md transition duration-300 ease-in-out"
          style={{
            backgroundColor: resolvedStylingOptions.buttonColor,
            color: resolvedStylingOptions.buttonTextColor,
          }}
        >
          Submit
        </button>
      </form>
    </aside>
  );
};