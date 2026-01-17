'use client';

import { useEffect, useState } from 'react';
import { STORAGE_KEY, DiagnosticAnswers } from '@/types/diagnosis';

export default function ResultPage() {
  const [answers, setAnswers] = useState<DiagnosticAnswers | null>(null);

  useEffect(() => {
    // sessionStorageから回答データを読み取る
    const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
    
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
        
        // 読み取り完了後、sessionStorageをクリア
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Failed to parse answers:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            診断結果
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            （この画面は仮）
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            回答データ確認
          </h2>
          
          {answers ? (
            <div className="space-y-2">
              <p className="text-green-600 dark:text-green-400 font-medium mb-4">
                ✓ 回答データの読み取りに成功しました
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(answers, null, 2)}
              </pre>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                ※ sessionStorageからのデータ読み取り後、自動的にクリアされました
              </p>
            </div>
          ) : (
            <p className="text-red-600 dark:text-red-400">
              回答データが見つかりませんでした
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
