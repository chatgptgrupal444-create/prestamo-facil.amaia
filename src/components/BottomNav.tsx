import React from 'react';
import { Home, Compass, Plus, ArrowLeftRight, User as UserIcon } from 'lucide-react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  pendingRequestsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  pendingRequestsCount,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-md md:max-w-xl mx-auto flex items-center justify-around h-16 px-2">
        {/* Inicio */}
        <button
          onClick={() => onSelectTab('inicio')}
          className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-colors ${
            currentTab === 'inicio' ? 'text-[#234B3A]' : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="Ir a Inicio"
        >
          <div className={`p-1 rounded-xl transition-all ${currentTab === 'inicio' ? 'bg-[#A8C5A0]/30' : ''}`}>
            <Home className="w-5 h-5" strokeWidth={currentTab === 'inicio' ? 2.4 : 1.8} />
          </div>
          <span className={`text-[10px] font-semibold mt-0.5 tracking-tight ${
            currentTab === 'inicio' ? 'text-[#234B3A]' : 'text-stone-500'
          }`}>
            Inicio
          </span>
        </button>

        {/* Explorar / Categorías */}
        <button
          onClick={() => onSelectTab('explorar')}
          className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-colors ${
            currentTab === 'explorar' ? 'text-[#234B3A]' : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="Explorar categorías"
        >
          <div className={`p-1 rounded-xl transition-all ${currentTab === 'explorar' ? 'bg-[#A8C5A0]/30' : ''}`}>
            <Compass className="w-5 h-5" strokeWidth={currentTab === 'explorar' ? 2.4 : 1.8} />
          </div>
          <span className={`text-[10px] font-semibold mt-0.5 tracking-tight ${
            currentTab === 'explorar' ? 'text-[#234B3A]' : 'text-stone-500'
          }`}>
            Explorar
          </span>
        </button>

        {/* Publicar (+) prominent middle button */}
        <div className="flex-1 flex justify-center -mt-4">
          <button
            onClick={() => onSelectTab('publicar')}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="Publicar un artículo"
          >
            <div className="w-12 h-12 rounded-full bg-[#234B3A] text-white flex items-center justify-center shadow-lg shadow-[#234B3A]/30 group-hover:scale-105 active:scale-95 transition-all border-2 border-white">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-[#234B3A] mt-1">
              Publicar
            </span>
          </button>
        </div>

        {/* Solicitudes */}
        <button
          onClick={() => onSelectTab('solicitudes')}
          className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-colors relative ${
            currentTab === 'solicitudes' ? 'text-[#234B3A]' : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="Ver mis solicitudes"
        >
          <div className="relative">
            <div className={`p-1 rounded-xl transition-all ${currentTab === 'solicitudes' ? 'bg-[#A8C5A0]/30' : ''}`}>
              <ArrowLeftRight className="w-5 h-5" strokeWidth={currentTab === 'solicitudes' ? 2.4 : 1.8} />
            </div>
            {pendingRequestsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[#234B3A] font-extrabold text-[9px] flex items-center justify-center ring-2 ring-white">
                {pendingRequestsCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-semibold mt-0.5 tracking-tight ${
            currentTab === 'solicitudes' ? 'text-[#234B3A]' : 'text-stone-500'
          }`}>
            Solicitudes
          </span>
        </button>

        {/* Perfil */}
        <button
          onClick={() => onSelectTab('perfil')}
          className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-colors ${
            currentTab === 'perfil' ? 'text-[#234B3A]' : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="Ver mi perfil"
        >
          <div className={`p-1 rounded-xl transition-all ${currentTab === 'perfil' ? 'bg-[#A8C5A0]/30' : ''}`}>
            <UserIcon className="w-5 h-5" strokeWidth={currentTab === 'perfil' ? 2.4 : 1.8} />
          </div>
          <span className={`text-[10px] font-semibold mt-0.5 tracking-tight ${
            currentTab === 'perfil' ? 'text-[#234B3A]' : 'text-stone-500'
          }`}>
            Perfil
          </span>
        </button>
      </div>
    </nav>
  );
};
