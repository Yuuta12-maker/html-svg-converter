# Contributing to HTML to SVG Converter

まず、このプロジェクトに貢献することに興味を持っていただきありがとうございます！

このドキュメントでは、バグの報告からプルリクエストの送信まで、HTML to SVG Converterプロジェクトへの貢献方法について説明します。

## バグの報告

バグを見つけた場合は、GitHub Issueを作成してください。バグレポートには以下の情報を含めてください：

1. バグの簡潔な説明
2. バグを再現するための手順
3. 期待される動作
4. 実際の動作
5. スクリーンショット（可能であれば）
6. 使用している環境（ブラウザ、OS、Node.jsのバージョンなど）

## 機能リクエスト

新機能のアイデアがある場合も、GitHub Issueで提案してください。提案には以下の情報を含めてください：

1. 機能の簡潔な説明
2. なぜその機能が必要なのか、またはどのような問題を解決するのか
3. 実装方法のアイデア（オプション）

## プルリクエストの送信

1. リポジトリをフォークし、新しいブランチを作成します：
   ```
   git checkout -b feature/amazing-feature
   ```

2. 変更を行い、変更をコミットします：
   ```
   git commit -m 'Add some amazing feature'
   ```

3. ブランチをプッシュします：
   ```
   git push origin feature/amazing-feature
   ```

4. GitHub上でプルリクエストを送信します。

## コードスタイル

- JavaScriptコードはセミコロンを使用し、2スペースのインデントを使用してください
- コメントは英語または日本語で書いてください
- 関数には適切なJSDocコメントを追加してください

## 開発環境のセットアップ

1. リポジトリをクローンします：
   ```
   git clone https://github.com/yourusername/html-svg-converter.git
   ```

2. 依存関係をインストールします：
   ```
   npm install
   ```

3. ローカルでテストを実行します：
   ```
   npm test
   ```

## Web版の開発

Web版を開発する場合は、以下のファイルを編集してください：

- `web/index.html` - メインのHTMLファイル
- `web/styles.css` - CSSスタイル
- `web/browser.js` - ブラウザ用の変換ロジック
- `web/app.js` - Webアプリケーションのロジック

## ライセンス

このプロジェクトに貢献することで、あなたの貢献がMITライセンスの下で利用可能になることに同意したものとみなされます。
