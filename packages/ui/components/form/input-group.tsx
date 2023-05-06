import clsx from 'clsx';
import Text, { TextProps } from '../text';

interface FieldSetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  invalid?: boolean;
}

const FieldSet: React.FC<FieldSetProps> = function FieldSet({
  className,
  ...props
}) {
  return (
    <fieldset
      className={clsx(className, 'input-group flex items-stretch')}
      {...props}
    />
  );
};

const DEFAULT_LABEL_TAG = 'label';

type LabelOwnProps = {
  for: string;
};

type LabelProps = LabelOwnProps &
  Omit<TextProps<typeof DEFAULT_LABEL_TAG>, 'as' | keyof LabelOwnProps>;

const Label: React.FC<LabelProps> = function Label({
  className,
  for: htmlFor,
  size,
  ...props
}) {
  return (
    <Text
      as={DEFAULT_LABEL_TAG}
      size={size || 'sm'}
      htmlFor={htmlFor}
      color="gray"
      className={clsx(
        className,
        'inline-flex items-center whitespace-nowrap border !border-gray-200 px-3 bg-gray-100',
        'input-group:-ml-px input-group:rounded-none input-group:first:!ml-0 input-group:first:rounded-l input-group:last:rounded-r'
      )}
      {...props}
    />
  );
};

Label.displayName = 'Text';

export type {
  FieldSetProps as InputGroupProps,
  LabelProps as InputGroupLabelProps,
};

const InputGroup = Object.assign(FieldSet, { Text: Label });

export default InputGroup;
