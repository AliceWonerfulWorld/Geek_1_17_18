//診断質問の型定義
export interface Question {
  id: number;
  text: string;
}

//診断回答の型定義
export type DiagnosticAnswers = Record<string, number>;

//sessionStorageのキー名
export const STORAGE_KEY = 'uma-chi-diagnostic-answers';
