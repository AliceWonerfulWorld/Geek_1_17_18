package model

// DiagnosisRequest は診断リクエストの構造体
type DiagnosisRequest struct {
	Answers []Answer `json:"answers"`
}

// Answer は質問への回答
type Answer struct {
	QuestionID int    `json:"question_id"`
	Value      string `json:"value"`
}

// DiagnosisResponse は診断結果のレスポンス
type DiagnosisResponse struct {
	Score  int    `json:"score"`
	Reason string `json:"reason"`
}
