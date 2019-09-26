import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
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
  }));

export default function AddButton() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState([]);
    const [id, setId] = useState('');
    const [availability, setAvailability] = useState('');
    const [month, setMonth] = useState('');

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function onOpen() {
        setOpen(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios (
                '/api/resources/availability',
            );
            setValues(result.data);
        };
        fetchData();
    }, []);

    const handleNameChange = event => {
        setId(event.target.value);
    };

    const handleAvailabilityInputChange = event => {
        setAvailability(event.target.value);
    };

    const handleMonthInputChange = event => {
        setMonth(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        fetch(`/api/resources/availability/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                month,
                availability
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200){
                window.location.reload();
            }else {
                alert('Error: ' + res.status + ' ' + res.statusText);
            }
        });
    };

    return(
        <div>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOpen}>
                Add Availability
                <AddIcon className={classes.leftIcon}></AddIcon>
            </Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Add Resource Availability</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.FormControl}>
                            <InputLabel>Resource Name</InputLabel>
                            <Select
                            native
                            onOpen={onOpen}
                            value={values.name}
                            onChange={handleNameChange}
                            >
                                <option value="" />
                                {values.map(data => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Select>
                            <TextField
                            required
                            id="hours"
                            label="Availability"
                            maring="normal"
                            className={classes.textField}
                            value={availability}
                            onChange={handleAvailabilityInputChange}
                            />
                            <TextField
                            required
                            id="month"
                            label="Month"
                            maring="normal"
                            className={classes.textField}
                            value={month}
                            onChange={handleMonthInputChange}
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
}