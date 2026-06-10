import { ThreeDot } from "react-loading-indicators";

interface LoadingOverlayProps {
  text?: string;
}

export default function LoadingOverlay({ text }: LoadingOverlayProps) {
  return (
    <div className="flex items-center justify-center py-24">
      <ThreeDot variant="bounce" color="#1e3a5f" size="medium" text={text} textColor="#64748b" />
    </div>
  );
}
