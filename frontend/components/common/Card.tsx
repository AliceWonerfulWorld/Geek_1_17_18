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
    <div className={`p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
