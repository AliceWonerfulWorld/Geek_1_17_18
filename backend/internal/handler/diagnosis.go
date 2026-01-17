package handler

import (
	"encoding/json"
	"geek-backend/internal/model"
	"geek-backend/internal/service"
	"net/http"
)

// DiagnosisHandler は診断用のハンドラ
type DiagnosisHandler struct {
	service *service.DiagnosisService
}

// NewDiagnosisHandler は新しい DiagnosisHandler を作成
func NewDiagnosisHandler(svc *service.DiagnosisService) *DiagnosisHandler {
	return &DiagnosisHandler{
		service: svc,
	}
}

// Handle は診断エンドポイントを処理
func (h *DiagnosisHandler) Handle(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req model.DiagnosisRequest
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
