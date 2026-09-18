import { useEffect, useRef } from 'react';
import type { AnswerDraft } from '../domain/types';
import { buildDiagnosisResult, getInvalidAnswerKeys } from '../domain/diagnosisEngine';
import { Header } from '../components/Header/Header';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { questions } from '../data/questions';
import styles from './DiagnosisPlaceholder.module.css';
import debugStyles from './DiagnosisResultPending.module.css';

export function DiagnosisResultPending({ answers, onBack }: { answers: AnswerDraft; onBack: () => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus(); }, []);
  const result = buildDiagnosisResult(answers);
  const invalid = getInvalidAnswerKeys(answers);
  return <div className={styles.page}><Header /><main className={styles.main}>
    <h1 ref={title} tabIndex={-1}>{result ? '診断データを作成しました' : '回答を確認してください'}</h1>
    {!result && <><p>未回答または無効な回答：{questions.filter(q => invalid.includes(q.id)).map(q => `Q${q.step}`).join('、')}</p><a href="#/diagnosis">Q1から回答を確認する</a></>}
    {result && <><h2>{result.title}</h2><p lang="en">{result.englishName}</p><p>正式な診断結果画面はSTEP11で追加します。</p>
      {import.meta.env.DEV && <section className={debugStyles.debug} aria-label="診断データの開発確認"><h2>開発確認</h2><p>料金：{result.estimatedPrice.toLocaleString('ja-JP')}円 ／ 所要時間：{result.estimatedTime}分</p><p>{result.recommendationLabel}：{result.recommendationRating.toFixed(1)}</p><pre>{JSON.stringify(result, null, 2)}</pre><details><summary>Q1〜Q6の回答ID</summary><pre>{JSON.stringify(answers, null, 2)}</pre></details></section>}
    </>}
    <CTAButton variant="secondary" onClick={onBack}>Q6へ戻る</CTAButton>
  </main></div>;
}
