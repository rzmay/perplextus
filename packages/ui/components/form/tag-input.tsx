import { faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { useFormikContext } from 'formik';
import React from 'react';
import Badge from '../badge';
import Icon from '../icon';
import Input from './input';

type TagInputProps = {
  name: string;
};

const TagInput: React.FC<TagInputProps> = function TagInput({ name }) {
  const [tags, setTags] = React.useState('');
  const { values, setFieldValue } = useFormikContext<any>();

  const removeTag = React.useCallback((tag: string) => {
    setFieldValue(name, values[name].filter((t: string) => t !== tag));
  }, [name, setFieldValue, values]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {values[name].map((tag: string, index: number) => (
          <Badge key={tag} color="gray" size="lg">
            {tag}
            {index !== 0 && (
            <button type="button" onClick={() => removeTag(tag)} className="ml-1.5">
              <Icon icon={faTimes} />
            </button>
            )}
          </Badge>
        ))}
      </div>
      <Input
        name=""
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        onKeyDown={(e) => {
          if ([13, 32].includes(e.keyCode)) {
            e.preventDefault();
            const { value } = (e.target as HTMLInputElement);
            if (!values[name].includes(value) && value !== '') {
              setFieldValue(name, [...new Set(values[name].concat(value.split(',').map((s) => s.trim())))]);
              setTags('');
            }
          }
        }}
      />
    </div>
  );
};

export default TagInput;
