
import React, { useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Bell, Sun, Moon, Search, Shield, LogOut, Clock, CheckCircle2, Instagram } from 'lucide-react';
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

const Sidebar = ({ isOpen, toggle, onLogout }: { isOpen: boolean, toggle: () => void, onLogout: () => void }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { profile } = useProfile();

  if (location.pathname.startsWith('/portal/')) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggle}
      />
      
      <aside className={`fixed inset-y-0 left-0 z-[60] bg-slate-900 text-white transform transition-all duration-300 ease-in-out flex flex-col overflow-y-auto scrollbar-hide
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20 xl:w-72'}`}>
        
        <div className="flex-none flex items-center justify-between p-6 h-20 overflow-hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg uppercase shrink-0">
              {profile.academyName[0] || 'S'}
            </div>
            <span className="text-xl font-bjj tracking-widest uppercase truncate xl:block hidden">{profile.academyName || 'SysBJJ 2.0'}</span>
          </div>
          <button onClick={toggle} className="lg:hidden text-slate-400 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 mt-4 px-3 space-y-1 scrollbar-hide">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = location.pathname === `/${item.id}` || (location.pathname === '/' && item.id === 'dashboard');
            return (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 group relative ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 scale-[1.02]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                onClick={() => { if(window.innerWidth < 1024) toggle(); }}
              >
                <div className="shrink-0">{item.icon}</div>
                <span className={`font-semibold tracking-wide uppercase text-sm truncate transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-0 xl:opacity-100'}`}>
                  {t(`common.${item.id}`)}
                </span>
                {!isOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap lg:block xl:hidden hidden border border-slate-700 shadow-xl">
                    {t(`common.${item.id}`)}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex-none p-3 mt-8 mb-24 lg:mb-6 space-y-2 overflow-hidden shrink-0">
          <div className={`px-4 py-2 mb-2 text-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-0 xl:opacity-100'}`}>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-tight">
              {t('common.developedBy')}: <span className="text-blue-500">dashfire@gmail.com</span>
            </p>
            <a 
              href="https://instagram.com/sysbjj.26" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1 text-[8px] font-black text-pink-500 uppercase tracking-widest hover:text-pink-400 transition-colors"
            >
              <Instagram size={10} /> @sysbjj.26
            </a>
          </div>
          <Link to="/settings" onClick={() => { if(window.innerWidth < 1024) toggle(); }}>
            <div className={`p-3 bg-slate-800/50 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-all group ${!isOpen ? 'lg:p-2' : ''}`}>
               <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 shadow-lg shrink-0 ${BELT_COLORS[profile.belt] || 'bg-slate-700'}`}>
                   <span className="font-black text-xs">{profile.stripes}º</span>
                 </div>
                 <div className={`overflow-hidden flex-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-0 xl:opacity-100'}`}>
                   <p className="text-xs font-bold truncate group-hover:text-blue-400 transition-colors">{profile.name}</p>
                   <p className="text-[9px] text-slate-500 uppercase tracking-widest truncate">{profile.specialization}</p>
                 </div>
               </div>
            </div>
          </Link>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all uppercase font-black text-[10px] tracking-widest ${!isOpen ? 'lg:justify-center xl:justify-start' : ''}`}
          >
            <LogOut size={18} className="shrink-0" /> 
            <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-0 xl:opacity-100'}`}>
              {t('common.logout')}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

const BottomNav = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const items = NAVIGATION_ITEMS.slice(0, 5); // Dashboard, Students, Classes, Business, Curriculum

  if (location.pathname.startsWith('/portal/')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-white/5 lg:hidden pb-safe">
      <div className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const isActive = location.pathname === `/${item.id}` || (location.pathname === '/' && item.id === 'dashboard');
          return (
            <Link
              key={item.id}
              to={`/${item.id}`}
              className={`flex flex-col items-center justify-center gap-1 h-full transition-all ${isActive ? 'text-blue-500' : 'text-slate-500'}`}
            >
              {item.icon}
              <span className="text-[7px] font-black uppercase tracking-tight truncate w-full px-1 text-center">
                {item.id === 'curriculum' ? t('common.curriculumShort') : t(`common.${item.id}`)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (location.pathname.startsWith('/portal/')) return (
    <header className="h-20 bg-slate-900 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40 w-full">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-sm">PPH</div>
        <span className="text-white font-black text-xs uppercase tracking-widest">{t('portal.title')}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
           <p className="text-[10px] font-black text-white uppercase tracking-widest">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
           <p className="text-[8px] font-bold text-slate-500 uppercase">{currentTime.toLocaleDateString(t('common.dateLocale'))}</p>
        </div>
        <button 
          onClick={handleThemeToggle}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
  
  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 w-full">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center gap-4 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
           <Clock size={16} className="text-blue-500" />
           <div className="flex items-baseline gap-2">
             <span className="text-sm font-black dark:text-white tabular-nums">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase">{currentTime.toLocaleDateString(t('common.dateLocale'), { weekday: 'short', day: 'numeric', month: 'short' })}</span>
           </div>
           <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
           <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-green-500" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t('common.synced')}</span>
           </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={handleThemeToggle} className="p-2.5 text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="hidden sm:flex p-2.5 text-slate-400 hover:text-red-600 relative bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
      </div>
    </header>
  );
}

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
    if (auth.isLoggedIn && auth.role === 'student' && !location.pathname.startsWith('/portal/')) {
      navigate(`/portal/${auth.studentCode}`);
    }
  }, [location.pathname, auth]);

  const handleLogin = (role: 'admin' | 'student', studentCode?: string, email?: string) => {
    const newAuth: AuthState = { isLoggedIn: true, role, studentCode, email };
    setAuth(newAuth);
    localStorage.setItem('oss_auth', JSON.stringify(newAuth));
    
    if (role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate(`/portal/${studentCode}`);
    }
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: null });
    localStorage.removeItem('oss_auth');
    navigate('/');
  };

  if (!auth.isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const isPortal = location.pathname.startsWith('/portal/');

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {auth.role === 'admin' && <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />}
      <div className={`flex-1 flex flex-col ${isPortal || auth.role === 'student' ? 'lg:pl-0' : 'lg:pl-20 xl:pl-72'} w-full min-h-screen transition-all duration-300`}>
        {auth.role === 'admin' && <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
        <main className={`p-4 sm:p-8 flex-1 w-full ${isPortal ? '' : 'max-w-full xl:max-w-[1800px]'} mx-auto overflow-x-hidden pb-24 lg:pb-8`}>
          <div className="page-transition">
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
                  <Route path="/exhibition" element={<ExhibitionMode />} />
                  <Route path="/portal/:code" element={<StudentPortal />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                <>
                  <Route path="/portal/:code" element={<StudentPortal />} />
                  <Route path="*" element={<Navigate to={`/portal/${auth.studentCode}`} />} />
                </>
              )}
            </Routes>
          </div>
        </main>
        {auth.role === 'admin' && <BottomNav onLogout={handleLogout} />}
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
