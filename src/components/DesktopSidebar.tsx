import React from 'react';
import { 
  Home, 
  Compass, 
  PlusCircle, 
  ArrowLeftRight, 
  User as UserIcon, 
  Utensils, 
  PenTool, 
  ShieldCheck, 
  Lock, 
  Leaf, 
  HelpCircle, 
  Building2, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { ScreenTab, User } from '../types';

interface DesktopSidebarProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  pendingRequestsCount: number;
  currentUser: User | null;
  onOpenPublish: () => void;
  onOpenEconomy: () => void;
  onOpenHowItWorks: () => void;
  onOpenSafety: () => void;
  selectedCampus: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingRequestsCount,
  currentUser,
  onOpenPublish,
  onOpenEconomy,
  onOpenHowItWorks,
  onOpenSafety,
  selectedCampus,
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <aside 
      className={`hidden lg:flex flex-col bg-white border-r border-stone-200/90 shrink-0 sticky top-0 h-screen transition-all duration-200 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64 xl:w-72'
      }`}
    >
      {/* Brand Top Header */}
      <div className="p-4 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-[#234B3A] text-[#A8C5A0] flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
            PF
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-[#234B3A]">
                  PRESTAFÁCIL
                </span>
                <span className="text-[9px] font-bold bg-[#A8C5A0]/30 text-[#234B3A] px-1.5 py-0.2 rounded uppercase">
                  Veracruz
                </span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium truncate">
                Economía Colaborativa
              </p>
            </div>
          )}
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
          aria-label={isCollapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Call to Action Button */}
      <div className="p-3">
        <button
          onClick={onOpenPublish}
          className={`w-full py-2.5 rounded-2xl bg-[#234B3A] hover:bg-[#1b3d2f] text-white font-extrabold text-xs shadow-md shadow-[#234B3A]/15 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
            isCollapsed ? 'px-0' : 'px-4'
          }`}
          title="Publicar un artículo"
        >
          <PlusCircle className="w-4 h-4 text-[#A8C5A0] shrink-0" />
          {!isCollapsed && <span>Publicar Artículo</span>}
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 no-scrollbar">
        {!isCollapsed && (
          <span className="px-3 text-[10px] font-extrabold uppercase text-stone-400 tracking-wider block mb-1">
            Navegación
          </span>
        )}

        {/* Inicio */}
        <button
          onClick={() => onSelectTab('inicio')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            currentTab === 'inicio'
              ? 'bg-[#234B3A] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100 hover:text-[#234B3A]'
          }`}
          title="Ir a Inicio"
        >
          <Home className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Inicio</span>}
        </button>

        {/* Gastronomía (Direct Category Filter) */}
        <button
          onClick={() => onSelectTab('gastronomia')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            currentTab === 'gastronomia'
              ? 'bg-[#234B3A] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100 hover:text-[#234B3A]'
          }`}
          title="Especialidad de Gastronomía (35+ artículos)"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Utensils className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="truncate">Gastronomía</span>}
          </div>
          {!isCollapsed && (
            <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
              currentTab === 'gastronomia' ? 'bg-[#A8C5A0] text-[#234B3A]' : 'bg-emerald-100 text-emerald-800'
            }`}>
              35
            </span>
          )}
        </button>

        {/* Arquitectura (Direct Category Filter) */}
        <button
          onClick={() => onSelectTab('arquitectura')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            currentTab === 'arquitectura'
              ? 'bg-[#234B3A] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100 hover:text-[#234B3A]'
          }`}
          title="Especialidad de Arquitectura (20 herramientas)"
        >
          <div className="flex items-center gap-3 min-w-0">
            <PenTool className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="truncate">Arquitectura</span>}
          </div>
          {!isCollapsed && (
            <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
              currentTab === 'arquitectura' ? 'bg-[#A8C5A0] text-[#234B3A]' : 'bg-[#F4F0E6] text-[#234B3A]'
            }`}>
              20
            </span>
          )}
        </button>

        {/* Explorar Directorio */}
        <button
          onClick={() => onSelectTab('explorar')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            currentTab === 'explorar'
              ? 'bg-[#234B3A] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100 hover:text-[#234B3A]'
          }`}
          title="Explorar Directorio y Subcategorías"
        >
          <Compass className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Explorar Directorio</span>}
        </button>

        {/* Solicitudes */}
        <button
          onClick={() => onSelectTab('solicitudes')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            currentTab === 'solicitudes'
              ? 'bg-[#234B3A] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100 hover:text-[#234B3A]'
          }`}
          title="Gestión de Solicitudes y Préstamos"
        >
          <div className="flex items-center gap-3 min-w-0">
            <ArrowLeftRight className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="truncate">Solicitudes</span>}
          </div>
          {pendingRequestsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-400 text-[#234B3A] text-[10px] font-black flex items-center justify-center shrink-0">
              {pendingRequestsCount}
            </span>
          )}
        </button>

        {/* Mi Perfil */}
        <button
          onClick={() => onSelectTab('perfil')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            currentTab === 'perfil'
              ? 'bg-[#234B3A] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100 hover:text-[#234B3A]'
          }`}
          title="Ver mi perfil universitario"
        >
          <UserIcon className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Mi Perfil</span>}
        </button>

        {/* Panel Administrativo (Private Security Tab) */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
            currentTab === 'dashboard'
              ? 'bg-[#234B3A] text-white border-[#234B3A] shadow-xs'
              : 'text-[#234B3A] bg-[#A8C5A0]/15 hover:bg-[#A8C5A0]/25 border-[#A8C5A0]/40'
          }`}
          title="Acceso al Dashboard Administrativo (Privado)"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Lock className="w-4 h-4 shrink-0 text-[#234B3A]" />
            {!isCollapsed && <span className="truncate">Panel Admin</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[9px] font-black uppercase text-[#234B3A] bg-white/80 px-1.5 py-0.2 rounded">
              Privado
            </span>
          )}
        </button>

        {/* Divider & Secondary Institutional Resources */}
        {!isCollapsed && (
          <div className="pt-3 mt-2 border-t border-stone-100 space-y-1">
            <span className="px-3 text-[10px] font-extrabold uppercase text-stone-400 tracking-wider block mb-1">
              Institucional
            </span>

            <button
              onClick={onOpenEconomy}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-stone-600 hover:text-[#234B3A] hover:bg-stone-50 text-xs font-medium transition-colors text-left"
            >
              <Leaf className="w-3.5 h-3.5 text-[#234B3A] shrink-0" />
              <span>Economía Colaborativa</span>
            </button>

            <button
              onClick={onOpenSafety}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-stone-600 hover:text-[#234B3A] hover:bg-stone-50 text-xs font-medium transition-colors text-left"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#234B3A] shrink-0" />
              <span>Puntos Seguros Veracruz</span>
            </button>

            <button
              onClick={onOpenHowItWorks}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-stone-600 hover:text-[#234B3A] hover:bg-stone-50 text-xs font-medium transition-colors text-left"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#234B3A] shrink-0" />
              <span>¿Cómo funciona?</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Campus Indicator & User Card */}
      {!isCollapsed && (
        <div className="p-3 border-t border-stone-100 space-y-2 bg-stone-50/70">
          {/* Active Campus Badge */}
          <div className="px-2.5 py-1.5 bg-white rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#234B3A] shrink-0" />
            <span className="truncate font-semibold">{selectedCampus.split(':')[0]}</span>
          </div>

          {/* Current User Card */}
          {currentUser && (
            <div 
              onClick={() => onSelectTab('perfil')}
              className="p-2 bg-white rounded-2xl border border-stone-200 flex items-center justify-between cursor-pointer hover:border-[#234B3A] transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#234B3A]/20 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-900 truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-stone-500 truncate">{currentUser.career}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
