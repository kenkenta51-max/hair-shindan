import type { Answers, ColorId, DiagnosisResult, Scores } from './types';
import { questions } from '../data/questions.ts';
import { colors, colorTieBreakOrder } from '../data/colors.ts';
import { impressionPoints, concernColorPoints, brightnessPoints, priorityPoints, bleachAddition, bleachNotice } from '../data/diagnosisRules.ts';
import { diagnosisPlans, beforeImages, menuImages } from '../data/diagnosisPlans.ts';

/** Storage/URL経由の不完全・不正な値も診断しない。旧回答キーは判定に使わない。 */
export function getInvalidAnswerKeys(value: unknown): string[] {
  const record = value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
  return questions.filter(question => {
    const answer = record[question.id];
    const options: readonly { value: unknown }[] = question.options;
    if (question.mode === 'multiple') {
      return !Array.isArray(answer) || answer.length < question.minSelections || answer.length > question.maxSelections
        || new Set(answer).size !== answer.length || answer.some(id => !options.some(option => option.value === id));
    }
    return !options.some(option => option.value === answer);
  }).map(question => question.id);
}
export function isComplete(value: unknown): value is Answers { return getInvalidAnswerKeys(value).length === 0; }
const emptyScores = (): Scores => ({ ash_brown: 0, chocolat_brown: 0, milk_tea_beige: 0, olive_greige: 0, lavender_brown: 0 });
export function rankColors(scores: Scores, q1: Scores, q4: Scores, q5: Scores): ColorId[] {
  return [...colorTieBreakOrder].sort((a, b) => scores[b] - scores[a] || q1[b] - q1[a] || q4[b] - q4[a] || q5[b] - q5[a] || colorTieBreakOrder.indexOf(a) - colorTieBreakOrder.indexOf(b));
}
export function ratingFromGap(gap: number): 4 | 4.5 | 5 { return gap >= 5 ? 5 : gap >= 3 ? 4.5 : 4; }
export function assessBleach(answers: Pick<Answers, 'currentHair' | 'desiredBrightness'>, type: ColorId): boolean {
  if (answers.currentHair === 'bleached') return false;
  const dark = answers.currentHair === 'black' || answers.currentHair === 'dark_brown';
  return (type === 'milk_tea_beige' && (dark || answers.currentHair === 'brown'))
    || (answers.desiredBrightness === 'much_brighter' && dark && type !== 'chocolat_brown');
}
/** 副作用なし。未回答・不正回答ではnullを返し、結果を捏造しない。 */
export function buildDiagnosisResult(value: unknown): DiagnosisResult | null {
  if (!isComplete(value)) return null;
  const answers = value;
  const q1 = { ...impressionPoints[answers.impression] };
  const q2 = emptyScores();
  const q4 = { ...brightnessPoints[answers.desiredBrightness] };
  const q5 = { ...priorityPoints[answers.priority] };
  for (const concern of answers.concerns) for (const id of colorTieBreakOrder) q2[id] += concernColorPoints[concern][id];
  const scores = emptyScores();
  for (const id of colorTieBreakOrder) scores[id] = q1[id] + q2[id] + q4[id] + q5[id];
  const ranked = rankColors(scores, q1, q4, q5);
  const type = ranked[0]!;
  const color = colors.find(color => color.id === type)!;
  const needsBleach = assessBleach(answers, type);
  const careCount = answers.concerns.filter(id => id === 'damage' || id === 'dryness' || id === 'frizz').length;
  const treatmentLevel = careCount >= 2 ? 'intensive' : careCount === 1 ? 'standard' : 'none';
  const needsRootCare = answers.concerns.includes('roots');
  const recommendCut = answers.concerns.includes('volume') || answers.priority === 'easy_care';
  const plan = diagnosisPlans[answers.planPreference];
  const intensive = treatmentLevel === 'intensive';
  return {
    ruleVersion: 'step10-v1', type, title: color.name, englishName: color.englishName, description: color.description,
    scores, scoreBreakdown: { q1, q2, q4, q5 }, beforeImage: beforeImages[answers.currentHair], afterImage: color.image.src,
    needsBleach, bleachLabel: needsBleach ? 'ブリーチ推奨' : '髪の状態によりブリーチをご提案', bleachNotice,
    needsTreatment: careCount > 0, treatmentLevel, needsRootCare, recommendCut,
    planPreference: answers.planPreference, planTitle: plan.title, menuLevel: plan.menuLevel,
    recommendedMenu: [
      { type: 'cut', name: plan.menuNames[0], description: answers.planPreference === 'result_first' ? '顔立ちや雰囲気に合わせて形を整えます。' : recommendCut ? 'ボリュームや扱いやすさを考え、毎日整えやすい形に。' : '全体のバランスを整えるカット。', image: menuImages.cut, emphasized: recommendCut },
      { type: 'color', name: plan.menuNames[1], description: `${color.name}をご提案します。${needsRootCare ? '根元との色差も自然に整えます。' : ''}${needsBleach ? '髪の状態によりブリーチをご提案します。' : ''}`, image: menuImages.color, emphasized: true },
      { type: 'treatment', name: intensive ? '集中補修トリートメント' : plan.menuNames[2], description: careCount > 0 ? (intensive ? '複数の髪の悩みに合わせた集中補修ケアを優先してご提案します。' : '気になる髪の悩みに合わせた補修ケアを優先してご提案します。') : answers.planPreference === 'quick' ? '短時間のケアで指通りを整えます。' : answers.planPreference === 'balanced' ? 'うるおいと指通りを整えるケア。' : '仕上がりの質感を整える集中ケア。', image: menuImages.treatment, emphasized: careCount > 0 },
    ],
    // ケア/根元/カット補正は表示の補正のみ。追加金額が指定されたブリーチだけ加算。
    estimatedPrice: plan.price + (needsBleach ? bleachAddition.price : 0),
    estimatedTime: plan.minutes + (needsBleach ? bleachAddition.minutes : 0),
    recommendationRating: ratingFromGap(scores[type] - scores[ranked[1]!]), recommendationLabel: 'あなたの回答とのマッチ度',
  };
}
