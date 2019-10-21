import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650
      },
}));

function TableComponent() {
    const classes = useStyles();
    const [api, setApi] = useState('/api/resources/availability');
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(api);
            setValues(result.data);
        };
        fetchData();
    }, []);

    return (
        <Paper  className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Resource Name</TableCell>
                        <TableCell align="center">Resource Comment</TableCell>
                        <TableCell align="center">Resource Main Cluster</TableCell>
                        <TableCell align="center">Resource Main Apps</TableCell>
                        <TableCell align="center">Availability</TableCell>
                        <TableCell align="center">Resource Rate</TableCell>
                        <TableCell align="center">Month</TableCell>
                        <TableCell align="center">Resource Skills</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {values.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="center">{row.comment}</TableCell>
                            <TableCell align="center">{row.main_cluster}</TableCell>
                            <TableCell align="center">{row.main_apps}</TableCell>
                            {row.availabilities.map((data, index) => (
                                <TableCell key={index++} style={{display: 'flex', justifyContent: 'center'}}>{data.availability}</TableCell>
                            ))}
                            <TableCell align="center">{row.rate} &euro;</TableCell>
                            {row.availabilities.map((data, index) => (
                                <TableCell key={index++} style={{display: 'flex', justifyContent: 'center'}}>{data.month}</TableCell>
                            ))}
                            <TableCell align="center">{row.skills}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )

}

export default TableComponent;