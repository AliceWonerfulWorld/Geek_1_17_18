package main

import (
	"geek-backend/internal/handler"
	"geek-backend/internal/service"
	"log"
	"net/http"
)

func main() {
	// サービス初期化
	diagnosisService := service.NewDiagnosisService()

	// ハンドラ初期化
	healthHandler := handler.NewHealthHandler()
	diagnosisHandler := handler.NewDiagnosisHandler(diagnosisService)

	// ルーティング設定
	http.HandleFunc("/health", healthHandler.Handle)
	http.HandleFunc("/diagnosis", diagnosisHandler.Handle)

	// サーバー起動
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
