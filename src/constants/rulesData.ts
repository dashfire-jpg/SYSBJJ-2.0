export interface RuleLesson {
  id: string;
  title: string;
  category: "Points" | "Fouls" | "Graduation" | "Etiquette";
  content: string;
  points: number;
  icon: string;
}

export const IBJJF_LESSONS: RuleLesson[] = [
  {
    id: "rule-1",
    title: "Pontuação: Quedas (2 Pontos)",
    category: "Points",
    content:
      "Uma queda é contabilizada quando um atleta projeta o oponente ao solo e mantém o controle por 3 segundos.",
    points: 10,
    icon: "Trophy",
  },
  {
    id: "rule-2",
    title: "Passagem de Guarda (3 Pontos)",
    category: "Points",
    content:
      "Quando o atleta que está por cima consegue transpor a guarda e estabilizar a posição por 3 segundos.",
    points: 15,
    icon: "ArrowRight",
  },
  {
    id: "rule-3",
    title: "Montada (4 Pontos)",
    category: "Points",
    content:
      "Quando o atleta controla o tronco do oponente sentado sobre ele com estabilidade por 3 segundos.",
    points: 20,
    icon: "Shield",
  },
  {
    id: "rule-4",
    title: "Faltas: Slam",
    category: "Fouls",
    content:
      "É proibido projetar o oponente com finalização encaixada. Resulta em desclassificação imediata.",
    points: 10,
    icon: "AlertTriangle",
  },
  {
    id: "rule-5",
    title: "Graduação",
    category: "Graduation",
    content:
      "A progressão de faixas segue critérios técnicos e tempo de prática definidos pelo professor.",
    points: 5,
    icon: "GraduationCap",
  },
  {
    id: "rule-6",
    title: "Etiqueta",
    category: "Etiquette",
    content:
      "Respeito é fundamental: cumprimente o tatame e seus parceiros antes e depois do treino.",
    points: 5,
    icon: "Users",
  },
];
