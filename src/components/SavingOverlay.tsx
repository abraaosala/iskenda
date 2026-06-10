import { OrbitProgress } from "react-loading-indicators";

interface SavingOverlayProps {
  show: boolean;
}

export default function SavingOverlay({ show }: SavingOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <OrbitProgress variant="disc" color="#f97316" size="large" />
    </div>
  );
}
