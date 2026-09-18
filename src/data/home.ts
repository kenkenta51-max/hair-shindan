export const homeContent = {
  headline: ['あなたに', '似合う髪色、', 'AIと見つけよう。'],
  description: ['髪の悩み・なりたい雰囲気・予算から、', 'あなたに合ったヘアカラーと', 'メニューをご提案します。'],
  verticalCopy: '髪が変わると、わたしが変わる。',
  decoration: ['Find your', 'best hair.'],
  cta: '無料でAI診断をはじめる',
  ctaNote: '約1分・登録不要',
  footer: 'あなたらしい美しさを、もっと身近に。',
  brand: 'LUMINA AI HAIR CONSULTATION',
  portrait: { src: '/images/home/hero.png', alt: '柔らかなブラウンのロングヘアに白い服を合わせた女性', width: 1122, height: 1402 },
  steps: [
    { number: '01', title: 'AI診断', lines: ['いくつかの質問に', '答えるだけ'], icon: 'consultation' },
    { number: '02', title: '髪色体験', lines: ['あなたに似合う髪色を', 'シミュレーション'], icon: 'hair' },
    { number: '03', title: '料金確認', lines: ['おすすめメニューと', '料金をご提案'], icon: 'menu' },
  ],
} as const;
