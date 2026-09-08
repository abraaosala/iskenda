import { Eye, EyeOff } from "lucide-react";

interface VisibilitySwitchProps {
  visible: boolean;
  onChange: (visible: boolean) => void;
  disabled?: boolean;
}

export function VisibilitySwitch({ visible, onChange, disabled }: VisibilitySwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!visible)}
      disabled={disabled}
      aria-checked={visible}
      role="switch"
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${visible ? "bg-emerald-500" : "bg-slate-300"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${visible ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

interface VisibilityButtonProps {
  visible: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function VisibilityButton({ visible, onToggle, disabled }: VisibilityButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      title={visible ? "Ocultar do site" : "Mostrar no site"}
      className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${visible ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-100"}`}
    >
      {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
    </button>
  );
}