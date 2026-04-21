import React, { useState } from "react";
import { useTranslation } from "../contexts/LanguageContext";
import { useData } from "../contexts/DataContext";
import type { Student } from "../types";
import { StudentStatus } from "../types";

const safeNumber = (value: string | number | null | undefined): number => {
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
};

const StudentDetailsModal = ({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] =
    useState<"overview" | "analysis" | "edit" | "admin">("overview");

  const { t } = useTranslation();
  const { deleteStudent, updateStudent } = useData();

  const [editPros, setEditPros] = useState(student.pros || "");
  const [editCons, setEditCons] = useState(student.cons || "");
  const [editFormData, setEditFormData] = useState<Student>({ ...student });

  const handleUpdateAnalysis = async () => {
    await updateStudent(student.id, {
      pros: editPros,
      cons: editCons,
    });
  };

  const handleUpdateRegistration = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await updateStudent(student.id, editFormData);
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-4xl">

        <div className="p-4 bg-slate-900 text-white flex justify-between">
          <h2>{student.name}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-4">
          {activeTab === "overview" && (
            <div>
              <p>Idade: {calculateAge(student.birthDate)}</p>
              <p>Faixa: {student.belt}</p>
            </div>
          )}

          {activeTab === "edit" && (
            <form onSubmit={handleUpdateRegistration}>
              <input
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
              />

              <input
                type="number"
                value={editFormData.monthlyValue ?? 0}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    monthlyValue: safeNumber(e.target.value),
                  })
                }
              />

              <button type="submit">Salvar</button>
            </form>
          )}

          {activeTab === "analysis" && (
            <div>
              <textarea
                value={editPros}
                onChange={(e) => setEditPros(e.target.value)}
              />
              <textarea
                value={editCons}
                onChange={(e) => setEditCons(e.target.value)}
              />
              <button onClick={handleUpdateAnalysis}>Salvar</button>
            </div>
          )}

          {activeTab === "admin" && (
            <div>
              <button
                onClick={() =>
                  updateStudent(student.id, {
                    status: StudentStatus.INACTIVE,
                  })
                }
              >
                Pausar
              </button>

              <button
                onClick={() => {
                  deleteStudent(student.id);
                  onClose();
                }}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Students() {
  return (
    <StudentDetailsModal student={{} as any} onClose={() => {}} />
  );
}
