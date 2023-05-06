import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faXmark } from '@fortawesome/pro-regular-svg-icons/faXmark';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Icon from 'ui/components/icon';
import Text from 'ui/components/text';
import { uploadFile } from '../../services/storage';

interface UploadFileProps {
  onChange: ({ url, name }: { url: string; name: string }) => void;
  accept?: { [key: string]: string[] };
  width?: number;
  height: number;
}

export default function UploadFile({
  onChange,
  accept,
  width,
  height,
}: UploadFileProps) {
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  const onDrop = React.useCallback(
    async (data) => {
      if (uploading) return;

      setUploading(true);
      setFile(data[0]);

      const response = await uploadFile(data[0], ({ loaded, total }) => {
        const percentage = Math.floor((loaded / total) * 100);

        setProgress(percentage);

        if (percentage === 100) setUploading(false);
      });

      onChange(response);
    },
    [onChange, uploading]
  );

  const { getRootProps, getInputProps } = useDropzone({
    disabled: !!uploading,
    onDrop,
    ...(accept && { accept }),
  });

  if (file)
    return (
      <div className="flex justify-between items-center h-8 px-3 border rounded-md bg-white">
        <Text size="sm">{file.name}</Text>
        {uploading ? (
          <div className="w-1/2 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : (
          <Icon
            icon={faXmark}
            size="sm"
            onClick={() => setFile(null)}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        )}
      </div>
    );

  return (
    <div {...getRootProps()} className="appearance-none focus:outline-none">
      <input {...getInputProps()} />
      <div
        className="group relative border cursor-pointer overflow-hidden bg-white rounded-md"
        style={{ width, height }}
      >
        <div className="w-full h-full flex justify-center items-center">
          <Icon
            size="lg"
            icon={faPlus}
            className="text-gray-500 group-hover:text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
