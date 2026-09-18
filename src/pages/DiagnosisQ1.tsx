import { useEffect, useRef } from 'react';
import { Header } from '../components/Header/Header';
import { Progress } from '../components/Progress/Progress';
import { ChoiceCard } from '../components/ChoiceCard/ChoiceCard';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import type { Impression } from '../domain/types';
import styles from './DiagnosisQ1.module.css';

interface Props { selected?: Impression; onSelect: (id: Impression) => void; onNext: () => void }
export function DiagnosisQ1({ selected, onSelect, onNext }: Props) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus({preventScroll:true}); }, []);
  const question = questions[0];
  return <div className={styles.page}>
    <Header showMenu />
    <main>
      <div className={styles.progress}><Progress current={1} total={6} /></div>
      <div className={styles.intro}>
        <h1 id="q1-title" ref={title} tabIndex={-1}>どんな印象に<br />なりたいですか？</h1>
        <p className={styles.decoration} lang="en" aria-hidden="true">Find<br /><span>your</span><br /><span>style.</span></p>
      </div>
      <p id="q1-help" className={styles.help}>{question.description}</p>
      <fieldset aria-labelledby="q1-title" aria-describedby="q1-help">
        <div className={styles.grid}>
          {question.options.map(option => <ChoiceCard key={option.value} className={styles.choice} name="impression" value={option.value} label={option.label} description={option.description} image={option.image} selected={selected === option.value} onChange={() => onSelect(option.value)} />)}
          <div className={styles.aside} aria-hidden="true"><p>新しい<br />わたしに<br />出会う。</p><span /><small lang="en">LUMINA<br />AI CONSULTATION</small></div>
        </div>
      </fieldset>
      <div className={styles.actions}><CTAButton disabled={!selected} onClick={onNext}>次へ進む</CTAButton></div>
      <p className={styles.footer}>髪が変わると、毎日が少し好きになる。</p>
    </main>
  </div>;
}
