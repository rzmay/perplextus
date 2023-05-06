import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import Card from './card';
import Text from './text';

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
}

const Root: React.FC<RootProps> = function Root({
  open,
  onClose,
  className,
  size = 'md',
  ...props
}) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && !modalRef.current?.contains(event.target as Node)) onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalRef, onClose, open]);

  return (
    <Transition.Root
      show={open}
      as={React.Fragment}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog static open={open} onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 z-50" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center z-50 p-5 sm:p-10 focus:outline-none overflow-auto">
            <div
              ref={modalRef}
              className={clsx(
                className,
                'max-w-lg w-full rounded-md shadow-lg bg-white border',
                {
                  'max-w-xs': size === 'xs',
                  'max-w-sm': size === 'sm',
                  'max-w-md': size === 'md',
                  'max-w-lg': size === 'lg',
                  'max-w-xl': size === 'xl',
                  'max-w-2xl': size === '2xl',
                  'max-w-3xl': size === '3xl',
                  'max-w-4xl': size === '4xl',
                  'max-w-5xl': size === '5xl',
                  'max-w-6xl': size === '6xl',
                  'max-w-7xl': size === '7xl',
                }
              )}
              {...props}
            />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

Root.displayName = 'Modal';

type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<HeaderProps> = function Header(props) {
  return <Dialog.Title as={Card.Header} {...props} />;
};

Header.displayName = 'Modal.Header';

type BodyProps = React.HTMLAttributes<HTMLDivElement>;

const Body: React.FC<BodyProps> = function Body(props) {
  return <Card.Body {...props} />;
};

Body.displayName = 'Modal.Body';

type ActionsProps = React.HTMLAttributes<HTMLDivElement>;

const Actions: React.FC<ActionsProps> = function Actions({
  children,
  ...props
}) {
  return (
    <Card.Footer {...props}>
      <div className="flex justify-end space-x-2">{children}</div>
    </Card.Footer>
  );
};

Actions.displayName = 'Modal.Actions';

type TitleProps = React.HTMLAttributes<HTMLDivElement>;

const Title: React.FC<TitleProps> = function Title({ children, ...props }) {
  return (
    <Dialog.Title as={Text} size="xl" weight="semibold" {...props}>
      {children}
    </Dialog.Title>
  );
};

Title.displayName = 'Modal.Title';

type DescriptionProps = React.HTMLAttributes<HTMLDivElement>;

const Description: React.FC<DescriptionProps> = function Description({
  children,
  ...props
}) {
  return (
    <Dialog.Description as={Text} size="2xl" weight="medium" {...props}>
      {children}
    </Dialog.Description>
  );
};

Description.displayName = 'Modal.Description';

const Modal = Object.assign(Root, {
  Header,
  Body,
  Actions,
  Title,
  Description,
});

export type {
  RootProps as ModalProps,
  HeaderProps as ModalHeaderProps,
  BodyProps as ModalBodyProps,
  ActionsProps as ModalActionsProps,
  TitleProps as ModalTitleProps,
  DescriptionProps as ModalDescriptionProps,
};

export default Modal;
