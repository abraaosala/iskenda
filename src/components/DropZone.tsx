import { useEffect, useState, type MouseEvent, type DragEvent } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image } from "lucide-react";

interface DropZoneProps {
  label?: string;
  accept?: Record<string, string[]>;
  currentUrl?: string | null;
  file?: File | null;
  onFileSelect: (file: File | null) => void;
}

export default function DropZone({ label, accept, currentUrl, file, onFileSelect }: DropZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file && !currentUrl) {
      setPreview(null);
    }
  }, [file, currentUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const f = acceptedFiles[0];
      onFileSelect(f);
      setPreview(URL.createObjectURL(f));
    },
    onDragEnter: (_e: DragEvent) => {},
    onDragOver: (_e: DragEvent) => {},
    onDragLeave: (_e: DragEvent) => {},
    accept: accept ?? { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxFiles: 1,
    multiple: false,
  });

  function handleClear(e: MouseEvent) {
    e.stopPropagation();
    onFileSelect(null);
    setPreview(null);
  }

  const hasPreview = preview || currentUrl;

  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 cursor-pointer transition-all min-h-[140px] ${
          isDragActive
            ? "border-brand-orange bg-amber-50"
            : hasPreview
              ? "border-slate-200 bg-slate-50/30 hover:border-slate-300"
              : "border-slate-300 bg-slate-50/50 hover:border-brand-blue hover:bg-blue-50/30"
        }`}
      >
        <input {...getInputProps()} />

        {hasPreview ? (
          <>
            <img
              src={preview || currentUrl || ""}
              alt="Preview"
              className="max-h-28 max-w-full rounded-lg object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 rounded-xl transition-colors group">
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-1.5 bg-white/90 rounded-lg text-slate-600">
                  <Upload className="h-4 w-4" />
                </div>
                {file && (
                  <div
                    onClick={handleClear}
                    className="p-1.5 bg-white/90 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2 text-slate-400">
            <div className="p-3 rounded-xl bg-slate-100">
              <Image className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium">
              {isDragActive ? "Largar ficheiro" : "Arrastar ou clicar"}
            </p>
            <p className="text-[10px]">JPG, PNG ou WEBP até 2MB</p>
          </div>
        )}
      </div>
    </div>
  );
}
