import { faArrowRotateLeft } from '@fortawesome/pro-regular-svg-icons/faArrowRotateLeft';
import { Dropzone } from '@zippin/react';
import Image from 'next/image';
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Button from 'ui/components/button';
import Icon from 'ui/components/icon';
import Link from 'ui/components/link';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const codeSample = `import { Dropzone } from '@zippin/react';

<Dropzone
  apiKey="YOUR_API_KEY"
  accept={['image/*']}
  onUpload={(file) => handleUpload(file)}
>
  {/* Your styled dropzone */}
</Dropzone>`;

function Demo() {
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(null);
  const [error, setError] = React.useState(null);

  if (file)
    return (
      <div className="relative w-full h-full">
        <Image src={file.url} fill alt="" style={{ objectPosition: 'center', objectFit: 'contain' }} />
        <Icon
          icon={faArrowRotateLeft}
          className="text-gray-500 absolute top-0 right-0 cursor-pointer"
          onClick={() => setFile(null)}
        />
      </div>
    );

  if (uploading)
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-300">
        <div className="text-gray-300">Uploading...</div>
      </div>
    );

  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-300">
        <div className="text-red-500">{error.message}</div>
      </div>
    );

  return (
    <Dropzone
      apiKey={process.env.NEXT_PUBLIC_BUCKET_PUBLISHABLE_KEY}
      accept={['image/*']}
      bucket="images"
      baseUrl={process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : undefined}
      onUpload={(file) => {
        setFile(file);
        setUploading(false);
      }}
      onError={({ error }) => {
        setError(error);
        setUploading(false);
      }}
      onDrop={() => {
        setError(null);
        setUploading(true);
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <div className="w-full h-full flex items-center justify-center rounded-md border-2 border-dashed transition cursor-pointer group hover:border-blue-500">
        <div className="transition text-gray-300 group-hover:text-blue-500">Upload image</div>
      </div>
    </Dropzone>
  );
}

export default function Hero() {
  return (
    <div className="w-full px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="sm:mt-10 mb-20 text-center">
          <div className="text-gray-900 text-7xl font-bold">
            The easy <span className="text-orange-500">file uploads</span> API
          </div>
          <div className="mt-5 text-gray-500 text-xl lg:text-2xl font-medium">
            Everything you need to add file uploads to your product.
          </div>
          <div className="mt-7">
            <Button as={Link} href="/signup" size="xl" variant="primary" className="shadow-xl">
              Get your free API key
            </Button>
            <Button as={Link} href="/book-a-call" size="xl" className="ml-2 shadow-xl">
              Schedule a call
            </Button>
          </div>
        </div>
        <div className="mt-20 rounded-xl overflow-hidden grid lg:grid-cols-2 shadow-2xl">
          <SyntaxHighlighter
            language="jsx"
            style={oneDark}
            showLineNumbers
            customStyle={{
              paddingTop: 15,
              paddingBottom: 15,
              paddingLeft: 10,
              margin: 0,
              borderRadius: 0,
            }}
          >
            {codeSample}
          </SyntaxHighlighter>
          <div className="h-52 lg:h-full w-full bg-white p-3">
            <Demo />
          </div>
        </div>
      </div>
    </div>
  );
}
