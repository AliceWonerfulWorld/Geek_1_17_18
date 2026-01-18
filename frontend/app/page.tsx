"use client";

import Link from "next/link";
import { playMouseClickSound } from "@/lib/sound";

export default function Home() {
  const handleDiagnosticClick = async () => {
    await playMouseClickSound();
  };
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#FFFBEB] font-sans text-zinc-800 overflow-x-hidden">

      {/* 背景の馬：濃度を0.3(30%)で全デバイス固定 */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: 'url("/background.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <main className="relative z-10 flex w-full flex-col items-center py-20 px-6 text-center">

        {/* アプリ名：ロゴをタイトルの右下に添える */}
        <div className="mb-8 flex items-end justify-center">
          <h1 className="text-7xl font-[1000] tracking-tighter text-zinc-900 sm:text-8xl flex items-end gap-1">
            UMA<span className="text-blue-600">-</span>CHI
            <img
              src="/logo-uma.png"
              alt="Logo"
              className="h-8 w-8 sm:h-16 sm:w-16 object-contain mb-1 sm:mb-2 transition-transform hover:scale-110"
            />
          </h1>
        </div>

        {/* サブタイトル */}
        <div className="relative mb-12 rounded-2xl bg-white/90 backdrop-blur-sm px-8 py-4 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50">
          <p className="text-lg font-bold text-zinc-700 sm:text-2xl leading-relaxed">
            馬が合う人、<span className="text-blue-600 underline decoration-4 decoration-blue-100 underline-offset-4">ロジック</span>で探します
          </p>
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-zinc-50 bg-white"></div>
        </div>

        {/* 診断ボタン（上部） */}
        <div className="w-full max-w-xs mb-16 space-y-4">
          {/* 2人で診断するボタン */}
          <Link
            href="/diagnostic?mode=two"
            className="flex h-16 w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-xl font-black text-white shadow-[0_6px_0_0_#7e22ce] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#7e22ce] active:translate-y-[6px] active:shadow-none"
          >
            🐴🐴 2人で診断する
          </Link>

          {/* 1人で診断するボタン */}
          <Link
            href="/diagnostic"
            onClick={handleDiagnosticClick}
            className="flex h-16 w-full items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white shadow-[0_6px_0_0_#1e40af] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#1e40af] active:translate-y-[6px] active:shadow-none"
          >
            診断スタート
          </Link>
        </div>

        {/* 診断手順セクション：大画面では横にドーンと大きく */}
        <section className="w-full max-w-[1400px] mx-auto mb-24 text-left">
          <h2 className="mb-12 text-center text-3xl sm:text-5xl font-[1000] text-zinc-800">
            診断の流れ
          </h2>

          <div className="flex flex-col gap-8 lg:flex-row lg:justify-center">
            {/* 01. 診断回答 */}
            <div className="flex flex-row lg:flex-col items-center bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-[0_10px_0_0_#E5E7EB] border-2 border-zinc-50 w-full lg:max-w-[400px] h-[160px] lg:h-auto transition-all hover:shadow-none">
              <div className="flex h-24 w-24 lg:h-48 lg:w-full flex-shrink-0 items-center justify-center rounded-2xl bg-zinc-50/50 mb-0 lg:mb-8">
                <img src="/D.P-1.png" alt="Step 1" className="h-[80%] w-[80%] object-contain lg:scale-125" />
              </div>
              <div className="ml-6 lg:ml-0 flex-1 lg:text-center">
                <div className="flex items-center lg:justify-center gap-2 mb-2">
                  <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">Step 01</span>
                  <h3 className="text-xl lg:text-3xl font-black text-zinc-800">10問の質問</h3>
                </div>
                <p className="text-sm lg:text-lg font-bold text-zinc-500 leading-snug">
                  作業スタイルに直感的に答えるだけ。
                </p>
              </div>
            </div>

            {/* 02. 数値化 */}
            <div className="flex flex-row-reverse lg:flex-col items-center bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-[0_10px_0_0_#E5E7EB] border-2 border-zinc-50 w-full lg:max-w-[400px] h-[160px] lg:h-auto transition-all hover:shadow-none">
              <div className="flex h-24 w-24 lg:h-48 lg:w-full flex-shrink-0 items-center justify-center rounded-2xl bg-zinc-50/50 mb-0 lg:mb-8">
                <img src="/D.P-2.png" alt="Step 2" className="h-[80%] w-[80%] object-contain lg:scale-125" />
              </div>
              <div className="mr-6 lg:mr-0 text-right lg:text-center flex-1">
                <div className="flex flex-row-reverse lg:flex-row items-center lg:justify-center gap-2 mb-2">
                  <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">Step 02</span>
                  <h3 className="text-xl lg:text-3xl font-black text-zinc-800">相性スコア</h3>
                </div>
                <p className="text-sm lg:text-lg font-bold text-zinc-500 leading-snug">
                  独自のロジックで相性を算出します。
                </p>
              </div>
            </div>

            {/* 03. 評価 */}
            <div className="flex flex-row lg:flex-col items-center bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-[0_10px_0_0_#E5E7EB] border-2 border-zinc-50 w-full lg:max-w-[400px] h-[160px] lg:h-auto transition-all hover:shadow-none">
              <div className="flex h-24 w-24 lg:h-48 lg:w-full flex-shrink-0 items-center justify-center rounded-2xl bg-zinc-50/50 mb-0 lg:mb-8">
                <img src="/D.P-3.png" alt="Step 3" className="h-[80%] w-[80%] object-contain lg:scale-125" />
              </div>
              <div className="ml-6 lg:ml-0 text-left lg:text-center flex-1">
                <div className="flex items-center lg:justify-center gap-2 mb-2">
                  <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">Step 03</span>
                  <h3 className="text-xl lg:text-3xl font-black text-zinc-800">ランクと理由</h3>
                </div>
                <p className="text-sm lg:text-lg font-bold text-zinc-500 leading-snug">
                  分析結果をロジックで詳しく解説。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 下部の診断導線 */}
        <div className="mt-12 w-full border-t-2 border-dashed border-zinc-200 pt-16 flex flex-col items-center">
          <p className="mb-6 text-sm font-bold text-zinc-400">
            ＼ まずは診断してみよう！ ／
          </p>
          <div className="w-full max-w-xs space-y-4">
            {/* 2人で診断するボタン */}
            <Link
              href="/diagnostic?mode=two"
              className="flex h-16 w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-xl font-black text-white shadow-[0_6px_0_0_#7e22ce] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#7e22ce] active:translate-y-[6px] active:shadow-none"
            >
              🐴🐴 2人で診断する
            </Link>

            {/* 1人で診断するボタン */}
            <Link
              href="/diagnostic"
              onClick={handleDiagnosticClick}
              className="flex h-16 w-full items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white shadow-[0_6px_0_0_#1e40af] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#1e40af] active:translate-y-[6px] active:shadow-none"
            >
              診断スタート
            </Link>
          </div>
        </div>

        {/* フッター */}
        <div className="mt-24 text-xs font-bold text-zinc-300 tracking-[0.2em] uppercase">
          © UMA-CHI Project 2026
        </div>
      </main>
    </div>
  );
}