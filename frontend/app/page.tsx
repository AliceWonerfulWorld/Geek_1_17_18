import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFBEB] font-sans text-zinc-800 py-20">
      
      <main className="flex w-full max-w-2xl flex-col items-center px-6 text-center">
        
        {/* アプリ名 */}
        <h1 className="mb-6 text-7xl font-[900] tracking-tighter text-zinc-900 sm:text-8xl">
          UMA<span className="text-blue-600">-</span>CHI
        </h1>

        {/* サブタイトル */}
        <div className="relative mb-12 rounded-2xl bg-white px-8 py-4 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50">
          <p className="text-lg font-bold text-zinc-700 sm:text-2xl leading-relaxed">
            馬が合う人、<span className="text-blue-600 underline decoration-4 decoration-blue-100 underline-offset-4">ロジック</span>で探します
          </p>
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-zinc-50 bg-white"></div>
        </div>

        {/* 診断ボタン（上部） */}
        <div className="w-full max-w-xs mb-20">
          <Link
            href="/question"
            className="flex h-16 w-full items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white shadow-[0_6px_0_0_#1e40af] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#1e40af] active:translate-y-[6px] active:shadow-none"
          >
            診断スタート
          </Link>
        </div>

        {/* 概要と手順 */}
        <div className="w-full space-y-16 text-left">
          
          {/* アプリ概要 */}
          <section className="relative">
            <h2 className="mb-6 text-center text-2xl font-black text-zinc-800 flex items-center justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              UMA-CHIとは？
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            </h2>
            <div className="rounded-3xl bg-white p-8 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50 text-center">
              <p className="font-bold leading-loose text-zinc-600 sm:text-lg">
                UMA-CHI は、短い質問に答えるだけで<br />
                <span className="text-zinc-900">「この人と一緒に作業すると合うかどうか」</span>を<br />
                <span className="text-blue-600">数値と理由</span>で教えてくれる Web アプリです。
              </p>
            </div>
          </section>

          {/* 診断手順 */}
          <section>
            <h2 className="mb-8 text-center text-xl font-black text-zinc-800">
              診断の流れ
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="relative rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50">
                <span className="text-sm font-black text-blue-600 opacity-50 block mb-2">01. 診断回答</span>
                <h3 className="mb-2 text-lg font-black text-zinc-800">10問の質問</h3>
                <p className="text-xs font-bold leading-relaxed text-zinc-500">
                  作業スタイルに関する質問に5段階で直感的に答えるだけ。
                </p>
              </div>

              <div className="relative rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50">
                <span className="text-sm font-black text-blue-600 opacity-50 block mb-2">02. 数値化</span>
                <h3 className="mb-2 text-lg font-black text-zinc-800">相性スコア</h3>
                <p className="text-xs font-bold leading-relaxed text-zinc-500">
                  回答を独自のロジックで分析し、相性を0〜100%で算出します。
                </p>
              </div>

              <div className="relative rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#E5E7EB] border-2 border-zinc-50">
                <span className="text-sm font-black text-blue-600 opacity-50 block mb-2">03. 評価</span>
                <h3 className="mb-2 text-lg font-black text-zinc-800">ランクと理由</h3>
                <p className="text-xs font-bold leading-relaxed text-zinc-500">
                  ランク評価と、なぜその数値になったのかの具体的な理由を解説。
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* 下部の診断導線 */}
        <div className="mt-24 w-full max-w-xs flex flex-col items-center">
          <p className="mb-4 text-sm font-bold text-zinc-400">
            ＼ まずは自分で診断してみよう！ ／
          </p>
          <Link
            href="/question"
            className="flex h-16 w-full items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white shadow-[0_6px_0_0_#1e40af] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#1e40af] active:translate-y-[6px] active:shadow-none"
          >
            診断スタート
          </Link>
        </div>

        {/* フッター */}
        <div className="mt-24 text-xs font-bold text-zinc-300 tracking-[0.2em] uppercase">
          © UMA-CHI Project 2024
        </div>
      </main>
    </div>
  );
}