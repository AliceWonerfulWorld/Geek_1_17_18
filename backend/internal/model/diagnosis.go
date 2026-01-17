package model

// DiagnosisRequest は診断リクエストの構造体
type DiagnosisRequest struct {
	Answers map[string]int `json:"answers"`
}

// Answer は質問への回答
type Answer struct {
	QuestionID int    `json:"question_id"`
	Value      string `json:"value"`
}

// DiagnosisResult は診断結果の構造体
type DiagnosisResult struct {
	Score   int    `json:"score"`   // 相性スコア（0〜100）
	Rank    string `json:"rank"`    // 相性ランク（文字列）
	Comment string `json:"comment"` // コメント（文字列）
}
