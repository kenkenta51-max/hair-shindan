import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Progress } from '../components/Progress/Progress';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { ChoiceCard } from '../components/ChoiceCard/ChoiceCard';
import { MenuCard } from '../components/MenuCard/MenuCard';
import { questions } from '../data/questions';
import { menus } from '../data/menus';
import styles from './FoundationPreview.module.css';

export function FoundationPreview() {
  const [choice, setChoice] = useState<string>();
  const [message, setMessage] = useState('');
  return <div className={styles.page}>
    <Header />
    <main className={styles.main}>
      <section><p className={styles.eyebrow} lang="en">FOUNDATION / STEP 2</p><h1>共通部品の確認</h1><p>開発用の確認画面です。診断はまだ開始できません。</p></section>
      <Progress current={1} total={questions.length} />
      <fieldset><legend>選択カードの動作確認</legend><div className={styles.choices}>
        {questions[0].options.slice(0, 2).map(option => <ChoiceCard key={option.value} name="preview-impression" value={option.value} label={option.label} description={option.description} selected={choice === option.value} onChange={() => setChoice(option.value)} />)}
      </div></fieldset>
      <section className={styles.section}><h2>メニューカード</h2><MenuCard menu={menus[0]} /></section>
      <section className={styles.section}><h2>ボタン</h2>
        <CTAButton disabled={!choice} onClick={() => setMessage('ボタンの動作を確認しました。')}>選択を確認</CTAButton>
        <CTAButton variant="secondary" onClick={() => { setChoice(undefined); setMessage('選択をリセットしました。'); }}>リセット</CTAButton>
        <p role="status" className={styles.status}>{message}</p>
      </section>
    </main>
  </div>;
}
