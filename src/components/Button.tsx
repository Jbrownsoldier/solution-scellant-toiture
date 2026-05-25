import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: ButtonVariant;
 size?: ButtonSize;
 children: ReactNode;
 icon?: ReactNode;
 iconPosition?: 'left' | 'right';
}

const variantStyles: Record<ButtonVariant, string> = {
 primary:
 'bg-secondary text-primary shadow-[inset_0_1px_4px_rgba(255,255,255,0.4)] hover:brightness-110 focus-visible:ring-secondary/50',
 secondary:
 'bg-surface-container-lowest text-primary ring-1 ring-outline-variant/15 hover:bg-surface-container-low shadow-ambient focus-visible:ring-outline-variant/50',
 outline:
 'bg-transparent text-primary tracking-widest hover:bg-surface focus-visible:ring-primary/50',
};

const sizeStyles: Record<ButtonSize, string> = {
 sm: 'px-4 py-2 text-sm',
 md: 'px-6 py-3 text-base',
 lg: 'px-8 py-4 text-lg',
};

export function Button({
 variant = 'primary',
 size = 'md',
 children,
 icon,
 iconPosition = 'left',
 className = '',
 ...props
}: ButtonProps) {
 return (
 <button
 className={`
 inline-flex items-center justify-center gap-2
 font-semibold rounded-lg
 transition-all duration-200 ease-out
 focus-visible:outline-none focus-visible:ring-4
 disabled:opacity-50 disabled:cursor-not-allowed
 ${variantStyles[variant]}
 ${sizeStyles[size]}
 ${className}
 `}
 {...props}
 >
 {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
 {children}
 {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
 </button>
 );
}
