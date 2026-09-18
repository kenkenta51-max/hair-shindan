import { useEffect, useRef } from 'react';
import type { AnswerDraft } from '../domain/types';
import { Header } from '../components/Header/Header';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import styles from './DiagnosisPlaceholder.module.css';

export function Question3Pending({ answers, onBack }: { answers: AnswerDraft; onBack: () => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus(); }, []);
  return <div className={styles.page}><Header /><main className={styles.main}>
    <h1 ref={title} tabIndex={-1}>Q3は準備中です</h1>
    <p>Q1：{questions[0].options.find(option => option.value === answers.impression)?.label ?? '未回答'}</p>
    <div><p>Q2の回答を保持しています。</p><ul>{(answers.concerns ?? []).map(id => <li key={id}>{questions[1].options.find(option => option.value === id)?.label}（{id}）</li>)}</ul></div>
    <CTAButton variant="secondary" onClick={onBack}>Q2へ戻る</CTAButton>
  </main></div>;
}
