# バックエンド（Go）

UMA-CHI のバックエンド API サーバー

## 構成

```
backend/
├── main.go              # エントリーポイント
├── go.mod
├── internal/
│   ├── handler/         # HTTPハンドラ
│   │   ├── health.go
│   │   └── diagnosis.go
│   ├── service/         # ビジネスロジック
│   │   └── diagnosis.go
│   └── model/           # データ構造
│       └── diagnosis.go
└── README.md
```

## 起動方法

```bash
cd backend
go run main.go
```

サーバーは `:8080` で起動します。

## エンドポイント

### `GET /health`
ヘルスチェック用エンドポイント

**レスポンス:**
```
ok
```

### `POST /diagnosis`
診断スコア計算用エンドポイント

**リクエスト:**
```json
{
  "answers": [
    {
      "question_id": 1,
      "value": "A"
    }
  ]
}
```

**レスポンス:**
```json
{
  "score": 85,
  "reason": "回答に基づいた相性スコアです"
}
```
