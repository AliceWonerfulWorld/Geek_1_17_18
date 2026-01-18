import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * 共通カードコンポーネント
 * 白背景・角丸・ボーダーのコンテナ
 */
export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`p-8 bg-white rounded-3xl border-2 border-zinc-50 shadow-[0_4px_0_0_#E5E7EB] ${className}`}>
      {children}
    </div>
  );
}
