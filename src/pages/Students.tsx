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
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'edit' | 'admin'>('overview');

  const { t } = useTranslation();
  const { deleteStudent, updateStudent } = useData();

  const [editPros, setEditPros] = useState<string>(student.pros || '');
  const [editCons, setEditCons] = useState<string>(student.cons || '');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [editFormData, setEditFormData] = useState<Student>({ ...student });

  const handleUpdateAnalysis = async (): Promise<void> => {
    await updateStudent(student.id, {
      pros: editPros,
      cons: editCons,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleUpdateRegistration = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    await updateStudent(student.id, editFormData);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setActiveTab('overview');
    }, 1500);
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase">{student.name}</h2>
            <p className="text-xs opacity-70">
              {t(`belts.${student.belt}`)}
            </p>
          </div>

          <button onClick={onClose} className="text-white text-xl">
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-2 p-4 bg-slate-100 dark:bg-slate-800 text-xs font-black uppercase">
          {(['overview', 'edit', 'analysis', 'admin'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab ? 'text-blue-600' : 'text-slate-400'
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto flex-1">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-3 text-sm">
              <p><b>Idade:</b> {calculateAge(student.birthDate)}</p>
              <p><b>Faixa:</b> {student.belt}</p>
              <p><b>Telefone:</b> {student.phone}</p>
              <p><b>Mensalidade:</b> R$ {student.monthlyValue}</p>
              <p><b>Presenças:</b> {student.attendanceCount}</p>
            </div>
          )}

          {/* EDIT */}
          {activeTab === 'edit' && (
            <form onSubmit={handleUpdateRegistration} className="grid gap-4">

              <input
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="input"
                placeholder="Nome"
              />

              <input
                type="number"
                value={editFormData.monthlyValue ?? 0}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    monthlyValue: safeNumber(e.target.value),
                  }))
                }
                className="input"
                placeholder="Mensalidade"
              />

              <select
                value={editFormData.belt}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    belt: e.target.value as Student['belt'],
                  }))
                }
                className="input"
              >
                {Object.values(BeltColor).map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <button className="bg-blue-600 text-white py-3 rounded-xl font-black">
                SALVAR
              </button>
            </form>
          )}

          {/* ANALYSIS */}
          {activeTab === 'analysis' && (
            <div className="space-y-4">

              <textarea
                value={editPros}
                onChange={(e) => setEditPros(e.target.value)}
                className="w-full p-3 border rounded-xl"
                placeholder="Pontos fortes"
              />

              <textarea
                value={editCons}
                onChange={(e) => setEditCons(e.target.value)}
                className="w-full p-3 border rounded-xl"
                placeholder="Pontos fracos"
              />

              <button
                onClick={handleUpdateAnalysis}
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                SALVAR
              </button>
            </div>
          )}

          {/* ADMIN */}
          {activeTab === 'admin' && (
            <div className="space-y-4">

              <button
                onClick={() =>
                  updateStudent(student.id, {
                    status: StudentStatus.INACTIVE,
                  })
                }
                className="bg-amber-500 text-white px-4 py-2 rounded-xl"
              >
                PAUSAR
              </button>

              <button
                onClick={() => {
                  if (confirm('Excluir aluno?')) {
                    deleteStudent(student.id);
                    onClose();
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                EXCLUIR
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
