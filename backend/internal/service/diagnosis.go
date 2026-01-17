package service

import (
	"fmt"
	"geek-backend/internal/model"
	"math"
)

// DiagnosisService は診断のビジネスロジックを提供
type DiagnosisService struct{}

// NewDiagnosisService は新しい DiagnosisService を作成
func NewDiagnosisService() *DiagnosisService {
	return &DiagnosisService{}
}

// TargetAnswers 比較対象となる仮想ユーザーの回答データ
var TargetAnswers = map[string]int{
	"q1": 3, "q2": 3, "q3": 3, "q4": 3, "q5": 3,
	"q6": 3, "q7": 3, "q8": 3, "q9": 3, "q10": 3,
}

// Calculate は診断スコアを計算する
func (s *DiagnosisService) Calculate(req *model.DiagnosisRequest) (*model.DiagnosisResult, error) {
	totalDiff := 0
	questionCount := 10

	// 各質問の回答差分の絶対値を合計
	for i := 1; i <= questionCount; i++ {
		key := fmt.Sprintf("q%d", i)
		totalDiff += int(math.Abs(float64(req.Answers[key] - TargetAnswers[key])))
	}

	// 0-100に正規化（最大差分 40）
	score := 100 - (totalDiff * 100 / 40)

	// スコアに応じたランクとコメントを決定
	rank, comment := getRankAndComment(score)

	return &model.DiagnosisResult{
		Score:   score,
		Rank:    rank,
		Comment: comment,
	}, nil
}

// getRankAndComment はスコアに基づいてランクとコメントを算出
func getRankAndComment(score int) (string, string) {
	switch {
	case score >= 90:
		return "馬ッチング", "価値観や作業スタイルが完璧に一致しています！"
	case score >= 80:
		return "かなり馬が合う", "価値観や作業スタイルがかなり近い相手です。"
	case score >= 60:
		return "馬が合う", "比較的スムーズに協力し合える相性です。"
	case score >= 40:
		return "馬くいく", "歩み寄ることで良い関係が築けるでしょう。"
	default:
		return "馬の合う仲になれれば幸いです。", "これからお互いを知っていく段階のようです。"
	}
}