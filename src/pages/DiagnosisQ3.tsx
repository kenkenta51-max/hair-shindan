import { useEffect, useRef } from 'react';
import { Header } from '../components/Header/Header';
import { Progress } from '../components/Progress/Progress';
import { ChoiceCard } from '../components/ChoiceCard/ChoiceCard';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import type { CurrentHair } from '../domain/types';
import styles from './DiagnosisQ3.module.css';

interface Props { selected?: CurrentHair; onSelect: (id: CurrentHair) => void; onNext: () => void; onBack: () => void }
export function DiagnosisQ3({ selected, onSelect, onNext, onBack }: Props) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus({ preventScroll: true }); }, []);
  const question = questions[2];
  return <div className={styles.page}><Header showMenu /><main>
    <div className={styles.progress}><Progress current={3} total={6} /></div>
    <h1 id="q3-title" ref={title} tabIndex={-1}>{question.title}</h1>
    <p id="q3-help" className={styles.help}>{question.description}</p>
    <fieldset aria-labelledby="q3-title" aria-describedby="q3-help">
      <div className={styles.grid}>
        {question.options.map(option => <ChoiceCard key={option.value} className={styles.choice} name="currentHair" value={option.value} label={option.label} image={option.image} selected={selected === option.value} onChange={() => onSelect(option.value)} />)}
      </div>
    </fieldset>
    <div className={styles.actions}><CTAButton disabled={!selected} onClick={onNext}>次へ進む</CTAButton></div>
    <button type="button" className={styles.back} onClick={onBack}>← 戻る</button>
  </main></div>;
}
