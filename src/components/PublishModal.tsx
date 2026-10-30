import React, { useState } from 'react';
import { X, Upload, Camera, Check, ShieldAlert, Sparkles, PlusCircle } from 'lucide-react';
import { Product, Modality, PhysicalCondition, User } from '../types';
import { CATEGORIES, CAMPUS_LOCATIONS, CAREERS, GASTRO_SUBCATEGORIES } from '../data/mockData';

interface PublishModalProps {
  isOpen: boolean;
  currentUser: User | null;
  onClose: () => void;
  onProductPublished: (newProduct: Product) => void;
}

const PRESET_PHOTO_SAMPLES = [
  { label: 'Set Gastronomía', url: '/src/assets/images/gastro_hero_banner_1793345062864.jpg' },
  { label: 'Restirador/Planos', url: '/src/assets/images/arqui_tools_banner_1793345074674.jpg' },
  { label: 'Báscula Cocina', url: '/src/assets/images/item_bascula_cocina_1793344109878.jpg' },
  { label: 'Batidora Mano', url: '/src/assets/images/item_batidora_mano_1793344109982.jpg' },
  { label: 'Moldes Horno', url: '/src/assets/images/item_moldes_reposteria_1793344110251.jpg' },
  { label: 'Utensilios Cocina', url: '/src/assets/images/item_utensilios_cocina_1793344111841.jpg' },
  { label: 'Plantillas Dibujo', url: '/src/assets/images/item_plantillas_dibujo_1793344111607.jpg' },
  { label: 'Juego Escuadras', url: '/src/assets/images/item_escuadras_arquitectura_1793342178222.jpg' },
];

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onProductPublished,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Gastronomía y Cocina');
  const [career, setCareer] = useState(currentUser?.career || 'Gastronomía');
  const [subcategory, setSubcategory] = useState('Utensilios de cocina');
  const [modality, setModality] = useState<Modality>('prestamo');
  const [modalityNote, setModalityNote] = useState('Préstamo gratuito (1 a 14 días)');
  const [rentalPrice, setRentalPrice] = useState('$15 MXN / día');
  const [condition, setCondition] = useState<PhysicalCondition>('Como nuevo');
  const [description, setDescription] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTO_SAMPLES[0].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [campus, setCampus] = useState(CAMPUS_LOCATIONS[1]);
  const [locationDetails, setLocationDetails] = useState('Entregas en Biblioteca o Cafetería del Campus');
  const [availability, setAvailability] = useState('Disponible de inmediato este semestre');
  const [hygieneProtocol, setHygieneProtocol] = useState('');
  const [ruleText, setRuleText] = useState('Cuidar el artículo y devolverlo puntualmente en su estuche.');
  const [isPublishing, setIsPublishing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsPublishing(true);

    const finalImage = customPhotoUrl.trim() || selectedPhoto;

    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      title: title.trim(),
      category: category,
      career: career,
      subcategory: (career === 'Gastronomía' || category === 'Gastronomía y Cocina') ? subcategory : undefined,
      modality: modality,
      modalityDetails: modalityNote.trim() || (modality === 'prestamo' ? 'Préstamo gratuito' : 'Acuerdo directo'),
      rentalPrice: modality === 'alquiler' ? (rentalPrice.trim() || '$15 MXN / día') : undefined,
      condition: condition,
      description: description.trim(),
      imageUrl: finalImage,
      ownerId: currentUser?.id || 'usr_val',
      ownerName: currentUser?.name || 'Valentina Morales (Tú)',
      ownerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      ownerCareer: currentUser?.career || 'Gastronomía',
      ownerRating: currentUser?.rating || 4.9,
      campus: campus,
      locationDetails: locationDetails.trim(),
      availability: availability.trim(),
      hygieneProtocol: (category === 'Gastronomía y Cocina' || career === 'Gastronomía' || hygieneProtocol.trim())
        ? (hygieneProtocol.trim() || 'Lavar con agua tibia y jabón neutro, secar meticulosamente con paño limpio antes de la devolución.')
        : undefined,
      rules: [
        ruleText.trim() || 'Devolver en el mismo estado físico recibido.',
        'Entrega y devolución presencial mediante código seguro de PrestaFácil en campus.',
      ],
      isAvailable: true,
      createdAt: 'Justo ahora',
      viewsCount: 1,
    };

    setTimeout(() => {
      setIsPublishing(false);
      setSuccess(true);
      setTimeout(() => {
        onProductPublished(newProduct);
        setSuccess(false);
        onClose();
      }, 1000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#234B3A] text-white p-4.5 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#A8C5A0] tracking-wider block">
              Economía Colaborativa Estudiantil
            </span>
            <h2 className="text-lg font-bold">Publicar un artículo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 no-scrollbar">
          {success ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#A8C5A0]/30 text-[#234B3A] flex items-center justify-center mx-auto ring-4 ring-[#234B3A]/20">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-lg font-extrabold text-[#234B3A]">
                ¡Artículo publicado con éxito!
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tu material ya está disponible para que otros compañeros de tu campus puedan solicitarlo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Photo Selector */}
              <div>
                <label className="block font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                  <span>Fotografía del artículo</span>
                  <span className="text-[11px] text-[#234B3A] font-semibold">Selecciona una muestra o URL</span>
                </label>

                {/* Previews */}
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {PRESET_PHOTO_SAMPLES.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedPhoto(sample.url);
                        setCustomPhotoUrl('');
                      }}
                      className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                        selectedPhoto === sample.url && !customPhotoUrl
                          ? 'border-[#234B3A] ring-2 ring-[#234B3A]/20 scale-102'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={sample.url}
                        alt={sample.label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] py-0.5 truncate px-1 text-center font-medium">
                        {sample.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="url"
                    value={customPhotoUrl}
                    onChange={(e) => setCustomPhotoUrl(e.target.value)}
                    placeholder="O pega aquí una URL de imagen personalizada..."
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  Nombre del artículo
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Calculadora científica, Escalímetro, Libro de Física..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A] font-medium"
                />
              </div>

              {/* Career & Category & Physical Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    Carrera del material
                  </label>
                  <select
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A] font-semibold text-[#234B3A]"
                  >
                    {CAREERS.slice(1).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  >
                    {CATEGORIES.slice(1).map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    Estado físico
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as PhysicalCondition)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  >
                    <option value="Nuevo">Nuevo (Sin abrir o casi intacto)</option>
                    <option value="Como nuevo">Como nuevo (Excelente estado)</option>
                    <option value="Buen estado">Buen estado (Signos leves de uso)</option>
                    <option value="Uso moderado">Uso moderado (Funcional al 100%)</option>
                  </select>
                </div>
              </div>

              {/* Subcategory for Gastronomía */}
              {(career === 'Gastronomía' || category === 'Gastronomía y Cocina') && (
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <label className="block font-bold text-stone-800 text-xs">
                    Subcategoría de Gastronomía
                  </label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-[#234B3A] focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  >
                    {GASTRO_SUBCATEGORIES.slice(1).map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Protocol for Gastronomy / Special Materials */}
              {(career === 'Gastronomía' || category === 'Gastronomía y Cocina') && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5 animate-in fade-in">
                  <label className="block text-[11px] font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    Protocolo de Limpieza, Desinfección y Conservación:
                  </label>
                  <textarea
                    rows={2}
                    value={hygieneProtocol}
                    onChange={(e) => setHygieneProtocol(e.target.value)}
                    placeholder="Ej. Lavar con agua tibia y jabón neutro, secar meticulosamente con paño limpio antes de devolver."
                    className="w-full p-2 bg-white border border-emerald-200 rounded-lg text-xs text-emerald-900 focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  />
                  <p className="text-[10px] text-emerald-700">
                    PrestaFácil exige normas de bioseguridad en utensilios compartidos para el taller de cocina.
                  </p>
                </div>
              )}

              {/* Modality of Collaboration */}
              <div className="space-y-2">
                <label className="block font-bold text-stone-800">
                  Modalidad de colaboración
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModality('prestamo');
                      setModalityNote('Préstamo gratuito (1 a 14 días)');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      modality === 'prestamo'
                        ? 'bg-[#234B3A] text-white border-[#234B3A] shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span className="block font-bold">Préstamo</span>
                    <span className="text-[10px] opacity-80">100% Gratis</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModality('intercambio');
                      setModalityNote('Intercambio temporal por material afín');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      modality === 'intercambio'
                        ? 'bg-[#A8C5A0] text-[#234B3A] border-[#A8C5A0] font-bold shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span className="block font-bold">Intercambio</span>
                    <span className="text-[10px] opacity-80">Trueque temporal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModality('alquiler');
                      setModalityNote('Alquiler simbólico: $15 MXN / día');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      modality === 'alquiler'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span className="block font-bold">Alquiler</span>
                    <span className="text-[10px] opacity-80">Tarifa simbólica</span>
                  </button>
                </div>

                {modality === 'alquiler' && (
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 space-y-1">
                    <label className="block text-[11px] font-bold text-amber-900">
                      Precio de alquiler simbólico (MXN):
                    </label>
                    <input
                      type="text"
                      value={rentalPrice}
                      onChange={(e) => setRentalPrice(e.target.value)}
                      placeholder="Ej. $15 MXN / día o $25 MXN / semana"
                      className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                    />
                  </div>
                )}

                <input
                  type="text"
                  value={modalityNote}
                  onChange={(e) => setModalityNote(e.target.value)}
                  placeholder="Detalles de la modalidad (ej. Préstamo de 7 días, o qué buscas a cambio)"
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  Descripción y especificaciones
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explica qué incluye, edición, funciones, o recomendaciones de uso..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                />
              </div>

              {/* Location & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    Campus de entrega
                  </label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  >
                    {CAMPUS_LOCATIONS.slice(1).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    Disponibilidad
                  </label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="Ej. Disponible de lunes a viernes"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  />
                </div>
              </div>

              {/* Rules / Care conditions */}
              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  Condiciones de cuidado para el préstamo
                </label>
                <input
                  type="text"
                  value={ruleText}
                  onChange={(e) => setRuleText(e.target.value)}
                  placeholder="Ej. Cuidar con funda, no mojar, devolver antes del examen..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="w-full h-12 rounded-xl bg-[#234B3A] hover:bg-[#1b3d2f] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#234B3A]/20 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isPublishing ? 'Publicando en tu campus...' : 'Publicar artículo en PrestaFácil'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
