'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { STORAGE_KEY, RESULT_STORAGE_KEY, MODE_KEY, DiagnosisResponse } from '@/types/diagnosis';

export default function ResultPage() {
  const router = useRouter();

  // 診断モードを保存（2人モードかどうか）
  const [isTwoPersonMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const mode = sessionStorage.getItem(MODE_KEY);
    return mode === 'two';
  });

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

  // スコアに応じた背景色を取得
  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-gradient-to-br from-yellow-50 to-orange-50';
    if (score >= 70) return 'bg-gradient-to-br from-blue-50 to-cyan-50';
    if (score >= 50) return 'bg-gradient-to-br from-green-50 to-emerald-50';
    return 'bg-gradient-to-br from-gray-50 to-slate-50';
  };

  // スコアに応じたテキスト色を取得
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-orange-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFBEB] font-sans text-zinc-800 py-12 px-4">
      <main className="flex w-full max-w-2xl flex-col items-center">

        {result ? (
          <>
            {/* ヘッダー */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-[900] tracking-tight text-zinc-900 mb-3 sm:text-6xl">
                診断結果
              </h1>
              <p className="text-zinc-600 font-bold">
                あなたとの相性は...
              </p>
            </div>

            {/* スコア表示 */}
            <div className={`w-full rounded-3xl ${getScoreBgColor(result.score)} p-10 shadow-[0_6px_0_0_#E5E7EB] border-2 border-white mb-8`}>
              <div className="text-center">
                {/* スコア */}
                <div className="mb-6">
                  <div className={`text-8xl font-[900] ${getScoreColor(result.score)} mb-2 sm:text-9xl`}>
                    {result.score}
                  </div>
                  <div className="text-3xl font-bold text-zinc-600">
                    点 / 100点
                  </div>
                </div>

                {/* ランクバッジ */}
                <div className="inline-block">
                  <div className="rounded-2xl bg-white px-8 py-4 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🐴</span>
                      <span className={`text-2xl font-black ${getScoreColor(result.score)} sm:text-3xl`}>
                        {result.rank}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* コメント表示 */}
            <div className="w-full rounded-3xl bg-white p-8 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50 mb-12">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">💬</div>
                <div>
                  <h2 className="text-xl font-black text-zinc-800 mb-3">
                    診断コメント
                  </h2>
                  <p className="text-zinc-700 font-bold leading-relaxed text-lg">
                    {result.comment}
                  </p>
                </div>
              </div>
            </div>

            {/* もう一度診断するボタン */}
            <div className="w-full max-w-xs space-y-4">
              <p className="mb-4 text-sm font-bold text-zinc-400 text-center">
                ＼ 他の人との相性も試してみよう！ ／
              </p>
              <button
                onClick={() => router.push(isTwoPersonMode ? '/diagnostic?mode=two' : '/diagnostic')}
                className="flex h-16 w-full items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white shadow-[0_6px_0_0_#1e40af] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#1e40af] active:translate-y-[6px] active:shadow-none"
              >
                もう一度診断する
              </button>
              <Link
                href="/"
                className="flex h-14 w-full items-center justify-center rounded-full bg-zinc-200 text-lg font-black text-zinc-700 shadow-[0_4px_0_0_#a1a1aa] transition-all hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#a1a1aa] active:translate-y-[4px] active:shadow-none"
              >
                タイトルに戻る
              </Link>
            </div>
          </>
        ) : (
          /* 結果データがない場合のエラー表示 */
          <div className="w-full rounded-3xl bg-white p-8 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-600 font-bold text-lg mb-6">
              診断結果が見つかりませんでした。<br />
              診断画面からやり直してください。
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/diagnostic')}
                className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-8 text-lg font-black text-white shadow-[0_6px_0_0_#1e40af] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#1e40af] active:translate-y-[6px] active:shadow-none"
              >
                診断画面へ戻る
              </button>
              <div>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-200 px-8 text-base font-black text-zinc-700 shadow-[0_4px_0_0_#a1a1aa] transition-all hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#a1a1aa] active:translate-y-[4px] active:shadow-none"
                >
                  タイトルに戻る
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
