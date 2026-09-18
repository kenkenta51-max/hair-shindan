import { assetUrl } from '../app/assetUrl';
import { useEffect, useRef, useState } from 'react';
import type { ColorId, DiagnosisResult as ResultData } from '../domain/types';
import { Header } from '../components/Header/Header';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { ResultDialog } from '../components/ResultDialog/ResultDialog';
import styles from './DiagnosisResult.module.css';

const colorTags: Record<ColorId, string> = { ash_brown: '透明感', chocolat_brown: '艶感', milk_tea_beige: '垢抜け', olive_greige: 'トレンド', lavender_brown: '柔らかさ' };
function Stars({ value }: { value: number }) {
  const stars = <svg viewBox="0 0 120 24" width="120" height="24" fill="currentColor" aria-hidden="true">{[0,1,2,3,4].map(i => <path key={i} transform={`translate(${i * 24} 0)`} d="m12 1.5 3.2 6.7 7.3 1-5.3 5.2 1.3 7.3-6.5-3.5-6.5 3.5 1.3-7.3L1.5 9.2l7.3-1z" />)}</svg>;
  return <span className={styles.stars} role="img" aria-label={`5点満点中${value}点`}><span>{stars}</span><span className={styles.starFill} style={{ width: `${value / 5 * 100}%` }}>{stars}</span></span>;
}

/** 診断済みデータを表示するだけ。回答や採点ルールは参照しない。 */
export function DiagnosisResult({ result, onRestart }: { result: ResultData | null; onRestart: () => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  const [modal, setModal] = useState<'simulation' | 'booking' | 'share' | null>(null);
  const [sharing, setSharing] = useState(false);
  useEffect(() => { title.current?.focus({ preventScroll: true }); }, []);
  if (!result) return <div className={styles.page}><Header showMenu /><main className={styles.empty}><h1 ref={title} tabIndex={-1}>診断を最初から<br />始めてください。</h1><p>6問すべてに回答すると、おすすめの髪色をご覧いただけます。</p><CTAButton onClick={onRestart}>診断をはじめる</CTAButton></main></div>;
  const tags = [colorTags[result.type], result.needsBleach && 'ブリーチ相談', result.treatmentLevel === 'intensive' ? '集中ケア' : result.needsTreatment && 'ヘアケア', result.needsRootCare && '根元ケア', result.recommendCut && '似合わせカット'].filter((tag): tag is string => Boolean(tag)).slice(0,4);
  const titleParts = result.title.match(/^(透明感|艶感|柔らか|抜け感)(.*)$/);
  const price = `¥${result.estimatedPrice.toLocaleString('ja-JP')}〜`;
  async function share() {
    if (!result) return;
    if (!navigator.share) { setModal('share'); return; }
    setSharing(true);
    try { await navigator.share({ title: 'LUMINA HAIR CONSULTATION', text: `私におすすめの髪色は「${result.title}」。LUMINAのヘアカラー診断より。` }); }
    catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setModal('share'); }
    finally { setSharing(false); }
  }
  return <div className={styles.page}>
    <Header showMenu />
    <main>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>AI HAIR CONSULTATION</p>
        <h1 ref={title} tabIndex={-1}>診断結果</h1>
        <span className={styles.decoration} lang="en" aria-hidden="true">Your<br />best style.</span>
      </header>
      <section className={styles.hero} aria-labelledby="result-color">
        <p className={styles.recommendLead}>あなたにおすすめなのは</p>
        <h2 id="result-color" className={styles.resultTitle}>{titleParts ? <><span>{titleParts[1]}</span><span>{titleParts[2]}</span></> : result.title}</h2>
        <p className={styles.english} lang="en">{result.englishName}</p>
        <figure className={styles.heroFigure}><img className={styles.heroImage} src={assetUrl(result.afterImage)} alt={`${result.title}の仕上がりイメージ`} width="1086" height="1448" fetchPriority="high" /><figcaption>YOUR BEST COLOR</figcaption></figure>
      </section>
      <section className={styles.reason} aria-labelledby="reason-title"><span className={styles.sectionNumber} aria-hidden="true">01 — YOUR COLOR</span><h2 id="reason-title">このカラーが<br />あなたに似合う理由</h2><p>{result.description}</p><ul className={styles.tags}>{tags.map(tag => <li key={tag}>#{tag}</li>)}</ul></section>
      <section className={styles.comparison} aria-labelledby="comparison-title"><p className={styles.eyebrow}>BEFORE / AFTER</p><h2 id="comparison-title">髪色で、印象はここまで変わる。</h2><p className={styles.sample}>仕上がりイメージ</p><div className={styles.pair}>{[{label:'BEFORE',src:result.beforeImage,alt:'現在の髪色に近いサンプル'},{label:'AFTER',src:result.afterImage,alt:`${result.title}の仕上がりサンプル`}].map(image => <figure key={image.label}><img src={assetUrl(image.src)} alt={image.alt} width="1086" height="1448" loading="lazy" /><figcaption>{image.label}</figcaption></figure>)}</div><p className={styles.treatmentNote}>{result.needsBleach ? '髪の状態によりブリーチをご提案する場合があります。' : 'ブリーチなしでも取り入れやすいカラーです。'}</p><p className={styles.finePrint}>{result.bleachNotice}</p></section>
      <section className={styles.menuSection} aria-labelledby="menus-title"><p className={styles.eyebrow}>RECOMMENDED MENU</p><h2 id="menus-title">あなたにおすすめのメニュー</h2><div className={styles.menuGrid}>{result.recommendedMenu.map(menu => <article className={styles.menuCard} key={menu.type}><img src={assetUrl(menu.image)} alt={`${menu.name}の施術イメージ`} width="400" height="300" loading="lazy" /><div><p className={styles.menuEnglish} lang="en">{menu.type.toUpperCase()}</p><h3>{menu.name}</h3><p>{menu.description}</p></div></article>)}</div></section>
      <section className={styles.estimate} aria-label="料金・所要時間・おすすめ度"><div className={styles.numbers}><div><p className={styles.eyebrow}>ESTIMATED PRICE</p><p className={styles.amount}>{price}</p></div><div><p className={styles.eyebrow}>TIME</p><p className={styles.amount}><small>約</small>{result.estimatedTime}<small> min</small></p></div></div><p className={styles.finePrint}>※髪の長さ・状態・施術内容により料金や時間は変動します。</p><div className={styles.rating}><p>おすすめ度</p><Stars value={result.recommendationRating} /><p className={styles.ratingValue}>{result.recommendationRating.toFixed(1)} <small>/ 5.0</small></p><small>{result.recommendationLabel}</small></div></section>
      <section className={styles.actions} aria-label="診断後のアクション"><p className={styles.invitation}>新しい髪色で、新しいわたしへ。</p><CTAButton onClick={() => setModal('simulation')}>この髪色を自分で試す</CTAButton><CTAButton variant="secondary" onClick={() => setModal('booking')}>この内容で予約する</CTAButton><button className={styles.textButton} type="button" onClick={onRestart}>もう一度診断する</button><button className={styles.textButton} type="button" disabled={sharing} onClick={share}>診断結果をシェア</button></section>
    </main>
    <footer className={styles.footer}><p>髪が変わると、毎日が少し好きになる。</p><span lang="en">LUMINA HAIR SALON</span><a href="#/">TOPへ戻る</a></footer>
    {modal === 'simulation' && <ResultDialog title="AIヘアシミュレーション" onClose={() => setModal(null)}><p>AIヘアシミュレーションは次のSTEPで実装予定です。</p><p>{result.title}を、あなたの写真で体験できる機能を準備しています。</p></ResultDialog>}
    {modal === 'booking' && <ResultDialog title="ご予約内容の確認" onClose={() => setModal(null)}><p>{result.title}</p><p>{result.recommendedMenu.map(menu => menu.name).join('＋')}</p><p>{price} ／ 約{result.estimatedTime}分</p><small>予約機能はデモ版では未接続です。</small></ResultDialog>}
    {modal === 'share' && <ResultDialog title="診断結果をシェア" onClose={() => setModal(null)}><p>この機能は対応ブラウザで利用できます。</p></ResultDialog>}
  </div>;
}
