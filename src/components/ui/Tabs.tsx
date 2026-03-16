import { cn } from "../../lib/utils";

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex gap-1 overflow-x-auto rounded-lg bg-white/[0.03] p-1",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all",
            activeTab === tab.id
              ? "bg-amber-500/15 text-amber-400"
              : "text-gray-400 hover:bg-white/[0.05] hover:text-gray-200"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
