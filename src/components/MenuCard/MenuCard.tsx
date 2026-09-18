import { assetUrl } from '../../app/assetUrl';
import type { Menu } from '../../domain/types';
import styles from './MenuCard.module.css';

export function MenuCard({ menu }: { menu: Menu }) {
  return <article className={styles.card}>
    {menu.image && <img className={styles.image} src={assetUrl(menu.image.src)} alt={menu.image.alt} loading="lazy" />}
    <div className={styles.body}><h3>{menu.name}</h3><p>{menu.description}</p></div>
  </article>;
}
