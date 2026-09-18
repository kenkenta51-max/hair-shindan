import type { PlanPreference, CurrentHair } from '../domain/types';
// セット独自の料金と時間。旧単品メニューの合計ではない。
export const diagnosisPlans = {
  "quick": {
    "title": "手軽に整えたい",
    "price": 9800,
    "minutes": 90,
    "menuLevel": "quick",
    "menuNames": [
      "カット",
      "カラー",
      "クイックケア"
    ]
  },
  "balanced": {
    "title": "バランス重視",
    "price": 14500,
    "minutes": 150,
    "menuLevel": "balanced",
    "menuNames": [
      "カット",
      "カラー",
      "トリートメント"
    ]
  },
  "full_change": {
    "title": "しっかり変えたい",
    "price": 18800,
    "minutes": 180,
    "menuLevel": "full",
    "menuNames": [
      "カット",
      "カラー",
      "集中トリートメント"
    ]
  },
  "result_first": {
    "title": "仕上がり重視",
    "price": 22000,
    "minutes": 210,
    "menuLevel": "premium",
    "menuNames": [
      "似合わせカット",
      "デザインカラー",
      "集中トリートメント"
    ]
  }
} as const satisfies Record<PlanPreference, { title: string; price: number; minutes: number; menuLevel: 'quick' | 'balanced' | 'full' | 'premium'; menuNames: readonly [string, string, string] }>;
export const beforeImages = {
  "black": "/images/result/before-black.png",
  "dark_brown": "/images/result/before-dark-brown.png",
  "brown": "/images/result/before-brown.png",
  "light_brown": "/images/result/before-light-brown.png",
  "bleached": "/images/result/before-bleached.png"
} as const satisfies Record<CurrentHair, string>;
export const menuImages = { cut: '/images/result/menu-cut.png', color: '/images/result/menu-color.png', treatment: '/images/result/menu-treatment.png' } as const;
