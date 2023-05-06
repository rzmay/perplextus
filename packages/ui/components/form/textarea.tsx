import clsx from 'clsx';

interface TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'id' | 'autoComplete' | 'spellCheck' | 'autoCorrect' | 'size'
  > {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  invalid?: boolean;
  copyable?: boolean;
  resizable?: boolean;
}

const Textarea: React.FC<TextareaProps> = function Textarea({
  name,
  className,
  size = 'md',
  invalid,
  readOnly,
  copyable,
  resizable,
  ...props
}) {
  return (
    <textarea
      id={name}
      name={name}
      readOnly={readOnly || copyable}
      onClick={
        copyable
          ? (e) => {
              e.preventDefault();
              (e.target as HTMLInputElement).select();
            }
          : undefined
      }
      autoComplete="off"
      spellCheck="false"
      autoCorrect="off"
      className={clsx(
        className,
        {
          'text-sm': ['xs', 'sm', 'md'].includes(size),
        },
        'relative transition focus:!ring focus-within:z-20 focus:!outline-none bg-white placeholder-gray-400 text-gray-800 px-3 py-2',
        'disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100',
        !className?.includes('rounded') &&
          'rounded-md input-group:rounded-none input-group:first:rounded-l input-group:last:rounded-r',
        !className?.includes('input-group') &&
          'input-group:-ml-px input-group:first:!ml-0',
        !className?.includes('w-') && 'w-full',
        invalid
          ? '!border-red-500 !ring-red-400 !ring-opacity-40 z-10'
          : '!border-gray-200 focus:!border-blue-300 !ring-blue-400 !ring-opacity-40',
        !resizable && 'resize-none'
      )}
      {...props}
    />
  );
};

export type { TextareaProps };

export default Textarea;
