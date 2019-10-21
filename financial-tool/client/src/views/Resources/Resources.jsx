import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

import Auth from '../../modules';

export default function Resources() {

const [values, setValues] = useState({ data: []});
const [api, setAPI] = useState('/api/resources');
const [state, setState] = React.useState({
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Comment', field: 'comment' },
          { title: 'Main Cluster', field: 'main_cluster' },
          { title: 'Main Apps', field: 'main_apps' },
          {
            field: 'rate',
            title: 'Rate',
            render: rowData => <p>{rowData.rate} &euro;</p>
          },
          { title: 'Skills', field: 'skills' },
        ]
      });

useEffect(() => {
  const token = Auth.getToken('token');
  const fetchData = async () => {
    const result = await axios(api, {
      headers: { "Authorization": `Bearer ${token}`}
    });
    setValues(result.data);
  };
  fetchData();
}, [api]);


      return (
        <div>
          <MaterialTable
          title="Resources"
          columns={state.columns}
          options={{
            filtering: true,
            grouping: true
          }}
          data={values.data.map(row => (
            {
              key: row.id,
              name: row.name,
              comment: row.comment,
              main_cluster: row.main_cluster,
              main_apps: row.main_apps,
              rate: row.rate,
              skills: row.skills
            }
          ))}
          editable={{
            onRowAdd: (rowData) => {
              fetch(api, {
                method: 'POST',
                body: JSON.stringify({
                  name: rowData.name,
                  comment: rowData.comment,
                  main_cluster: rowData.main_cluster,
                  main_apps: rowData.main_apps,
                  rate: rowData.rate,
                  skills: rowData.skills
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(response => {
                if(response.status === 200) {
                  window.location.reload();
                }else{
                  response.json().then(function (object) {
                    alert('Error: ' + response.status + ' ' + response.statusText + ' ' + 'Message: ' + object.message);
                  }).then(() => {
                    window.location.reload();
                  });
                }
              });
            },
            onRowUpdate: (newData) => {
              fetch(`${api}/${newData.key}`, {
                method: 'PUT',
                body: JSON.stringify({
                  name: newData.name,
                  comment: newData.comment,
                  main_cluster: newData.main_cluster,
                  main_apps: newData.main_apps,
                  rate: newData.rate,
                  skills: newData.skills
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => {
                if (res.status === 200) {
                  window.location.reload();
                } else {
                  res.json().then(function (object) {
                    alert('Error: ' + res.status + ' ' + res.statusText + ' ' + 'Message: ' + object.message);
                  }).then(() => {
                    window.location.reload();
                  });
                }
              });
            },
            onRowDelete: (rowData) => {
              fetch(`${api}/${rowData.key}`, {
                method: 'DELETE'
              })
              window.location.reload();
            }
          }}
          />
        </div>
          
      );
}