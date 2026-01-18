//診断質問の型定義
export interface Question {
  id: string | number;
  text: string;
  axis?: string; // 評価軸（オプショナル）
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

//相性診断リクエストの型定義（2人分の回答）
export interface CompatibilityRequest {
  answersA: {
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
  answersB: {
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

//sessionStorageのキー名
export const STORAGE_KEY = 'uma-chi-diagnostic-answers';
export const RESULT_STORAGE_KEY = 'uma-chi-diagnosis-result';
export const ANSWERS_A_KEY = 'umachi:answersA';
export const ANSWERS_B_KEY = 'umachi:answersB';
export const MODE_KEY = 'umachi:mode';
export const CURRENT_PERSON_KEY = 'umachi:currentPerson';
