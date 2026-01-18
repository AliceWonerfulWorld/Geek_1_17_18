# 🐎 UMA-CHI（ウマチ）
副題：馬が合う人、ロジックで探します

## 概要
UMA-CHI は、短い質問に答えるだけで  
「この人と一緒に作業すると合うかどうか」を **数値と理由**で教えてくれる Web アプリです。

- 仕様（要件定義）：`docs/requirements.md`

---

## 技術スタック
- フロントエンド：Next.js
- バックエンド：Go
- DB：なし（インメモリ処理）

---

## 必要なもの（バージョン目安）
- Node.js：18 以上（推奨 20）
- Go：1.22 以上

---

## ディレクトリ構成
```text
.
├── backend/
│   ├── go.mod
│   ├── main.go
│   └── internal/
│       ├── handler/
│       │   ├── health.go
│       │   └── diagnosis.go
│       ├── service/
│       │   └── diagnosis.go
│       └── model/
│           └── diagnosis.go
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── diagnosis/page.tsx
│   │   └── result/page.tsx
│   ├── components/
│   │   ├── common/
│   │   └── diagnosis/
│   ├── lib/
│   │   ├── api.ts
│   │   └── constants.ts
│   ├── types/
│   │   └── diagnosis.ts
│   └── package.json
└── docs/
    └── requirements.md

```

---

## 起動方法

### 1. バックエンド（Go）

```bash
cd backend
go run main.go
```

**動作確認：**  
ブラウザで以下にアクセスし、`ok` が表示されれば成功

```
http://localhost:8080/health
```

### 2. フロントエンド（Next.js）

```bash
cd frontend
npm install
npm run dev
```

**動作確認：**  
ブラウザで以下にアクセスし、トップページが表示されれば成功

```
http://localhost:3000
```

---

## 動作確認チェックリスト

- [ ] Go サーバーが起動する
- [ ] `/health` エンドポイントが `ok` を返す
- [ ] Next.js 開発サーバーが起動する
- [ ] トップページが表示される

---

## 開発ルール（最低限）

- Issue ベースで作業する
- 実装で迷ったら `docs/requirements.md` に立ち返る
- MVP 完成を最優先し、作り込みすぎない

---

## 備考

- 認証・cookie・DB は使用しません
- ハッカソン向け MVP 実装です