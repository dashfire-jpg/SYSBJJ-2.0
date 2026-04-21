export const NAVIGATION_ITEMS = [
  { id: "dashboard", icon: "📊" },
  { id: "students", icon: "👥" },
  { id: "classes", icon: "🥋" },
  { id: "business", icon: "💼" },
  { id: "curriculum", icon: "📘" },
];

export { BELT_COLORS } from "./beltColors";
export { IBJJF_LESSONS } from "./rulesData";

export const IBJJF_BELT_RULES = {
  kids: {
    white: { minAge: 4, maxAge: 15 },
    gray: { minAge: 4, maxAge: 15 },
    yellow: { minAge: 7, maxAge: 15 },
    orange: { minAge: 10, maxAge: 15 },
    green: { minAge: 13, maxAge: 15 },
  },

  adults: {
    white: { minTime: 0 },
    blue: { minTime: 2 },
    purple: { minTime: 5 },
    brown: { minTime: 1 },
    black: { minTime: 0 },
  },
};
