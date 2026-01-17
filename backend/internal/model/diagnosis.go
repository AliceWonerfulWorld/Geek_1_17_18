package model

// DiagnosisRequest は診断リクエストの構造体
type DiagnosisRequest struct {
	Answers map[string]int `json:"answers"`
}

// DiagnosisResponse は診断結果のレスポンス
type DiagnosisResponse struct {
	Score  int    `json:"score"`
	Reason string `json:"reason"`
}
