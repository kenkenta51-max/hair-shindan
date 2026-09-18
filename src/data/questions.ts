import type { Question } from '../domain/types';

export const questions = [
  { id: 'impression', step: 1, mode: 'single', title: 'どんな印象になりたいですか？', description: '理想のイメージに近いものを選んでください。', options: [
    { value: 'adult', label: '大人っぽい', description: '上品で落ち着いた\n印象に', image: { src: '/images/diagnosis/q1-adult.png', alt: '大人っぽいヘアスタイルのイメージ', objectPosition: '50% 20%' } },
    { value: 'cute', label: '可愛い', description: 'やわらかく\n女性らしい印象に', image: { src: '/images/diagnosis/q1-glowup.png', alt: '可愛いヘアスタイルのイメージ', objectPosition: '50% 18%' } },
    { value: 'clean', label: '清潔感', description: '爽やかで\n好印象な雰囲気に', image: { src: '/images/diagnosis/q1-cute.png', alt: '清潔感のあるヘアスタイルのイメージ', objectPosition: '50% 18%' } },
    { value: 'korean', label: '韓国っぽい', description: 'トレンド感のある\nおしゃれな印象に', image: { src: '/images/diagnosis/q1-clean.png', alt: '韓国っぽいヘアスタイルのイメージ', objectPosition: '50% 12%' } },
    { value: 'glowup', label: '垢抜けたい', description: '今よりもっと\nおしゃれな印象に', image: { src: '/images/diagnosis/q1-calm.png', alt: '垢抜けたヘアスタイルのイメージ', objectPosition: '50% 22%' } },
    { value: 'calm', label: '落ち着いた印象', description: 'ナチュラルで\nやさしい雰囲気に', image: { src: '/images/diagnosis/q1-cool.png', alt: '落ち着いたヘアスタイルのイメージ', objectPosition: '50% 16%' } },
    { value: 'cool', label: 'かっこいい', description: 'クールで洗練された\n印象に', image: { src: '/images/diagnosis/q1-korean.png', alt: 'かっこいいヘアスタイルのイメージ', objectPosition: '50% 18%' } },
    { value: 'omakase', label: 'おまかせ', description: 'AIに似合う印象を\n提案してほしい', image: { src: '/images/diagnosis/q1-omakase.png', alt: '柔らかなロングヘアのイメージ', objectPosition: '50% 38%' } },
  ] },
  { id: 'concerns', step: 2, mode: 'multiple', minSelections: 1, maxSelections: 3, title: '今、一番気になっていることは？', description: '気になるものを3つまで選んでください。', options: [
    { value: 'heavy_color', label: '髪色が重く見える' }, { value: 'color_fade', label: '色落ちが気になる' },
    { value: 'damage', label: 'ダメージ' }, { value: 'dryness', label: 'パサつき' },
    { value: 'frizz', label: 'クセ・うねり' }, { value: 'volume', label: 'ボリューム' },
    { value: 'roots', label: 'プリン状態' }, { value: 'change_impression', label: 'とにかく印象を変えたい' },
  ] },
  { id: 'currentHair', step: 3, mode: 'single', title: '現在の髪色は？', description: '今の髪色に一番近いものを選んでください。', options: [
    { value: 'black', label: '黒髪', image: { src: '/images/diagnosis/q3/q3-black.png', alt: '黒髪の髪色イメージ', objectPosition: '50% 0%' } },
    { value: 'dark_brown', label: '暗めブラウン', image: { src: '/images/diagnosis/q3/q3-dark-brown.png', alt: '暗めブラウンの髪色イメージ', objectPosition: '50% 0%' } },
    { value: 'brown', label: 'ブラウン', image: { src: '/images/diagnosis/q3/q3-brown.png', alt: 'ブラウンの髪色イメージ', objectPosition: '50% 0%' } },
    { value: 'light_brown', label: '明るめブラウン', image: { src: '/images/diagnosis/q3/q3-light-brown.png', alt: '明るめブラウンの髪色イメージ', objectPosition: '50% 0%' } },
    { value: 'bleached', label: 'ブリーチ済み', image: { src: '/images/diagnosis/q3/q3-bleached.png', alt: 'ブリーチ済みの髪色イメージ', objectPosition: '50% 0%' } },
  ] },
  { id: 'desiredBrightness', step: 4, mode: 'single', title: 'どのくらい明るくしたいですか？', description: '理想の明るさに近いものを選んでください。', options: [
    { value: 'keep_dark', label: '暗めをキープ', description: '落ち着いた印象のまま\n楽しみたい' },
    { value: 'slightly_brighter', label: '少し明るく', description: '自然に印象を変えたい' },
    { value: 'much_brighter', label: 'しっかり明るく', description: '変化を感じる明るさに\nしたい' },
    { value: 'omakase', label: 'おまかせ', description: '似合う明るさを\n提案してほしい' },
  ] },
  { id: 'priority', step: 5, mode: 'single', title: '美容室で一番重視することは？', description: 'あなたが大切にしたいことを1つ選んでください。', options: [
    { value: 'suitability', label: '自分に似合うこと', description: '顔立ちや雰囲気に合う\nスタイルにしたい' },
    { value: 'low_damage', label: 'ダメージを抑えたい', description: '髪への負担をできるだけ\n少なくしたい' },
    { value: 'color_longevity', label: '色持ち', description: 'きれいな髪色を\n長く楽しみたい' },
    { value: 'trend', label: 'トレンド感', description: '今っぽいおしゃれな\n雰囲気にしたい' },
    { value: 'easy_care', label: '手入れのしやすさ', description: '毎日のスタイリングを\n楽にしたい' },
    { value: 'cost_performance', label: 'コスパ', description: '予算とのバランスを\n大切にしたい' },
  ] },
  { id: 'planPreference', step: 6, mode: 'single', title: '施術にかけられる時間と予算は？', description: 'あなたに近いプランを選んでください。', options: [
    { value: 'quick', label: '手軽に整えたい', description: '〜90分\n〜10,000円程度' },
    { value: 'balanced', label: 'バランス重視', description: '〜120分\n〜15,000円程度' },
    { value: 'full_change', label: 'しっかり変えたい', description: '〜180分\n〜20,000円程度' },
    { value: 'result_first', label: '仕上がり重視', description: '時間・予算より\n理想の仕上がりを優先' },
  ] },
] as const satisfies readonly Question[];



