import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, TrendingUp, AlertCircle, Calendar,
  Timer, UserPlus, CheckCircle2, Trophy as TrophyIcon,
  ArrowUpRight, ArrowDownRight, BarChart3, ArrowRight,
  Store, Activity, Shield, Instagram, Zap, Cake
} from 'lucide-react';

import { useTranslation } from '../contexts/LanguageContext';
import { useProfile } from '../contexts/ProfileContext';
import { useData } from '../contexts/DataContext';
import { StudentStatus } from '../types';

const StatCard = ({ title, value, icon, trend, trendUp }: any) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border shadow-sm">
    <div className="flex justify-between mb-2">
      {icon}
      <span className={trendUp ? 'text-green-500' : 'text-red-500'}>
        {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </span>
    </div>
    <p className="text-xs text-gray-500">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { profile } = useProfile();
  const navigate = useNavigate();

  // ✅ PROTEÇÃO TOTAL AQUI
  const {
    students = [],
    payments = [],
    schedules = [],
    extraRevenue = [],
    lessonPlans = []
  } = useData();

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // ✅ TODOS PROTEGIDOS
  const validStudents = (students || []).filter(s => s.status !== StudentStatus.INACTIVE);
  const totalStudents = validStudents.length;

  const activeStudents = (students || []).filter(s => s.status === StudentStatus.ACTIVE).length;

  const monthlyRevenue = (payments || [])
    .filter(p => p.status === 'Confirmed')
    .reduce((sum, p) => sum + p.amount, 0);

  const monthlyExtra = (extraRevenue || [])
    .reduce((sum, r) => sum + r.amount, 0);

  const pendingPaymentsCount = (students || [])
    .filter(s => s.status === StudentStatus.OVERDUE).length;

  const competitorsCount = (students || [])
    .filter(s => s.isCompetitor).length;

  const latestPlan = lessonPlans?.[0] || null;

  const currentClass = (schedules || []).find(cls => {
    const [h, m] = cls.time.split(':').map(Number);
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const clsMin = h * 60 + m;
    return nowMin >= clsMin && nowMin < clsMin + 90;
  });

  const upcomingBirthdays = useMemo(() => {
    const currentMonth = now.getMonth();
    return (students || []).filter(s => {
      if (!s.birthDate) return false;
      return new Date(s.birthDate).getMonth() === currentMonth;
    });
  }, [students, now]);

  const auth = JSON.parse(localStorage.getItem('oss_auth') || '{}');
  const isMasterAdmin = auth.email === 'dashfire@gmail.com';

  return (
    <div className="p-4 space-y-6">

      <h1 className="text-2xl font-bold">
        Oss, {profile?.name?.split(' ')[0] || 'Sensei'}
      </h1>

      {currentClass && (
        <div className="p-4 bg-blue-100 rounded-xl">
          Aula em andamento: {currentClass.title} ({currentClass.time})
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard title="Total" value={totalStudents} icon={<Users />} trend="+" trendUp />
        <StatCard title="Ativos" value={activeStudents} icon={<CheckCircle2 />} trend="+" trendUp />
        <StatCard title="Atletas" value={competitorsCount} icon={<TrophyIcon />} trend="+" trendUp />
        <StatCard title="Receita" value={`R$ ${monthlyRevenue}`} icon={<TrendingUp />} trend="+" trendUp />
        <StatCard title="Extra" value={`R$ ${monthlyExtra}`} icon={<Store />} trend="+" trendUp />
        <StatCard title="Pendentes" value={pendingPaymentsCount} icon={<AlertCircle />} trend="-" />
      </div>

      {/* AÇÕES */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => navigate('/students')} className="btn">
          <UserPlus /> Novo Aluno
        </button>

        <button onClick={() => navigate('/attendance')} className="btn">
          Presença
        </button>

        <button onClick={() => navigate('/business')} className="btn">
          Financeiro
        </button>
      </div>

      {/* ANIVERSÁRIOS */}
      <div>
        <h2 className="font-bold mb-2">Aniversários do mês</h2>
        {(upcomingBirthdays || []).length === 0 && <p>Nenhum</p>}

        {(upcomingBirthdays || []).map((s, i) => (
          <div key={i} className="p-2 border mb-1">
            {s.name}
          </div>
        ))}
      </div>

      {/* PAGAMENTOS RECENTES */}
      <div>
        <h2 className="font-bold mb-2">Pagamentos recentes</h2>

        {(payments || []).slice(-5).map((p, i) => (
          <div key={i} className="p-2 border mb-1">
            {p.name} - R$ {p.amount}
          </div>
        ))}
      </div>

      {isMasterAdmin && (
        <button onClick={() => navigate('/audit')} className="btn">
          <Shield /> Auditoria
        </button>
      )}
    </div>
  );
};

export default Dashboard;
