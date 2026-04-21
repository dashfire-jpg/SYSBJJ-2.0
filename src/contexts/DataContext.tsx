import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Student, Payment, ClassSchedule, GalleryImage, ExtraRevenue, KimonoOrder, LessonPlan, LibraryTechnique, Product, Plan, PaymentReceipt, TransactionLedger, SystemLog } from '../types';
import CryptoJS from 'crypto-js';
import { verifyPaymentProof } from '../services/gemini';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface DataContextType {
  students: Student[];
  payments: Payment[];
  receipts: PaymentReceipt[];
  schedules: ClassSchedule[];
  lessonPlans: LessonPlan[];
  techniques: LibraryTechnique[];
  products: Product[];
  plans: Plan[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [receipts, setReceipts] = useState<PaymentReceipt[]>([]);
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [techniques, setTechniques] = useState<LibraryTechnique[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);

  // 🔥 FIRESTORE CORRIGIDO
  useEffect(() => {
    const unsubStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Student)));
    });

    const unsubPayments = onSnapshot(collection(db, 'payments'), (snapshot) => {
      setPayments(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Payment)));
    });

    const unsubReceipts = onSnapshot(collection(db, 'receipts'), (snapshot) => {
      setReceipts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as PaymentReceipt)));
    });

    const unsubSchedules = onSnapshot(collection(db, 'schedules'), (snapshot) => {
      setSchedules(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ClassSchedule)));
    });

    const unsubLessonPlans = onSnapshot(collection(db, 'lesson_plans'), (snapshot) => {
      setLessonPlans(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as LessonPlan)));
    });

    const unsubTechniques = onSnapshot(collection(db, 'techniques'), (snapshot) => {
      setTechniques(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as LibraryTechnique)));
    });

    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product)));
    });

    const unsubPlans = onSnapshot(collection(db, 'plans'), (snapshot) => {
      setPlans(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Plan)));
    });

    return () => {
      unsubStudents();
      unsubPayments();
      unsubReceipts();
      unsubSchedules();
      unsubLessonPlans();
      unsubTechniques();
      unsubProducts();
      unsubPlans();
    };
  }, []);

  const addStudent = async (student: Omit<Student, 'id'>) => {
    const id = `STUD-${Date.now()}`;
    await setDoc(doc(db, 'students', id), { ...student, id });
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    await setDoc(doc(db, 'students', id), updates, { merge: true });
  };

  const deleteStudent = async (id: string) => {
    await deleteDoc(doc(db, 'students', id));
  };

  return (
    <DataContext.Provider value={{
      students,
      payments,
      receipts,
      schedules,
      lessonPlans,
      techniques,
      products,
      plans,
      addStudent,
      updateStudent,
      deleteStudent
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData deve ser usado dentro do DataProvider');
  return context;
};
