import React, { useState, useEffect } from 'react';
import {
  MemoryRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom';

import {
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  Search,
  Shield,
  LogOut,
  Clock,
  CheckCircle2,
  Instagram
} from 'lucide-react';

import { NAVIGATION_ITEMS, BELT_COLORS } from './constants';

import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Classes from './pages/Classes';
import IBJJFRules from './pages/IBJJFRules';
import BusinessHub from './pages/BusinessHub';
import AttendancePage from './pages/Attendance';
import BeltSystem from './pages/BeltSystem';
import FightTimer from './pages/FightTimer';
import AICoach from './pages/AICoach';
import Settings from './pages/Settings';
import StudentPortal from './pages/StudentPortal';
import Curriculum from './pages/Curriculum';
import ExhibitionMode from './pages/ExhibitionMode';
import SystemAudit from './pages/SystemAudit';
import Login from './pages/Login';

import { LanguageProvider, useTranslation } from './contexts/LanguageContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ProfileProvider, useProfile } from './contexts/ProfileContext';
import { DataProvider } from './contexts/DataContext';

interface AuthState {
  isLoggedIn: boolean;
  role: 'admin' | 'student' | null;
  studentCode?: string;
  email?: string;
}

const Sidebar = ({ isOpen, toggle, onLogout }: any) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { profile } = useProfile();

  if (location.pathname.startsWith('/portal/')) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggle}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-[60] bg-slate-900 text-white transform transition-all duration-300 ease-in-out flex flex-col overflow-y-auto
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20 xl:w-72'}`}
      >
        <div className="flex items-center justify-between p-6 h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white">
              {profile.academyName?.[0] || 'S'}
            </div>
            <span className="text-xl font-bold uppercase xl:block hidden">
              {profile.academyName || 'SysBJJ 2.0'}
            </span>
          </div>
          <button onClick={toggle} className="lg:hidden">
            <X />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {NAVIGATION_ITEMS.map((item: any) => {
            const isActive =
              location.pathname === `/${item.id}` ||
              (location.pathname === '/' && item.id === 'dashboard');

            return (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
                onClick={() => window.innerWidth < 1024 && toggle()}
              >
                {item.icon}
                <span>{t(`common.${item.id}`)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 text-red-400"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('oss_auth');
    return saved ? JSON.parse(saved) : { isLoggedIn: false, role: null };
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (
      auth.isLoggedIn &&
      auth.role === 'student' &&
      !location.pathname.startsWith('/portal/')
    ) {
      navigate(`/portal/${auth.studentCode}`);
    }
  }, [location.pathname, auth]);

  const handleLogin = (role: 'admin' | 'student', studentCode?: string) => {
    const newAuth = { isLoggedIn: true, role, studentCode };
    setAuth(newAuth);
    localStorage.setItem('oss_auth', JSON.stringify(newAuth));

    navigate(role === 'admin' ? '/dashboard' : `/portal/${studentCode}`);
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: null });
    localStorage.removeItem('oss_auth');
    navigate('/');
  };

  if (!auth.isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex">
      {auth.role === 'admin' && (
        <Sidebar
          isOpen={sidebarOpen}
          toggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />
      )}

      <div className="flex-1 flex flex-col">
        <main className="p-4 flex-1">
          <Routes>
            {auth.role === 'admin' ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/ibjjf-rules" element={<IBJJFRules />} />
                <Route path="/business" element={<BusinessHub />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/attendance" element={<AttendancePage />} />
                <Route path="/promotions" element={<BeltSystem />} />
                <Route path="/timer" element={<FightTimer />} />
                <Route path="/assistant" element={<AICoach />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/audit" element={<SystemAudit />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <>
                <Route path="/portal/:code" element={<StudentPortal />} />
                <Route path="*" element={<Navigate to={`/portal/${auth.studentCode}`} />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </div>
  );
};

const RootApp = () => (
  <MemoryRouter>
    <ThemeProvider>
      <LanguageProvider>
        <ProfileProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </ProfileProvider>
      </LanguageProvider>
    </ThemeProvider>
  </MemoryRouter>
);

export default RootApp;
