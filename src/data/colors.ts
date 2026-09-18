import type { ColorId, HairColor } from '../domain/types';
export const colors = [
  {
    "id": "ash_brown",
    "name": "透明感アッシュブラウン",
    "englishName": "ASH BROWN",
    "description": "透明感のあるやわらかな色味で、落ち着いた印象を保ちながら洗練された雰囲気に仕上がります。初めてのカラーにも取り入れやすいスタイルです。",
    "features": [],
    "tieBreakRank": 1,
    "image": {
      "src": "/images/result/after-ash-brown.png",
      "alt": "透明感アッシュブラウンの仕上がりイメージ"
    }
  },
  {
    "id": "chocolat_brown",
    "name": "艶感ショコラブラウン",
    "englishName": "CHOCOLAT BROWN",
    "description": "深みのあるブラウンと艶感で、上品でやさしい印象に。色持ちやダメージが気になる方にも取り入れやすいカラーです。",
    "features": [],
    "tieBreakRank": 2,
    "image": {
      "src": "/images/result/after-chocolat-brown.png",
      "alt": "艶感ショコラブラウンの仕上がりイメージ"
    }
  },
  {
    "id": "milk_tea_beige",
    "name": "柔らかミルクティーベージュ",
    "englishName": "MILK TEA BEIGE",
    "description": "やわらかなベージュの明るさで、一気に垢抜けた印象へ。軽さと透明感を楽しみたい方におすすめのカラーです。",
    "features": [],
    "tieBreakRank": 3,
    "image": {
      "src": "/images/result/after-milk-tea-beige.png",
      "alt": "柔らかミルクティーベージュの仕上がりイメージ"
    }
  },
  {
    "id": "olive_greige",
    "name": "抜け感オリーブグレージュ",
    "englishName": "OLIVE GREIGE",
    "description": "赤みを抑えたグレージュカラーで、抜け感とトレンド感のある仕上がりに。韓国風・洗練された雰囲気が好きな方におすすめです。",
    "features": [],
    "tieBreakRank": 4,
    "image": {
      "src": "/images/result/after-olive-greige.png",
      "alt": "抜け感オリーブグレージュの仕上がりイメージ"
    }
  },
  {
    "id": "lavender_brown",
    "name": "艶感ラベンダーブラウン",
    "englishName": "LAVENDER BROWN",
    "description": "ほんのりラベンダーを感じるブラウンで、艶とやわらかさをプラス。女性らしく上品な印象を楽しみたい方におすすめです。",
    "features": [],
    "tieBreakRank": 5,
    "image": {
      "src": "/images/result/after-lavender-brown.png",
      "alt": "艶感ラベンダーブラウンの仕上がりイメージ"
    }
  }
] as const satisfies readonly (HairColor & { description: string })[];
export const colorTieBreakOrder = colors.map(color => color.id) satisfies ColorId[];
