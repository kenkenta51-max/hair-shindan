import styles from './Header.module.css';

export function Header({ onMenuClick, showMenu = false }: { onMenuClick?: () => void; showMenu?: boolean }) {
  return <header className={styles.header}>
    <div className={styles.brand}><span lang="en">LUMINA</span><small lang="en">HAIR SALON</small></div>
    {(onMenuClick || showMenu) && (onMenuClick ? <button type="button" className={styles.menu} aria-label="メニューを開く" onClick={onMenuClick}>
      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden="true"><path d="M1 3H27M1 12H27M1 21H27" stroke="currentColor" /></svg>
    </button> : <span className={styles.menu} aria-hidden="true"><svg width="28" height="24" viewBox="0 0 28 24" fill="none"><path d="M1 3H27M1 12H27M1 21H27" stroke="currentColor" /></svg></span>)}
  </header>;
}
