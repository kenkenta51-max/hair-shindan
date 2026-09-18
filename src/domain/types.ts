export type Impression = 'adult' | 'cute' | 'clean' | 'korean' | 'glowup' | 'calm' | 'cool' | 'omakase';
export type Concern = 'heavy_color' | 'color_fade' | 'damage' | 'dryness' | 'frizz' | 'volume' | 'roots' | 'change_impression';
export type CurrentHair = 'black' | 'dark_brown' | 'brown' | 'light_brown' | 'bleached';
export type DesiredBrightness = 'keep_dark' | 'slightly_brighter' | 'much_brighter' | 'omakase';
export type Priority = 'suitability' | 'low_damage' | 'color_longevity' | 'trend' | 'easy_care' | 'cost_performance';
export type PlanPreference = 'quick' | 'balanced' | 'full_change' | 'result_first';
export type Restriction = 'strict' | 'moderate' | 'flexible' | 'none';
export type Budget = 5000 | 10000 | 15000 | 20000 | null;
export type AvailableTime = 60 | 90 | 120 | 180 | null;
/** null = 制限なし。未回答(undefined)とは区別する。 */
export interface Answers {
  impression: Impression;
  concerns: Concern[];
  currentHair: CurrentHair;
  desiredBrightness: DesiredBrightness;
  /** 旧仕様の診断資料用。現行Q4の回答とは別の条件。 */
  restriction?: Restriction;
  priority: Priority;
  /** 旧Q5の予算資料用。priorityとは別の条件。 */
  budget?: Budget;
  planPreference: PlanPreference;
  /** 旧Q6の時間資料用。現行回答はplanPreference。 */
  availableTime?: AvailableTime;
}
export type AnswerDraft = Partial<Answers>;
export interface ImageAsset { src: string; alt: string; objectPosition?: string }
export interface Choice<T> { value: T; label: string; description?: string; image?: ImageAsset }
type SingleKey = Exclude<keyof Answers, 'concerns' | 'restriction' | 'budget' | 'availableTime'>;
type SingleQuestion = { [K in SingleKey]: {
  id: K; step: number; title: string; description?: string;
  mode: 'single'; options: readonly Choice<Answers[K]>[];
} }[SingleKey];
export type Question = SingleQuestion | {
  id: 'concerns'; step: number; title: string; description?: string;
  mode: 'multiple'; minSelections: 1; maxSelections: 3;
  options: readonly Choice<Concern>[];
};
export type ColorId = 'ash_brown' | 'chocolat_brown' | 'milk_tea_beige' | 'olive_greige' | 'lavender_brown';
export type Brightness = 'dark' | 'natural' | 'light';
export interface HairColor {
  id: ColorId; name: string; englishName: string; features: readonly string[];
  tieBreakRank: number; image?: ImageAsset;
}
export interface ColorRecommendation {
  colorId: ColorId; brightness: Brightness; displayName: string;
  score: number; reason: string;
}
export type MenuId = 'cut' | 'bang_cut' | 'color' | 'retouch' | 'bleach' | 'treatment' | 'hair_improvement' | 'perm' | 'straightening' | 'head_spa';
export interface Menu {
  id: MenuId; name: string; description: string;
  priceYen: number; durationMinutes: number; image?: ImageAsset;
}
export type MenuSetId = 'standard' | 'care_color' | 'hair_improvement_course' | 'full_maintenance' | 'relax';
export interface MenuSet {
  id: MenuSetId; name: string; menuIds: readonly MenuId[];
  priceYen: number; durationMinutes: number;
}
export type BleachStatus = 'recommended' | 'conditional' | 'not_added';
/** not_added は医学的・美容上の「不要」の確定ではない。 */
export type BleachAssessment =
  | { status: 'recommended'; includeInEstimate: true; notice: string }
  | { status: 'conditional'; includeInEstimate: 'both'; notice: string }
  | { status: 'not_added'; includeInEstimate: false; notice?: string };
export interface ConstraintCheck {
  status: 'within' | 'exceeded' | 'unlimited';
  limit: number | null; required: number; excess: number;
}
export interface PlanEstimate {
  menuIds: readonly MenuId[]; setId?: MenuSetId;
  priceYen: number; durationMinutes: number; includesBleach: boolean;
  budget: ConstraintCheck; time: ConstraintCheck;
}
export interface TreatmentPlan {
  /** 条件付きブリーチでは、追加なしと追加ありの両方を保持。 */
  estimates: readonly [PlanEstimate, ...PlanEstimate[]];
  feasibility: 'feasible' | 'conditional' | 'over_budget' | 'over_time' | 'over_both';
  notices: readonly string[];
}
export type Scores = Record<ColorId, number>;
export type TreatmentLevel = 'none' | 'standard' | 'intensive';
export interface RecommendedMenu {
  type: 'cut' | 'color' | 'treatment'; name: string; description: string; image: string;
  emphasized: boolean;
}
export interface DiagnosisResult {
  ruleVersion: 'step10-v1'; type: ColorId; title: string; englishName: string; description: string;
  scores: Scores; scoreBreakdown: { q1: Scores; q2: Scores; q4: Scores; q5: Scores };
  beforeImage: string; afterImage: string;
  needsBleach: boolean; bleachLabel: string; bleachNotice: string;
  needsTreatment: boolean; treatmentLevel: TreatmentLevel; needsRootCare: boolean; recommendCut: boolean;
  planPreference: PlanPreference; planTitle: string; menuLevel: 'quick' | 'balanced' | 'full' | 'premium';
  recommendedMenu: RecommendedMenu[]; estimatedPrice: number; estimatedTime: number;
  recommendationRating: 4 | 4.5 | 5; recommendationLabel: 'あなたの回答とのマッチ度';
}
/** Phase 2へ渡す接続データのみ。APIやアップロード処理はまだ作らない。 */
export interface SimulationContext {
  recommendedColorId: ColorId; brightness: Brightness;
}


