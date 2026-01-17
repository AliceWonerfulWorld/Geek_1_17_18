'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { STORAGE_KEY, RESULT_STORAGE_KEY, DiagnosisResponse } from '@/types/diagnosis';
import Button from '@/components/common/Button';
import LayoutContainer from '@/components/common/LayoutContainer';

export default function ResultPage() {
  const router = useRouter();
  
  // sessionStorageから回答データをクリア（初期化時に実行）
  useState(() => {
    if (typeof window === 'undefined') return;
    
    const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  });

  const [result] = useState<DiagnosisResponse | null>(() => {
    // サーバーサイドではnullを返す
    if (typeof window === 'undefined') return null;

    // sessionStorageから診断結果を読み取る
    const savedResult = sessionStorage.getItem(RESULT_STORAGE_KEY);

    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        // 読み取り完了後、sessionStorageをクリア
        sessionStorage.removeItem(RESULT_STORAGE_KEY);
        return parsedResult;
      } catch (error) {
        console.error('Failed to parse result:', error);
      }
    }
    return null;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <LayoutContainer>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            診断結果
          </h1>
          {result && (
            <p className="text-gray-600 dark:text-gray-400">
              仮ページです
            </p>
          )}
        </div>

        {result ? (
          <div className="space-y-6">
            {/* スコア表示 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 text-center">
              <div className="mb-4">
                <span className="text-6xl font-bold text-blue-600 dark:text-blue-400">
                  {result.score}
                </span>
                <span className="text-2xl text-gray-500 dark:text-gray-400 ml-2">点</span>
              </div>
              <div className="inline-block bg-blue-100 dark:bg-blue-900 px-6 py-2 rounded-full">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ランク {result.rank}
                </span>
              </div>
            </div>

            {/* コメント表示 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                診断コメント
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {result.comment}
              </p>
            </div>

            {/* もう一度診断するボタン */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => router.push('/diagnostic')}
                variant="secondary"
                size="lg"
              >
                もう一度診断する
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
            <p className="text-red-600 dark:text-red-400 text-center">
              診断結果が見つかりませんでした。診断画面からやり直してください。
            </p>
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => router.push('/diagnostic')}
                size="lg"
              >
                診断画面へ戻る
              </Button>
            </div>
          </div>
        )}
      </LayoutContainer>
    </div>
  );
}
