import clsx from 'clsx';
import React from 'react';

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'id' | 'autoComplete' | 'spellCheck' | 'autoCorrect' | 'size'
  > {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  invalid?: boolean;
  copyable?: boolean;
}

const Input: React.FC<InputProps> = function Input({
  name,
  className,
  size = 'sm',
  invalid,
  readOnly,
  copyable,
  ...props
}) {
  return (
    <input
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
      type="text"
      className={clsx(
        className,
        'relative transition focus:ring focus-within:z-20 outline-none bg-white placeholder-gray-400 text-gray-800 py-0 px-3 disabled:cursor-not-allowed disabled:bg-gray-100 w-full',
        {
          'h-7 text-sm': size === 'xs',
          'h-8 text-sm': size === 'sm',
          'h-9 text-sm': size === 'md',
          'h-10': size === 'lg',
          'h-11': size === 'xl',
        },
        !className?.includes('rounded') &&
          'rounded-md input-group:rounded-none input-group:first:rounded-l-md input-group:last:rounded-r-md',
        !className?.includes('input-group') &&
          'input-group:-ml-px input-group:first:!ml-0',
        invalid
          ? 'border-red-500 ring-red-400 ring-opacity-40 z-10'
          : 'border-gray-200 focus:border-blue-300 !ring-blue-400 !ring-opacity-40'
      )}
      {...props}
    />
  );
};

export type { InputProps };

export default Input;
