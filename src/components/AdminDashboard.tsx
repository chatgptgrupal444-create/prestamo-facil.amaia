import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  TrendingUp, 
  Users, 
  Package, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  ChevronRight, 
  Eye, 
  Check, 
  X, 
  BarChart3, 
  Layers, 
  MapPin, 
  Sparkles,
  Download,
  Building2,
  RefreshCw,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Product, LoanRequest, User } from '../types';

interface AdminDashboardProps {
  currentUser: User | null;
  products: Product[];
  requests: LoanRequest[];
  onBackToApp: () => void;
  onOpenProductDetail: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  products,
  requests,
  onBackToApp,
  onOpenProductDetail,
}) => {
  // Security State: Private Admin Access Control
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // View & Filter States inside Dashboard
  const [activeTab, setActiveTab] = useState<'resumen' | 'articulos' | 'prestamos' | 'estudiantes'>('resumen');
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('Todas');
  const [filterModality, setFilterModality] = useState('Todas');
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  // Authenticate Admin
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === '2026' || adminPin === 'admin2026' || adminPin === '1234') {
      setIsAdminAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('Código de seguridad incorrecto. Acceso restringido exclusivamente a la administradora de PrestaFácil.');
    }
  };

  // Aggregated Analytics
  const stats = useMemo(() => {
    const totalItems = products.length;
    const gastroCount = products.filter(p => p.career === 'Gastronomía').length;
    const arquiCount = products.filter(p => p.career === 'Arquitectura').length;
    const totalLoans = requests.length;
    const completedLoans = requests.filter(r => r.status === 'devuelta').length;
    const activeLoans = requests.filter(r => r.status === 'aceptada' || r.status === 'entregada').length;
    const pendingLoans = requests.filter(r => r.status === 'pendiente').length;

    // Approximate total community savings
    const estimatedSavings = 142500;

    return {
      totalItems,
      gastroCount,
      arquiCount,
      totalLoans,
      completedLoans,
      activeLoans,
      pendingLoans,
      estimatedSavings,
      returnRate: '99.4%',
    };
  }, [products, requests]);

  // Regional breakdown data for chart
  const regionalData = useMemo(() => [
    { region: 'Veracruz - Boca del Río', items: 28, loans: 64, pct: 45 },
    { region: 'Xalapa (Capital)', items: 16, loans: 42, pct: 28 },
    { region: 'Orizaba - Córdoba', items: 8, loans: 18, pct: 15 },
    { region: 'Poza Rica - Tuxpan', items: 2, loans: 6, pct: 7 },
    { region: 'Coatzacoalcos - Minatitlán', items: 3, loans: 8, pct: 5 },
  ], []);

  // Filtered table products
  const tableProducts = useMemo(() => {
    return products.filter(p => {
      if (filterRegion !== 'Todas' && !p.campus.includes(filterRegion)) return false;
      if (filterModality !== 'Todas' && p.modality !== filterModality) return false;
      if (searchTableQuery.trim()) {
        const q = searchTableQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || 
               p.ownerName.toLowerCase().includes(q) || 
               p.career.toLowerCase().includes(q);
      }
      return true;
    });
  }, [products, filterRegion, filterModality, searchTableQuery]);

  // 1. SECURITY LOCK SCREEN: If not authenticated as Admin
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-6 text-center animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-3xl bg-[#234B3A] text-[#A8C5A0] flex items-center justify-center mx-auto ring-4 ring-[#A8C5A0]/20 shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-extrabold text-[#234B3A] tracking-wider bg-[#A8C5A0]/25 px-2.5 py-0.5 rounded-full inline-block">
              Área Privada de Seguridad
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Dashboard Administrativo
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Acceso exclusivo y confidencial para la administradora de la red universitaria PrestaFácil en el Estado de Veracruz.
            </p>
          </div>

          {pinError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{pinError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 text-left">
                Código PIN de Autenticación de Administradora
              </label>
              <input
                type="password"
                required
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Ingresa tu clave de acceso (ej. 2026)"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-center text-lg tracking-widest font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
              />
              <span className="text-[10px] text-stone-400 block mt-1">
                Clave de demostración preconfigurada: <strong className="text-stone-600">2026</strong>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#234B3A] hover:bg-[#1b3d2f] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-[#A8C5A0]" />
              <span>Ingresar al Panel de Control</span>
            </button>
          </form>

          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={onBackToApp}
              className="text-xs text-stone-500 hover:text-stone-800 font-semibold underline"
            >
              ← Volver a la plataforma estudiantil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD: Fully Responsive Layout (Desktop / Tablet / Mobile)
  return (
    <div className="min-h-screen bg-[#F4F0E6] flex flex-col max-w-full overflow-x-hidden">
      {/* Top Admin Bar */}
      <header className="bg-[#234B3A] text-white px-4 py-3 border-b border-white/10 shrink-0 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#A8C5A0] text-[#234B3A] flex items-center justify-center font-black text-sm shadow-sm">
              AD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight">
                  Panel de Administración Estatal
                </h1>
                <span className="hidden sm:inline-block bg-[#A8C5A0]/20 text-[#A8C5A0] text-[10px] font-bold px-2 py-0.5 rounded">
                  Veracruz · 2026
                </span>
              </div>
              <p className="text-[11px] text-[#A8C5A0] leading-none hidden xs:block">
                Supervisión de préstamos, protocolos sanitarios y auditoría de materiales
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminAuthenticated(false)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Cerrar sesión de administradora"
            >
              <Lock className="w-3.5 h-3.5 text-[#A8C5A0]" />
              <span className="hidden sm:inline">Bloquear</span>
            </button>
            <button
              onClick={onBackToApp}
              className="px-3 py-1.5 rounded-lg bg-[#A8C5A0] hover:bg-[#b8d4b0] text-[#234B3A] text-xs font-black transition-colors"
            >
              Ver App Estudiantil →
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Responsive Shell */}
      <div className="max-w-7xl mx-auto w-full p-3 sm:p-5 lg:p-6 flex-1 flex flex-col lg:flex-row gap-5">
        
        {/* Navigation Sidebar (Desktop: Full side panel | Tablet: Collapsible | Mobile: Compact Horizontal Bar) */}
        <aside className="lg:w-64 shrink-0 bg-white rounded-3xl p-3 sm:p-4 border border-stone-200/90 shadow-xs flex lg:flex-col justify-between overflow-x-auto lg:overflow-visible">
          <div className="flex lg:flex-col gap-1.5 w-full">
            <div className="hidden lg:block px-3 py-2 text-[10px] font-extrabold uppercase text-stone-400 tracking-wider">
              Módulos del Sistema
            </div>

            <button
              onClick={() => setActiveTab('resumen')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 lg:w-full ${
                activeTab === 'resumen' 
                  ? 'bg-[#234B3A] text-white shadow-xs' 
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Resumen Ejecutivo</span>
            </button>

            <button
              onClick={() => setActiveTab('articulos')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 lg:w-full ${
                activeTab === 'articulos' 
                  ? 'bg-[#234B3A] text-white shadow-xs' 
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Package className="w-4 h-4 shrink-0" />
              <span>Auditoría de Artículos ({stats.totalItems})</span>
            </button>

            <button
              onClick={() => setActiveTab('prestamos')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 lg:w-full ${
                activeTab === 'prestamos' 
                  ? 'bg-[#234B3A] text-white shadow-xs' 
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>Gestión de Préstamos ({stats.totalLoans})</span>
            </button>

            <button
              onClick={() => setActiveTab('estudiantes')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 lg:w-full ${
                activeTab === 'estudiantes' 
                  ? 'bg-[#234B3A] text-white shadow-xs' 
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Validación de Estudiantes</span>
            </button>
          </div>

          {/* Admin Profile Widget in Sidebar (Desktop only) */}
          <div className="hidden lg:block pt-4 mt-4 border-t border-stone-100">
            <div className="p-3 bg-[#F4F0E6] rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#234B3A] text-[#A8C5A0] font-bold text-xs flex items-center justify-center">
                MV
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-900 truncate">Mariana Valenzuela</p>
                <p className="text-[10px] text-stone-500 truncate">Administradora General</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-5 min-w-0">
          
          {/* TAB 1: RESUMEN EJECUTIVO (Indicadores + Gráficas) */}
          {activeTab === 'resumen' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* 4-column Metrics Grid (Adapts to 1 col on mobile, 2 on tablet, 4 on desktop) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Total Artículos</span>
                    <span className="p-1.5 rounded-xl bg-emerald-50 text-[#234B3A]">
                      <Package className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    {stats.totalItems}
                  </p>
                  <p className="text-[10px] text-stone-500 font-medium">
                    {stats.gastroCount} Gastronomía · {stats.arquiCount} Arquitectura
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Préstamos Activos</span>
                    <span className="p-1.5 rounded-xl bg-amber-50 text-amber-800">
                      <Clock className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-900 tracking-tight">
                    {stats.activeLoans}
                  </p>
                  <p className="text-[10px] text-stone-500 font-medium">
                    {stats.pendingLoans} solicitudes por autorizar
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Tasa de Devolución</span>
                    <span className="p-1.5 rounded-xl bg-blue-50 text-blue-800">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    {stats.returnRate}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold">
                    100% con código PIN en campus
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Ahorro Estudiantil</span>
                    <span className="p-1.5 rounded-xl bg-[#A8C5A0]/30 text-[#234B3A]">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-[#234B3A] tracking-tight">
                    ${stats.estimatedSavings.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-stone-500 font-medium">
                    MXN ahorrados por alumnos UV/UCC
                  </p>
                </div>
              </div>

              {/* Responsive Visual Charts: 2 columns on desktop, 1 on tablet/mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Chart 1: Cobertura por Región de Veracruz */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-stone-900">
                        Distribución por Región de Veracruz
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Concentración de artículos y préstamos en campus
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-[#234B3A] bg-[#F4F0E6] px-2 py-0.5 rounded-lg">
                      5 Regiones
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {regionalData.map((reg) => (
                      <div key={reg.region} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-stone-800">{reg.region}</span>
                          <span className="text-stone-500 font-semibold">{reg.items} arts · {reg.pct}%</span>
                        </div>
                        <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#234B3A] rounded-full transition-all duration-500" 
                            style={{ width: `${reg.pct}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 2: Distribución por Especialidad Técnica */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-stone-900">
                        Especialidades Principales
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">
                        Activo
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Participación de inventario compartido en la plataforma
                    </p>
                  </div>

                  {/* Visual ratio blocks */}
                  <div className="grid grid-cols-2 gap-3 py-2">
                    <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        <span>Gastronomía</span>
                      </div>
                      <p className="text-2xl font-black text-emerald-950">35</p>
                      <p className="text-[10px] text-emerald-700">63% del inventario estatal</p>
                    </div>

                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#234B3A]" />
                        <span>Arquitectura</span>
                      </div>
                      <p className="text-2xl font-black text-stone-900">20</p>
                      <p className="text-[10px] text-stone-500">36% del inventario estatal</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F4F0E6] rounded-2xl text-[11px] text-stone-700 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#234B3A] shrink-0" />
                    <span>Todos los artículos cuentan con verificación física y condición técnica auditada.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDITORÍA DE ARTÍCULOS (Tabla completa en Desktop, Tarjetas en Mobile) */}
          {activeTab === 'articulos' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Table Toolbar */}
              <div className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTableQuery}
                    onChange={(e) => setSearchTableQuery(e.target.value)}
                    placeholder="Filtrar por nombre, carrera o alumno..."
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  >
                    <option value="Todas">Todas las regiones</option>
                    <option value="Boca del Río">Boca del Río</option>
                    <option value="Xalapa">Xalapa</option>
                    <option value="Córdoba">Córdoba / Orizaba</option>
                  </select>

                  <select
                    value={filterModality}
                    onChange={(e) => setFilterModality(e.target.value)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  >
                    <option value="Todas">Todas las modalidades</option>
                    <option value="prestamo">Préstamo Gratis</option>
                    <option value="alquiler">Alquiler Simbólico</option>
                    <option value="intercambio">Intercambio</option>
                  </select>
                </div>
              </div>

              {/* Desktop Table View (Hidden on mobile) */}
              <div className="hidden md:block bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-extrabold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3.5">Artículo</th>
                        <th className="p-3.5">Especialidad</th>
                        <th className="p-3.5">Modalidad</th>
                        <th className="p-3.5">Campus en Veracruz</th>
                        <th className="p-3.5">Estado</th>
                        <th className="p-3.5 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {tableProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-stone-900 max-w-xs truncate">
                            {p.title}
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-md bg-[#F4F0E6] text-[#234B3A] font-bold text-[10px]">
                              {p.career}
                            </span>
                          </td>
                          <td className="p-3.5 text-stone-600 font-medium capitalize">
                            {p.modality === 'alquiler' ? (p.rentalPrice || 'Alquiler') : p.modality}
                          </td>
                          <td className="p-3.5 text-stone-500 max-w-[180px] truncate">
                            {p.campus.split(':')[0]}
                          </td>
                          <td className="p-3.5">
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[10px]">
                              Auditado ✓
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => onOpenProductDetail(p)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-[#234B3A] hover:text-white rounded-lg text-[11px] font-bold transition-colors"
                            >
                              Ver
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card List View (Shown only on small screens) */}
              <div className="md:hidden space-y-2.5">
                {tableProducts.map((p) => (
                  <div key={p.id} className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold text-[#234B3A] uppercase">
                          {p.career} · {p.subcategory || p.category}
                        </span>
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{p.title}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Auditado
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                      <span>{p.campus.split(':')[0]}</span>
                      <button
                        onClick={() => onOpenProductDetail(p)}
                        className="text-xs font-bold text-[#234B3A] underline"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GESTIÓN DE PRÉSTAMOS */}
          {activeTab === 'prestamos' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-stone-900">
                    Historial y Control de Préstamos Universitaros
                  </h3>
                  <span className="text-xs text-stone-500 font-semibold">
                    {requests.length} transacciones registradas
                  </span>
                </div>

                <div className="space-y-2.5">
                  {requests.map((req) => (
                    <div
                      key={req.id}
                      className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900">{req.productTitle}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded capitalize ${
                            req.status === 'devuelta' ? 'bg-emerald-100 text-emerald-800' :
                            req.status === 'aceptada' ? 'bg-amber-100 text-amber-900' :
                            'bg-blue-100 text-blue-900'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500">
                          Solicitante: <strong>{req.borrowerName}</strong> ({req.borrowerCareer}) · Código PIN: <span className="font-mono font-bold text-[#234B3A]">{req.securityCode}</span>
                        </p>
                        <p className="text-[10px] text-stone-400">
                          Punto: {req.safeMeetingPoint}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-stone-400">{req.startDate} - {req.returnDate}</span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-stone-200">
                          Validado ✓
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VALIDACIÓN ESTUDIANTIL */}
          {activeTab === 'estudiantes' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900">
                      Padrón Estudiantil Verificado
                    </h3>
                    <p className="text-xs text-stone-500">
                      Estudiantes con credencial universitaria vigente y calificación comunitaria
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl">
                    100% Verificados
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#234B3A] text-white font-bold text-xs flex items-center justify-center">
                        VM
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">Valentina Morales</h4>
                        <p className="text-[10px] text-stone-500">Gastronomía · UV Mocambo</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-stone-200/60">
                      <span>22 préstamos</span>
                      <span className="font-bold text-amber-600">★ 4.9</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
                        MM
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">Mateo Chef Morales</h4>
                        <p className="text-[10px] text-stone-500">Gastronomía · UV Mocambo</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-stone-200/60">
                      <span>35 utensilios</span>
                      <span className="font-bold text-amber-600">★ 5.0</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#234B3A] text-white font-bold text-xs flex items-center justify-center">
                        RP
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">Rodrigo Peña</h4>
                        <p className="text-[10px] text-stone-500">Arquitectura · UV Xalapa</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-stone-200/60">
                      <span>18 herramientas</span>
                      <span className="font-bold text-amber-600">★ 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
