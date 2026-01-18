//診断質問の型定義
export interface Question {
  id: number;
  text: string;
}

//診断回答の型定義
export type DiagnosticAnswers = Record<string, number>;

//診断APIリクエストの型定義
export interface DiagnosisRequest {
  answers: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
    q6: number;
    q7: number;
    q8: number;
    q9: number;
    q10: number;
  };
}

//診断APIレスポンスの型定義
export interface DiagnosisResponse {
  score: number;
  rank: string;
  comment: string;
}

//sessionStorageのキー名
export const STORAGE_KEY = 'uma-chi-diagnostic-answers';
export const RESULT_STORAGE_KEY = 'uma-chi-diagnosis-result';
