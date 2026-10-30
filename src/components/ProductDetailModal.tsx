import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Send, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { Product, LoanRequest, User } from '../types';
import { SAFE_MEETING_POINTS } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmit: (request: LoanRequest) => void;
  onOpenSafetyModal: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currentUser,
  isOpen,
  onClose,
  onRequestSubmit,
  onOpenSafetyModal,
}) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [returnDays, setReturnDays] = useState('7');
  const [userMessage, setUserMessage] = useState('');
  const [meetingPoint, setMeetingPoint] = useState(SAFE_MEETING_POINTS[0]);
  const [acceptConditions, setAcceptConditions] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    // Calculate dates
    const today = new Date();
    const returnDateObj = new Date();
    returnDateObj.setDate(today.getDate() + parseInt(returnDays, 10));

    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const startDateStr = today.toLocaleDateString('es-ES', options);
    const returnDateStr = returnDateObj.toLocaleDateString('es-ES', options);

    // Random PIN
    const randomPin = `PF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: LoanRequest = {
      id: `req_${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productImage: product.imageUrl,
      category: product.category,
      modality: product.modality,
      borrowerId: currentUser.id,
      borrowerName: currentUser.name,
      borrowerAvatar: currentUser.avatar,
      borrowerCareer: currentUser.career,
      ownerId: product.ownerId,
      ownerName: product.ownerName,
      requestDate: 'Hoy, hace un momento',
      startDate: startDateStr,
      returnDate: returnDateStr,
      status: 'pendiente',
      message: userMessage.trim() || `Hola ${product.ownerName}, me interesa este artículo para mis entregas de este semestre. ¡Gracias!`,
      securityCode: randomPin,
      safeMeetingPoint: meetingPoint,
      isIncomingForCurrentUser: false,
    };

    setIsSuccess(true);
    setTimeout(() => {
      onRequestSubmit(newRequest);
      setIsSuccess(false);
      setShowRequestForm(false);
      onClose();
    }, 1200);
  };

  const getModalityBadge = () => {
    switch (product.modality) {
      case 'prestamo':
        return { label: 'Préstamo Gratuito', color: 'bg-[#234B3A] text-white' };
      case 'intercambio':
        return { label: 'Intercambio Universitario', color: 'bg-[#A8C5A0] text-[#234B3A] font-bold' };
      case 'alquiler':
        return { label: 'Alquiler Simbólico', color: 'bg-amber-100 text-amber-900 border border-amber-300' };
    }
  };

  const modalityBadge = getModalityBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="relative bg-[#234B3A] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold text-[#A8C5A0] tracking-wider">
              {product.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar detalle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
          {/* Main Photo Hero */}
          <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-stone-100 border border-stone-200">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm ${modalityBadge.color}`}>
                {modalityBadge.label}
              </span>
              <span className="text-xs font-semibold bg-white/95 text-stone-800 px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-xs">
                Estado: {product.condition}
              </span>
            </div>
          </div>

          {/* Title & Modality Info */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-snug">
              {product.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Show price tag strictly when modality is alquiler */}
              {product.modality === 'alquiler' && product.rentalPrice ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs">
                  <span>Precio de alquiler:</span>
                  <span className="text-sm font-black text-amber-950">{product.rentalPrice}</span>
                </div>
              ) : product.modality === 'prestamo' ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-[#234B3A]/10 text-[#234B3A] font-bold text-xs">
                  Préstamo 100% Gratuito · Sin costo
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-[#A8C5A0]/25 text-[#234B3A] font-bold text-xs">
                  Intercambio Temporal · Sin costo monetario
                </span>
              )}

              {product.modalityDetails && product.modality !== 'alquiler' && (
                <span className="text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded-xl">
                  {product.modalityDetails}
                </span>
              )}
            </div>
          </div>

          {/* Owner Profile Badge */}
          <div className="bg-[#F4F0E6] rounded-2xl p-3.5 border border-stone-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={product.ownerAvatar}
                alt={product.ownerName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#234B3A]/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-stone-900">{product.ownerName}</h4>
                  <span className="inline-flex items-center gap-0.5 text-[10px] bg-[#A8C5A0]/30 text-[#234B3A] font-semibold px-1.5 py-0.2 rounded-md">
                    <UserCheck className="w-3 h-3 text-[#234B3A]" />
                    Verificado
                  </span>
                </div>
                <p className="text-[11px] text-stone-600">{product.ownerCareer}</p>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-800">{product.ownerRating.toFixed(1)}</span>
                  <span>·</span>
                  <span>Responde en menos de 15 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Descripción del artículo
              </h4>
              <div className="flex items-center gap-1.5">
                {product.subcategory && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#A8C5A0]/30 text-[#234B3A]">
                    {product.subcategory}
                  </span>
                )}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#234B3A]/10 text-[#234B3A]">
                  {product.career || 'Interdisciplinaria'}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
              {product.description}
            </p>
          </div>

          {/* Cross-Career Open Loan Banner for Veracruz */}
          <div className="p-2.5 bg-[#A8C5A0]/20 rounded-xl border border-[#A8C5A0]/50 flex items-center gap-2 text-[11px] text-[#234B3A]">
            <Sparkles className="w-4 h-4 text-[#234B3A] shrink-0" />
            <p>
              <strong>Red Universitaria de Veracruz:</strong> Cualquier estudiante de {currentUser?.career ? currentUser.career : 'la red'} puede solicitar este material en los campus del estado de Veracruz.
            </p>
          </div>

          {/* Hygiene Protocol for Gastronomy and Specialized Utensils */}
          {product.hygieneProtocol && (
            <div className="bg-emerald-50/90 rounded-2xl p-3.5 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-emerald-600 text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <h4 className="text-xs font-extrabold text-emerald-950">
                  Protocolo de Higiene, Limpieza y Desinfección
                </h4>
              </div>
              <p className="text-xs text-emerald-900 bg-white/80 p-2.5 rounded-xl border border-emerald-100 leading-relaxed">
                {product.hygieneProtocol}
              </p>
              <p className="text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                El solicitante se compromete a devolver este utensilio sanitizado, seco y en condiciones óptimas de conservación.
              </p>
            </div>
          )}

          {/* Location & Availability Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#234B3A]" />
                Ubicación de entrega
              </span>
              <p className="text-stone-800 font-semibold">{product.campus.split(' - ')[0]}</p>
              <p className="text-[11px] text-stone-500">{product.locationDetails}</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-600 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#234B3A]" />
                Disponibilidad
              </span>
              <p className="text-stone-800 font-semibold">{product.availability}</p>
              <p className="text-[11px] text-stone-500">Publicado {product.createdAt}</p>
            </div>
          </div>

          {/* Loan Rules & Return Conditions */}
          <div className="bg-[#F4F0E6]/80 rounded-2xl p-3.5 border border-stone-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#234B3A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#234B3A]" />
                Condiciones de préstamo y devolución
              </h4>
              <button
                onClick={onOpenSafetyModal}
                className="text-[10px] text-[#234B3A] underline font-semibold hover:text-[#1b3d2f]"
              >
                Puntos seguros en campus
              </button>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {product.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#234B3A] font-bold text-xs mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-stone-600">
                <span className="text-[#234B3A] font-bold text-xs mt-0.5">•</span>
                <span>Entrega y devolución presencial mediante código PIN seguro.</span>
              </li>
            </ul>
          </div>

          {/* Interactive Request Form (Sub-Drawer) */}
          {showRequestForm && (
            <div className="p-4 bg-white rounded-2xl border-2 border-[#234B3A] space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h4 className="text-xs font-extrabold text-[#234B3A] flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-[#234B3A]" />
                  Completar solicitud a {product.ownerName}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="text-stone-400 hover:text-stone-600 text-xs"
                >
                  Cancelar
                </button>
              </div>

              {isSuccess ? (
                <div className="p-4 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                  <p className="font-bold text-[#234B3A] text-sm">¡Solicitud enviada con éxito!</p>
                  <p className="text-xs text-stone-500">
                    Se ha generado tu código de seguridad. Revisa la pestaña de "Solicitudes".
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      ¿Por cuántos días necesitas el artículo?
                    </label>
                    <select
                      value={returnDays}
                      onChange={(e) => setReturnDays(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                    >
                      <option value="3">3 días (Examen o práctica rápida)</option>
                      <option value="7">7 días (1 semana para proyecto)</option>
                      <option value="14">14 días (2 semanas / medio parcial)</option>
                      <option value="30">30 días (Mes completo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Punto seguro acordado en campus
                    </label>
                    <select
                      value={meetingPoint}
                      onChange={(e) => setMeetingPoint(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                    >
                      {SAFE_MEETING_POINTS.map((pt) => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Mensaje para el compañero (opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder={`Hola ${product.ownerName}, me gustaría pedirlo prestado para...`}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={acceptConditions}
                      onChange={(e) => setAcceptConditions(e.target.checked)}
                      className="rounded text-[#234B3A] focus:ring-[#234B3A]"
                    />
                    <span className="text-[11px] text-stone-600">
                      Me comprometo a cuidar el material y devolverlo en la fecha y punto acordado.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!acceptConditions}
                    className="w-full h-11 bg-[#234B3A] hover:bg-[#1b3d2f] text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    Confirmar y Enviar Solicitud
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom CTA */}
        {!showRequestForm && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 shrink-0 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Modalidad</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#234B3A]">
                {product.modality === 'prestamo' 
                  ? 'Préstamo 100% Gratuito' 
                  : product.modality === 'alquiler'
                  ? `Alquiler: ${product.rentalPrice || product.modalityDetails}`
                  : (product.modalityDetails || 'Intercambio Universitario')}
              </span>
            </div>

            <button
              onClick={() => setShowRequestForm(true)}
              className="px-5 py-2.5 rounded-xl bg-[#234B3A] hover:bg-[#1b3d2f] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#234B3A]/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Solicitar artículo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
