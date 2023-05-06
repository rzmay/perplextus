import { faArrowRight } from '@fortawesome/pro-regular-svg-icons/faArrowRight';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons/faEllipsisH';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import Button from './button';
import Divider from './divider';
import Icon, { IconProps } from './icon';
import Link, { LinkProps } from './link';
import Text from './text';

type RootProps = {
  children: React.ReactNode;
  className?: string;
  ghost?: boolean;
};

const Root: React.FC<RootProps> = function QuickActions({ children, className, ghost }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>();
  const [referenceElement, setReferenceElement] = React.useState<HTMLSpanElement | null>();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
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

  React.useEffect(() => {
    if (!referenceElement && open) return () => {};

    const handleClick = function handleClick(e: MouseEvent) {
      if (!referenceElement?.contains(e.target as Node)) setOpen(false);
    };

    const handleKeyDown = function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [referenceElement, open]);

  return (
    <Menu as="div" className="inline-block" ref={setReferenceElement}>
      <Menu.Button
        as={Button}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          setOpen(!open);
        }}
        type="button"
        size="xs"
        icon={faEllipsisH}
        color={ghost ? undefined : 'light'}
        className={clsx(
          className,
          ghost && [
            'text-gray-800 border active:!shadow-none',
            open
              ? 'border shadow-md bg-white border-gray-200'
              : 'shadow-none hover:shadow-md !border-transparent bg-transparent hover:bg-white hover:!border-gray-200 focus:!border-gray-200',
          ],
        )}
      />
      {createPortal(
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items static className="min-w-max py-2 rounded shadow-lg bg-white outline-none border">
              {children}
            </Menu.Items>
          </Transition>
        </div>,
        document.body,
      )}
    </Menu>
  );
};

type ItemProps = {
  onClick?: () => void;
  children: React.ReactNode;
  href?: LinkProps['href'];
  type: 'button' | 'link';
  disabled?: boolean;
  external?: boolean;
  arrow?: boolean;
  icon?: IconProps['icon'];
};

const Item: React.FC<ItemProps> = function Item({
  onClick, children, href, type, disabled, external, arrow, icon, ...props
}) {
  const className = clsx(
    'block w-full text-left pl-3 pr-7 py-1 text-sm focus:outline-none select-none',
    { 'opacity-50 cursor-default': disabled },
  );

  switch (type) {
    case 'button': return (
      <Menu.Item disabled={disabled} {...props}>
        {({ active }) => (
          <button
            type="button"
            className={clsx(className, { 'bg-gray-100': active && !disabled })}
            onClick={(e) => {
              e.preventDefault();
              onClick?.();
            }}
          >
            <Text size="sm" opacity={70} className="flex items-center">
              {icon && <Icon icon={icon} size="sm" fixedWidth className="mr-1.5" /> }
              {children}
              {arrow && <Icon icon={faArrowRight} className="ml-1" />}
            </Text>
          </button>
        )}
      </Menu.Item>
    );

    case 'link': return (
      <Menu.Item disabled={disabled} {...props}>
        {({ active }) => (
          <Link
            href={href as LinkProps['href']}
            external={external}
            className={clsx(className, { 'bg-gray-100': active })}
          >
            <Text size="sm" opacity={70} className="flex items-center">
              {icon && <Icon icon={icon} size="sm" fixedWidth className="mr-1.5" /> }
              {children}
              {arrow && <Icon icon={faArrowRight} className="ml-1" />}
            </Text>
          </Link>
        )}
      </Menu.Item>
    );

    default:
      return null;
  }
};

const Spacer: React.FC = function Spacer() {
  return <Divider className="my-2" />;
};

const QuickActions = Object.assign(Root, { Item, Spacer });

export type {
  RootProps as QuickActionsProps,
  ItemProps as QuickActionsItemProps,
};

export default QuickActions;
