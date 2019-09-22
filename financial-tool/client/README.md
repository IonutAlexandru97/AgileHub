# 1. Creare aplicatie React
## 1.1 Creare aplicatie *client*
```node
npx create-react-app client
```

## 1.2 Testare aplicatie
```node
npm start
```

## 1.3 Stergere fisiere, vor ramane doar
- App.js
- index.js
- serviceWorker.js

## 1.4 Stergere yarn.lock

## 1.5 Creare schelet aplicatie
- **_components_**: va contine componentele comune aplicatiei
- **_layouts_**: va contine layout-ul pentru rutare
- **_views_**: va contine paginile in sine

## 1.6 Stergere
- public/logo192.png
- public/logo512.png

# 2.0 Instalare si Configurare React Material
## 2.1 Instalare React Material
```node
npm install --save @material-ui/core @material-ui/icons
```
## 2.2 Modificare public/index.html
```HTML
<body>
    <!-- Material Design Font Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <!-- Material Design Roboto Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
```

## 2.3 Stergere importuri extra din App.js si index.js
- import logo from './logo.svg';
- import './App.css';
- import './index.css';

## 2.3 Testare React Material (App.js)
```JS
import Button from '@material-ui/core/Button';
<Button variant="contained" color="primary">
      Hello World
</Button>
```

# 3. Rutare pentru Register
## 3.1 Instalare pachete
```node
npm intall --save react-router-dom
```
## 3.2 Creare components/RouteWithoutLayout/RouteWithoutLayout.jsx
```JSX
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithoutLayout = props => {
    const { component: Component, ...rest } = props;

    return (
        <Route
        {...rest}
        render={matchProps => (
            <Component {...matchProps} />
        )}
        />
    );
};

RouteWithoutLayout.propTypes = {
    component: PropTypes.any.isRequired,
    path: PropTypes.string
};

export default RouteWithoutLayout;
```
## 3.3 Creare components/RouteWithoutLayout/index.js
```JS
export { default } from './RouteWithoutLayout';
```

## 3.4 Creare components/index.js
```JS
export { default as RouteWithoutLayout } from './RouteWithoutLayout';
```

## 3.5 Creare views/SignUp/SignUp.jsx
```JSX
import React from 'react';
function SignUp() {
    return(
        <p>SignUp is working!</p>
    )
}

export default SignUp;
```

## 3.6 Creare views/SignUp/index.js
```JS
export { default } from './SignUp';
```

## 3.7 Creare views/index.js
```JS
export { default as Signup } from './SignUp';
```

## 3.8 Creare Routes.jsx
```JSX
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithoutLayout } from './components';
import { 
    SignUp as SignUpView
} from './views';

const Routes = () => {
    return (
        <Switch>
            <Redirect
            exact
            from="/"
            to="/login"
            />
            <RouteWithoutLayout
            component={SignUpView}
            exact
            path="/login"
            />
        </Switch>
    )
}

export default Routes;
```

## 3.9 Modificare App.js
```JS
import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Routes from './Routes';

const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Routes />
      </Router>
    )
  }
}
```

## 3.10 Modificare index.js
```JS
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
```

# 4. Creare SignUp
## 4.1 Modificare views/SignUp.jsx
```JSX
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

function SignUp() {
    const classes = useStyles();
    const [first_name, setFirstName] = useState('');
    const [last_Name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
                <form className={classes.form} noValidate>
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
                                value={last_Name}
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
                            ></TextField>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default SignUp;
```

## 4.1 Adaugare onChange views/SignUp.jsx
```JSX
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

//Adaugare onChange pentru fiecare TextField precedent
```

## 4.2 Adaugare buton views/SignUp.jxs
```JSX
<Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                        Sign Up
                    </Button>
```

## 4.3 Integrare cu SignUp cu API 
### 4.3.1 Modificare package.json
```JSON
{
  "proxy": "http://localhost:5000",  
}
```
### 4.3.2 Adaugare functie onSubmit()
```JSX
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
```