"use client";

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  interactive?: boolean;
  hover?: boolean;
  animate?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'minimal';
  className?: string;
  onClick?: () => void;
  href?: string;
}

type CardWithMotionProps = CardProps & MotionProps;

const Card = forwardRef<HTMLDivElement | HTMLAnchorElement, CardWithMotionProps>(
  ({
    children,
    interactive = false,
    hover = true,
    animate = true,
    padding = 'md',
    variant = 'default',
    className,
    onClick,
    href,
    ...props
  }, ref) => {
    const baseClasses = 'card';

    const variantClasses = {
      default: '',
      elevated: 'bg-surface-2',
      minimal: 'border-none bg-transparent',
    };

    const paddingClasses = {
      sm: 'p-4',
      md: 'p-8',
      lg: 'p-10',
    };

    const interactiveClasses = interactive || onClick || href ? 'card-interactive' : '';

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      interactiveClasses,
      className
    );

    const motionProps = animate ? {
      whileHover: hover && (interactive || onClick || href) ? { y: -6 } : undefined,
      whileTap: (interactive || onClick || href) ? { scale: 0.98 } : undefined,
      transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] },
    } : {};

    if (href) {
      const Comp = motion.a;
      return (
        <Comp
          href={href}
          className={classes}
          {...motionProps}
          {...(props as any)}
          ref={ref as any}
        >
          {children}
        </Comp>
      );
    }

    const Comp = motion.div;
    return (
      <Comp
        className={classes}
        onClick={onClick}
        {...motionProps}
        {...(props as any)}
        ref={ref as any}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        } : undefined}
      >
        {children}
      </Comp>
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents for structured content
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={cn('mb-6', className)}>
    {children}
  </div>
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContent = ({ children, className }: CardContentProps) => (
  <div className={cn('flex-1', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter = ({ children, className }: CardFooterProps) => (
  <div className={cn('mt-6 pt-6 border-t border-white/5', className)}>
    {children}
  </div>
);

// Mission Card - specialized card for the mission section
interface MissionCardProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

const MissionCard = ({
  icon: Icon,
  number,
  title,
  subtitle,
  description,
  onClick,
  className
}: MissionCardProps) => (
  <Card
    interactive={!!onClick}
    onClick={onClick}
    className={cn('group', className)}
    animate={true}
  >
    <CardHeader>
      <div className="space-y-6">
        {/* Number in top-left for better reading order */}
        <div className="flex items-center justify-between">
          <span className="text-meta text-accent">{number}</span>
        </div>

        {/* Icon with increased size */}
        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] group-hover:bg-white/[0.05] group-hover:border-white/[0.12] transition-all duration-300 w-fit">
          <Icon className="w-9 h-9 text-white/70 group-hover:text-white/90 transition-colors" strokeWidth={1.5} />
        </div>
      </div>
    </CardHeader>

    <CardContent>
      <h3 className="text-h2 mb-2 group-hover:text-accent transition-colors">{title}</h3>
      {subtitle && (
        <p className="text-sm font-medium text-accent-secondary mb-4 opacity-80">{subtitle}</p>
      )}
      <p className="text-body text-secondary leading-relaxed">{description}</p>
    </CardContent>

    <CardFooter className="border-none mt-8 pt-0">
      <div className="h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-accent/20 transition-all duration-500"></div>
    </CardFooter>
  </Card>
);

// Stat Card - for the about section statistics
interface StatCardProps {
  label: string;
  value: string;
  className?: string;
}

const StatCard = ({ label, value, className }: StatCardProps) => (
  <Card padding="md" className={cn('text-center group', className)}>
    <div className="text-4xl lg:text-3xl font-light text-primary mb-2 tracking-tight">
      {value}
    </div>
    <div className="text-meta text-tertiary">
      {label}
    </div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-500"></div>
  </Card>
);

// Contact Info Card
interface ContactInfoCardProps {
  title: string;
  children: ReactNode;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  className?: string;
}

const ContactInfoCard = ({ title, children, icon: Icon, className }: ContactInfoCardProps) => (
  <Card className={cn('hover:bg-slate-950/40 hover:border-white/[0.08] transition-all duration-500', className)}>
    <CardHeader>
      {Icon && (
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] mb-5">
          <Icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-xl font-thin text-primary">{title}</h3>
    </CardHeader>

    <CardContent>
      {children}
    </CardContent>
  </Card>
);

export default Card;
export {
  CardHeader,
  CardContent,
  CardFooter,
  MissionCard,
  StatCard,
  ContactInfoCard
};