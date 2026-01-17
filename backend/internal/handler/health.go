package handler

import (
	"net/http"
)

// HealthHandler はヘルスチェック用のハンドラ
type HealthHandler struct{}

// NewHealthHandler は新しい HealthHandler を作成
func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// Handle はヘルスチェックエンドポイントを処理
func (h *HealthHandler) Handle(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte("ok"))
}
