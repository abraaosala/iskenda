import { useState, useEffect, useCallback } from "react";
import { GALLERY_ITEMS } from "../data";
import { SmartIcon } from "./SmartIcon";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const categories = [...new Set(GALLERY_ITEMS.map((item) => item.category))];

  const filtered = activeCategory
    ? GALLERY_ITEMS.filter((item) => item.category === activeCategory)
    : GALLERY_ITEMS;

  const open = useCallback((index: number) => setSelectedIndex(index), []);
  const close = useCallback(() => setSelectedIndex(null), []);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    );
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    );
  }, [filtered.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, close, goPrev, goNext]);

  const currentItem = selectedIndex !== null ? filtered[selectedIndex] : null;

  return (
    <>
      <section id="galeria" className="py-24 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-blue/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-navy/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-brand-blue/10 px-4 py-1.5 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider">
              <span>Registo Visual</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Galeria
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
              Conheça os nossos espaços, equipa e momentos que fazem parte do dia-a-dia da IS KENDA.
            </p>
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === null
                    ? "bg-brand-navy text-white shadow-md"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-brand-blue hover:text-brand-blue"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-brand-navy text-white shadow-md"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-brand-blue hover:text-brand-blue"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => open(index)}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer"
              >
                <div className="h-52 bg-gradient-to-br from-slate-200 to-slate-300 relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    onLoad={() => setLoadedImages((prev) => new Set(prev).add(item.id))}
                    onError={() => setFailedImages((prev) => new Set(prev).add(item.id))}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                      loadedImages.has(item.id) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-opacity duration-300 ${
                    loadedImages.has(item.id) && !failedImages.has(item.id) ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}>
                    <SmartIcon
                      name={item.icon}
                      size={48}
                      className="text-white/30"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/50 transition-all duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 text-brand-navy opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Search className="h-5 w-5" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-white text-sm font-bold leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-xs text-slate-400 font-mono">
              {filtered.length} {filtered.length === 1 ? "registo" : "registos"} encontrados
            </p>
          </div>
        </div>
      </section>

      {currentItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in-up"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10 cursor-pointer"
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10 cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10 cursor-pointer"
            aria-label="Seguinte"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[85vh] mx-4 flex flex-col items-center"
          >
            <img
              src={currentItem.src}
              alt={currentItem.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-md bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-1">
                {currentItem.category}
              </span>
              <h3 className="text-white text-lg font-bold">{currentItem.title}</h3>
              <p className="text-white/50 text-xs font-mono mt-1">
                {selectedIndex! + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
