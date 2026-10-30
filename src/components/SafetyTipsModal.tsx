import React from 'react';
import { X, ShieldCheck, MapPin, Key, UserCheck, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { SAFE_MEETING_POINTS } from '../data/mockData';

interface SafetyTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyTipsModal: React.FC<SafetyTipsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#234B3A] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#A8C5A0] text-[#234B3A] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#A8C5A0] uppercase tracking-wider block">
                Comunidad Segura
              </span>
              <h2 className="text-base sm:text-lg font-extrabold">Seguridad y Confianza en Campus</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs no-scrollbar">
          <p className="text-stone-600 leading-relaxed bg-[#F4F0E6] p-3.5 rounded-2xl border border-stone-200">
            En PrestaFácil la seguridad se basa en la <strong>verificación institucional estudiantil</strong>, la transparencia mutua y puntos de encuentro estratégicos en las instalaciones universitarias.
          </p>

          {/* 4 Pillars of Safety */}
          <div className="space-y-3">
            {/* 1. Safe Points */}
            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-[#234B3A] font-bold">
                <MapPin className="w-4 h-4 text-[#234B3A]" />
                <span>Puntos de Encuentro Seguros en el Campus</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Recomendamos realizar siempre las entregas y devoluciones en zonas iluminadas, transitadas y con personal universitario:
              </p>
              <ul className="space-y-1 text-stone-700 text-[11px] pl-1">
                {SAFE_MEETING_POINTS.map((pt, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#234B3A]" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Verification PIN */}
            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#234B3A] font-bold">
                <Key className="w-4 h-4 text-[#234B3A]" />
                <span>Código PIN de Confirmación de Entrega</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Cada solicitud genera un código de seguridad único (ej. <span className="font-mono font-bold text-[#234B3A]">PF-4821</span>). Ambos estudiantes deben cotejarlo al momento de entregar el material para activar el préstamo oficial.
              </p>
            </div>

            {/* 3. Physical Inspection Protocol */}
            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#234B3A] font-bold">
                <Eye className="w-4 h-4 text-[#234B3A]" />
                <span>Protocolo de Revisión Física Rápida</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Al recibir el artículo, revisen juntos que encienda correctamente (si es calculadora), que no tenga hojas arrancadas (si es libro) o que las aristas estén íntegras (si son escuadras). Así se evita cualquier malentendido en la devolución.
              </p>
            </div>

            {/* 4. Privacy */}
            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#234B3A] font-bold">
                <UserCheck className="w-4 h-4 text-[#234B3A]" />
                <span>Privacidad y Protección de Datos</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                PrestaFácil <strong>nunca te solicitará datos financieros privados, dirección domiciliaria ni información personal sensible</strong>. La comunicación y coordinación se realiza dentro del campus universitario.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#234B3A] hover:bg-[#1b3d2f] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Entendido, gracias
          </button>
        </div>
      </div>
    </div>
  );
};
