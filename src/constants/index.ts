import { IBJJF_LESSONS as RAW_IBJJF_LESSONS } from "./rulesData";
import { BELT_COLORS as RAW_BELT_COLORS } from "./beltColors";

export const BELT_COLORS = RAW_BELT_COLORS ?? {};

export const IBJJF_LESSONS = RAW_IBJJF_LESSONS ?? {};

export const IBJJF_BELT_RULES =
  RAW_IBJJF_LESSONS?.IBJJF_BELT_RULES ?? {
    kids: {
      white: { minAge: 4, maxAge: 15 },
    },
    adults: {
      white: { minTime: 0 },
      blue: { minTime: 2 },
      purple: { minTime: 5 },
      brown: { minTime: 1 },
    },
  };
