import { assetUrl } from '../app/assetUrl';
import { Header } from '../components/Header/Header';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { StepIcon } from '../components/StepIcon/StepIcon';
import { homeContent as content } from '../data/home';
import styles from './Home.module.css';

export function Home({ onStart }: { onStart: () => void }) {
  return <div className={styles.page}>
    <div className={styles.backdrop}>
      <img src={assetUrl(content.portrait.src)} alt={content.portrait.alt} width={content.portrait.width} height={content.portrait.height} fetchPriority="high" />
    </div>
    <div className={styles.header}><Header showMenu /></div>
    <main>
      <section className={styles.hero} aria-labelledby="home-title">
        <p className={styles.vertical}>{content.verticalCopy}</p>
        <div className={styles.copy}>
          <h1 id="home-title">{content.headline.map(line => <span key={line}>{line}</span>)}</h1>
          <p className={styles.description}>{content.description.map(line => <span key={line}>{line}</span>)}</p>
          <p className={styles.decoration} lang="en" aria-hidden="true">{content.decoration.map(line => <span key={line}>{line}</span>)}</p>
        </div>
      </section>
      <div className={styles.ctaArea}>
        <CTAButton className={styles.cta} onClick={onStart}>{content.cta}</CTAButton>
        <p className={styles.ctaNote}>{content.ctaNote}</p>
      </div>
      <section className={styles.steps} aria-label="サービスの3ステップ">
        <ol>{content.steps.map(step => <li key={step.number}>
          <span className={styles.stepNumber} lang="en">{step.number}</span>
          <StepIcon kind={step.icon} />
          <h2>{step.title}</h2>
          <p>{step.lines.map(line => <span key={line}>{line}</span>)}</p>
        </li>)}</ol>
      </section>
    </main>
    <footer className={styles.footer}>
      <p>{content.footer}</p><small lang="en">{content.brand}</small>
    </footer>
  </div>;
}
