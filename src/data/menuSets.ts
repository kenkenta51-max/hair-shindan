import type { MenuSet } from '../domain/types';

/** 独立したセット料金・所要時間。単品の時間合計で上書きしない。 */
export const menuSets = [
  { id: 'standard', name: 'スタンダード', menuIds: ['cut', 'color'], priceYen: 11000, durationMinutes: 120 },
  { id: 'care_color', name: 'ケアカラー', menuIds: ['cut', 'color', 'treatment'], priceYen: 14500, durationMinutes: 150 },
  { id: 'hair_improvement_course', name: '髪質改善コース', menuIds: ['cut', 'hair_improvement'], priceYen: 12000, durationMinutes: 150 },
  { id: 'full_maintenance', name: 'フルメンテナンス', menuIds: ['cut', 'color', 'hair_improvement'], priceYen: 18000, durationMinutes: 180 },
  { id: 'relax', name: 'リラックスコース', menuIds: ['cut', 'head_spa'], priceYen: 8500, durationMinutes: 90 },
] as const satisfies readonly MenuSet[];
