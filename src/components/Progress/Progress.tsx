import styles from './Progress.module.css';

export function Progress({ current, total, complete = false }: { current: number; total: number; complete?: boolean }) {
  const count = Math.max(1, Math.floor(total));
  const step = Math.max(1, Math.min(Math.floor(current), count));
  return <div className={styles.root}>
    <span className={styles.label}>{complete ? '診断結果' : `Q${step} / ${count}`}</span>
    <div className={styles.track} role="progressbar" aria-label="診断の進捗" aria-valuemin={0} aria-valuemax={count} aria-valuenow={complete ? count : step} aria-valuetext={complete ? '全問回答済み' : `${count}問中${step}問目`}>
      {Array.from({ length: count }, (_, index) => <span key={index} className={`${styles.dot} ${index < step ? styles.active : ''}`} aria-hidden="true">{(complete || index < step - 1) ? '✓' : ''}</span>)}
    </div>
  </div>;
}
