import { faBook } from '@fortawesome/pro-regular-svg-icons/faBook';
import { faFolder } from '@fortawesome/pro-solid-svg-icons/faFolder';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import { IBucket } from 'lib/models/bucket';
import { IFile } from 'lib/models/file';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'ui/components/button';
import Link from 'ui/components/link';
import Skeleton from 'ui/components/skeleton';
import Empty from 'ui/components/table/empty';
import { TableColumn } from 'ui/components/table/table';
import Text from 'ui/components/text';
import useAPI from '../../hooks/use-api';
import DashboardLayout from '../../layouts/dashboard-layout';
import TableLayout from '../../layouts/table-layout';

function FilenameCell({ row }) {
  return (
    <Link external href={row.url} underline>
      {row.filename}
    </Link>
  );
}

function SizeCell({ row }) {
  return <>{filesize(row.size)}</>;
}

function AccessCell({ row }) {
  return <>{row.restricted ? 'Restricted' : 'Public'}</>;
}

function CreatedCell({ row }) {
  return <>{dayjs(row.created).format('MMM D, LT')}</>;
}

const Bucket = function Bucket() {
  const router = useRouter();
  const { data: bucket } = useAPI<IBucket>(`/v1/buckets/${router.query.bucket}`);

  const columns = React.useMemo<TableColumn<IFile>[]>(
    () => [
      {
        accessor: 'url',
        header: 'Name',
        render: (row) => <FilenameCell row={row} />,
      },
      {
        accessor: 'size',
        header: 'Size',
        render: (row) => <SizeCell row={row} />,
      },
      {
        accessor: 'type',
        header: 'Type',
      },
      {
        accessor: 'restricted',
        header: 'Access',
        render: (row) => <AccessCell row={row} />,
      },
      {
        accessor: 'created',
        header: 'Created',
        compact: true,
        render: (row) => <CreatedCell row={row} />,
      },
    ],
    []
  );

  return (
    <div>
      <Text as="h1" size="3xl" weight="semibold">
        {bucket?.name || <Skeleton width={150} />}
      </Text>
      <div className="mt-5">
        <TableLayout
          url="/v1/files"
          columns={columns}
          query={router.query}
          searchableKeys={['_id', 'filename']}
          searchable
          paginated
          empty={
            <Empty
              icon={faFolder}
              title="No files"
              description="Upload your first file by finishing the onboarding steps on the Home page."
              cta={
                <Button as={Link} icon={faBook} href="/dashboard">
                  Finish onboarding
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  );
};

Bucket.getLayout = function getLayout(page) {
  return <DashboardLayout title="Buckets | Zippin">{page}</DashboardLayout>;
};

export default Bucket;
