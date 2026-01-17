import { ReactNode } from 'react';

interface LayoutContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
}

/**
 * 共通レイアウトコンテナコンポーネント
 * 最大幅と中央揃えを制御
 */
export default function LayoutContainer({
  children,
  maxWidth = '3xl',
  className = '',
}: LayoutContainerProps) {
  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  };

  return (
    <div className={`${maxWidthStyles[maxWidth]} mx-auto ${className}`}>
      {children}
    </div>
  );
}
