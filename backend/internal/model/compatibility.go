package model

// CompatibilityRequest は相性診断リクエストの構造体
type CompatibilityRequest struct {
	AnswersA map[string]int `json:"answersA"`
	AnswersB map[string]int `json:"answersB"`
}

// AxisDetail は評価軸ごとの詳細情報
type AxisDetail struct {
	Axis          string `json:"axis"`
	AxisName      string `json:"axisName"`
	ScoreA        int    `json:"scoreA"`
	ScoreB        int    `json:"scoreB"`
	Compatibility int    `json:"compatibility"`
}

// CompatibilityResult は相性診断結果のビジネスロジック構造体
type CompatibilityResult struct {
	Score       int          `json:"score"`
	Rank        string       `json:"rank"`
	Comment     string       `json:"comment"`
	AxisDetails []AxisDetail `json:"axisDetails"`
}
