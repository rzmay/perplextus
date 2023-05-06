import clsx from 'clsx';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  invalid?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = function Checkbox({
  className,
  invalid,
  name,
  ...props
}) {
  return (
    <input
      id={name}
      name={name}
      type="checkbox"
      className={clsx(
        className,
        'appearance-none transition rounded !bg-white checked:!bg-black cursor-pointer',
        'border-gray-200 checked:!border-black',
        '!ring-offset-0 !ring-0',
      )}
      {...props}
    />
  );
};

export type { CheckboxProps };

export default Checkbox;
