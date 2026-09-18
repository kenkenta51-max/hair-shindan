import { useEffect, useRef } from 'react';
import { Header } from '../components/Header/Header';
import { CTAButton } from '../components/CTAButton/CTAButton';
import styles from './DiagnosisPlaceholder.module.css';

/** STEP3のCTA遷移先のみ。質問・回答管理・診断処理は含めない。 */
export function DiagnosisPlaceholder({ onBack }: { onBack: () => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { title.current?.focus(); }, []);
  return <div className={styles.page}><Header /><main className={styles.main}>
    <p className={styles.label} lang="en">COMING SOON</p>
    <h1 ref={title} tabIndex={-1}>診断は準備中です</h1>
    <p>あなたに合う髪色とメニューをご提案する、6問の診断を準備しています。</p>
    <CTAButton variant="secondary" onClick={onBack}>TOPへ戻る</CTAButton>
  </main></div>;
}
