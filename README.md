# LUMINA AI HAIR CONSULTATION

美容室向けヘアカラー診断デモ。React / TypeScript / Vite / CSS Modules。
TOP → 6問診断 → ルールベースのカラー・メニュー・料金・時間の提案を実装済みです。
回答はブラウザのsessionStorageに保存されます。写真は静的な仕上がりサンプルです。
AIシミュレーション・本番予約・API・決済は未接続です。

## 開発

Node.js 24 を推奨。

```sh
npm ci
npm run dev
npm run build
npm run preview
node tests/diagnosisEngine.test.mjs
```

## 公開

GitHub Pages: https://kenkenta51-max.github.io/lumina-ai-hair/
mainへのpushでGitHub Actionsがテスト・ビルド・公開します。
リポジトリのSettings → Pages → SourceはGitHub Actionsを選択します。
公開ビルドのみVITE_BASE_PATH=/lumina-ai-hair/を指定します。
ローカル開発時は通常どおりルートパスで動作します。

## 構成

- src/app: ルーティング・回答保持・公開アセットパス
- src/pages: TOP、Q1〜Q6、診断結果
- src/components: 共通UI
- src/data: 質問、カラー、メニュー、診断ルール
- src/domain: 型定義・診断エンジン
- src/styles: デザイン共通設定
- public/images: 表示用画像
- tests: 診断エンジン検証

フォントはFontsource経由で配信するNoto Serif JP、Noto Sans JP、Cormorant Garamond（SIL OFL）。
