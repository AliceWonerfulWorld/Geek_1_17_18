package handler

import (
	"encoding/json"
	"geek-backend/internal/model"
	"geek-backend/internal/service"
	"net/http"
)

// CompatibilityHandler は相性診断用のハンドラ
type CompatibilityHandler struct {
	service *service.CompatibilityService
}

// NewCompatibilityHandler は新しい CompatibilityHandler を作成
func NewCompatibilityHandler(svc *service.CompatibilityService) *CompatibilityHandler {
	return &CompatibilityHandler{
		service: svc,
	}
}

// Handle は相性診断エンドポイントを処理
func (h *CompatibilityHandler) Handle(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req model.CompatibilityRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	resp, err := h.service.Calculate(&req)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(resp)
}
