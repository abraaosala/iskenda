import * as Icons from "lucide-react";
import { ComponentType } from "react";

interface SmartIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function SmartIcon({ name, className = "", size = 24 }: SmartIconProps) {
  // Map index names to dynamic component representation
  const IconComponent = (Icons as Record<string, ComponentType<{ className?: string; size?: number }>>)[name];

  if (!IconComponent) {
    // Return a default icon (HelpCircle/Info) if lookup fails
    return <Icons.Info className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
