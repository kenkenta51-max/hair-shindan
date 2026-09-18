import { FoundationPreview } from '../pages/FoundationPreview';
import { Home } from '../pages/Home';
import { DiagnosisQ1 } from '../pages/DiagnosisQ1';
import { DiagnosisQ2 } from '../pages/DiagnosisQ2';
import { DiagnosisQ3 } from '../pages/DiagnosisQ3';
import { DiagnosisQ4 } from '../pages/DiagnosisQ4';
import { DiagnosisQ5 } from '../pages/DiagnosisQ5';
import { DiagnosisQ6 } from '../pages/DiagnosisQ6';
import { DiagnosisResult } from '../pages/DiagnosisResult';
import { buildDiagnosisResult } from '../domain/diagnosisEngine';
import { useConsultationAnswers } from './useConsultationAnswers';
import { useEffect, useState } from 'react';

export function App() {
  const { answers, setImpression, toggleConcern, setCurrentHair, setDesiredBrightness, setPriority, setPlanPreference, resetAnswers } = useConsultationAnswers();
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    const updateRoute = () => { setRoute(window.location.hash); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);
  useEffect(() => {
    document.title = route === '#/diagnosis' ? 'Q1 なりたい印象 | LUMINA' : route === '#/diagnosis/q2' ? 'Q2 髪の悩み | LUMINA' : route === '#/diagnosis/q3' ? 'Q3 現在の髪色 | LUMINA' : route === '#/diagnosis/q4' ? 'Q4 希望の明るさ | LUMINA' : route === '#/diagnosis/q5' ? 'Q5 大切にしたいこと | LUMINA' : route === '#/diagnosis/q6' ? 'Q6 時間と予算 | LUMINA' : route === '#/diagnosis/result' ? '診断結果 | LUMINA' : 'LUMINA AI HAIR CONSULTATION';
  }, [route]);
  if (route === '#/foundation') return <FoundationPreview />;
  if (route === '#/diagnosis') return <DiagnosisQ1 selected={answers.impression} onSelect={setImpression} onNext={() => { if (answers.impression) window.location.hash = '/diagnosis/q2'; }} />;
  if (route === '#/diagnosis/q2') return <DiagnosisQ2 selected={answers.concerns ?? []} onToggle={toggleConcern} onBack={() => { window.location.hash = '/diagnosis'; }} onNext={() => { if (answers.concerns?.length) window.location.hash = '/diagnosis/q3'; }} />;
  if (route === '#/diagnosis/q3') return <DiagnosisQ3 selected={answers.currentHair} onSelect={setCurrentHair} onBack={() => { window.location.hash = '/diagnosis/q2'; }} onNext={() => { if (answers.currentHair) window.location.hash = '/diagnosis/q4'; }} />;
  if (route === '#/diagnosis/q4') return <DiagnosisQ4 selected={answers.desiredBrightness} onSelect={setDesiredBrightness} onBack={() => { window.location.hash = '/diagnosis/q3'; }} onNext={() => { if (answers.desiredBrightness) window.location.hash = '/diagnosis/q5'; }} />;
  if (route === '#/diagnosis/q5') return <DiagnosisQ5 selected={answers.priority} onSelect={setPriority} onBack={() => { window.location.hash = '/diagnosis/q4'; }} onNext={() => { if (answers.priority) window.location.hash = '/diagnosis/q6'; }} />;
  if (route === '#/diagnosis/q6') return <DiagnosisQ6 selected={answers.planPreference} onSelect={setPlanPreference} onBack={() => { window.location.hash = '/diagnosis/q5'; }} onNext={() => { if (answers.planPreference) window.location.hash = '/diagnosis/result'; }} />;
  if (route === '#/diagnosis/result') return <DiagnosisResult result={buildDiagnosisResult(answers)} onRestart={() => { resetAnswers(); window.location.hash = '/diagnosis'; }} />;
  return <Home onStart={() => { window.location.hash = '/diagnosis'; }} />;
}
