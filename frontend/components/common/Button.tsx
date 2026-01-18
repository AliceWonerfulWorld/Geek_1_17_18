import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

/**
 * 共通ボタンコンポーネント
 * variant: primary (青・選択時), secondary (白・未選択時), ghost (透明)
 * size: sm (小), md (中), lg (大)
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-full font-black transition-all flex items-center justify-center';
  
  const variantStyles = {
    primary: disabled
      ? 'bg-zinc-300 text-white cursor-not-allowed shadow-none'
      : 'bg-blue-600 text-white shadow-[0_6px_0_0_#1e40af] hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#1e40af] active:translate-y-[6px] active:shadow-none',
    secondary: disabled
      ? 'bg-zinc-100 text-zinc-400 border-2 border-zinc-200 cursor-not-allowed'
      : 'bg-white text-zinc-600 border-2 border-zinc-50 shadow-[0_4px_0_0_#E5E7EB] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#E5E7EB] active:translate-y-[4px] active:shadow-none',
    ghost: disabled
      ? 'text-zinc-400 cursor-not-allowed'
      : 'text-zinc-600 hover:bg-zinc-100',
  };

  const sizeStyles = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-16 px-10 text-xl',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
