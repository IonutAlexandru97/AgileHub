import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


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
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const SignIn = props => {
   const { history } = props;
   const classes = useStyles();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleEmailInputChange = event => {
       setEmail(event.target.value);
   }

   const handlePasswordInputChange = event => {
    setPassword(event.target.value);
    }   

    const onSubmit = event => {
        event.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200){
                
               res.json().then(function(object){
                alert('User: ' + object.user.username + ' logged in!');
                   history.push('/resources');
                 })
             }else{
                res.json().then(function(object){
                    alert('Error: ' + object.message);
                  })
             }
        })
    }

   return (
       <Grid container component="main" className={classes.root}>
           <CssBaseline />
           <Grid item xs={false} sm={4} md={7} className={classes.image} />
           <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
               <div className={classes.paper}>
                   <Avatar className={classes.avatar}>
                       <LockOutlinedIcon />
                   </Avatar>
                   <Typography component="h1" variant="h5">Sign In</Typography>
                   <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailInputChange}
                        />
                         <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        type="password"
                        value={password}
                        onChange={handlePasswordInputChange}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <CopyRight />
                        </Box>
                   </form>
               </div>
           </Grid>
       </Grid>
   )
}

export default SignIn;