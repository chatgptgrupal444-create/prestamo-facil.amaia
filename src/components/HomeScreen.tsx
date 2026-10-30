import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  PlusCircle, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Wrench, 
  PenTool, 
  Paperclip, 
  Briefcase,
  Utensils,
  GraduationCap,
  X,
  ArrowRight,
  Leaf,
  ShieldCheck,
  ChefHat,
  Compass,
  Layers,
  Flame,
  Award
} from 'lucide-react';
import { Product, Modality, User } from '../types';
import { CATEGORIES, CAREERS, GASTRO_SUBCATEGORIES, VERACRUZ_REGIONS } from '../data/mockData';

interface HomeScreenProps {
  currentUser: User | null;
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedCampus: string;
  onOpenProductDetail: (product: Product) => void;
  onOpenPublish: () => void;
  onOpenEconomy: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  products,
  selectedCategory,
  onSelectCategory,
  selectedCampus,
  onOpenProductDetail,
  onOpenPublish,
  onOpenEconomy,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModality, setSelectedModality] = useState<Modality | 'todas'>('todas');
  const [selectedCareer, setSelectedCareer] = useState<string>('Todas las carreras');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('Todas las subcategorías');
  const [selectedRegion, setSelectedRegion] = useState<string>('Todo el Estado de Veracruz');

  // Filter products considering Gastronomy primary focus, Subcategories, Veracruz coverage and search
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Career filter (Active options: Gastronomía, Arquitectura, Otras carreras)
      if (selectedCareer !== 'Todas las carreras' && prod.career !== selectedCareer) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'todas') {
        const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
        if (catObj && prod.category !== catObj.name) {
          return false;
        }
      }

      // Subcategory filter (relevant for Gastronomía)
      if (selectedSubcategory !== 'Todas las subcategorías' && prod.subcategory !== selectedSubcategory) {
        return false;
      }

      // Veracruz Region filter
      if (selectedRegion !== 'Todo el Estado de Veracruz') {
        if (prod.region && !prod.region.includes(selectedRegion.split(' (')[0])) {
          return false;
        }
        if (!prod.region && !prod.campus.includes(selectedRegion.split(' (')[0])) {
          return false;
        }
      }

      // Campus filter from header if selected
      if (selectedCampus && !selectedCampus.includes('Todo el Estado de Veracruz') && !prod.campus.includes(selectedCampus.split(' - ')[0])) {
        return false;
      }

      // Modality filter
      if (selectedModality !== 'todas' && prod.modality !== selectedModality) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = prod.title.toLowerCase().includes(query);
        const matchDesc = prod.description.toLowerCase().includes(query);
        const matchCat = prod.category.toLowerCase().includes(query);
        const matchSub = (prod.subcategory || '').toLowerCase().includes(query);
        const matchCareer = prod.career.toLowerCase().includes(query);
        const matchOwner = prod.ownerName.toLowerCase().includes(query);
        const matchCampus = prod.campus.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchCat || matchSub || matchCareer || matchOwner || matchCampus;
      }

      return true;
    });
  }, [products, selectedCategory, selectedSubcategory, selectedCampus, selectedRegion, selectedModality, selectedCareer, searchQuery]);

  // Featured gastronomy products (top rated / verified)
  const featuredGastroProducts = useMemo(() => {
    return products.filter((p) => p.career === 'Gastronomía' && p.isFeatured).slice(0, 8);
  }, [products]);

  // Icon mapping
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'PenTool': return <PenTool className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Calculator': return <Calculator className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'Paperclip': return <Paperclip className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getModalityLabel = (product: Product) => {
    switch (product.modality) {
      case 'prestamo': return 'Préstamo Gratuito';
      case 'intercambio': return 'Intercambio';
      case 'alquiler': return product.rentalPrice ? `Alquiler: ${product.rentalPrice}` : 'Alquiler Simbólico';
    }
  };

  const getModalityColor = (modality: Modality) => {
    switch (modality) {
      case 'prestamo': return 'bg-[#234B3A] text-white';
      case 'intercambio': return 'bg-[#A8C5A0] text-[#234B3A] font-bold';
      case 'alquiler': return 'bg-amber-100 text-amber-900 border border-amber-300';
    }
  };

  return (
    <div className="space-y-5 pb-16 max-w-7xl mx-auto w-full overflow-x-hidden">
      {/* Personalized Greeting & Search Hero */}
      <div className="bg-[#234B3A] text-white px-4 pt-4 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#A8C5A0] font-medium">
              <span>Red Universitaria de Veracruz</span>
              <span className="text-white/60">·</span>
              <span className="bg-[#A8C5A0]/20 text-[#A8C5A0] px-1.5 py-0.2 rounded text-[10px]">
                Estado de Veracruz
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5">
              Hola, {currentUser ? currentUser.name.split(' ')[0] : 'Estudiante'} 👋
            </h1>
          </div>
          <button
            onClick={onOpenPublish}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#A8C5A0] hover:bg-[#A8C5A0]/90 text-[#234B3A] text-xs font-bold shadow-sm transition-all active:scale-95 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar</span>
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative mt-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar batidor, báscula, escalímetro, moldes, regla T en Veracruz..."
            className="w-full pl-10 pr-9 py-2.5 bg-white text-stone-800 placeholder-stone-400 rounded-2xl text-xs sm:text-sm font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-[#A8C5A0]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Veracruz State-wide Region Quick Bar */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-[#A8C5A0] font-bold shrink-0 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            Región:
          </span>
          {VERACRUZ_REGIONS.map((reg) => {
            const isRegActive = selectedRegion === reg;
            return (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-0.5 rounded-lg whitespace-nowrap transition-colors shrink-0 text-[10px] font-medium ${
                  isRegActive 
                    ? 'bg-[#A8C5A0] text-[#234B3A] font-bold' 
                    : 'bg-white/10 text-stone-200 hover:bg-white/20'
                }`}
              >
                {reg.split(' (')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. GASTRONOMÍA: CATEGORÍA PRINCIPAL CON MÁXIMO PROTAGONISMO VISUAL       */}
      {/* ========================================================================= */}
      <div className="px-4">
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#234B3A] shadow-md bg-stone-900 group">
          {/* Main Representative Gastronomy Banner Photo */}
          <div className="aspect-16/9 w-full relative overflow-hidden">
            <img
              src="/src/assets/images/gastro_hero_banner_1793345062864.jpg"
              alt="Utensilios y equipos gastronómicos universitarios en Veracruz"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
            
            {/* Top Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="bg-[#234B3A] text-[#A8C5A0] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg border border-[#A8C5A0]/40 flex items-center gap-1 shadow-sm">
                <ChefHat className="w-3.5 h-3.5 text-[#A8C5A0]" />
                Categoría Principal
              </span>
              <span className="bg-white/90 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                35+ Artículos Disponibles
              </span>
            </div>

            {/* Banner Bottom Content */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                Gastronomía Universitaria de Veracruz
              </h2>
              <p className="text-[11px] text-stone-200 line-clamp-2 mt-0.5">
                Presta, alquila y comparte batidores, básculas de precisión, batidoras industriales, moldes de repostería y cuchillos de chef en UV, UCC, Euro y tecnológicos de Veracruz.
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => {
                    onSelectCategory('gastronomia');
                    setSelectedCareer('Gastronomía');
                    setSelectedSubcategory('Todas las subcategorías');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#A8C5A0] hover:bg-[#b8d4b0] text-[#234B3A] text-xs font-black shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Explorar Todo Gastronomía</span>
                </button>
                <span className="text-[10px] text-[#A8C5A0] font-semibold">
                  Con protocolo de higiene certificado
                </span>
              </div>
            </div>
          </div>

          {/* Subcategories Selector Bar for Gastronomy */}
          <div className="bg-white p-3 border-t border-stone-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-[#234B3A] uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#234B3A]" />
                Subcategorías de Gastronomía:
              </span>
              {selectedSubcategory !== 'Todas las subcategorías' && (
                <button
                  onClick={() => setSelectedSubcategory('Todas las subcategorías')}
                  className="text-[10px] text-[#234B3A] font-bold underline"
                >
                  Mostrar todas
                </button>
              )}
            </div>

            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {GASTRO_SUBCATEGORIES.map((sub) => {
                const isSubActive = selectedSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => {
                      onSelectCategory('gastronomia');
                      setSelectedCareer('Gastronomía');
                      setSelectedSubcategory(sub);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all shrink-0 ${
                      isSubActive
                        ? 'bg-[#234B3A] text-white shadow-xs'
                        : 'bg-[#F4F0E6] text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN DE ARTÍCULOS GASTRONÓMICOS DESTACADOS                             */}
      {/* ========================================================================= */}
      {featuredGastroProducts.length > 0 && (
        <div className="space-y-2 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Artículos Gastronómicos Destacados</span>
            </h2>
            <button
              onClick={() => {
                onSelectCategory('gastronomia');
                setSelectedCareer('Gastronomía');
              }}
              className="text-[11px] text-[#234B3A] font-bold hover:underline"
            >
              Ver catálogo gastronómico →
            </button>
          </div>

          {/* Horizontal scroll of featured culinary tools */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-0.5">
            {featuredGastroProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenProductDetail(item)}
                className="w-52 shrink-0 bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`absolute top-2 left-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-xs ${getModalityColor(item.modality)}`}>
                    {getModalityLabel(item)}
                  </span>
                  <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-medium drop-shadow-sm flex items-center gap-0.5 truncate max-w-[190px]">
                    <MapPin className="w-3 h-3 text-[#A8C5A0] shrink-0" />
                    <span>{item.campus.split(':')[0]}</span>
                  </span>
                </div>

                <div className="p-2.5 space-y-1">
                  <span className="text-[9px] font-extrabold text-[#234B3A] uppercase block truncate">
                    {item.subcategory || item.category}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#234B3A] line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-stone-500 line-clamp-1">
                    {item.description}
                  </p>
                  <div className="pt-1 border-t border-stone-100 flex items-center justify-between text-[10px]">
                    <span className="text-stone-600 font-medium truncate max-w-[100px]">{item.ownerName.split(' ')[0]}</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">Higiene ✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ARQUITECTURA: CATEGORÍA PROFESIONAL COMPLETA (20+ ARTÍCULOS)           */}
      {/* ========================================================================= */}
      <div className="px-4">
        <div 
          onClick={() => {
            onSelectCategory('arquitectura');
            setSelectedCareer('Arquitectura');
            setSelectedSubcategory('Todas las subcategorías');
          }}
          className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-xs hover:border-[#234B3A] hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
              <img
                src="/src/assets/images/arqui_tools_banner_1793345074674.jpg"
                alt="Herramientas y restiradores de Arquitectura en Veracruz"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold bg-[#F4F0E6] text-[#234B3A] px-2 py-0.5 rounded-full">
                  Arquitectura y Diseño
                </span>
                <span className="text-[10px] font-semibold text-stone-500">20+ Artículos</span>
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 group-hover:text-[#234B3A] transition-colors truncate mt-0.5">
                Escalímetros, Reglas T, Niveles Láser y Maquetas
              </h3>
              <p className="text-[11px] text-stone-500 line-clamp-1">
                Disponible entre estudiantes de Arquitectura UV (Xalapa, Córdoba, Veracruz) y facultades de diseño.
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#234B3A] shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTROS PRINCIPALES: CARRERAS VISIBLES (Ingeniería Civil RETIRADA)        */}
      {/* ========================================================================= */}
      <div className="space-y-1.5 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#234B3A]" />
            <span>Filtrar por Carrera</span>
          </h2>
          {selectedCareer !== 'Todas las carreras' && (
            <button
              onClick={() => setSelectedCareer('Todas las carreras')}
              className="text-[11px] text-[#234B3A] font-semibold underline"
            >
              Ver todas
            </button>
          )}
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CAREERS.map((careerName) => {
            const isSelected = selectedCareer === careerName;
            return (
              <button
                key={careerName}
                onClick={() => {
                  setSelectedCareer(careerName);
                  if (careerName === 'Gastronomía') {
                    onSelectCategory('gastronomia');
                  } else if (careerName === 'Arquitectura') {
                    onSelectCategory('arquitectura');
                  } else {
                    onSelectCategory('todas');
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#234B3A] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                {careerName === 'Gastronomía' && '🍳 '}
                {careerName === 'Arquitectura' && '📐 '}
                {careerName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Horizontal Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Categorías del Catálogo
          </h2>
          <span className="text-[11px] text-stone-400">Desliza para explorar</span>
        </div>
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (cat.id === 'gastronomia') {
                    setSelectedCareer('Gastronomía');
                  } else if (cat.id === 'arquitectura') {
                    setSelectedCareer('Arquitectura');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#234B3A] text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                <span className={isSelected ? 'text-[#A8C5A0]' : 'text-stone-500'}>
                  {getCategoryIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modality Filter Pills */}
      <div className="px-4">
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedModality('todas')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
              selectedModality === 'todas'
                ? 'bg-white text-[#234B3A] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todas las modalidades
          </button>
          <button
            onClick={() => setSelectedModality('prestamo')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
              selectedModality === 'prestamo'
                ? 'bg-[#234B3A] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Préstamo 100% Gratis
          </button>
          <button
            onClick={() => setSelectedModality('intercambio')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
              selectedModality === 'intercambio'
                ? 'bg-[#A8C5A0] text-[#234B3A] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Intercambio Universitario
          </button>
          <button
            onClick={() => setSelectedModality('alquiler')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
              selectedModality === 'alquiler'
                ? 'bg-amber-100 text-amber-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Alquiler Simbólico
          </button>
        </div>
      </div>

      {/* Collaborative Economy Mini Banner */}
      <div className="px-4">
        <div 
          onClick={onOpenEconomy}
          className="bg-white rounded-2xl p-3 border border-[#A8C5A0]/60 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-[#234B3A] transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#A8C5A0]/20 text-[#234B3A] flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-[#234B3A]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#234B3A] group-hover:underline">
                Economía Colaborativa en Veracruz: Lo que no usas, alguien más lo necesita
              </p>
              <p className="text-[11px] text-stone-500">
                Ahorra hasta $4,850 MXN este semestre evitando compras de materiales costosos.
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#234B3A] shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Main Catalog Header & Result Count */}
      <div className="px-4 pt-1 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-stone-900">
            Catálogo de Artículos Disponibles
          </h2>
          <p className="text-[11px] text-stone-500">
            {filteredProducts.length} artículo{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''} en Veracruz
          </p>
        </div>

        {(selectedCategory !== 'todas' || selectedCareer !== 'Todas las carreras' || selectedSubcategory !== 'Todas las subcategorías' || selectedRegion !== 'Todo el Estado de Veracruz' || selectedModality !== 'todas' || searchQuery) && (
          <button
            onClick={() => {
              onSelectCategory('todas');
              setSelectedCareer('Todas las carreras');
              setSelectedSubcategory('Todas las subcategorías');
              setSelectedRegion('Todo el Estado de Veracruz');
              setSelectedModality('todas');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-[#234B3A] hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="px-4">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-stone-800">
              No encontramos artículos con esos filtros en esta región
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Intenta cambiar la región de Veracruz, borrar el término de búsqueda o explorar el catálogo de Gastronomía o Arquitectura.
            </p>
            <button
              onClick={() => {
                onSelectCategory('gastronomia');
                setSelectedCareer('Gastronomía');
                setSelectedSubcategory('Todas las subcategorías');
                setSelectedRegion('Todo el Estado de Veracruz');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#234B3A] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Ver los 35+ utensilios de Gastronomía
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onOpenProductDetail(product)}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col group active:scale-[0.98]"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                  {/* Top Bar on Card Image */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-lg shadow-xs ${getModalityColor(product.modality)}`}>
                      {getModalityLabel(product)}
                    </span>
                    <span className="text-[10px] font-semibold bg-white/90 text-stone-700 backdrop-blur-xs px-2 py-0.5 rounded-lg shadow-xs">
                      {product.condition}
                    </span>
                  </div>

                  {/* Gradient Scrim for readability */}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2.5 text-[11px] font-medium text-white flex items-center gap-1 drop-shadow-sm">
                    <MapPin className="w-3 h-3 text-[#A8C5A0]" />
                    <span className="truncate max-w-[200px]">{product.campus.split(':')[0]}</span>
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-3.5 flex flex-col flex-1 justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-[10px] font-bold text-stone-600 bg-[#F4F0E6] px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-[#234B3A]" />
                        {product.career}
                      </span>
                      {product.modality === 'alquiler' && product.rentalPrice && (
                        <span className="text-[10px] font-black text-amber-950 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded">
                          {product.rentalPrice}
                        </span>
                      )}
                    </div>
                    
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block mt-1 font-semibold">
                      {product.subcategory || product.category}
                    </span>
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#234B3A] transition-colors line-clamp-2 mt-0.5">
                      {product.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Hygiene / Security Notice for Gastronomy */}
                  {product.hygieneProtocol && (
                    <div className="p-1.5 bg-emerald-50 rounded-lg text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">Protocolo de desinfección incluido</span>
                    </div>
                  )}

                  {/* Owner & Action Footer */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={product.ownerAvatar}
                        alt={product.ownerName}
                        className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-[#A8C5A0]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="truncate">
                        <p className="text-[11px] font-semibold text-stone-800 truncate leading-none">
                          {product.ownerName}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-stone-500">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 shrink-0" />
                          <span>{product.ownerRating.toFixed(1)}</span>
                          <span>·</span>
                          <span className="truncate">{product.campus.split(':')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductDetail(product);
                      }}
                      className="shrink-0 px-3 py-1.5 rounded-xl bg-[#234B3A] hover:bg-[#1b3d2f] text-white text-[11px] font-bold transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>Ver</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
