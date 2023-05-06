import { faMultiply } from '@fortawesome/pro-regular-svg-icons/faMultiply';
import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { usePopper } from 'react-popper';
import Button from '../button';
import Icon from '../icon';
import Text from '../text';

const FilterTag: React.FC<{
  label: string;
  active?: boolean;
  onRemove: () => void;
}> = function FilterTag({ label, active }) {
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>();
  const [referenceElement, setReferenceElement] = React.useState<HTMLDivElement | null>();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
      {
        name: 'flip',
        options: {
          boundary: [],
          padding: { bottom: 150 },
          allowedAutoPlacements: ['top', 'bottom'],
        },
      },
    ],
  });

  // React.useEffect(() => {
  //   if (!menuRef && open) return () => {};
  //
  //   const handleClick = function handleClick(e: MouseEvent) {
  //     if (!menuRef?.contains(e.target as Node)) setOpen(false);
  //   };
  //
  //   const handleKeyDown = function handleKeyDown(e: KeyboardEvent) {
  //     if (e.key === 'Escape') setOpen(false);
  //   };
  //
  //   document.addEventListener('click', handleClick);
  //   document.addEventListener('keydown', handleKeyDown);
  //
  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [menuRef, open]);

  return (
    <Menu>
      {({ open }) => (
        <div className="relative z-20" ref={setReferenceElement}>
          <Menu.Button className={clsx('flex items-center justify-between py-1 px-2 rounded-full', active ? 'bg-primary-400 bg-opacity-20 text-primary-700' : 'bg-gray-100')}>
            <Text size="xs" weight="semibold" className="mr-2">
              {label}
            </Text>
            {active
              ? <Icon icon={faMultiply} size="xs" />
              : <Icon icon={faPlus} size="xs" />}
          </Menu.Button>

          <div
            className="z-50"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Transition
              show={open}
              enter="transition ease-out duration-100 absolute z-50"
              enterFrom="opacity-0 scale-95 absolute z-50"
              enterTo="opacity-100 scale-100 absolute z-50"
              leave="transition ease-in duration-75 absolute z-50"
              leaveFrom="opacity-100 scale-100 absolute z-50"
              leaveTo="opacity-0 scale-95 absolute z-50"
            >
              <Menu.Items
                static
                className="origin-top-right absolute left-0 mt-1.5 w-32 min-w-max rounded shadow-xl bg-white outline-none border z-50"
              >
                <div className="divide-y">
                  <div className="bg-gray-100 py-1 px-2">
                    <Text size="xs" opacity={50} weight="medium">
                      {`Filter by ${label}`}
                    </Text>
                  </div>
                  <div className="p-2" role="none">
                    {/* TODO:  Add input rendering logic */}
                  </div>
                  <div className="p-2 flex justify-end space-x-2">
                    <Button size="xs" variant="light">Clear</Button>
                    <Button size="xs" variant="primary">Apply</Button>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </div>
      )}
    </Menu>
  );
};

const Filter: React.FC = function Filter() {
  return (
    <div className="flex">
      <div className="flex space-x-2">
        <FilterTag label="Test" onRemove={() => {}} />
        {/* TODO: Add filter tag rendering logic */}
      </div>
    </div>
  );
};

export default Filter;
