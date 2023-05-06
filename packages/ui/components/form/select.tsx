import clsx from 'clsx';
import React from 'react';

interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'autoComplete' | 'id' | 'size'
  > {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  invalid?: boolean;
}

const Select: React.FC<SelectProps> = function Select({
  name,
  className,
  size = 'sm',
  invalid,
  ...props
}) {
  return (
    <select
      id={name}
      name={name}
      autoComplete="off"
      className={clsx(
        className,
        'relative transition focus:!ring focus-within:z-20 outline-none bg-white placeholder-gray-300 text-gray-800 py-0 px-3',
        'disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100',
        {
          'h-7 text-sm': size === 'xs',
          'h-8 text-sm': size === 'sm',
          'h-9 text-sm': size === 'md',
          'h-11': size === 'lg',
          'h-12': size === 'xl',
        },
        !className?.includes('input-group') &&
          'input-group:-ml-px input-group:first:!ml-0',
        !className?.includes('rounded') &&
          'rounded-md input-group:rounded-none input-group:first:rounded-l-md input-group:last:rounded-r-md',
        !className?.includes('w-') && 'w-full',
        invalid
          ? '!border-red-500 !ring-red-400 !ring-opacity-40 z-10'
          : '!border-gray-200 focus:!border-blue-300 !ring-blue-400 !ring-opacity-40'
      )}
      {...props}
    />
  );
};

export type { SelectProps };

export default Select;
