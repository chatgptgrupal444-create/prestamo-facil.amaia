import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Edit3, 
  Package, 
  RotateCcw, 
  Leaf, 
  MapPin, 
  Award,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Lock
} from 'lucide-react';
import { User, Product, Review } from '../types';

interface ProfileScreenProps {
  currentUser: User | null;
  userProducts: Product[];
  reviews: Review[];
  onOpenProductDetail: (product: Product) => void;
  onOpenEconomy: () => void;
  onUpdateProfile: (updatedUser: User) => void;
  onOpenAdmin?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentUser,
  userProducts,
  reviews,
  onOpenProductDetail,
  onOpenEconomy,
  onUpdateProfile,
  onOpenAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'articulos' | 'valoraciones'>('articulos');
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [career, setCareer] = useState(currentUser?.career || '');
  const [campus, setCampus] = useState(currentUser?.campus || '');

  if (!currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentUser,
      name: name.trim() || currentUser.name,
      career: career.trim() || currentUser.career,
      campus: campus.trim() || currentUser.campus,
    });
    setShowEditModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-4 px-4 py-4 pb-12">
      {/* Top Profile Card */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full object-cover ring-3 ring-[#234B3A]/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 p-1 bg-[#234B3A] text-white rounded-full ring-2 ring-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8C5A0]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-extrabold text-stone-900 leading-tight">
                  {currentUser.name}
                </h1>
              </div>
              <p className="text-xs font-semibold text-[#234B3A]">
                {currentUser.career} · {currentUser.university}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{currentUser.campus}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setName(currentUser.name);
              setCareer(currentUser.career);
              setCampus(currentUser.campus);
              setShowEditModal(true);
            }}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            title="Editar perfil"
            aria-label="Editar perfil"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="flex items-center gap-2 p-2 bg-[#F4F0E6] rounded-xl text-xs text-stone-700">
          <Award className="w-4 h-4 text-[#234B3A] shrink-0" />
          <span className="font-semibold text-[#234B3A]">Carnet Universitario Verificado</span>
          <span className="text-stone-300">·</span>
          <span className="text-[11px] text-stone-500">Miembro desde {currentUser.memberSince}</span>
        </div>

        {/* 4 Economy & Collaboration Metric Badges */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-100 text-center">
          <div className="p-2 bg-stone-50 rounded-xl">
            <span className="block text-sm sm:text-base font-extrabold text-[#234B3A] tabular-nums">
              {currentUser.completedLoans}
            </span>
            <span className="text-[10px] font-medium text-stone-500">Préstamos hechos</span>
          </div>

          <div className="p-2 bg-stone-50 rounded-xl">
            <span className="block text-sm sm:text-base font-extrabold text-amber-600 flex items-center justify-center gap-1 tabular-nums">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {currentUser.rating.toFixed(1)}
            </span>
            <span className="text-[10px] font-medium text-stone-500">
              {currentUser.totalReviews} valoraciones
            </span>
          </div>

          <div 
            onClick={onOpenEconomy}
            className="p-2 bg-[#A8C5A0]/20 rounded-xl cursor-pointer hover:bg-[#A8C5A0]/30 transition-colors"
          >
            <span className="block text-sm sm:text-base font-extrabold text-[#234B3A] tabular-nums">
              ${currentUser.savingsGenerated.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-[#234B3A] flex items-center justify-center gap-0.5">
              <Leaf className="w-2.5 h-2.5 text-[#234B3A]" />
              Ahorro MXN
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Tab Selector */}
      <div className="grid grid-cols-2 p-1 bg-stone-200/80 rounded-2xl">
        <button
          onClick={() => setActiveTab('articulos')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'articulos' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Mis Artículos Publicados ({userProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('valoraciones')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'valoraciones' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Reseñas y Confianza ({reviews.length})
        </button>
      </div>

      {/* Tab 1: Mis Artículos Publicados */}
      {activeTab === 'articulos' && (
        <div className="space-y-3">
          {userProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-stone-200">
              <Package className="w-8 h-8 text-stone-300 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-stone-700">No tienes artículos publicados aún</p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Comparte una calculadora, escuadras o libros que no estés usando hoy.
              </p>
            </div>
          ) : (
            userProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenProductDetail(prod)}
                className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex items-center justify-between gap-3 hover:border-stone-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-[#234B3A] uppercase">
                      {prod.category} · {prod.modality}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#234B3A] truncate">
                      {prod.title}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Estado: <strong className="text-stone-700">{prod.condition}</strong> · {prod.availability}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Valoraciones y Confianza */}
      {activeTab === 'valoraciones' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <div>
                <p className="text-xs font-extrabold text-stone-900">
                  {currentUser.rating.toFixed(1)} de promedio estudiantil
                </p>
                <p className="text-[11px] text-stone-500">100% de entregas y devoluciones a tiempo</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              Estudiante Confiable
            </span>
          </div>

          <div className="space-y-2.5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{rev.authorName}</h4>
                      <p className="text-[10px] text-stone-400">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(rev.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  "{rev.comment}"
                </p>

                <div className="text-[10px] text-stone-500">
                  Artículo prestado: <span className="font-semibold text-stone-700">{rev.itemName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Administrative Access Portal for Staff/Moderators */}
      {onOpenAdmin && (
        <div className="pt-2">
          <button
            onClick={onOpenAdmin}
            className="w-full p-3.5 rounded-2xl bg-stone-900 text-white flex items-center justify-between hover:bg-black transition-all group shadow-sm border border-stone-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center text-[#A8C5A0]">
                <Lock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold block text-white flex items-center gap-1.5">
                  Panel Administrativo PrestaFácil
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">Privado</span>
                </span>
                <span className="text-[10px] text-stone-400">Control de inventario, auditoría de préstamos y métricas de Veracruz</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-1 text-white transition-all" />
          </button>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="text-sm font-bold text-[#234B3A]">Editar mi perfil</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Carrera universitaria</label>
                <select
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A] text-xs font-medium"
                >
                  <option value="Gastronomía">Gastronomía</option>
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Otras carreras">Otras carreras</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Campus en Veracruz</label>
                <input
                  type="text"
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A] text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#234B3A] hover:bg-[#1b3d2f] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
