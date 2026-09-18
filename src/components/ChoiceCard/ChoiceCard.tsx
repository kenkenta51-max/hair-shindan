import { assetUrl } from '../../app/assetUrl';
import { useId } from 'react';
import type { ImageAsset } from '../../domain/types';
import styles from './ChoiceCard.module.css';

interface Props { name: string; value: string; label: string; description?: string; image?: ImageAsset; selected: boolean; onChange: (selected: boolean) => void; multiple?: boolean; disabled?: boolean; className?: string }
export function ChoiceCard({ name, value, label, description, image, selected, onChange, multiple = false, disabled = false, className = '' }: Props) {
  const id = useId();
  return <label className={`${styles.card} ${selected ? styles.selected : ''} ${disabled ? styles.disabled : ''} ${className}`}>
    <input className={styles.input} type={multiple ? 'checkbox' : 'radio'} name={name} value={value} aria-label={label} checked={selected} onChange={event => onChange(event.target.checked)} disabled={disabled} aria-describedby={description ? id : undefined} />
    {image && <img className={styles.image} src={assetUrl(image.src)} alt={image.alt} style={{objectPosition: image.objectPosition}} loading="lazy" />}
    {selected && <span className={styles.check} aria-hidden="true">✓</span>}
    <span className={styles.body}><span className={styles.title}>{label}</span>{description && <span id={id} className={styles.description}>{description}</span>}</span>
  </label>;
}
