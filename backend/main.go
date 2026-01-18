package main

import (
	"geek-backend/internal/handler"
	"geek-backend/internal/service"
	"log"
	"net/http"
)

// CORSミドルウェア
// 開発環境では "*" で全てのオリジンを許可しているが、
// 本番環境では特定のオリジンのみ許可すべき
// 例: w.Header().Set("Access-Control-Allow-Origin", "https://your-frontend-domain.com")
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// CORSヘッダーを設定
		w.Header().Set("Access-Control-Allow-Origin", "*") // 開発環境用：本番では特定ドメインに制限すること
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// プリフライトリクエストの処理
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// 次のハンドラを実行
		next(w, r)
	}
}

func main() {
	// サービス初期化
	diagnosisService := service.NewDiagnosisService()
	compatibilityService := service.NewCompatibilityService()

	// ハンドラ初期化
	healthHandler := handler.NewHealthHandler()
	diagnosisHandler := handler.NewDiagnosisHandler(diagnosisService)
	compatibilityHandler := handler.NewCompatibilityHandler(compatibilityService)

	// ルーティング設定（CORSミドルウェアを適用）
	http.HandleFunc("/health", corsMiddleware(healthHandler.Handle))
	http.HandleFunc("/diagnosis", corsMiddleware(diagnosisHandler.Handle))
	http.HandleFunc("/compatibility", corsMiddleware(compatibilityHandler.Handle))

	// サーバー起動
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
