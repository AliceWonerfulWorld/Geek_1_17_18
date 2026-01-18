import { DiagnosisRequest } from '@/types/diagnosis';

/**
 * 回答データから診断コードを生成
 * @param answers 診断の回答データ（q1〜q10）
 * @returns 診断コード（UMA-xxxxx形式）
 */
export function generateDiagnosisCode(answers: DiagnosisRequest['answers']): string {
    const json = JSON.stringify(answers);
    const base64 = btoa(json);
    return `UMA-${base64}`;
}

/**
 * 診断コードから回答データを復元
 * @param code 診断コード（UMA-xxxxx形式）
 * @returns 回答データ、または無効な場合はnull
 */
export function parseDiagnosisCode(code: string): DiagnosisRequest['answers'] | null {
    if (!code || !code.startsWith('UMA-')) {
        return null;
    }

    try {
        const base64 = code.substring(4); // "UMA-"を除去
        const json = atob(base64);
        const answers = JSON.parse(json);

        // 回答データの妥当性チェック
        if (!isValidAnswers(answers)) {
            return null;
        }

        return answers;
    } catch (error) {
        console.error('Failed to parse diagnosis code:', error);
        return null;
    }
}

/**
 * 回答データの妥当性をチェック
 * @param answers チェック対象の回答データ
 * @returns 妥当な場合はtrue
 */
function isValidAnswers(answers: any): answers is DiagnosisRequest['answers'] {
    if (!answers || typeof answers !== 'object') {
        return false;
    }

    // q1〜q10が全て存在し、1〜5の範囲内であることを確認
    for (let i = 1; i <= 10; i++) {
        const key = `q${i}` as keyof DiagnosisRequest['answers'];
        const value = answers[key];

        if (typeof value !== 'number' || value < 1 || value > 5) {
            return false;
        }
    }

    return true;
}
