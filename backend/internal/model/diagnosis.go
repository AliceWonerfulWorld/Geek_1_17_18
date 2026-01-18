package model

// DiagnosisRequest は診断リクエストの構造体
type DiagnosisRequest struct {
	Answers map[string]int `json:"answers"`
}

// DiagnosisResult は診断結果のビジネスロジック構造体
type DiagnosisResult struct {
	Score   int    `json:"score"`
	Rank    string `json:"rank"`
	Comment string `json:"comment"`
}

// DiagnosisResponse は診断結果のレスポンス
type DiagnosisResponse struct {
	Score  int    `json:"score"`
	Reason string `json:"reason"`
}
