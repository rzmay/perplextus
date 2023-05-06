import React from 'react';
import DashboardLayout from '../layouts/dashboard-layout';

const Logs = function Logs() {
  return <div>Logs</div>;
};

Logs.getLayout = function getLayout(page) {
  return <DashboardLayout title="Zippin">{page}</DashboardLayout>;
};

export default Logs;
