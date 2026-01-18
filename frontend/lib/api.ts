import { DiagnosisRequest, DiagnosisResponse } from '@/types/diagnosis';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

/**
 * 診断APIを呼び出す
 * @param answers 診断の回答データ（q1〜q10）
 * @returns 診断結果（score, rank, comment）
 */
export async function submitDiagnosis(answers: DiagnosisRequest['answers']): Promise<DiagnosisResponse> {
  const response = await fetch(`${API_BASE_URL}/diagnosis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data: DiagnosisResponse = await response.json();
  return data;
}
