import { useEffect, useRef } from 'react';
import { Header } from '../components/Header/Header';
import { Progress } from '../components/Progress/Progress';
import { ChoiceCard } from '../components/ChoiceCard/ChoiceCard';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import type { Priority } from '../domain/types';
import styles from './DiagnosisQ5.module.css';

interface Props { selected?: Priority; onSelect: (id: Priority) => void; onNext: () => void; onBack: () => void }
export function DiagnosisQ5({ selected, onSelect, onNext, onBack }: Props) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus({ preventScroll: true }); }, []);
  const question = questions[4];
  return <div className={styles.page}><Header showMenu /><main>
    <div className={styles.progress}><Progress current={5} total={6} /></div>
    <h1 id="q5-title" ref={title} tabIndex={-1}>美容室で一番<br />重視することは？</h1>
    <p id="q5-help" className={styles.help}>{question.description}</p>
    <fieldset aria-labelledby="q5-title" aria-describedby="q5-help">
      <div className={styles.grid}>
        {question.options.map(option => <ChoiceCard key={option.value} className={styles.choice} name="priority" value={option.value} label={option.label} description={option.description} selected={selected === option.value} onChange={() => onSelect(option.value)} />)}
      </div>
    </fieldset>
    <div className={styles.actions}><CTAButton disabled={!selected} onClick={onNext}>次へ進む</CTAButton></div>
    <button type="button" className={styles.back} onClick={onBack}>← 戻る</button>
  </main></div>;
}

