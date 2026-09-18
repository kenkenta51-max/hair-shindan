import { useEffect, useRef } from 'react';
import type { AnswerDraft } from '../domain/types';
import { Header } from '../components/Header/Header';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import styles from './DiagnosisPlaceholder.module.css';

export function Question4Pending({ answers, onBack }: { answers: AnswerDraft; onBack: () => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus(); }, []);
  return <div className={styles.page}><Header /><main className={styles.main}>
    <h1 ref={title} tabIndex={-1}>Q4は準備中です</h1>
    <p>Q1：{questions[0].options.find(option => option.value === answers.impression)?.label ?? '未回答'}</p>
    <p>Q2：{(answers.concerns ?? []).map(id => questions[1].options.find(option => option.value === id)?.label).join('、') || '未回答'}</p>
    <p>Q3：{questions[2].options.find(option => option.value === answers.currentHair)?.label ?? '未回答'}（{answers.currentHair ?? '未回答'}）</p>
    <p>ここまでの回答を保持しています。</p>
    <CTAButton variant="secondary" onClick={onBack}>Q3へ戻る</CTAButton>
  </main></div>;
}
