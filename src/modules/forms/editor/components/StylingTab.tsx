import React from "react";

interface StylingTabProps {
  stylingOptions: any;
  setStylingOptions: (options: any) => void;
}

export const StylingTab = ({ stylingOptions, setStylingOptions }: StylingTabProps) => {
  const handleInputChange = (key: string, value: string) => {
    setStylingOptions((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6 w-full overflow-y-auto "> {/* Centered layout with max width */}
      {/* Section: Text Styles */}
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
        <h4 className="text-lg font-semibold mb-4">Text Styles</h4>
        <div className="space-y-4">
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Font Family</label>
            <select
              value={stylingOptions.fontFamily}
              onChange={(e) => handleInputChange("fontFamily", e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm"
            >
              <option value="Arial">Arial</option>
              <option value="Roboto">Roboto</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Font Size</label>
            <input
              type="range"
              min="12"
              max="24"
              step="1"
              value={stylingOptions.fontSize.replace("px", "")}
              onChange={(e) => handleInputChange("fontSize", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.fontSize}</span>
          </div>

          {/* Label Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Label Font Size</label>
            <input
              type="range"
              min="10"
              max="28"
              step="1"
              value={stylingOptions.labelFontSize.replace("px", "")}
              onChange={(e) => handleInputChange("labelFontSize", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.labelFontSize}</span>
          </div>

          {/* Heading Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Heading Font Size</label>
            <input
              type="range"
              min="10"
              max="38"
              step="1"
              value={stylingOptions.headingSize.replace("px", "")}
              onChange={(e) => handleInputChange("headingSize", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.headingSize}</span>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Text Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.textColor}
                onChange={(e) => handleInputChange("textColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.textColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Background & Layout */}
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
        <h4 className="text-lg font-semibold mb-4">Background & Layout</h4>
        <div className="space-y-4">
          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Background Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.backgroundColor}
                onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.backgroundColor}</span>
            </div>
          </div>

          {/* Padding */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Padding</label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={stylingOptions.padding.replace("px", "")}
              onChange={(e) => handleInputChange("padding", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.padding}</span>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Border Radius</label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={stylingOptions.borderRadius.replace("px", "")}
              onChange={(e) => handleInputChange("borderRadius", `${e.target.value}px`)}
              className="mt-1 block w-full"
            />
            <span className="text-xs text-slate-500">{stylingOptions.borderRadius}</span>
          </div>

          {/* Border Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Border Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.borderColor}
                onChange={(e) => handleInputChange("borderColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.borderColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Button Styles */}
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-black/10">
        <h4 className="text-lg font-semibold mb-4">Button Styles</h4>
        <div className="space-y-4">
          {/* Button Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Button Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.buttonColor}
                onChange={(e) => handleInputChange("buttonColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.buttonColor}</span>
            </div>
          </div>

          {/* Button Text Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Button Text Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stylingOptions.buttonTextColor}
                onChange={(e) => handleInputChange("buttonTextColor", e.target.value)}
                className="mt-1"
              />
              <span>{stylingOptions.buttonTextColor}</span>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};