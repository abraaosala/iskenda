import { useState, useEffect, FormEvent } from "react";
import { ThreeDot } from "react-loading-indicators";
import SavingOverlay from "./SavingOverlay";
import { X, Save } from "lucide-react";
import type { Service } from "../types";
import { createService, updateService, type ServicePayload } from "../services/api";
import { VisibilitySwitch } from "./VisibilitySwitch";

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ServiceModal({ service, onClose, onSaved }: ServiceModalProps) {
  const isEdit = !!service;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description);
      setIcon(service.icon);
      setFeaturesText(service.features.join("\n"));
      setIsVisible(service.isVisible !== false);
    }
  }, [service]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !icon.trim()) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload: ServicePayload = {
        title: title.trim(),
        description: description.trim(),
        icon: icon.trim(),
        features: featuresText
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        is_visible: isVisible,
      };
      if (isEdit) {
        await updateService(service.id, payload);
      } else {
        await createService(payload);
      }
      onSaved();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <SavingOverlay show={saving} />
      <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-brand-navy">
            {isEdit ? "Editar Serviço" : "Novo Serviço"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="svc-title" className="block text-sm font-medium text-slate-700 mb-1">
              Título <span className="text-red-400">*</span>
            </label>
            <input
              id="svc-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50"
              placeholder="Ex: Contabilidade Geral"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="svc-icon" className="block text-sm font-medium text-slate-700 mb-1">
              Ícone (emoji) <span className="text-red-400">*</span>
            </label>
            <input
              id="svc-icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50"
              placeholder="Ex: 📊"
            />
          </div>

          <div>
            <label htmlFor="svc-desc" className="block text-sm font-medium text-slate-700 mb-1">
              Descrição <span className="text-red-400">*</span>
            </label>
            <textarea
              id="svc-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50 resize-none"
              placeholder="Descrição do serviço"
            />
          </div>

          <div>
            <label htmlFor="svc-features" className="block text-sm font-medium text-slate-700 mb-1">
              Funcionalidades (uma por linha)
            </label>
            <textarea
              id="svc-features"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50 resize-none font-mono text-xs"
              placeholder="Elaboração de demonstrações financeiras&#10;Apuramento de impostos&#10;Reportes periódicos"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-slate-700">Visível no site</label>
              <p className="text-xs text-slate-400 mt-0.5">Se desactivado, o serviço fica oculto para visitantes.</p>
            </div>
            <VisibilitySwitch visible={isVisible} onChange={setIsVisible} />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "A salvar…" : "Salvar"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
