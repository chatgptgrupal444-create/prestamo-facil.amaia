export type Modality = 'prestamo' | 'intercambio' | 'alquiler';

export type PhysicalCondition = 'Nuevo' | 'Como nuevo' | 'Buen estado' | 'Uso moderado';

export type RequestStatus = 'pendiente' | 'aceptada' | 'entregada' | 'devuelta' | 'rechazada';

export type CareerName = 'Ingeniería Civil' | 'Arquitectura' | 'Gastronomía' | 'Otras carreras';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  faculty: string;
  career: string;
  campus: string;
  rating: number;
  totalReviews: number;
  completedLoans: number;
  savingsGenerated: number; // in MXN or currency units
  verifiedStudent: boolean;
  memberSince: string;
  role?: 'student' | 'admin'; // 'admin' for private administrative dashboard
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
  itemName: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  career: string; // 'Gastronomía' | 'Arquitectura' | 'Otras carreras' (Ingeniería Civil preserved in historical archive)
  subcategory?: string; // Subcategorías de Gastronomía o Arquitectura
  modality: Modality;
  modalityDetails?: string; // e.g. "Gratis por 7 días" or "Busco lápices 2B" or "$15 MXN/día"
  rentalPrice?: string; // e.g. "$15 MXN / día" - shown strictly when modality is 'alquiler'
  condition: PhysicalCondition;
  description: string;
  imageUrl: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerCareer: string;
  ownerRating: number;
  campus: string;
  region?: string; // Región del estado de Veracruz
  locationDetails: string;
  availability: string;
  rules: string[];
  hygieneProtocol?: string; // Cleaning & disinfection instructions (especially for Gastronomy & culinary lab tools)
  isFeatured?: boolean; // Artículos destacados (p. ej. gastronomía destacada)
  depositRequired?: string;
  isAvailable: boolean;
  createdAt: string;
  viewsCount?: number;
}

export interface LoanRequest {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  category: string;
  modality: Modality;
  borrowerId: string;
  borrowerName: string;
  borrowerAvatar: string;
  borrowerCareer: string;
  ownerId: string;
  ownerName: string;
  requestDate: string;
  startDate: string;
  returnDate: string;
  status: RequestStatus;
  message: string;
  securityCode: string; // 4-digit PIN for safe delivery confirmation
  safeMeetingPoint: string;
  isIncomingForCurrentUser: boolean;
}

export type ScreenTab = 'inicio' | 'gastronomia' | 'arquitectura' | 'explorar' | 'publicar' | 'solicitudes' | 'perfil' | 'dashboard';
