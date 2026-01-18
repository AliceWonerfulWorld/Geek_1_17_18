/**
 * 診断用の質問と評価軸の定数定義
 * 各質問がどの評価軸に属するかを明示している
 */

/**
 * 評価軸の定義
 */
export const AXES = {
  decision_speed: '意思決定とスピード感',
  communication: 'コミュニケーションの密度',
  planning: '作業の進め方（計画性）',
  feedback: '対立とフィードバック',
  leadership: '主導性と熱量',
} as const;

export type AxisKey = keyof typeof AXES;

/**
 * 診断質問の型定義
 */
export interface DiagnosticQuestion {
  id: string;
  text: string;
  axis: AxisKey;
}

/**
 * 診断質問データ
 * 各質問は1-5の5段階評価で回答
 * 1: あてはまらない 〜 5: あてはまる
 */
export const QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1',
    text: '計画を立てるよりも、まず行動してみることが多い',
    axis: 'decision_speed',
  },
  {
    id: 'q2',
    text: 'チームでの作業よりも、一人で集中して作業することを好む',
    axis: 'communication',
  },
  {
    id: 'q3',
    text: '予定が変更されてもすぐに適応できる',
    axis: 'planning',
  },
  {
    id: 'q4',
    text: '意思決定は慎重に時間をかけて行う方だ',
    axis: 'decision_speed',
  },
  {
    id: 'q5',
    text: '他の人の意見を聞くよりも、自分の考えを優先することが多い',
    axis: 'feedback',
  },
  {
    id: 'q6',
    text: '新しいアイデアを試すことにワクワクする',
    axis: 'leadership',
  },
  {
    id: 'q7',
    text: 'プロジェクトではリーダーシップを取ることを好む',
    axis: 'leadership',
  },
  {
    id: 'q8',
    text: 'ストレスがかかる状況でも冷静に対処できる',
    axis: 'decision_speed',
  },
  {
    id: 'q9',
    text: '細かい部分まで気を配ることが得意だ',
    axis: 'planning',
  },
  {
    id: 'q10',
    text: '人とのコミュニケーションにエネルギーを感じる',
    axis: 'communication',
  },
];
