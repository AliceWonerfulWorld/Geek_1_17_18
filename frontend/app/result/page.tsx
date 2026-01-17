"use client";

import Link from "next/link";
import type { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import aBg from "../../resulthaikei/a.png";
import bBg from "../../resulthaikei/b.png";
import cBg from "../../resulthaikei/c.png";
import dBg from "../../resulthaikei/d.png";
import sBg from "../../resulthaikei/s.png";
import horseL from "../../resulthaikei/Gemini_Generated_Image_iebd3ciebd3ciebd.png";
import horseR from "../../resulthaikei/Gemini_Generated_Image_iebd3ciebd3ciebd2.png";

type RankKey = "D" | "C" | "B" | "A" | "S";

const CONFETTI_COLORS = ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6"];

const Confetti = () => (
  <>
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-30">
      {Array.from({ length: 36 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const duration = 2.5 + Math.random();
        const rotate = Math.random() * 360;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        return (
          <span
            key={i}
            className="absolute block h-3 w-1.5 rounded-full opacity-70 animate-confetti"
            style={{
              left: `${left}%`,
              top: "-10%",
              backgroundColor: color,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `translate3d(0, -20vh, 0) rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
    <style jsx global>{`
      @keyframes confetti {
        0% {
          transform: translate3d(0, -20vh, 0) rotate(0deg);
        }
        100% {
          transform: translate3d(0, 120vh, 0) rotate(360deg);
        }
      }
      .animate-confetti {
        animation: confetti linear infinite;
      }
    `}</style>
  </>
);

const playConfettiSound = () => {
  /* 音は無効化 */
};

const RANK_DATA: Record<
  RankKey,
  {
    label: string;
    comment: string;
    text: string;
    bg: string;
    gradient: string;
    border: string;
    bgImage: StaticImageData;
  }
> = {
  D: {
    label: "相性最悪…",
    comment: "価値観が違うみたい。お互いを知るために対話から始めよう。",
    text: "text-red-600",
    bg: "bg-red-50",
    gradient: "from-red-400 to-rose-400",
    border: "border-red-200",
    bgImage: dBg,
  },
  C: {
    label: "ぼちぼちのびしろ…",
    comment:
      "努力次第で良くなる可能性あり。すり合わせ次第で良いチームになるかも。",
    text: "text-orange-600",
    bg: "bg-orange-50",
    gradient: "from-orange-400 to-red-400",
    border: "border-orange-200",
    bgImage: cBg,
  },
  B: {
    label: "まあままいい感じ",
    comment: "良くも悪くも普通。丁寧なコミュニケーション安定させよう。",
    text: "text-yellow-600",
    bg: "bg-yellow-50",
    gradient: "from-yellow-400 to-amber-400",
    border: "border-yellow-200",
    bgImage: bBg,
  },
  A: {
    label: "いい感じ！",
    comment: "価値観や考え方が似ているよ。良いリズムで開発がすすめられそう。",
    text: "text-sky-600",
    bg: "bg-sky-50",
    gradient: "from-sky-400 to-blue-400",
    border: "border-sky-200",
    bgImage: aBg,
  },
  S: {
    label: "最高の相性！文句なし！",
    comment: "最高の相性です。このチームなら爆速でプロダクトが完成するかも。",
    text: "text-green-600",
    bg: "bg-green-50",
    gradient: "from-green-400 to-emerald-400",
    border: "border-green-200",
    bgImage: sBg,
  },
};

const HorseSprites = () => (
  <>
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      <img
        src={horseR.src}
        alt="horse left"
        className="absolute bottom-6 sm:bottom-10 left-[-30%] sm:left-[-20%] h-48 sm:h-64 animate-horse-left opacity-85"
      />
      <img
        src={horseL.src}
        alt="horse right"
        className="absolute bottom-6 sm:bottom-10 right-[-30%] sm:right-[-20%] h-48 sm:h-64 animate-horse-right opacity-85"
      />
    </div>
    <style jsx global>{`
      @keyframes horse-left {
        0% {
          transform: translateX(0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        100% {
          transform: translateX(160%) scale(1);
          opacity: 0.9;
        }
      }
      @keyframes horse-right {
        0% {
          transform: translateX(0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        100% {
          transform: translateX(-160%) scale(1);
          opacity: 0.9;
        }
      }
      .animate-horse-left {
        animation: horse-left 3.8s ease-out forwards;
      }
      .animate-horse-right {
        animation: horse-right 3.8s ease-out forwards;
      }
    `}</style>
  </>
);

const getScoreRank = (score: number): RankKey => {
  if (score >= 81) return "S";
  if (score >= 61) return "A";
  if (score >= 41) return "B";
  if (score >= 21) return "C";
  return "D";
};

export default function ResultPage() {
  const [score] = useState(70); // Aランク確認用
  const rank = getScoreRank(score);
  const rankInfo = RANK_DATA[rank];
  const [showConfetti, setShowConfetti] = useState(false);
  const [rankVisible, setRankVisible] = useState(false);

  useEffect(() => {
    if (rank === "S") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3600);
      playConfettiSound();
      return () => clearTimeout(timer);
    }
    setShowConfetti(false);
  }, [rank]);

  useEffect(() => {
    setRankVisible(false);
    const timer = setTimeout(() => setRankVisible(true), 120);
    return () => clearTimeout(timer);
  }, [rank]);

  return (
    <div
      className={`flex min-h-screen items-start justify-center bg-no-repeat p-4 pt-6 sm:pt-10 transition-all ${rankVisible ? "animate-bg-fall" : ""}`}
      style={{
        backgroundImage: `url(${rankInfo.bgImage.src})`,
        backgroundSize: "cover",
        backgroundColor: "#f7f7f7",
        backgroundPosition: rankVisible ? "center -1050px" : "center 0px",
        transitionDuration: rankVisible ? "2s" : "0s",
        transitionTimingFunction: "ease-out",
      }}
    >
      {showConfetti && <Confetti />}
      <main className="mt-2 sm:mt-6 flex flex-col items-center justify-center text-center w-full max-w-2xl px-5 py-5 sm:px-8 sm:py-7 bg-white/60 backdrop-blur rounded-3xl shadow-2xl">
        <div
          className={`inline-block px-6 py-2 rounded-full ${rankInfo.bg} mb-6`}
        >
          <p className="text-sm font-bold">診断結果</p>
        </div>

        <h1
          className={`text-7xl sm:text-8xl font-black mb-2 ${rankInfo.text} transition-all duration-1000 ease-out ${
            rankVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-3"
          }`}
        >
          {rank}
        </h1>

        <p className={`text-3xl font-bold mb-8 ${rankInfo.text}`}>
          {rankInfo.label}
        </p>

        <div className={`text-5xl font-bold mb-2 ${rankInfo.text}`}>
          {score}
          <span className="text-2xl">%</span>
        </div>
        <p className="text-gray-600 text-sm mb-8">スコア</p>

        <div
          className={`w-full p-6 rounded-2xl border-2 ${rankInfo.border} ${rankInfo.bg} mb-8`}
        >
          <p className="text-gray-700 text-lg leading-relaxed">
            {rankInfo.comment}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full sm:flex-row sm:justify-center">
          <Link
            href="/"
            className={`px-8 py-4 rounded-lg bg-gradient-to-r ${rankInfo.gradient} text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block`}
          >
            もう一度診断する
          </Link>
        </div>

        <div className="mt-8 text-gray-600 text-sm">
          <p>回答に基づくスコア</p>
        </div>
      </main>
    </div>
  );
}
