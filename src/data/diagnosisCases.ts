import type { Answers, ColorId } from '../domain/types';
interface DiagnosisCase { id: string; answers: Answers; expectedType: ColorId; expectedScores: readonly number[] }
const base = { concerns: ['volume'], currentHair: 'dark_brown', planPreference: 'balanced' } as const;
/** STEP10。省略されたQ2は色加点なしのvolume、Q3/Q6は共通の補完データ。 */
export const diagnosisCases: readonly DiagnosisCase[] = [
 { id: 'A', answers: { ...base, concerns: ['volume'], impression: 'adult', desiredBrightness: 'slightly_brighter', priority: 'suitability' }, expectedType: 'ash_brown', expectedScores: [9,5,2,6,5] },
 { id: 'B', answers: { ...base, concerns: ['volume'], impression: 'cute', desiredBrightness: 'much_brighter', priority: 'trend' }, expectedType: 'milk_tea_beige', expectedScores: [2,2,14,10,10] },
 { id: 'C', answers: { ...base, concerns: ['volume'], impression: 'korean', desiredBrightness: 'slightly_brighter', priority: 'trend' }, expectedType: 'olive_greige', expectedScores: [7,2,9,14,7] },
 { id: 'D', answers: { ...base, concerns: ['volume'], impression: 'calm', desiredBrightness: 'keep_dark', priority: 'color_longevity' }, expectedType: 'chocolat_brown', expectedScores: [10,15,1,3,7] },
 { id: 'E', answers: { ...base, concerns: ['damage','dryness'], impression: 'cute', desiredBrightness: 'slightly_brighter', priority: 'low_damage' }, expectedType: 'lavender_brown', expectedScores: [6,11,7,6,12] },
];
