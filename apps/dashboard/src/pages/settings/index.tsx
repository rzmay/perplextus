import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faBucket } from '@fortawesome/pro-solid-svg-icons/faBucket';
import dayjs from 'dayjs';
import { IApiKey } from 'lib/models/api-key';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'ui/components/button';
import Empty from 'ui/components/table/empty';
import { TableColumn } from 'ui/components/table/table';
import Text from 'ui/components/text';
import NewApiKeyModal from '../../components/settings/new-api-key-modal';
import DashboardLayout from '../../layouts/dashboard-layout';
import SettingsLayout from '../../layouts/settings-layout';
import TableLayout from '../../layouts/table-layout';

function CreatedCell({ row }) {
  return <>{dayjs(row.created).format('MMM D, LT')}</>;
}

const Settings = function Settings() {
  const router = useRouter();
  const [showNewApiKey, setShowNewApiKey] = React.useState(false);

  const columns = React.useMemo<TableColumn<IApiKey>[]>(
    () => [
      {
        accessor: 'name',
        header: 'Name',
      },
      {
        accessor: 'key',
        header: 'key',
      },
      {
        accessor: 'type',
        header: 'type',
      },
      {
        accessor: 'last_used',
        header: 'last used',
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
    <SettingsLayout title="Settings - General">
      <NewApiKeyModal
        open={showNewApiKey}
        onClose={() => setShowNewApiKey(false)}
      />

      <Text as="h1" size="xl" weight="semibold">
        API Keys
      </Text>
      <div className="mt-3">
        <TableLayout
          url="/ajax/apikeys"
          columns={columns}
          query={router.query}
          searchableKeys={['name', 'type']}
          searchable
          paginated
          actions={
            <Button
              icon={faPlus}
              onClick={() => setShowNewApiKey(true)}
              variant="primary"
            >
              New API key
            </Button>
          }
          empty={
            <Empty
              icon={faBucket}
              title="No API keys"
              description="Create API key"
              cta={
                <Button icon={faPlus} onClick={() => setShowNewApiKey(true)}>
                  Create an API key
                </Button>
              }
            />
          }
        />
      </div>
    </SettingsLayout>
  );
};

Settings.getLayout = function getLayout(page) {
  return <DashboardLayout title="Bucket">{page}</DashboardLayout>;
};

export default Settings;
