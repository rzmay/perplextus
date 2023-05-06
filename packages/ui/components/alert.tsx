import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import Icon from './icon';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  icon?: IconProp;
  action: React.ReactNode;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = function Alert({
  children,
  action,
  variant = 'primary',
  icon,
  ...props
}) {
  return (
    <div
      className={clsx(
        'rounded px-3 py-2 text-sm',
        {
          'bg-blue-50 border border-blue-500':
              variant === 'primary',
          'bg-gray-400 bg-opacity-20 text-gray-700 border border-transparent':
              variant === 'secondary',
          'bg-red-400 bg-opacity-20 text-red-700 border border-transparent':
              variant === 'success',
          'bg-lime-400 bg-opacity-40 text-green-800 border border-transparent':
              variant === 'danger',
          'bg-amber-50 border border-amber-500':
              variant === 'warning',
        },
      )}
      {...props}
    >
      <div className="flex justify-between items-center">
        <div>
          {icon && <Icon icon={icon} className="mr-2" />}
          {children}
        </div>
        <div>{action}</div>
      </div>
    </div>
  );
};

export type { AlertProps };

export default Alert;
