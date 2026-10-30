import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, GraduationCap, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { User } from '../types';
import { CAMPUS_LOCATIONS, CURRENT_USER } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [career, setCareer] = useState('Arquitectura');
  const [campus, setCampus] = useState(CAMPUS_LOCATIONS[1]);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Por favor ingresa tu nombre completo.');
        return;
      }
      if (!email.includes('@')) {
        setError('Ingresa un correo estudiantil válido (ej. @universidad.edu).');
        return;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        university: 'Universidad Politécnica',
        faculty: 'Facultad de ' + career,
        career: career,
        campus: campus,
        rating: 5.0,
        totalReviews: 1,
        completedLoans: 0,
        savingsGenerated: 0,
        verifiedStudent: true,
        memberSince: 'Octubre 2026',
      };
      onSuccess(newUser);
    } else {
      // Login mode
      if (!email.trim() || !password.trim()) {
        setError('Ingresa tu correo y contraseña.');
        return;
      }
      // Demo successful login
      onSuccess({
        ...CURRENT_USER,
        email: email || CURRENT_USER.email,
      });
    }
  };

  const handleQuickDemoLogin = () => {
    onSuccess(CURRENT_USER);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
        {/* Modal Top Header */}
        <div className="bg-[#234B3A] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#A8C5A0] text-[#234B3A] font-bold flex items-center justify-center text-sm">
              PF
            </div>
            <span className="font-extrabold text-lg tracking-tight">PRESTAFÁCIL</span>
          </div>
          <h2 className="text-xl font-bold">
            {mode === 'login' ? 'Bienvenido de nuevo' : 'Únete a la comunidad estudiantil'}
          </h2>
          <p className="text-xs text-[#A8C5A0] mt-0.5">
            {mode === 'login'
              ? 'Ingresa con tu cuenta institucional para gestionar préstamos'
              : 'Comparte y solicita materiales escolares con tus compañeros'}
          </p>

          {/* Segmented Mode Selector */}
          <div className="grid grid-cols-2 p-1 bg-black/20 rounded-xl mt-4">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-[#234B3A] shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'register' ? 'bg-white text-[#234B3A] shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Crear cuenta
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nombre completo del estudiante
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Valentina Morales"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Correo institucional o universitario
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="estudiante@universidad.edu"
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Carrera universitaria
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={career}
                      onChange={(e) => setCareer(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A] appearance-none font-medium"
                    >
                      <option value="Gastronomía">Gastronomía</option>
                      <option value="Arquitectura">Arquitectura</option>
                      <option value="Otras carreras">Otras carreras</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Campus
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <select
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A] appearance-none"
                    >
                      {CAMPUS_LOCATIONS.slice(1).map((c) => (
                        <option key={c} value={c}>{c.split('-')[0]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#234B3A]"
                  />
                </div>
              </div>
            )}

            {/* Trust disclaimer */}
            <div className="flex items-center gap-2 p-2.5 bg-[#A8C5A0]/15 rounded-xl text-[11px] text-[#234B3A]">
              <ShieldCheck className="w-4 h-4 text-[#234B3A] shrink-0" />
              <span>Tus datos institucionales solo se usan para validar que eres estudiante activo.</span>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#234B3A] hover:bg-[#1b3d2f] text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
            >
              {mode === 'login' ? 'Entrar a PrestaFácil' : 'Crear mi cuenta'}
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-4 pt-4 border-t border-stone-100 text-center">
            <p className="text-[11px] text-stone-500 mb-2">¿Quieres probar el prototipo rápidamente?</p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 px-3 rounded-xl bg-[#F4F0E6] hover:bg-stone-200 text-[#234B3A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-stone-300"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#234B3A]" />
              <span>Acceso Rápido como Valentina Morales (Demo)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
