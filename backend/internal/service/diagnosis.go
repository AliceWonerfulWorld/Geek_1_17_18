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
func (s *DiagnosisService) Calculate(req *model.DiagnosisRequest) (*model.DiagnosisResult, error) {
	// TODO: 実際の診断ロジックを実装
	// 現在は仮の実装
	score := len(req.Answers) * 10
	if score > 100 {
		score = 100
	}

	// スコアに基づいてランクを決定
	rank := calculateRank(score)

	// スコアとランクに基づいてコメントを生成
	comment := generateComment(score, rank)

	return &model.DiagnosisResult{
		Score:   score,
		Rank:    rank,
		Comment: comment,
	}, nil
}

// calculateRank はスコアに基づいてランクを算出
func calculateRank(score int) string {
	switch {
	case score >= 80:
		return "S"
	case score >= 60:
		return "A"
	case score >= 40:
		return "B"
	default:
		return "C"
	}
}

// generateComment はスコアとランクに基づいてコメントを生成
func generateComment(score int, rank string) string {
	switch rank {
	case "S":
		return "非常に相性が良いです！一緒に働くと最高のパフォーマンスが期待できます。"
	case "A":
		return "相性は良好です。協力して仕事を進められるでしょう。"
	case "B":
		return "まずまずの相性です。お互いの違いを理解し合うことが大切です。"
	default:
		return "相性には改善の余地があります。コミュニケーションを大切にしましょう。"
	}
}
