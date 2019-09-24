import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, FormControl, Select, DialogActions, TextField } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      minWidth: 200
    },
    select: {
      minWidth: 200
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    div: {
      width: 300
    }
  }));



export default function EditButton() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState([]);
    const [api, setApi] = useState('/api/resources/availability');
    const [resourceId, setResourceId] = useState('');
    const [month, setMonth] = useState([]);
    const [availabilityId, setAvailabilityId] = useState([]);
    const [availability, setAvailability] = useState('');

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
    }

    useEffect(() => {
        async function fetchData () {
            const result = await axios(api);
            setValues(result.data);
        }
        fetchData();
    }, []);

    const handleNameChange = event => {
        setResourceId(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const result = await axios (`${api}/${resourceId}`);
            setMonth(result.data);
        }
        fetchData();
    }, [resourceId]);

    const handleMonthChange = event => {
        setAvailabilityId(event.target.value);
    };

    const handleAvailabilityInputChange = event => {
        setAvailability(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        fetch(`${api}/${availabilityId}`, {
            method: 'PUT',
            body: JSON.stringify({
                availability
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200){
                window.location.reload();
            }else {
                alert('Error: ' + res.status + ' ' + res.statusText);            }
        });
    };

    return(
        <div>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen}>Edit Availability
            <EditIcon className={classes.leftIcon}></EditIcon>
            </Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Edit Resource Availability</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Resource Name</InputLabel>
                            <Select
                            native
                            onOpen={handleOpen}
                            values={values.name}
                            onChange={handleNameChange}
                            >
                                <option value="" />
                                {values.map(data => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Month</InputLabel>
                            <Select
                            native
                            onOpen={handleOpen}
                            value={month.id}
                            onChange={handleMonthChange}
                            >
                                <option value="" />
                                {month.map(data => (
                                    <option key={data.id} value={data.id}>{data.month}</option>
                                ))}
                            </Select>
                            <TextField
                            required
                            id="hours"
                            label="Availability"
                            margin="normal"
                            className={classes.textField}
                            value={availability}
                            onChange={handleAvailabilityInputChange}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit changes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};