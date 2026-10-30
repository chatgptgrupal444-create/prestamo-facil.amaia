import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Users, RefreshCw } from 'lucide-react';

interface WelcomeScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onExploreAsGuest: () => void;
  onLearnMore: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onLogin,
  onRegister,
  onExploreAsGuest,
  onLearnMore,
}) => {
  return (
    <div className="min-h-full flex flex-col justify-between bg-[#F4F0E6] text-[#303530]">
      {/* Top Header / Brand Lockup */}
      <div className="pt-6 px-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#234B3A] text-[#A8C5A0] shadow-md mb-3 ring-4 ring-[#A8C5A0]/20">
          <span className="font-extrabold text-2xl tracking-tight">PF</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#234B3A]">
          PRESTAFÁCIL
        </h1>
        <p className="text-sm font-semibold text-[#234B3A]/80 mt-1 italic">
          "Lo que no usas, alguien más lo necesita"
        </p>
      </div>

      {/* Hero Visual Asset */}
      <div className="px-5 my-4">
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 bg-white group">
          <img
            src="/src/assets/images/prestafacil_welcome_students_1793342176685.jpg"
            alt="Estudiantes universitarios compartiendo libros y materiales de dibujo en el campus"
            className="w-full h-52 sm:h-64 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#234B3A]/90 via-[#234B3A]/30 to-transparent flex flex-col justify-end p-4 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A8C5A0]">
              Economía Colaborativa Estudiantil
            </span>
            <p className="text-xs sm:text-sm font-medium mt-0.5 text-stone-100">
              Conectamos estudiantes de Gastronomía, Arquitectura y diversas facultades en todo el estado de Veracruz.
            </p>
          </div>
        </div>
      </div>

      {/* Concept Explanation & Value Pillars */}
      <div className="px-6 space-y-3">
        <div className="bg-white/80 rounded-2xl p-3.5 border border-stone-200/70 shadow-sm space-y-2 text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#234B3A] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#234B3A]" />
            ¿Por qué comprar lo que solo usarás un parcial?
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            PrestaFácil permite prestar, intercambiar o alquilar utensilios de cocina, equipos de repostería, escalímetros, reglas T, niveles láser y libros entre compañeros universitarios de Veracruz, ahorrando dinero y promoviendo el consumo responsable.
          </p>
        </div>

        {/* 3 micro pills of key benefits */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-2.5 rounded-xl border border-stone-200/60 shadow-xs">
            <Leaf className="w-4 h-4 text-[#234B3A] mx-auto mb-1" />
            <span className="block text-[10px] font-bold text-stone-800">Cero Desperdicio</span>
            <span className="text-[9px] text-stone-500">Reutiliza recursos</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-stone-200/60 shadow-xs">
            <RefreshCw className="w-4 h-4 text-[#234B3A] mx-auto mb-1" />
            <span className="block text-[10px] font-bold text-stone-800">Ahorro Real</span>
            <span className="text-[9px] text-stone-500">Hasta 70% menos</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-stone-200/60 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#234B3A] mx-auto mb-1" />
            <span className="block text-[10px] font-bold text-stone-800">100% Seguro</span>
            <span className="text-[9px] text-stone-500">Puntos en campus</span>
          </div>
        </div>
      </div>

      {/* Actions / CTA Buttons */}
      <div className="p-6 pt-4 space-y-2.5">
        <button
          onClick={onRegister}
          className="w-full h-12 rounded-xl bg-[#234B3A] hover:bg-[#1b3d2f] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#234B3A]/20 transition-all active:scale-[0.98]"
        >
          <span>Crear cuenta estudiantil</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onLogin}
          className="w-full h-12 rounded-xl bg-white hover:bg-stone-50 text-[#234B3A] border-2 border-[#234B3A] font-bold text-sm flex items-center justify-center transition-all active:scale-[0.98]"
        >
          <span>Iniciar sesión</span>
        </button>

        <div className="pt-1 flex items-center justify-between text-xs text-stone-500 px-2">
          <button
            onClick={onExploreAsGuest}
            className="font-medium text-[#234B3A] underline hover:text-[#1b3d2f]"
          >
            Explorar catálogo demo →
          </button>
          <button
            onClick={onLearnMore}
            className="hover:text-[#234B3A] transition-colors"
          >
            ¿Cómo funciona?
          </button>
        </div>
      </div>
    </div>
  );
};
