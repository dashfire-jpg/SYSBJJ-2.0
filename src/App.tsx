import React, { useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';

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

interface AuthState {
  isLoggedIn: boolean;
  role: 'admin' | 'student' | null;
  studentCode?: string;
}

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { isLoggedIn: false, role: null };
  });

  useEffect(() => {
    if (
      auth.isLoggedIn &&
      auth.role === 'student' &&
      !location.pathname.startsWith('/portal/')
    ) {
      navigate(`/portal/${auth.studentCode}`);
    }
  }, [auth, location]);

  const handleLogin = (role: 'admin' | 'student', studentCode?: string) => {
    const newAuth = { isLoggedIn: true, role, studentCode };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));

    navigate(role === 'admin' ? '/dashboard' : `/portal/${studentCode}`);
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: null });
    localStorage.removeItem('auth');
    navigate('/');
  };

  if (!auth.isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex">
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

export default App;
