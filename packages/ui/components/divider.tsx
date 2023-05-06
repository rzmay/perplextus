import clsx from 'clsx';
import Text from './text';

interface DividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  text?: string;
}

const Divider: React.FC<DividerProps> = function Divider({ className, text, ...props }) {
  return (
    <div className={clsx(className, 'flex w-full items-center')} {...props}>
      <div className="grow border-t" aria-hidden="true" />
      {text && (
        <div className="grow-0 mx-3">
          <Text size="sm" opacity={50}>{text}</Text>
        </div>
      )}
      <div className="grow border-t" aria-hidden="true" />
    </div>
  );
};

export type { DividerProps };

export default Divider;
