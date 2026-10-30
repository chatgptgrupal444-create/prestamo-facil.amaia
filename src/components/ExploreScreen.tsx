import React, { useState } from 'react';
import { 
  Utensils, 
  PenTool, 
  BookOpen, 
  Calculator, 
  Wrench, 
  Paperclip, 
  Briefcase, 
  Sparkles, 
  ChevronRight, 
  Layers, 
  ChefHat, 
  GraduationCap, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES, GASTRO_SUBCATEGORIES } from '../data/mockData';
import { Product } from '../types';

interface ExploreScreenProps {
  products: Product[];
  onSelectCategoryAndGoHome: (categoryId: string) => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenEconomy: () => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  products,
  onSelectCategoryAndGoHome,
  onOpenProductDetail,
  onOpenEconomy,
}) => {
  // Requirement: Cuando un usuario entre a Explorar, Gastronomía debe aparecer seleccionada inicialmente.
  const [activeTab, setActiveTab] = useState<'gastronomia' | 'arquitectura' | 'todas'>('gastronomia');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('Todas las subcategorías');

  const gastroProducts = products.filter((p) => p.career === 'Gastronomía');
  const arquiProducts = products.filter((p) => p.career === 'Arquitectura');

  const filteredExploreProducts = activeTab === 'gastronomia'
    ? gastroProducts.filter((p) => activeSubcategory === 'Todas las subcategorías' || p.subcategory === activeSubcategory)
    : activeTab === 'arquitectura'
    ? arquiProducts
    : products;

  const getSubcategoryCount = (subName: string) => {
    if (subName === 'Todas las subcategorías') return gastroProducts.length;
    return gastroProducts.filter((p) => p.subcategory === subName).length;
  };

  return (
    <div className="space-y-5 px-3 sm:px-4 lg:px-6 py-4 pb-16 max-w-7xl mx-auto w-full overflow-x-hidden">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[#234B3A] font-extrabold uppercase tracking-wider">
          <ChefHat className="w-4 h-4 text-[#234B3A]" />
          <span>Explorador Universitario · Veracruz</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#234B3A] mt-0.5">
          Directorio de Especialidades
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Explora los catálogos principales organizados por subcategoría técnica y campus en Veracruz.
        </p>
      </div>

      {/* Main Mode Toggle: GASTRONOMÍA (#1) y ARQUITECTURA (#2) */}
      <div className="grid grid-cols-2 p-1 bg-stone-200/80 rounded-2xl">
        <button
          onClick={() => {
            setActiveTab('gastronomia');
            setActiveSubcategory('Todas las subcategorías');
          }}
          className={`py-2 px-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'gastronomia'
              ? 'bg-[#234B3A] text-white shadow-sm'
              : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Gastronomía ({gastroProducts.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('arquitectura');
            setActiveSubcategory('Todas las subcategorías');
          }}
          className={`py-2 px-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'arquitectura'
              ? 'bg-[#234B3A] text-white shadow-sm'
              : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Arquitectura ({arquiProducts.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. SECCIÓN ACTIVA: GASTRONOMÍA                                           */}
      {/* ========================================================================= */}
      {activeTab === 'gastronomia' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          {/* Gastronomy Banner Card */}
          <div className="bg-[#234B3A] text-white rounded-3xl p-4 shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-1.5">
              <span className="text-[10px] font-extrabold text-[#A8C5A0] uppercase tracking-wider block">
                35+ Artículos Gastronómicos Reutilizables
              </span>
              <h2 className="text-base font-black">
                Utensilios, Equipos y Repostería
              </h2>
              <p className="text-xs text-stone-200 max-w-sm">
                Catálogo especializado para estudiantes de gastronomía en Veracruz, Boca del Río, Xalapa, Córdoba y Cuitláhuac.
              </p>
              <button
                onClick={() => onSelectCategoryAndGoHome('gastronomia')}
                className="mt-2 px-3 py-1.5 bg-[#A8C5A0] text-[#234B3A] rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-xs hover:bg-[#b8d4b0] transition-colors"
              >
                <span>Ver en Catálogo Principal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#A8C5A0]/10 pointer-events-none" />
          </div>

          {/* Subcategories Horizontal Filter Bar */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#234B3A]" />
              <span>Subcategorías Oficiales:</span>
            </h3>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {GASTRO_SUBCATEGORIES.map((sub) => {
                const count = getSubcategoryCount(sub);
                const isSelected = activeSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setActiveSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#234B3A] text-white shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    <span>{sub}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Items Preview Grid in this subcategory */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">
                Mostrando {filteredExploreProducts.length} artículo{filteredExploreProducts.length !== 1 ? 's' : ''}
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Protocolos Sanitarios Incluidos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredExploreProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenProductDetail(item)}
                  className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs hover:border-[#234B3A] transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-extrabold text-[#234B3A] uppercase block truncate">
                        {item.subcategory || item.category}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#234B3A] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 truncate mt-0.5">
                        {item.campus.split(':')[0]} · <span className="font-semibold text-stone-700">{item.condition}</span>
                      </p>
                      {item.modality === 'alquiler' && item.rentalPrice && (
                        <span className="text-[9px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-1 rounded inline-block mt-0.5">
                          {item.rentalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#234B3A] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SECCIÓN ACTIVA: ARQUITECTURA                                          */}
      {/* ========================================================================= */}
      {activeTab === 'arquitectura' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          <div className="bg-[#234B3A] text-white rounded-3xl p-4 shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-1.5">
              <span className="text-[10px] font-extrabold text-[#A8C5A0] uppercase tracking-wider block">
                20 Artículos de Dibujo, Medición y Maquetas
              </span>
              <h2 className="text-base font-black">
                Herramientas de Arquitectura y Urbanismo
              </h2>
              <p className="text-xs text-stone-200 max-w-sm">
                Reglas T, escalímetros, compases micrométricos, niveles láser, tableros A3 y herramientas para estudiantes en UV Xalapa, Córdoba y Veracruz.
              </p>
              <button
                onClick={() => onSelectCategoryAndGoHome('arquitectura')}
                className="mt-2 px-3 py-1.5 bg-[#A8C5A0] text-[#234B3A] rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-xs hover:bg-[#b8d4b0] transition-colors"
              >
                <span>Ver en Catálogo Principal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">
                Mostrando {arquiProducts.length} artículos profesionales
              </span>
              <span className="text-[10px] font-bold text-stone-500">
                Disponibles para entrega en campus
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {arquiProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenProductDetail(item)}
                  className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs hover:border-[#234B3A] transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-extrabold text-[#234B3A] uppercase block truncate">
                        {item.subcategory || item.category}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#234B3A] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 truncate mt-0.5">
                        {item.campus.split(':')[0]} · <span className="font-semibold text-stone-700">{item.condition}</span>
                      </p>
                      {item.modality === 'alquiler' && item.rentalPrice && (
                        <span className="text-[9px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-1 rounded inline-block mt-0.5">
                          {item.rentalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#234B3A] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Callout for Veracruz Students */}
      <div className="bg-[#F4F0E6] text-stone-800 p-4 rounded-3xl border border-stone-300 space-y-2 text-center">
        <h4 className="text-xs font-black text-[#234B3A] uppercase tracking-wider flex items-center justify-center gap-1">
          <GraduationCap className="w-4 h-4 text-[#234B3A]" />
          Red Colaborativa Estudiantil de Veracruz
        </h4>
        <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
          ¿Tienes una báscula, batidor, juego de escuadras o escalímetro en tu casillero? Puedes ponerlo a disposición de un compañero de tu campus en menos de 1 minuto.
        </p>
        <button
          onClick={onOpenEconomy}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#234B3A] underline hover:text-[#1b3d2f] pt-1"
        >
          <span>Conoce el impacto económico y sustentable en Veracruz</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
