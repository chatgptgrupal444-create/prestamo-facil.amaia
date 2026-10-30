import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  HelpCircle, 
  Leaf, 
  Bell, 
  Check, 
  Smartphone, 
  Monitor,
  Sparkles
} from 'lucide-react';
import { CAMPUS_LOCATIONS } from '../data/mockData';

interface HeaderProps {
  selectedCampus: string;
  onSelectCampus: (campus: string) => void;
  onOpenHowItWorks: () => void;
  onOpenEconomy: () => void;
  onOpenSafety: () => void;
  isMobileDeviceView: boolean;
  onToggleDeviceView: () => void;
  pendingRequestsCount: number;
  onOpenRequests: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCampus,
  onSelectCampus,
  onOpenHowItWorks,
  onOpenEconomy,
  onOpenSafety,
  isMobileDeviceView,
  onToggleDeviceView,
  pendingRequestsCount,
  onOpenRequests,
}) => {
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#234B3A] text-white shadow-md transition-colors">
      {/* Top brand & utility bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#A8C5A0] text-[#234B3A] flex items-center justify-center font-bold text-lg shadow-sm">
            <span>PF</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">PRESTAFÁCIL</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-semibold bg-[#A8C5A0]/20 text-[#A8C5A0] px-1.5 py-0.5 rounded">
                Red Veracruz
              </span>
            </div>
            <p className="text-[11px] text-[#A8C5A0] leading-none hidden xs:block font-medium">
              Lo que no usas, alguien más lo necesita · Todo el Estado de Veracruz
            </p>
          </div>
        </div>

        {/* Center / Action badges */}
        <div className="hidden lg:flex items-center gap-2 text-xs">
          <button
            onClick={onOpenEconomy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[#F4F0E6] transition-colors border border-white/10"
            title="Conoce cómo funciona la economía colaborativa en PrestaFácil"
          >
            <Leaf className="w-3.5 h-3.5 text-[#A8C5A0]" />
            <span className="font-medium">Economía Colaborativa</span>
          </button>

          <button
            onClick={onOpenHowItWorks}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[#F4F0E6] transition-colors border border-white/10"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#A8C5A0]" />
            <span className="font-medium">¿Cómo funciona?</span>
          </button>

          <button
            onClick={onOpenSafety}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[#F4F0E6] transition-colors border border-white/10"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#A8C5A0]" />
            <span className="font-medium">Puntos Seguros</span>
          </button>
        </div>

        {/* Right utility items */}
        <div className="flex items-center gap-2">
          {/* Campus Selector Button */}
          <div className="relative">
            <button
              onClick={() => setShowCampusDropdown(!showCampusDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white transition-colors border border-white/10 max-w-[150px] sm:max-w-[200px] truncate"
              title="Cambiar campus en Veracruz"
            >
              <Building2 className="w-3.5 h-3.5 text-[#A8C5A0] shrink-0" />
              <span className="truncate text-left">{selectedCampus}</span>
            </button>

            {showCampusDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowCampusDropdown(false)} 
                />
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white text-[#303530] rounded-2xl shadow-2xl border border-stone-200 z-50 py-1 overflow-hidden animate-in fade-in duration-150 max-h-[80vh] overflow-y-auto">
                  <div className="px-3 py-2 bg-stone-50 border-b border-stone-100 text-[11px] font-bold text-[#234B3A] uppercase tracking-wider flex items-center justify-between">
                    <span>Campus e Institutos en Veracruz</span>
                  </div>
                  {CAMPUS_LOCATIONS.map((campus) => (
                    <button
                      key={campus}
                      onClick={() => {
                        onSelectCampus(campus);
                        setShowCampusDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between hover:bg-[#F4F0E6] transition-colors border-b border-stone-50 ${
                        selectedCampus === campus ? 'font-bold text-[#234B3A] bg-[#A8C5A0]/20' : 'text-stone-700'
                      }`}
                    >
                      <span className="truncate pr-2">{campus}</span>
                      {selectedCampus === campus && <Check className="w-4 h-4 text-[#234B3A] shrink-0" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notifications bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
              title="Notificaciones de préstamos"
              aria-label="Ver notificaciones"
            >
              <Bell className="w-4 h-4" />
              {pendingRequestsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[#234B3A] font-bold text-[10px] flex items-center justify-center">
                  {pendingRequestsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-72 bg-white text-[#303530] rounded-xl shadow-xl border border-stone-200 z-50 py-2 animate-in fade-in duration-150">
                  <div className="px-3 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#234B3A]">Notificaciones</span>
                    <span className="text-[10px] bg-[#A8C5A0]/30 text-[#234B3A] font-medium px-1.5 py-0.5 rounded">
                      {pendingRequestsCount} activas
                    </span>
                  </div>
                  <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto">
                    <div 
                      onClick={() => {
                        setShowNotifications(false);
                        onOpenRequests();
                      }}
                      className="p-3 text-xs hover:bg-[#F4F0E6] cursor-pointer transition-colors"
                    >
                      <p className="font-semibold text-stone-900">Solicitud de Escuadras recibida</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Fernanda Ortiz solicitó tu juego de dibujo para el fin de semana.</p>
                      <span className="text-[10px] text-[#234B3A] font-medium mt-1 inline-block">Ver y responder →</span>
                    </div>
                    <div 
                      onClick={() => {
                        setShowNotifications(false);
                        onOpenRequests();
                      }}
                      className="p-3 text-xs hover:bg-[#F4F0E6] cursor-pointer transition-colors"
                    >
                      <p className="font-semibold text-stone-900">Préstamo de Calculadora aprobado</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Carlos Méndez aceptó tu solicitud. Código: <span className="font-mono font-bold text-[#234B3A]">PF-4821</span></p>
                      <span className="text-[10px] text-[#234B3A] font-medium mt-1 inline-block">Ver detalles del punto seguro →</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Desktop/Presentation frame toggle button */}
          <button
            onClick={onToggleDeviceView}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#A8C5A0] text-[#234B3A] hover:bg-[#A8C5A0]/90 text-xs font-bold transition-all shadow-sm"
            title={isMobileDeviceView ? "Cambiar a vista fluida completa" : "Cambiar a simulador de móvil (Ideal para video y presentación)"}
          >
            {isMobileDeviceView ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Vista Completa</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Simulador Móvil</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile secondary navigation banner for quick concept access */}
      <div className="lg:hidden px-4 py-1.5 bg-[#1b3d2f] border-t border-white/5 flex items-center justify-between text-[11px] text-[#F4F0E6]/90 overflow-x-auto no-scrollbar gap-3">
        <button 
          onClick={onOpenEconomy} 
          className="flex items-center gap-1 whitespace-nowrap hover:text-white"
        >
          <Leaf className="w-3 h-3 text-[#A8C5A0]" />
          <span>Economía Colaborativa</span>
        </button>
        <span className="text-white/20">|</span>
        <button 
          onClick={onOpenHowItWorks} 
          className="flex items-center gap-1 whitespace-nowrap hover:text-white"
        >
          <HelpCircle className="w-3 h-3 text-[#A8C5A0]" />
          <span>¿Cómo funciona?</span>
        </button>
        <span className="text-white/20">|</span>
        <button 
          onClick={onOpenSafety} 
          className="flex items-center gap-1 whitespace-nowrap hover:text-white"
        >
          <ShieldCheck className="w-3 h-3 text-[#A8C5A0]" />
          <span>Puntos Seguros</span>
        </button>
      </div>
    </header>
  );
};
