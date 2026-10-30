import React from 'react';
import { Wifi, Battery, Signal, Smartphone } from 'lucide-react';

interface MobileFrameProps {
  isSimulated: boolean;
  children: React.ReactNode;
  onToggleSimulator: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  isSimulated,
  children,
  onToggleSimulator,
}) => {
  if (!isSimulated) {
    return <div className="min-h-screen bg-[#F4F0E6] flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-stone-900/90 py-4 px-2 sm:px-4 flex flex-col items-center justify-center backdrop-blur-sm">
      {/* Presentation banner on top */}
      <div className="w-full max-w-sm sm:max-w-md mb-2 flex items-center justify-between text-xs text-stone-300 px-2">
        <span className="flex items-center gap-1.5 font-medium text-stone-200">
          <Smartphone className="w-3.5 h-3.5 text-[#A8C5A0]" />
          Prototipo Móvil PrestaFácil
        </span>
        <button
          onClick={onToggleSimulator}
          className="text-[11px] underline text-[#A8C5A0] hover:text-white transition-colors"
        >
          Expandir a pantalla completa
        </button>
      </div>

      {/* Phone chassis */}
      <div className="w-full max-w-[412px] h-[860px] max-h-[92vh] bg-black rounded-[46px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[4px] border-stone-800 flex flex-col relative overflow-hidden ring-1 ring-white/10">
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
          <div className="w-28 h-5 bg-black rounded-full flex items-center justify-between px-3 border border-stone-800/80">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-900 ring-1 ring-stone-800" />
            <div className="w-2 h-2 rounded-full bg-[#234B3A]/80" />
          </div>
        </div>

        {/* Screen inner bezel */}
        <div className="w-full h-full bg-[#F4F0E6] rounded-[38px] overflow-hidden flex flex-col relative">
          {/* Simulated iOS/Android Status Bar */}
          <div className="h-10 bg-[#234B3A] text-white px-6 pt-1 flex items-center justify-between text-xs font-semibold shrink-0 z-40 select-none">
            <span className="tracking-tight text-[11px]">09:41</span>
            <div className="flex items-center gap-1.5 text-stone-200">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Screen Scrollable Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col pb-16">
            {children}
          </div>

          {/* Home indicator bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-400/60 rounded-full pointer-events-none z-50" />
        </div>
      </div>
    </div>
  );
};
