import { IApiKey } from 'lib/models/api-key';
import { ListResponse } from 'lib/utils/types/tsoa/list-response';
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'ui/components/link';
import Text from 'ui/components/text';
import useAPI from '../hooks/use-api';
import DashboardLayout from '../layouts/dashboard-layout';

const Dashboard = function Dashboard() {
  const { data: apiKeys } = useAPI<ListResponse<IApiKey>>('/ajax/apikeys');

  const codeSample = `import { Dropzone } from '@zippin/react';

<Dropzone
  apiKey="${
    apiKeys?.data.find((k) => k.type === 'publishable')?.key || 'YOUR_API_KEY'
  }"
  accept={['image/*']}
  onUpload={(file) => handleUpload(file)}
>
  {/* Your styled dropzone */}
</Dropzone>`;

  return (
    <div className="max-w-prose mx-auto py-10">
      <Text as="h1" size="3xl" weight="semibold" color="dark">
        Upload your first file
      </Text>
      <Text className="mt-3">
        Follow the steps below to add file uploads to your React app! If you
        need help or have special requirements,{' '}
        <Link
          href="https://calendly.com/benbotvinick/30-minute-meeting"
          external
          color
        >
          schedule a call
        </Link>{' '}
        with us.
      </Text>
      <Text as="h2" size="2xl" weight="semibold" color="dark" className="mt-10">
        Install the Zippin SDK
      </Text>
      <Text className="mt-3">
        First, install the Zippin SDK using npm or yarn.
      </Text>
      <div className="mt-5 text-sm">
        <SyntaxHighlighter
          language="bash"
          style={oneDark}
          className="rounded-md !py-2 !px-3"
        >
          $ npm install @zippin/react
        </SyntaxHighlighter>
      </div>
      <Text as="h2" size="2xl" weight="semibold" color="dark" className="mt-10">
        Implement the Dropzone component
      </Text>
      <Text className="mt-3">
        Add the following code to your React app to render a dropzone. The
        Zippin dropzone component is fully headless, so you can render whatever
        you like inside the open and close tags.
      </Text>
      <div className="mt-5 text-sm">
        <SyntaxHighlighter
          language="jsx"
          style={oneDark}
          className="rounded-md !py-3 !px-2"
          showLineNumbers
        >
          {codeSample}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout title="Zippin">{page}</DashboardLayout>;
};

export default Dashboard;
