import { useEffect, useRef } from 'react';
import { Header } from '../components/Header/Header';
import { Progress } from '../components/Progress/Progress';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import type { Concern } from '../domain/types';
import styles from './DiagnosisQ2.module.css';

interface Props { selected: readonly Concern[]; onToggle: (id: Concern) => void; onNext: () => void; onBack: () => void }
export function DiagnosisQ2({ selected, onToggle, onNext, onBack }: Props) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus({ preventScroll: true }); }, []);
  const question = questions[1];
  const full = selected.length >= question.maxSelections;
  return <div className={styles.page}><Header showMenu /><main>
    <div className={styles.progress}><Progress current={2} total={6} /></div>
    <h1 id="q2-title" ref={title} tabIndex={-1}>今、一番気になって<br />いることは？</h1>
    <p id="q2-help" className={styles.help}>{question.description}</p>
    <p className={styles.count} role="status">{selected.length} / {question.maxSelections} 選択中</p>
    <div className={styles.grid} role="group" aria-labelledby="q2-title" aria-describedby="q2-help">
      {question.options.map((option, index) => {
        const active = selected.includes(option.value);
        return <button key={option.value} type="button" className={`${styles.card} ${active ? styles.selected : ''}`} aria-pressed={active} aria-disabled={full && !active} aria-label={option.label} onClick={() => { if (active || !full) onToggle(option.value); }}>
          <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.label}>{option.label}</span>
          {active && <span className={styles.check} aria-hidden="true">✓</span>}
        </button>;
      })}
    </div>
    <div className={styles.actions}><CTAButton disabled={selected.length === 0} onClick={onNext}>次へ進む</CTAButton></div>
    <button type="button" className={styles.back} onClick={onBack}>← 戻る</button>
  </main></div>;
}
