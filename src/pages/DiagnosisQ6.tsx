import { useEffect, useRef } from 'react';
import { Header } from '../components/Header/Header';
import { Progress } from '../components/Progress/Progress';
import { ChoiceCard } from '../components/ChoiceCard/ChoiceCard';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import type { PlanPreference } from '../domain/types';
import styles from './DiagnosisQ6.module.css';

interface Props { selected?: PlanPreference; onSelect: (id: PlanPreference) => void; onNext: () => void; onBack: () => void }
export function DiagnosisQ6({ selected, onSelect, onNext, onBack }: Props) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus({ preventScroll: true }); }, []);
  const question = questions[5];
  return <div className={styles.page}><Header showMenu /><main>
    <div className={styles.progress}><Progress current={6} total={6} /></div>
    <h1 id="q6-title" ref={title} tabIndex={-1}>施術にかけられる<br />時間と予算は？</h1>
    <p id="q6-help" className={styles.help}>{question.description}</p>
    <fieldset aria-labelledby="q6-title" aria-describedby="q6-help">
      <div className={styles.grid}>
        {question.options.map(option => <ChoiceCard key={option.value} className={styles.choice} name="planPreference" value={option.value} label={option.label} description={option.description} selected={selected === option.value} onChange={() => onSelect(option.value)} />)}
      </div>
    </fieldset>
    <div className={styles.actions}><CTAButton disabled={!selected} onClick={onNext}>診断結果を見る</CTAButton></div>
    <button type="button" className={styles.back} onClick={onBack}>← 戻る</button>
  </main></div>;
}
