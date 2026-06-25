import { useState, useRef, useEffect } from "react";
import * as Icons from "lucide-react";
import type { ComponentType } from "react";

const ICON_LIST = [
  "Calculator", "FileText", "Users", "Layers", "ShieldAlert", "CheckCircle2",
  "Award", "UserCheck", "Eye", "Lightbulb", "Handshake", "FileSpreadsheet",
  "MessageSquare", "School", "Laptop", "Briefcase", "TrendingUp", "UserCircle",
  "Building2", "GraduationCap", "Presentation", "Headphones", "Megaphone",
  "Monitor", "Star", "Clock", "Settings", "BookOpen", "ClipboardList",
  "HelpingHand", "FileCheck2", "ShieldCheck", "HeartHandshake", "ArrowRight",
  "Search", "Menu", "Mail", "Phone", "PhoneCall", "Send", "CheckCircle",
  "Facebook", "Instagram", "Linkedin", "MessageSquareCode", "ArrowUp",
  "DollarSign", "FileSignature", "Check", "Landmark", "LogIn", "Lock",
  "ArrowLeft", "GalleryHorizontal", "LayoutDashboard", "Image",
];

interface IconPickerProps {
  value: string;
  onChange: (name: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = search
    ? ICON_LIST.filter((name) => name.toLowerCase().includes(search.toLowerCase()))
    : ICON_LIST;

  const SelectedIcon = (Icons as unknown as Record<string, ComponentType<{ className?: string; size?: number }>>)[value];

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-1">Ícone</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50/50 hover:bg-slate-100 transition"
      >
        {SelectedIcon ? (
          <SelectedIcon className="h-5 w-5 text-slate-600" />
        ) : (
          <Icons.Info className="h-5 w-5 text-slate-400" />
        )}
        <span className={value ? "text-slate-900" : "text-slate-400"}>{value || "Selecionar ícone…"}</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-72 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="Procurar ícone…"
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-2 grid grid-cols-4 gap-1">
            {filtered.length === 0 ? (
              <p className="col-span-4 text-sm text-slate-400 text-center py-4">Nenhum ícone encontrado</p>
            ) : (
              filtered.map((name) => {
                const IconComp = (Icons as unknown as Record<string, ComponentType<{ className?: string; size?: number }>>)[name];
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => { onChange(name); setOpen(false); setSearch(""); }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition ${
                      value === name ? "bg-brand-orange/10 ring-1 ring-brand-orange" : "hover:bg-slate-100"
                    }`}
                    title={name}
                  >
                    {IconComp ? <IconComp className="h-5 w-5 text-slate-600" /> : <Icons.Info className="h-5 w-5 text-slate-400" />}
                    <span className="truncate w-full text-center text-[10px] text-slate-500">{name}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
