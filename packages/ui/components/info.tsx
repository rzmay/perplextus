import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import Icon from './icon';
import Text from './text';

type InfoProps = React.HTMLAttributes<HTMLDivElement>;

const Info: React.FC<InfoProps> = function Info({ className, children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover className={clsx(className, 'relative inline-block')}>
      <Popover.Button
        className="appearance-none focus:outline-none"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Icon
          icon={faInfoCircle}
          className="transition hover:text-black cursor-pointer text-gray-400"
        />
      </Popover.Button>
      <Transition
        show={open}
        enter="transition-all duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel static className="absolute outline-none z-30 bottom-7 left-1/2 -translate-x-1/2 origin-bottom max-w-sm min-w-max">
          <div className="rounded border border-gray-200 bg-white shadow-lg py-3 px-4 max-w-sm">
            <Text size="sm" className="whitespace-pre-wrap">{children}</Text>
          </div>
          <div className="absolute top-auto left-0 right-0 flex justify-center z-30">
            <svg className="w-[20px] h-[10px] -mt-px">
              <path className="stroke-current text-gray-200" fill="none" d="M0 0 L10 8 L20 0" strokeWidth={2} />
              <path className="fill-current text-white" stroke="none" d="M0 0 L10 8 L20 0" />
            </svg>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Info;
