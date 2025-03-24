import { cn } from "@/modules/ui/lib/utils";

interface TabProps {
    tabs: { id: string; label: string; icon: JSX.Element }[];
    activeView: string;
    setActiveView: (view: string) => void;
  }
  
 export const Tabs = ({ tabs, activeView, setActiveView }: TabProps) => {
    return (
      <nav className="flex  items-center space-x-4 py-2" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={cn(
              tab.id === activeView
                ? "border-brand-dark font-semibold text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700",
              "flex h-full items-center border-b-2 px-3 text-base font-medium"
            )}
          >
            {tab.icon && <div className="mr-2 h-5 w-5">{tab.icon}</div>}
            {tab.label}
          </button>
        ))}
      </nav>
    );
  };