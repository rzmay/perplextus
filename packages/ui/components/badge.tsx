import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import Icon from './icon';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'gray' | 'red' | 'green' | 'blue' | 'yellow';
  icon?: IconProp;
  size?: 'xs' | 'sm' | 'lg';
  uppercase?: boolean;
}

const Badge: React.FC<BadgeProps> = function Badge({
  children,
  className,
  variant,
  icon,
  size = 'sm',
  uppercase,
  ...props
}) {
  return (
    <span
      className={clsx(
        className,
        'rounded whitespace-nowrap',
        { uppercase },
        {
          'px-1 py-px text-xs': size === 'xs',
          'px-1.5 py-px text-xs font-medium': size === 'sm',
          'px-2 py-0.5 text-xs font-medium': size === 'lg',
        },
        {
          'bg-gray-100 text-gray-800 border border-gray-200': variant === 'gray',
          'bg-lime-100 text-lime-800 border border-lime-200': variant === 'green',
          'bg-red-100 text-red-800 border border-red-200': variant === 'red',
          'bg-sky-100 text-sky-800 border border-sky-200': variant === 'blue',
          'bg-amber-100 text-amber-800 border border-amber-200': variant === 'yellow',
        },
      )}
      {...props}
    >
      {children}
      {icon && <Icon icon={icon} className="ml-1.5" />}
    </span>
  );
};

export type { BadgeProps };

export default Badge;
