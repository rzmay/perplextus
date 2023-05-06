import clsx from 'clsx';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

const Progress: React.FC<ProgressProps> = function Progress({ className, value, ...props }) {
  return (
    <div className={clsx(className, 'h-2 rounded-full bg-gray-200')} {...props}>
      <div className="h-full rounded-full bg-primary-500" style={{ width: `${value}%` }} />
    </div>
  );
};

export type { ProgressProps };

export default Progress;
