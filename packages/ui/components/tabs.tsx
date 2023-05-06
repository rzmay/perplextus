import clsx from 'clsx';
import { isEqual } from 'lodash';
import React from 'react';
import Text from './text';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Array<{ title: string; value: string | number; }>;
  selected: string | number;
  setSelected: Function;
}

const Tabs: React.FC<TabsProps> = function Tabs({
  tabs, selected, setSelected, ...props
}) {
  return (
    <nav className="max-w-full overflow-auto flex border-b px-5 pt-5" {...props}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => setSelected(tab.value)}
          className="whitespace-nowrap transition duration-100 cursor-pointer px-2 first:pl-0 last:pr-0"
        >
          <div
            className={clsx(
              'border-b-2 pb-1.5',
              isEqual(tab.value, selected) ? 'border-black' : 'border-transparent',
            )}
          >
            <Text size="sm" opacity={isEqual(tab.value, selected) ? 70 : 50}>
              {tab.title}
            </Text>
          </div>
        </button>
      ))}
    </nav>
  );
};

export type { TabsProps };

export default Tabs;
