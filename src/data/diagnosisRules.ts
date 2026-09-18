import type { Scores, Impression, Concern, DesiredBrightness, Priority } from '../domain/types';
// STEP10正式採点表。Q3・Q6はカラー点数に含めない。
export const impressionPoints = {
  "adult": {
    "ash_brown": 5,
    "chocolat_brown": 3,
    "milk_tea_beige": 0,
    "olive_greige": 2,
    "lavender_brown": 2
  },
  "cute": {
    "ash_brown": 0,
    "chocolat_brown": 2,
    "milk_tea_beige": 5,
    "olive_greige": 1,
    "lavender_brown": 4
  },
  "clean": {
    "ash_brown": 5,
    "chocolat_brown": 2,
    "milk_tea_beige": 1,
    "olive_greige": 3,
    "lavender_brown": 2
  },
  "korean": {
    "ash_brown": 2,
    "chocolat_brown": 0,
    "milk_tea_beige": 3,
    "olive_greige": 5,
    "lavender_brown": 1
  },
  "glowup": {
    "ash_brown": 1,
    "chocolat_brown": 0,
    "milk_tea_beige": 5,
    "olive_greige": 4,
    "lavender_brown": 3
  },
  "calm": {
    "ash_brown": 4,
    "chocolat_brown": 5,
    "milk_tea_beige": 0,
    "olive_greige": 1,
    "lavender_brown": 2
  },
  "cool": {
    "ash_brown": 4,
    "chocolat_brown": 0,
    "milk_tea_beige": 1,
    "olive_greige": 5,
    "lavender_brown": 1
  },
  "omakase": {
    "ash_brown": 0,
    "chocolat_brown": 0,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 0
  }
} as const satisfies Record<Impression, Scores>;
export const concernColorPoints = {
  "heavy_color": {
    "ash_brown": 1,
    "chocolat_brown": 0,
    "milk_tea_beige": 1,
    "olive_greige": 1,
    "lavender_brown": 0
  },
  "color_fade": {
    "ash_brown": 0,
    "chocolat_brown": 1,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 1
  },
  "damage": {
    "ash_brown": 0,
    "chocolat_brown": 1,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 1
  },
  "dryness": {
    "ash_brown": 0,
    "chocolat_brown": 1,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 1
  },
  "frizz": {
    "ash_brown": 0,
    "chocolat_brown": 0,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 0
  },
  "volume": {
    "ash_brown": 0,
    "chocolat_brown": 0,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 0
  },
  "roots": {
    "ash_brown": 1,
    "chocolat_brown": 1,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 0
  },
  "change_impression": {
    "ash_brown": 0,
    "chocolat_brown": 0,
    "milk_tea_beige": 1,
    "olive_greige": 1,
    "lavender_brown": 1
  }
} as const satisfies Record<Concern, Scores>;
export const brightnessPoints = {
  "keep_dark": {
    "ash_brown": 3,
    "chocolat_brown": 5,
    "milk_tea_beige": 0,
    "olive_greige": 1,
    "lavender_brown": 2
  },
  "slightly_brighter": {
    "ash_brown": 4,
    "chocolat_brown": 2,
    "milk_tea_beige": 2,
    "olive_greige": 4,
    "lavender_brown": 3
  },
  "much_brighter": {
    "ash_brown": 1,
    "chocolat_brown": 0,
    "milk_tea_beige": 5,
    "olive_greige": 4,
    "lavender_brown": 3
  },
  "omakase": {
    "ash_brown": 0,
    "chocolat_brown": 0,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 0
  }
} as const satisfies Record<DesiredBrightness, Scores>;
export const priorityPoints = {
  "suitability": {
    "ash_brown": 0,
    "chocolat_brown": 0,
    "milk_tea_beige": 0,
    "olive_greige": 0,
    "lavender_brown": 0
  },
  "low_damage": {
    "ash_brown": 2,
    "chocolat_brown": 5,
    "milk_tea_beige": 0,
    "olive_greige": 1,
    "lavender_brown": 3
  },
  "color_longevity": {
    "ash_brown": 3,
    "chocolat_brown": 5,
    "milk_tea_beige": 1,
    "olive_greige": 1,
    "lavender_brown": 3
  },
  "trend": {
    "ash_brown": 1,
    "chocolat_brown": 0,
    "milk_tea_beige": 4,
    "olive_greige": 5,
    "lavender_brown": 3
  },
  "easy_care": {
    "ash_brown": 3,
    "chocolat_brown": 5,
    "milk_tea_beige": 1,
    "olive_greige": 2,
    "lavender_brown": 3
  },
  "cost_performance": {
    "ash_brown": 3,
    "chocolat_brown": 5,
    "milk_tea_beige": 0,
    "olive_greige": 1,
    "lavender_brown": 2
  }
} as const satisfies Record<Priority, Scores>;
export const bleachAddition = { price: 6600, minutes: 60 } as const;
export const bleachNotice = '実際にブリーチが必要かどうかは髪の状態や履歴によって異なります';
