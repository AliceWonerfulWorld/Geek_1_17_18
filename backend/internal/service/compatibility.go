package service

import (
	"fmt"
	"geek-backend/internal/model"
	"math"
)

// CompatibilityService は相性診断のビジネスロジックを提供
type CompatibilityService struct{}

// NewCompatibilityService は新しい CompatibilityService を作成
func NewCompatibilityService() *CompatibilityService {
	return &CompatibilityService{}
}

// Calculate は2人の回答から相性スコアを計算する
func (s *CompatibilityService) Calculate(req *model.CompatibilityRequest) (*model.CompatibilityResult, error) {
	totalDiff := 0
	questionCount := 10

	// 各質問の回答差分の絶対値を合計
	for i := 1; i <= questionCount; i++ {
		key := fmt.Sprintf("q%d", i)
		diff := int(math.Abs(float64(req.AnswersA[key] - req.AnswersB[key])))
		totalDiff += diff
	}

	// 0-100に正規化（最大差分 40: 10問 × 4点）
	score := 100 - (totalDiff * 100 / 40)

	// スコアに応じたランクとコメントを決定
	rank, comment := getCompatibilityRankAndComment(score)

	return &model.CompatibilityResult{
		Score:   score,
		Rank:    rank,
		Comment: comment,
	}, nil
}

// getCompatibilityRankAndComment はスコアに基づいてランクとコメントを算出
func getCompatibilityRankAndComment(score int) (string, string) {
	switch {
	case score >= 90:
		return "馬ッチング", "価値観や作業スタイルが完璧に一致しています！最高の相性です。"
	case score >= 80:
		return "かなり馬が合う", "価値観や作業スタイルがかなり近い相手です。一緒に仕事をすると良い成果が期待できます。"
	case score >= 60:
		return "馬が合う", "比較的スムーズに協力し合える相性です。お互いを尊重すれば良い関係が築けるでしょう。"
	case score >= 40:
		return "馬くいく", "歩み寄ることで良い関係が築けるでしょう。コミュニケーションを大切にしてください。"
	default:
		return "馬の合う仲になれれば幸いです。", "これからお互いを知っていく段階のようです。時間をかけて理解し合いましょう。"
	}
}
