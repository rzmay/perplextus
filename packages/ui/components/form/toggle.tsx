import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import Text from '../text';

type ToggleProps = {
  checked: boolean;
  children?: React.ReactNode;
  className?: string;
  label?: string;
  onChange: () => void;
};

const Toggle: React.FC<ToggleProps> = function Toggle({
  checked, label, className, children, ...props
}) {
  return (
    <Switch
      checked={checked}
      className={clsx(
        className,
        'relative inline-flex h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none',
        checked ? 'bg-green-500' : 'bg-gray-200',
      )}
      {...props}
    >
      <span className={clsx(
        'translate-x-0 relative inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200',
        checked ? 'translate-x-4' : 'translate-x-0',
      )}
      >
        {children}
      </span>
      {label && <Text as="span" className="inline-block align-middle text-sm ml-2 text-gray-800">{label}</Text>}
    </Switch>
  );
};

export type { ToggleProps };

export default Toggle;
