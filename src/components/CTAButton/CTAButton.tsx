import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './CTAButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary'; icon?: ReactNode }
export function CTAButton({ children, variant = 'primary', icon, className = '', type = 'button', ...props }: Props) {
  return <button type={type} className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
    {icon && <span aria-hidden="true">{icon}</span>}<span>{children}</span>
    <svg className={styles.arrow} viewBox="0 0 28 18" width="28" height="18" fill="none" aria-hidden="true"><path d="M0 9H26M18 1L26 9L18 17" stroke="currentColor" /></svg>
  </button>;
}
