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

	// 評価軸ごとの詳細を計算
	axisDetails := calculateAxisDetails(req)

	return &model.CompatibilityResult{
		Score:       score,
		Rank:        rank,
		Comment:     comment,
		AxisDetails: axisDetails,
	}, nil
}

// calculateAxisDetails は評価軸ごとの詳細を計算
func calculateAxisDetails(req *model.CompatibilityRequest) []model.AxisDetail {
	// 質問と評価軸のマッピング
	questionToAxis := map[string]string{
		"q1": "decision_speed", "q4": "decision_speed", "q8": "decision_speed",
		"q2": "communication", "q10": "communication",
		"q3": "planning", "q9": "planning",
		"q5": "feedback",
		"q6": "leadership", "q7": "leadership",
	}

	axisNames := map[string]string{
		"decision_speed": "意思決定とスピード感",
		"communication":  "コミュニケーションの密度",
		"planning":       "作業の進め方（計画性）",
		"feedback":       "対立とフィードバック",
		"leadership":     "主導性と熱量",
	}

	// 評価軸ごとの合計と質問数を集計
	axisSumA := make(map[string]int)
	axisSumB := make(map[string]int)
	axisCount := make(map[string]int)

	for i := 1; i <= 10; i++ {
		key := fmt.Sprintf("q%d", i)
		axis := questionToAxis[key]
		axisSumA[axis] += req.AnswersA[key]
		axisSumB[axis] += req.AnswersB[key]
		axisCount[axis]++
	}

	// 評価軸ごとの詳細を生成
	var details []model.AxisDetail
	axisOrder := []string{"decision_speed", "communication", "planning", "feedback", "leadership"}

	for _, axis := range axisOrder {
		count := axisCount[axis]
		if count == 0 {
			continue
		}

		// 平均スコア（1-5 → 0-100に正規化）
		avgA := (axisSumA[axis] * 100) / (count * 5)
		avgB := (axisSumB[axis] * 100) / (count * 5)

		// 一致度（差分が小さいほど高い）
		diff := int(math.Abs(float64(avgA - avgB)))
		compatibility := 100 - diff

		details = append(details, model.AxisDetail{
			Axis:          axis,
			AxisName:      axisNames[axis],
			ScoreA:        avgA,
			ScoreB:        avgB,
			Compatibility: compatibility,
		})
	}

	return details
}

// getCompatibilityRankAndComment はスコアに基づいてランクとコメントを算出
func getCompatibilityRankAndComment(score int) (string, string) {
	switch {
	case score >= 95:
		return "馬ッチング", "価値観や作業スタイルが完璧に一致しています！最高の相性です。一緒に仕事をすれば、まさに「一心同体」の関係が築けるでしょう。"
	case score >= 85:
		return "かなり馬が合う", "価値観や作業スタイルがかなり近い相手です。一緒に仕事をすると良い成果が期待できます。お互いの強みを活かせる素晴らしい組み合わせです。"
	case score >= 75:
		return "馬が合う", "比較的スムーズに協力し合える相性です。お互いを尊重すれば良い関係が築けるでしょう。共通点も多く、理解し合いやすい関係です。"
	case score >= 65:
		return "まあまあ馬が合う", "基本的には良好な関係が築ける相性です。時には意見の違いもありますが、それが良い刺激になることもあるでしょう。"
	case score >= 50:
		return "馬くいく", "歩み寄ることで良い関係が築けるでしょう。コミュニケーションを大切にすれば、お互いの違いを補い合える関係になれます。"
	case score >= 35:
		return "馬力が必要", "価値観や作業スタイルに違いが見られます。お互いの個性を理解し、尊重する努力が必要です。時間をかけて関係を築いていきましょう。"
	case score >= 20:
		return "馬鹿にならない違い", "かなり異なる価値観を持っているようです。しかし、その違いこそが新しい視点をもたらすこともあります。お互いから学ぶ姿勢が大切です。"
	default:
		return "馬の合う仲になれれば幸いです。", "正反対の価値観を持っているようです。これからお互いを知っていく段階です。違いを受け入れ、時間をかけて理解し合いましょう。"
	}
}
