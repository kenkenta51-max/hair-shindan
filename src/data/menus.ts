import type { Menu } from '../domain/types';

/** 金額は税込の円、時間は分。セットの時間は menuSets.ts を使用。 */
export const menus = [
  { id: 'cut', name: 'カット', description: '骨格に合わせた似合わせカット', priceYen: 5000, durationMinutes: 60 },
  { id: 'bang_cut', name: '前髪カット', description: '前髪の長さと形を整えます', priceYen: 1500, durationMinutes: 15 },
  { id: 'color', name: 'カラー', description: 'おすすめの色味で全体を整えます', priceYen: 7000, durationMinutes: 90 },
  { id: 'retouch', name: 'リタッチカラー', description: '根元の色を整えます', priceYen: 5500, durationMinutes: 60 },
  { id: 'bleach', name: 'ブリーチ', description: '明るいカラーのためのベースづくり', priceYen: 8000, durationMinutes: 120 },
  { id: 'treatment', name: 'トリートメント', description: 'うるおいとツヤを与えるケア', priceYen: 4000, durationMinutes: 30 },
  { id: 'hair_improvement', name: '髪質改善トリートメント', description: '髪の状態に合わせた集中ケア', priceYen: 8000, durationMinutes: 90 },
  { id: 'perm', name: 'パーマ', description: '髪に動きをつけます', priceYen: 8000, durationMinutes: 120 },
  { id: 'straightening', name: '縮毛矯正', description: 'クセ・うねりへの施術候補', priceYen: 15000, durationMinutes: 180 },
  { id: 'head_spa', name: 'ヘッドスパ', description: '頭皮をいたわるケア', priceYen: 4500, durationMinutes: 45 },
] as const satisfies readonly Menu[];
