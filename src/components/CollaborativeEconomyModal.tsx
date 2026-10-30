import React, { useState } from 'react';
import { 
  X, 
  Leaf, 
  Coins, 
  RefreshCw, 
  Users, 
  TrendingDown, 
  Sparkles, 
  Video, 
  Clock, 
  Award,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface CollaborativeEconomyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollaborativeEconomyModal: React.FC<CollaborativeEconomyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [itemsSharedCount, setItemsSharedCount] = useState(4);
  const [activeTab, setActiveTab] = useState<'concepto' | 'calculadora' | 'guion_video'>('concepto');

  if (!isOpen) return null;

  // Economy calculation formula:
  // Average textbook or specialized tool cost in MXN = $650 MXN
  // Average carbon footprint avoided per reused physical school supply = ~2.2 kg CO2
  const estimatedSavings = itemsSharedCount * 650;
  const estimatedCo2 = (itemsSharedCount * 2.2).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#234B3A] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#A8C5A0] text-[#234B3A] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#A8C5A0] uppercase tracking-wider block">
                Impacto y Sustentabilidad
              </span>
              <h2 className="text-base sm:text-lg font-extrabold">Economía Colaborativa</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="p-3 bg-stone-100 border-b border-stone-200 grid grid-cols-3 gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('concepto')}
            className={`py-2 px-1 rounded-xl transition-all ${
              activeTab === 'concepto' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ¿Por qué compartir?
          </button>
          <button
            onClick={() => setActiveTab('calculadora')}
            className={`py-2 px-1 rounded-xl transition-all ${
              activeTab === 'calculadora' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Calculadora de Ahorro
          </button>
          <button
            onClick={() => setActiveTab('guion_video')}
            className={`py-2 px-1 rounded-xl transition-all ${
              activeTab === 'guion_video' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Guión Video Noticia
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {/* TAB 1: Concepto */}
          {activeTab === 'concepto' && (
            <div className="space-y-4 text-xs">
              {/* Slogan Banner */}
              <div className="bg-[#234B3A] text-white p-4 rounded-2xl text-center space-y-1">
                <p className="text-[11px] text-[#A8C5A0] font-bold uppercase tracking-widest">
                  El Manifiesto de PrestaFácil
                </p>
                <h3 className="text-base sm:text-lg font-black italic">
                  "Lo que no usas, alguien más lo necesita"
                </h3>
                <p className="text-xs text-stone-200 pt-1">
                  No compres lo que solo usarás un semestre. La solución ya está en los casilleros y mochilas de tu universidad.
                </p>
              </div>

              {/* 4 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#F4F0E6] rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#234B3A] font-bold">
                    <Coins className="w-4 h-4" />
                    <span>Reducción de Gastos</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    Un estudiante gasta hasta $4,500 MXN al año en útiles, libros y herramientas que solo usa 3 semanas. Prestando e intercambiando, el gasto se reduce hasta un 70%.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F4F0E6] rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#234B3A] font-bold">
                    <RefreshCw className="w-4 h-4" />
                    <span>Aprovechamiento Real</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    Activamos los recursos que permanecen ociosos en cajones: escuadras, calculadoras científicas, flexómetros y batas de laboratorio.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F4F0E6] rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#234B3A] font-bold">
                    <Leaf className="w-4 h-4" />
                    <span>Consumo Responsable</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    Evitamos la compra masiva de plásticos y papel innecesarios, alargando el ciclo de vida de los materiales escolares.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F4F0E6] rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#234B3A] font-bold">
                    <Users className="w-4 h-4" />
                    <span>Comunidad Solidaria</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    Genera lazos de confianza entre estudiantes de diferentes carreras y semestres dentro del mismo campus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Calculadora de Ahorro e Impacto */}
          {activeTab === 'calculadora' && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#F4F0E6] p-4 rounded-2xl border border-stone-200 space-y-2">
                <h3 className="font-bold text-stone-900 text-sm">
                  Simulador de Impacto Universitario
                </h3>
                <p className="text-stone-600">
                  ¿Cuántos materiales o libros estimas compartir o pedir prestados este ciclo?
                </p>

                {/* Slider */}
                <div className="pt-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#234B3A] mb-1.5">
                    <span>Materiales en circulación:</span>
                    <span className="text-sm bg-white px-3 py-1 rounded-lg border border-stone-300 font-extrabold">
                      {itemsSharedCount} artículos
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={itemsSharedCount}
                    onChange={(e) => setItemsSharedCount(parseInt(e.target.value, 10))}
                    className="w-full accent-[#234B3A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>1 artículo</span>
                    <span>8 artículos</span>
                    <span>15 artículos</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Metrics Output */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                    Dinero Ahorrado Estimado
                  </span>
                  <span className="text-2xl font-black text-emerald-800 tabular-nums">
                    ${estimatedSavings.toLocaleString()} MXN
                  </span>
                  <p className="text-[10px] text-emerald-700">
                    Aproximadamente ${(estimatedSavings / itemsSharedCount).toFixed(0)} por cada artículo prestado.
                  </p>
                </div>

                <div className="p-4 bg-[#234B3A]/10 rounded-2xl border border-[#234B3A]/20 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#234B3A] block">
                    Huella de CO2 Evitada
                  </span>
                  <span className="text-2xl font-black text-[#234B3A] tabular-nums">
                    {estimatedCo2} kg
                  </span>
                  <p className="text-[10px] text-[#234B3A]/80">
                    Equivalente a plantar {(itemsSharedCount * 0.4).toFixed(1)} árboles en tu ciudad.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600">
                💡 <em>Dato:</em> Si tan solo el 20% de los estudiantes de tu facultad prestara un libro o calculadora al semestre, la comunidad universitaria ahorraría más de <strong>$250,000 MXN</strong>.
              </div>
            </div>
          )}

          {/* TAB 3: Guión para Video de Noticia (45s - 90s) */}
          {activeTab === 'guion_video' && (
            <div className="space-y-3.5 text-xs">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                  <Video className="w-4 h-4" />
                  <span>Estructura para tu Video de Noticia (1:15 min aprox)</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Usa este guión mientras grabas la pantalla del prototipo para tu entrega universitaria:
                </p>
              </div>

              {/* Segment 1 */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-[#234B3A] font-bold">
                  <span>1. El Problema (0:00 - 0:20)</span>
                  <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded">20 seg</span>
                </div>
                <p className="text-stone-700 italic">
                  "¿Sabías que un estudiante universitario gasta miles de pesos al año en libros y herramientas que terminará usando solo unas semanas? Al final del semestre, calculadoras y compases quedan arrumbados en cajones."
                </p>
                <p className="text-[10px] text-stone-500 font-semibold">
                  Acción en pantalla: Mostrar la pantalla de bienvenida y el eslogan.
                </p>
              </div>

              {/* Segment 2 */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-[#234B3A] font-bold">
                  <span>2. La Solución PrestaFácil (0:21 - 0:45)</span>
                  <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded">25 seg</span>
                </div>
                <p className="text-stone-700 italic">
                  "Para resolver esto nace PrestaFácil, una aplicación móvil de economía colaborativa que conecta a estudiantes del mismo campus para prestar, intercambiar o alquilar útiles de manera rápida y segura."
                </p>
                <p className="text-[10px] text-stone-500 font-semibold">
                  Acción en pantalla: Navegar por el catálogo, filtrar categorías (Calculadoras, Escuadras) y mostrar el campus.
                </p>
              </div>

              {/* Segment 3 */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-[#234B3A] font-bold">
                  <span>3. Seguridad y Funcionamiento (0:46 - 1:10)</span>
                  <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded">25 seg</span>
                </div>
                <p className="text-stone-700 italic">
                  "Hacerlo es tan sencillo como seleccionar el artículo, pactar la entrega en un punto seguro del campus como la biblioteca, y validar la entrega con un código PIN seguro entre compañeros."
                </p>
                <p className="text-[10px] text-stone-500 font-semibold">
                  Acción en pantalla: Abrir el detalle del artículo y la pantalla de solicitudes con el código PIN.
                </p>
              </div>

              {/* Segment 4 */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-[#234B3A] font-bold">
                  <span>4. Cierre y Llamado a la Acción (1:11 - 1:25)</span>
                  <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded">15 seg</span>
                </div>
                <p className="text-stone-700 italic">
                  "PrestaFácil: porque lo que no usas, alguien más lo necesita. Construyamos una universidad más sustentable y solidaria."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#234B3A] hover:bg-[#1b3d2f] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
