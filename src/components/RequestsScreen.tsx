import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Clock, 
  CheckCircle, 
  PackageCheck, 
  RotateCcw, 
  MapPin, 
  Key, 
  Star, 
  User as UserIcon, 
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { LoanRequest, RequestStatus, User, Review } from '../types';

interface RequestsScreenProps {
  currentUser: User | null;
  requests: LoanRequest[];
  onUpdateRequestStatus: (requestId: string, newStatus: RequestStatus) => void;
  onAddReview: (review: Review) => void;
  onOpenSafetyModal: () => void;
}

export const RequestsScreen: React.FC<RequestsScreenProps> = ({
  currentUser,
  requests,
  onUpdateRequestStatus,
  onAddReview,
  onOpenSafetyModal,
}) => {
  const [activeTab, setActiveTab] = useState<'todas' | 'enviadas' | 'recibidas' | 'activas' | 'historial'>('todas');
  const [ratingModalRequest, setRatingModalRequest] = useState<LoanRequest | null>(null);
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'enviadas') return !req.isIncomingForCurrentUser;
    if (activeTab === 'recibidas') return req.isIncomingForCurrentUser;
    if (activeTab === 'activas') return req.status === 'aceptada' || req.status === 'entregada';
    if (activeTab === 'historial') return req.status === 'devuelta' || req.status === 'rechazada';
    return true;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pendiente':
        return {
          label: 'Pendiente',
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: <Clock className="w-3 h-3 text-amber-600" />,
        };
      case 'aceptada':
        return {
          label: 'Aceptada',
          color: 'bg-[#A8C5A0]/30 text-[#234B3A] border-[#A8C5A0]',
          icon: <CheckCircle className="w-3 h-3 text-[#234B3A]" />,
        };
      case 'entregada':
        return {
          label: 'En Préstamo (Entregada)',
          color: 'bg-[#234B3A] text-white border-[#234B3A]',
          icon: <PackageCheck className="w-3 h-3 text-[#A8C5A0]" />,
        };
      case 'devuelta':
        return {
          label: 'Devuelta / Finalizada',
          color: 'bg-stone-100 text-stone-700 border-stone-300',
          icon: <RotateCcw className="w-3 h-3 text-stone-500" />,
        };
      case 'rechazada':
        return {
          label: 'Rechazada',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <X className="w-3 h-3 text-red-600" />,
        };
    }
  };

  const handleAccept = (req: LoanRequest) => {
    onUpdateRequestStatus(req.id, 'aceptada');
    showToast(`¡Solicitud aceptada! Coordina la entrega en ${req.safeMeetingPoint}`);
  };

  const handleMarkDelivered = (req: LoanRequest) => {
    onUpdateRequestStatus(req.id, 'entregada');
    showToast('Artículo marcado como entregado. El tiempo de préstamo ha comenzado.');
  };

  const handleStartReturnAndRate = (req: LoanRequest) => {
    setRatingModalRequest(req);
    setSelectedRating(5);
    setReviewComment('');
  };

  const submitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingModalRequest) return;

    onUpdateRequestStatus(ratingModalRequest.id, 'devuelta');

    const newRev: Review = {
      id: `rev_${Date.now()}`,
      authorName: currentUser?.name || 'Valentina Morales',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: selectedRating,
      date: 'Hoy',
      itemName: ratingModalRequest.productTitle,
      comment: reviewComment.trim() || '¡Excelente compañero! Entregó el material puntual y en perfecto estado. Gran experiencia en PrestaFácil.',
    };

    onAddReview(newRev);
    setRatingModalRequest(null);
    showToast('¡Devolución confirmada y valoración enviada! Gracias por construir confianza estudiantil.');
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-4 px-4 py-4 pb-12">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="p-3 bg-[#234B3A] text-white text-xs rounded-xl shadow-lg border border-[#A8C5A0]/40 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-[#A8C5A0] shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Title & Tabs */}
      <div>
        <h1 className="text-xl font-extrabold text-[#234B3A]">
          Mis Solicitudes y Préstamos
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Gestiona el flujo seguro de entrega, confirmación con código PIN y devolución.
        </p>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex gap-1.5 p-1 bg-stone-200/70 rounded-2xl overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('todas')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'todas' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Todas ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('enviadas')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'enviadas' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Enviadas ({requests.filter(r => !r.isIncomingForCurrentUser).length})
        </button>
        <button
          onClick={() => setActiveTab('recibidas')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'recibidas' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Recibidas ({requests.filter(r => r.isIncomingForCurrentUser).length})
        </button>
        <button
          onClick={() => setActiveTab('activas')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'activas' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          En curso ({requests.filter(r => r.status === 'aceptada' || r.status === 'entregada').length})
        </button>
        <button
          onClick={() => setActiveTab('historial')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'historial' ? 'bg-white text-[#234B3A] shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Historial
        </button>
      </div>

      {/* Request Cards List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 shadow-sm space-y-2">
            <ArrowLeftRight className="w-8 h-8 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-700 text-sm">No hay solicitudes en esta sección</h3>
            <p className="text-xs text-stone-500">
              Explora el catálogo para solicitar materiales o publica un artículo que no uses.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const statusInfo = getStatusBadge(req.status);
            const isOwner = req.isIncomingForCurrentUser;

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs space-y-3 hover:border-stone-300 transition-all"
              >
                {/* Header Row: Product Info & Status Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.productImage}
                      alt={req.productTitle}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400">
                        {req.category} · {req.modality}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                        {req.productTitle}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {isOwner ? `Solicitante: ${req.borrowerName}` : `Propietario: ${req.ownerName}`}
                      </p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl border shrink-0 ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <span>{statusInfo.label}</span>
                  </span>
                </div>

                {/* Dates & Message */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-stone-600">
                    <span className="font-semibold">Período de préstamo:</span>
                    <span className="font-bold text-[#234B3A]">{req.startDate} → {req.returnDate}</span>
                  </div>

                  <div className="flex items-center justify-between text-stone-600">
                    <span className="font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#234B3A]" />
                      Punto seguro acordado:
                    </span>
                    <span className="text-stone-800 truncate max-w-[200px]">{req.safeMeetingPoint}</span>
                  </div>

                  {req.message && (
                    <div className="pt-1 text-stone-500 italic text-[11px] border-t border-stone-200/60">
                      "{req.message}"
                    </div>
                  )}
                </div>

                {/* Security PIN Code Display */}
                <div className="flex items-center justify-between bg-[#F4F0E6] p-2.5 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#234B3A]" />
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block leading-none">
                        Código PIN de Confirmación
                      </span>
                      <span className="font-mono font-extrabold text-[#234B3A] text-sm">
                        {req.securityCode}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 max-w-[170px] text-right">
                    Ambos estudiantes deben verificar este código al entregarse el material.
                  </span>
                </div>

                {/* Action Buttons depending on role and status */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-stone-100">
                  {/* Incoming request pending approval */}
                  {isOwner && req.status === 'pendiente' && (
                    <>
                      <button
                        onClick={() => onUpdateRequestStatus(req.id, 'rechazada')}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                      >
                        Rechazar
                      </button>
                      <button
                        onClick={() => handleAccept(req)}
                        className="px-4 py-1.5 rounded-xl bg-[#234B3A] hover:bg-[#1b3d2f] text-white text-xs font-bold shadow-xs"
                      >
                        Aceptar Solicitud
                      </button>
                    </>
                  )}

                  {/* Accepted -> Ready to deliver */}
                  {req.status === 'aceptada' && (
                    <button
                      onClick={() => handleMarkDelivered(req)}
                      className="px-4 py-1.5 rounded-xl bg-[#234B3A] hover:bg-[#1b3d2f] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <PackageCheck className="w-3.5 h-3.5" />
                      <span>Confirmar Entrega en Campus</span>
                    </button>
                  )}

                  {/* Delivered -> Ready to return and rate */}
                  {req.status === 'entregada' && (
                    <button
                      onClick={() => handleStartReturnAndRate(req)}
                      className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Confirmar Devolución y Calificar</span>
                    </button>
                  )}

                  {/* Completed / Returned */}
                  {req.status === 'devuelta' && (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Préstamo completado con éxito
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Rating & Review Modal */}
      {ratingModalRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="text-sm font-bold text-[#234B3A]">
                Calificar a tu compañero
              </h3>
              <button
                onClick={() => setRatingModalRequest(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              ¿Cómo fue tu experiencia con el préstamo de{' '}
              <strong className="text-stone-900">{ratingModalRequest.productTitle}</strong>?
            </p>

            <form onSubmit={submitRating} className="space-y-3">
              {/* Star selector */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= selectedRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Comentario sobre el cuidado y puntualidad:
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Ej. Muy puntual en la biblioteca, cuidó el libro como si fuera suyo..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#234B3A] hover:bg-[#1b3d2f] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                Publicar Calificación y Finalizar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
