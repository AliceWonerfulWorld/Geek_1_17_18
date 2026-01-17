package service

import (
	"geek-backend/internal/model"
)

// DiagnosisService は診断のビジネスロジックを提供
type DiagnosisService struct{}

// NewDiagnosisService は新しい DiagnosisService を作成
func NewDiagnosisService() *DiagnosisService {
	return &DiagnosisService{}
}

// Calculate は診断スコアを計算する
func (s *DiagnosisService) Calculate(req *model.DiagnosisRequest) (*model.DiagnosisResponse, error) {
	// TODO: 実際の診断ロジックを実装
	// 現在は仮の実装
	score := len(req.Answers) * 10
	if score > 100 {
		score = 100
	}

	return &model.DiagnosisResponse{
		Score:  score,
		Reason: "回答に基づいた相性スコアです",
	}, nil
}
