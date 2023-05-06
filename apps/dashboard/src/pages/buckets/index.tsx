import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faBucket } from '@fortawesome/pro-solid-svg-icons/faBucket';
import dayjs from 'dayjs';
import { IBucket } from 'lib/models/bucket';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'ui/components/button';
import Empty from 'ui/components/table/empty';
import { TableColumn } from 'ui/components/table/table';
import Text from 'ui/components/text';
import NewBucketModal from '../../components/buckets/new-bucket-modal';
import DashboardLayout from '../../layouts/dashboard-layout';
import TableLayout from '../../layouts/table-layout';

function CreatedCell({ row }) {
  return <>{dayjs(row.created).format('MMM D, LT')}</>;
}

function StorageClassCell({ row }) {
  return <div className="capitalize">{row.storage_class}</div>;
}

const Buckets = function Buckets() {
  const router = useRouter();
  const [showNewBucket, setShowNewBucket] = React.useState(false);

  const columns = React.useMemo<TableColumn<IBucket>[]>(
    () => [
      {
        accessor: 'name',
        header: 'Name',
      },
      {
        accessor: 'location',
        header: 'Location',
      },
      {
        accessor: 'storage_class',
        header: 'Storage class',
        render: (row) => <StorageClassCell row={row} />,
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
      <NewBucketModal open={showNewBucket} onClose={() => setShowNewBucket(false)} />

      <Text as="h1" size="3xl" weight="semibold">
        Buckets
      </Text>
      <div className="mt-5">
        <TableLayout
          url="/v1/buckets"
          columns={columns}
          query={router.query}
          searchableKeys={['_id', 'location']}
          searchable
          paginated
          href={(row) => `/buckets/${row.original.id}`}
          actions={
            <Button icon={faPlus} onClick={() => setShowNewBucket(true)} variant="primary">
              New bucket
            </Button>
          }
          empty={
            <Empty
              icon={faBucket}
              title="No buckets"
              description="Create a bucket to store your file uploads. A default bucket will be created automatically if you upload a file without specifying a bucket."
              cta={
                <Button icon={faPlus} onClick={() => setShowNewBucket(true)}>
                  Create a bucket
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  );
};

Buckets.getLayout = function getLayout(page) {
  return <DashboardLayout title="Buckets | Zippin">{page}</DashboardLayout>;
};

export default Buckets;
