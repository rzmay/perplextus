import clsx from 'clsx';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  invalid?: boolean;
}

const Radio: React.FC<RadioProps> = function Radio({
  className, invalid, name, ...props
}) {
  return (
    <input
      id={name}
      name={name}
      type="radio"
      className={clsx(
        className,
        'appearance-none transition rounded-full border bg-transparent text-primary-500 !ring-offset-0 focus:outline-none focus:ring',
        invalid
          ? '!border-red-500 !ring-red-500/40 z-10'
          : '!border-gray-500 !ring-primary-500/40 focus:!border-primary-500 checked:!border-primary-500',
      )}
      {...props}
    />
  );
};

export type { RadioProps };

export default Radio;
