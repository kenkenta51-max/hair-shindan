export function StepIcon({ kind }: { kind: 'consultation' | 'hair' | 'menu' }) {
  return <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'consultation' && <><path d="M27 14c0 6-5 10-11 10h-3l-7 4 2-7c-3-2-4-4-4-7C4 8 9 4 16 4s11 4 11 10Z"/><circle cx="10" cy="14" r=".7"/><circle cx="16" cy="14" r=".7"/><circle cx="22" cy="14" r=".7"/></>}
    {kind === 'hair' && <><path d="M10 27c-2 1-4 1-6 1 3-5 2-9 2-13C6 6 10 2 16 2s10 4 10 13c0 4-1 8 2 13-2 0-4 0-6-1M11 22v3l-5 4M21 22v3l5 4"/><path d="M9 13c3-1 6-5 7-7 1 3 4 6 7 7 0 6-3 11-7 11s-7-5-7-11Z"/></>}
    {kind === 'menu' && <><path d="M11 5H6v24h20V5h-5M12 3h8v5h-8zM11 13h3v3h-3zM18 14h4M11 21h11M11 25h8"/></>}
  </svg>;
}
