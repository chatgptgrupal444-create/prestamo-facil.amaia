import React from 'react';
import { X, Search, MessageSquare, CheckCircle, ArrowRight, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExploring: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onStartExploring,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#234B3A] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-extrabold text-[#A8C5A0] uppercase tracking-wider block">
              Guía PrestaFácil
            </span>
            <h2 className="text-lg font-extrabold">¿Cómo funciona la plataforma?</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          <p className="text-xs text-stone-600 leading-relaxed bg-[#F4F0E6] p-3.5 rounded-2xl border border-stone-200">
            PrestaFácil funciona mediante un modelo de <strong>economía colaborativa entre estudiantes</strong>. Conectamos a compañeros que necesitan herramientas o libros para sus cursos con quienes los tienen guardados y disponibles.
          </p>

          {/* 3 Step Visual Flow */}
          <div className="space-y-3.5">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#234B3A] text-[#A8C5A0] font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-[#234B3A]" />
                  Busca o publica tu material
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Encuentra el libro, calculadora o herramienta que necesitas filtrando por tu campus, o publica en 1 minuto los artículos que no estés usando hoy para ayudar a otro estudiante.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#A8C5A0] text-[#234B3A] font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#234B3A]" />
                  Contacta y acuerda en un punto seguro
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Coordina con el estudiante las condiciones del préstamo, intercambio o alquiler. Elige un <strong>punto de encuentro seguro</strong> dentro del campus universitario (biblioteca, cafetería o laboratorios).
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#234B3A] text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Recibe, aprovecha y devuelve
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Verifiquen juntos el estado físico del artículo y confirmen la entrega con su <strong>código PIN seguro</strong>. Al terminar el período acordado, devuélvelo puntualmente y califíquense mutuamente.
                </p>
              </div>
            </div>
          </div>

          {/* Golden Rules */}
          <div className="bg-[#234B3A]/5 border border-[#234B3A]/20 p-4 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-[#234B3A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#234B3A]" />
              Compromiso de Confianza Estudiantil
            </h4>
            <p className="text-[11px] text-stone-600">
              Todos los miembros deben tener carnet estudiantil verificado. El respeto, la puntualidad y el cuidado del material escolar son la base que hace posible PrestaFácil.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => {
              onClose();
              onStartExploring();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#234B3A] hover:bg-[#1b3d2f] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Explorar materiales ahora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
