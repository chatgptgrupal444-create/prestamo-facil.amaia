import React, { useState } from 'react';
import { 
  Utensils, 
  PenTool, 
  BookOpen, 
  Calculator, 
  Wrench, 
  Paperclip, 
  Package 
} from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  category?: string;
  aspectRatio?: '4/3' | '1/1' | '16/10' | 'video' | 'auto';
  loading?: 'lazy' | 'eager';
}

// Category-specific fallback local images and icons
const CATEGORY_FALLBACKS: Record<string, { img: string; icon: React.ElementType; label: string }> = {
  'gastronomia': {
    img: '/images/products/batidor_globo.jpg',
    icon: Utensils,
    label: 'Gastronomía y Cocina',
  },
  'arquitectura': {
    img: '/images/products/escalimetro_triangular.jpg',
    icon: PenTool,
    label: 'Arquitectura y Diseño',
  },
  'libros': {
    img: '/images/products/libro_mecanica_materiales.jpg',
    icon: BookOpen,
    label: 'Libros y Apuntes',
  },
  'calculadoras': {
    img: '/images/products/calculadora_casio_classwiz.jpg',
    icon: Calculator,
    label: 'Calculadoras',
  },
  'herramientas': {
    img: '/images/products/flexometro_5m_truper.jpg',
    icon: Wrench,
    label: 'Herramientas',
  },
  'escolar': {
    img: '/images/products/kit_lapices_dibujo.jpg',
    icon: Paperclip,
    label: 'Material Escolar',
  },
};

export const normalizeImageUrl = (url?: string): string => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return '/images/products/batidor_globo.jpg';
  }
  const clean = url.trim();
  // Rewrite legacy Vite /src/assets/images paths to production /images/products/ paths
  if (clean.startsWith('/src/assets/images/')) {
    return clean.replace('/src/assets/images/', '/images/products/');
  }
  return clean;
};

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  category = 'gastronomia',
  aspectRatio = '4/3',
  loading = 'lazy',
}) => {
  const normalizedSrc = normalizeImageUrl(src);
  const [currentSrc, setCurrentSrc] = useState<string>(normalizedSrc);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Determine category key
  const catKey = (category || '').toLowerCase();
  const matchedCategory = Object.keys(CATEGORY_FALLBACKS).find((k) => catKey.includes(k)) || 'gastronomia';
  const categoryConfig = CATEGORY_FALLBACKS[matchedCategory] || CATEGORY_FALLBACKS['gastronomia'];

  // Handle image load error: first fallback to category local image, then to vector banner
  const handleError = () => {
    if (!hasError && currentSrc !== categoryConfig.img) {
      setCurrentSrc(categoryConfig.img);
      setHasError(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '1/1':
        return 'aspect-square';
      case '16/10':
        return 'aspect-[16/10]';
      case 'video':
        return 'aspect-video';
      case 'auto':
        return '';
      case '4/3':
      default:
        return 'aspect-[4/3]';
    }
  };

  const IconComponent = categoryConfig.icon || Package;

  return (
    <div className={`relative w-full overflow-hidden bg-stone-100 ${getAspectClass()} ${containerClassName}`}>
      {/* Shimmer Skeleton Placeholder while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse z-0" />
      )}

      {/* Render Image or Graceful Category Vector Fallback */}
      {!hasError || currentSrc === categoryConfig.img ? (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
        />
      ) : (
        /* Branded Fallback View (Never shows an empty space or broken image) */
        <div className="w-full h-full bg-[#234B3A]/10 flex flex-col items-center justify-center p-3 text-center">
          <div className="w-10 h-10 rounded-2xl bg-[#234B3A] text-[#A8C5A0] flex items-center justify-center mb-1.5 shadow-xs">
            <IconComponent className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-[#234B3A] tracking-wider truncate max-w-full px-2">
            {categoryConfig.label}
          </span>
          <span className="text-[11px] font-bold text-stone-700 line-clamp-1 mt-0.5 px-2">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
