import React, { useState } from 'react';
import { 
  CURRENT_USER, 
  INITIAL_PRODUCTS, 
  INITIAL_REQUESTS, 
  INITIAL_REVIEWS, 
  CAMPUS_LOCATIONS 
} from './data/mockData';
import { Product, LoanRequest, Review, User, ScreenTab, RequestStatus } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MobileFrame } from './components/MobileFrame';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AuthModal } from './components/AuthModal';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PublishModal } from './components/PublishModal';
import { RequestsScreen } from './components/RequestsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { DesktopSidebar } from './components/DesktopSidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { HowItWorksModal } from './components/HowItWorksModal';
import { CollaborativeEconomyModal } from './components/CollaborativeEconomyModal';
import { SafetyTipsModal } from './components/SafetyTipsModal';

export default function App() {
  // App navigation & view modes
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<ScreenTab>('inicio');

  // User state
  const [currentUser, setCurrentUser] = useState<User | null>(CURRENT_USER);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Core data states
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [requests, setRequests] = useState<LoanRequest[]>(INITIAL_REQUESTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Filters: Gastronomía es la categoría principal por defecto y cobertura en todo Veracruz
  const [selectedCategory, setSelectedCategory] = useState<string>('gastronomia');
  const [selectedCampus, setSelectedCampus] = useState<string>(CAMPUS_LOCATIONS[0]);

  // Modals
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState<boolean>(false);
  const [showEconomyModal, setShowEconomyModal] = useState<boolean>(false);
  const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);

  // Notification badge calculation
  const pendingRequestsCount = requests.filter(
    (r) => r.status === 'pendiente' || r.status === 'aceptada'
  ).length;

  // Filter products for profile
  const userProducts = products.filter(
    (p) => currentUser && p.ownerId === currentUser.id
  );

  // Handlers
  const handleAddNewProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    // Switch to home or profile to view it
    setCurrentTab('inicio');
  };

  const handleAddNewRequest = (newRequest: LoanRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
    setCurrentTab('solicitudes');
  };

  const handleUpdateRequestStatus = (requestId: string, newStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req))
    );
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleSelectTab = (tab: ScreenTab) => {
    if (tab === 'publicar') {
      setShowPublishModal(true);
    } else if (tab === 'gastronomia') {
      setSelectedCategory('gastronomia');
      setCurrentTab('inicio');
    } else if (tab === 'arquitectura') {
      setSelectedCategory('arquitectura');
      setCurrentTab('inicio');
    } else {
      setCurrentTab(tab);
    }
  };

  const handleCategoryFromExplore = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentTab('inicio');
  };

  // Render current tab body
  const renderCurrentScreen = () => {
    if (showWelcomeScreen) {
      return (
        <WelcomeScreen
          onLogin={() => {
            setAuthModalMode('login');
            setShowAuthModal(true);
          }}
          onRegister={() => {
            setAuthModalMode('register');
            setShowAuthModal(true);
          }}
          onExploreAsGuest={() => setShowWelcomeScreen(false)}
          onLearnMore={() => setShowHowItWorksModal(true)}
        />
      );
    }

    switch (currentTab) {
      case 'inicio':
        return (
          <HomeScreen
            currentUser={currentUser}
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCampus={selectedCampus}
            onOpenProductDetail={setSelectedProductForDetail}
            onOpenPublish={() => setShowPublishModal(true)}
            onOpenEconomy={() => setShowEconomyModal(true)}
          />
        );

      case 'explorar':
        return (
          <ExploreScreen
            products={products}
            onSelectCategoryAndGoHome={handleCategoryFromExplore}
            onOpenProductDetail={setSelectedProductForDetail}
            onOpenEconomy={() => setShowEconomyModal(true)}
          />
        );

      case 'solicitudes':
        return (
          <RequestsScreen
            currentUser={currentUser}
            requests={requests}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            onAddReview={handleAddReview}
            onOpenSafetyModal={() => setShowSafetyModal(true)}
          />
        );

      case 'perfil':
        return (
          <ProfileScreen
            currentUser={currentUser}
            userProducts={userProducts}
            reviews={reviews}
            onOpenProductDetail={setSelectedProductForDetail}
            onOpenEconomy={() => setShowEconomyModal(true)}
            onUpdateProfile={(updated) => setCurrentUser(updated)}
            onOpenAdmin={() => setCurrentTab('dashboard')}
          />
        );

      case 'dashboard':
        return (
          <AdminDashboard
            currentUser={currentUser}
            products={products}
            requests={requests}
            onBackToApp={() => setCurrentTab('inicio')}
            onOpenProductDetail={setSelectedProductForDetail}
          />
        );

      default:
        return null;
    }
  };

  return (
    <MobileFrame
      isSimulated={isMobileDeviceView}
      onToggleSimulator={() => setIsMobileDeviceView(!isMobileDeviceView)}
    >
      <div className="flex min-h-screen bg-[#F4F0E6]">
        {/* Desktop Lateral Sidebar: visible on desktop screens (lg:flex), collapsible */}
        {!showWelcomeScreen && (
          <DesktopSidebar
            currentTab={currentTab}
            onSelectTab={handleSelectTab}
            pendingRequestsCount={pendingRequestsCount}
            currentUser={currentUser}
            onOpenPublish={() => setShowPublishModal(true)}
            onOpenEconomy={() => setShowEconomyModal(true)}
            onOpenHowItWorks={() => setShowHowItWorksModal(true)}
            onOpenSafety={() => setShowSafetyModal(true)}
            selectedCampus={selectedCampus}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        )}

        {/* Content Column (Header + Screen + BottomNav on mobile) */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header (Navigation, Campus, Modals) */}
          {!showWelcomeScreen && (
            <Header
              selectedCampus={selectedCampus}
              onSelectCampus={setSelectedCampus}
              onOpenHowItWorks={() => setShowHowItWorksModal(true)}
              onOpenEconomy={() => setShowEconomyModal(true)}
              onOpenSafety={() => setShowSafetyModal(true)}
              isMobileDeviceView={isMobileDeviceView}
              onToggleDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
              pendingRequestsCount={pendingRequestsCount}
              onOpenRequests={() => setCurrentTab('solicitudes')}
            />
          )}

          {/* Main Content Area */}
          <main className="flex-1 pb-20 lg:pb-8">
            {renderCurrentScreen()}
          </main>

          {/* Bottom Navigation Bar: visible on mobile & tablets, hidden on desktop (lg:hidden) */}
          {!showWelcomeScreen && (
            <BottomNav
              currentTab={currentTab}
              onSelectTab={handleSelectTab}
              pendingRequestsCount={pendingRequestsCount}
            />
          )}

          {/* Global Floating Helper Button for Welcome / Onboarding Screen */}
          {!showWelcomeScreen && (
            <div className="fixed bottom-20 lg:bottom-6 right-4 z-30">
              <button
                onClick={() => setShowWelcomeScreen(true)}
                className="p-2.5 rounded-full bg-[#234B3A] text-white shadow-lg border border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-bold"
                title="Ver pantalla de bienvenida e introducción"
              >
                <span className="w-2 h-2 rounded-full bg-[#A8C5A0]" />
                <span className="hidden sm:inline">Ver Bienvenida</span>
              </button>
            </div>
          )}

          {/* Welcome Screen Back Button if opened */}
          {showWelcomeScreen && (
            <div className="p-4 bg-white/90 border-t border-stone-200 flex justify-between items-center text-xs">
              <span className="text-stone-500 font-medium">Modo Introducción</span>
              <button
                onClick={() => setShowWelcomeScreen(false)}
                className="font-bold text-[#234B3A] underline"
              >
                Volver a la aplicación principal →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {/* 1. Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        initialMode={authModalMode}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(loggedUser) => {
          setCurrentUser(loggedUser);
          setShowAuthModal(false);
          setShowWelcomeScreen(false);
        }}
      />

      {/* 2. Product Detail & Loan Request Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        currentUser={currentUser}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onRequestSubmit={handleAddNewRequest}
        onOpenSafetyModal={() => setShowSafetyModal(true)}
      />

      {/* 3. Publish Item Modal */}
      <PublishModal
        isOpen={showPublishModal}
        currentUser={currentUser}
        onClose={() => setShowPublishModal(false)}
        onProductPublished={handleAddNewProduct}
      />

      {/* 4. How It Works Modal */}
      <HowItWorksModal
        isOpen={showHowItWorksModal}
        onClose={() => setShowHowItWorksModal(false)}
        onStartExploring={() => {
          setShowWelcomeScreen(false);
          setCurrentTab('inicio');
        }}
      />

      {/* 5. Collaborative Economy & News Video Script Modal */}
      <CollaborativeEconomyModal
        isOpen={showEconomyModal}
        onClose={() => setShowEconomyModal(false)}
      />

      {/* 6. Campus Safety & Trust Modal */}
      <SafetyTipsModal
        isOpen={showSafetyModal}
        onClose={() => setShowSafetyModal(false)}
      />
    </MobileFrame>
  );
}
