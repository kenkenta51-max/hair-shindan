import { useEffect, useRef } from 'react';
import type { Impression } from '../domain/types';
import { Header } from '../components/Header/Header';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import styles from './DiagnosisPlaceholder.module.css';

export function Question2Pending({ selected, onBack }: { selected?: Impression; onBack: () => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus(); }, []);
  const answer = questions[0].options.find(option => option.value === selected);
  return <div className={styles.page}><Header /><main className={styles.main}>
    <h1 tabIndex={-1} ref={title}>Q2は準備中です</h1>
    {answer ? <p>Q1の回答「{answer.label}」を保持しています。<br />回答ID：<code>{answer.value}</code></p> : <p>まずQ1でなりたい印象を選んでください。</p>}
    <CTAButton variant="secondary" onClick={onBack}>Q1へ戻る</CTAButton>
  </main></div>;
}
