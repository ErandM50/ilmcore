"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  animate?: boolean;
  className?: string;
}

type ButtonWithMotionProps = ButtonProps & MotionProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonWithMotionProps>(
  ({
    variant = 'primary',
    size = 'md',
    children,
    href,
    loading = false,
    leftIcon,
    rightIcon,
    animate = true,
    className,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = 'btn';
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      tertiary: 'btn-tertiary',
    };

    const sizeClasses = {
      sm: 'px-6 py-3 text-sm',
      md: 'px-8 py-3.5 text-sm',
      lg: 'px-10 py-4 text-base',
    };

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      loading && 'cursor-wait',
      className
    );

    const content = (
      <>
        {leftIcon && !loading && (
          <span className="mr-2 flex items-center">
            {leftIcon}
          </span>
        )}
        {loading ? (
          <span className="mr-2 flex items-center">
            <LoadingSpinner />
          </span>
        ) : null}
        <span>{children}</span>
        {rightIcon && !loading && (
          <span className="ml-2 flex items-center transition-transform group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </>
    );

    const motionProps = animate ? {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.18 },
    } : {};

    if (href) {
      const Comp = motion.a;
      return (
        <Comp
          href={href}
          className={cn(classes, 'group')}
          {...motionProps}
          {...(props as any)}
          ref={ref as any}
        >
          {content}
        </Comp>
      );
    }

    const Comp = motion.button;
    return (
      <Comp
        className={cn(classes, 'group')}
        disabled={disabled || loading}
        {...motionProps}
        {...(props as any)}
        ref={ref as any}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

// Loading spinner component
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default Button;