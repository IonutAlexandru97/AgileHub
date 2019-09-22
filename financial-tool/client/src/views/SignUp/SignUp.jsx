import React, { Component, useState } from 'react';
import { Link as withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Link, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function CopyRight() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright ©'}
            <Link color="inherit" href="https://agilehub.ro/">
                AgileHub.ro
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const SignUp = props => {
    const { history } = props;
    const classes = useStyles();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameInputChange = event => {
        setFirstName(event.target.value);
    }

    const handleLastNameInputChange = event => {
        setLastName(event.target.value);
      }
      const handleUsernameInputChange = event => {
        setUsername(event.target.value);
      }
      const handleEmailInputChange = event => {
        setEmail(event.target.value);
      }
      const handlePasswordInputChange = event => {
        setPassword(event.target.value);
      }

      const onSubmit = event => {
          event.preventDefault();
          fetch('/api/register', {
              method: 'POST',
              body: JSON.stringify({
                first_name,
                last_name,
                username,
                email,
                password
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(res => {
              if(res.status === 200){
                history.push('/home');
                res.json().then(function(object) {
                    alert(object.message);
                })
              }else{
                res.json().then(function (object) {
                    alert('Error: ' + res.status + ' ' + res.statusText + ' ' + object.message);
                })
              }
          })
      }


    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
               </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={first_name}
                                onChange={handleFirstNameInputChange}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="lname"
                                name="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoFocus
                                value={last_name}
                                onChange={handleLastNameInputChange}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="uname"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                value={username}
                                onChange={handleUsernameInputChange}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoFocus
                                value={email}
                                onChange={handleEmailInputChange}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="pw"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                autoFocus
                                value={password}
                                onChange={handlePasswordInputChange}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default SignUp;