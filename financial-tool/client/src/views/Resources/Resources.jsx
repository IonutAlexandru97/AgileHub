import React, { useState } from 'react';
import MaterialTable from 'material-table';

export default function Resources() {
    const [state, setState] = React.useState({
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Comment', field: 'comment' },
          { title: 'Main Cluster', field: 'main_cluster' },
          { title: 'Main Apps', field: 'main_apps' },
          {
            field: 'rate',
            title: 'Rate',
          },
          { title: 'Skills', field: 'skills' },
        ]
      });

      return (
          <MaterialTable
          title="Resources"
          columns={state.columns}
          />
      );
}