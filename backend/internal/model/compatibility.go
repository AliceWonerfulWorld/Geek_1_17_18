package model

// CompatibilityRequest は相性診断リクエストの構造体
type CompatibilityRequest struct {
	AnswersA map[string]int `json:"answersA"`
	AnswersB map[string]int `json:"answersB"`
}

// CompatibilityResult は相性診断結果のビジネスロジック構造体
type CompatibilityResult struct {
	Score   int    `json:"score"`
	Rank    string `json:"rank"`
	Comment string `json:"comment"`
}
