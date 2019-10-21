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
                history.push('/');
                res.json().then(function(object) {
                    alert(object.message);
                })
              }else{
                res.json().then(function (object) {
                    alert('Error: ' + res.status + ' ' + res.statusText + ' ' + object.message);
                    history.push('/register');
                })
              }
          })
      }
```

## 4.4 Adaugare copyright si routing catre signin
```JSX
 <Grid container justify="flex-end">
    <Grid item>
        <Link href="/login" variant="body2">
         Already have an account? Sign in
        </Link>
    </Grid>
</Grid>

<Box mt={5}>
    <CopyRight />
</Box>
```

# 5. Creare SignIn
## 5.1 Creare views/SignIn/SignIn.jsx
```JSX
import React from 'react';

function SignIn() {
    return(
        <p>SignIn is working!</p>
    )
}

export default SignIn;
```

## 5.2 Creare views/SignIn/index.js
```JS
export { default } from './SignIn';
```

## 5.3 Modificare views/index.js
```JS
export { default as SignIn } from './SignIn';
```

## 5.4 Modificare Routes.jsx
```JSX
<Redirect
exact
from="/"
to="/login"
/>
<RouteWithoutLayout 
component={SignInView}
exact
path="/login"
/>
```

## 5.5 Modificare SignIn.jsx
```JSX
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

function SignIn() {
   const classes = useStyles();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

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
                   <form className={classes.form} noValidate>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autocomplete="email"
                        autoFocus
                        value={email}
                        />
                         <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autocomplete="password"
                        autoFocus
                        value={password}
                        />
                   </form>
               </div>
           </Grid>
       </Grid>
   )
}

export default SignIn;
```

## 5.6 Adaugare HandleChange
```JSX
 const handleEmailInputChange = event => {
    etEmail(event.target.value);
}

const handlePasswordInputChange = event => {
    setPassword(event.target.value);
}  
```

## 5.7 Adaugare Buton si CoyRight
```JSX
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
```

## 5.8 Integrare cu API
```JSX
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
            history.push('/resources');
           res.json().then(function(object){
               alert(object.message);
             })
         }else{
             alert('Error: ' + res.status + ' ' + res.statusText);
         }
    })
}
```

# 6. Resources Table
## 6.1 Instalare pachere
```node
npm install --save material-table
```
## 6.2 Creare views/Resources/Resources.jsx
```JSX
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
```
## 6.3 Creare views/Resources/index.js
```JS
export { default } from './Resources';
```
## 6.4 Modificare views/index.js
```JS
export { default as Resources } from './Resources';
```
## 6.5 Modificare Routes.jsx
```JSX
<RouteWithoutLayout
component={ResourcesViews}
exact
path="/resources"
/>
```

# 7. Integrare Resources cu API
## 7.1 Instalare pachete
```node
npm install --save axios
```
- axios: http client pentru browser si nodejs

## 7.2 Fetch data on table --> views/Resources/Resources.jsx
```JSX
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(api);
    setValues(result.data);
  };
  fetchData();
}, [api]);

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
```

## 7.3 Add data on table -->  views/Resources/Resources.jsx
```JSX
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
       }
     }}
```

## 7.5 Edit data on table --> views/Resources/Resources.jsx
```JSX
onRowUpdate: (newData) => {
          fetch(`${url}/${newData.key}`, {
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
              })
            }
          })
          window.location.reload();
        }
```

## 7.6 Delete data from table -->  views/Resources/Resources.jsx
```JSX
onRowDelete: (rowData) => {
             fetch(`${api}/${rowData.key}`, {
               method: 'DELETE'
             })
             window.location.reload();
           }
```

## 7.7 Adaugare filtru si grupare -->  views/Resources/Resources.jsx
```JSX
options={{
        filtering: true,
        grouping: true
      }}
```

## 7.8 Adaugare semnul euro --> views/Resources/Resources.jsx
```JSX
render: rowData => <p>{rowData.rate} &euro;</p>
```

# 8. Layout
# 8.1 Topbar
### 8.1.1 layouts/Main/components/Topbar/Topbar.jsx
```JSX
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  button: {
    marginLeft: 0
  }
}));

const TopBar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
      <RouterLink to="/resources"
          style={{ textDecoration: 'none', color: 'white' }}>
          <IconButton
            className={classes.button}
            color="inherit"
          >
            <GroupAddIcon />
          </IconButton>
        </RouterLink>
        <RouterLink to="/resources/availability"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <IconButton
            className={classes.button}
            color="inherit"
          >
            <TimelineIcon />
          </IconButton>
        </RouterLink>
        <div className={classes.flexGrow} />
        <RouterLink to="/"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <IconButton
            className={classes.button}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </RouterLink>
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string
}

export default TopBar;
```
### 8.1.2 layouts/Main/components/Topbar/index.js
```JS
export { default } from './Topbar';
```
### 8.1.3 layouts/Main/components/index.js
```JS
export { default as TopBar } from './Topbar';
```
### 8.1.4 layouts/Main/Main.jsx
```JSX
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { TopBar } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
          paddingTop: 64
        }
      },
    content: {
      height: '100%'
    }
  }));

  const Main = props => {
      const { children } = props;
      const classes = useStyles();

      return (
          <div className={classes.root}>  
              <TopBar />
              <main className={classes.content}>
                  {children}
              </main>
          </div>
      )
  }

  Main.propTypes = {
      children: PropTypes.node
  }

  export default Main;
```
### 8.1.4 layouts/Main/index.js
```JS
export { default } from './Main';
```
### 8.1.5 layouts/index.js
```JS
export { default } from './Main';
```
### 8.1.6 components/RouteWithLayout/RouteWithLayout.jsx
```JSX
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
```

### 8.1.7 components/RouteWithLayout/index.js
```JS
export { default } from './RouteWithLayout';
```
### 8.1.8 components/index.js
```JS
export { default as RouteWithLayout } from './RouteWithLayout';
```
### 8.1.9 Routes.jsx
```JSX
import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';

<RouteWithLayout
component={ResourcesViews}
exact
layout={MainLayout}
path="/resources"
/>
```

# 9. Resource Availability View
## 9.1 Initial Table Component
### 9.1.1 views/Resource-Availability/components/Table/Table.jsx
```JSX
import React from 'react';

function TableComponent() {
    return(
        <p>Table is working</p>
    )

}

export default TableComponent;
```
### 9.1.2 views/Resource-Availability/components/Table/index.js
```JS
export { default } from './Table';
```
### 9.1.3 views/Resource-Availability/components/index.js
```JS
export { default as TableComponent } from './Table';
```
### 9.1.4 views/Resource-Availability/Resource-Availability.jsx
```JSX
import React from 'react';

import { TableComponent as TableView } from './components';

export default function Resource_Availability() {
    return(
        <div>
            <TableView />
        </div>
    )
}
```
### 9.1.4 views/Resource-Availability/index.js
```JS
export { default } from './Resource-Availability';
```
### 9.1.5 views/index.js
```JS
export { default as Resource_Availability } from './Resource-Availability';
```
### 9.1.6 Routes.jsx
```JSX
import { 
Resource_Availability as ResourceAvailabilityView
} from './views';

<RouteWithLayout
component={ResourceAvailabilityView}
exact
layout={MainLayout}
path="/resources/availability"
/>
```

## 9.2 Final Table Component --> views/Resource-Availability/components/Table/Table.jsx
```JSX
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
```

## 9.3 Initial Add Button
### 9.3.1 views/Resource-Availability/components/Button/components/AddButton/AddButton.jsx
```JSX
import React from 'react';

export default function AddButton() {
    return(
        <p>Add Button is working!</p>
    )
}
```
### 9.3.2 views/Resource-Availability/components/Button/components/AddButton/index.js
```JS
export { default } from './AddButton';
```
### 9.3.3 views/Resource-Availability/components/Button/components/index.js
```JS
export { default as AddButton } from './AddButton';
```
### 9.3.4 views/Resource-Availability/components/Button/Button.jsx
```JSX
import React from 'react';

import { AddButton } from './components';

export default function ButtonComponent() {
    return(
        <div>
            <AddButton />
        </div>
    )
}
```
### 9.3.5 views/Resource-Availability/components/Button/index.js
```JS
export { default } from './Button';
```
### 9.3.6 views/Resource-Availability/components/index.js
```JS
export { default as Button } from './Button';
```

### 9.3.7 views/Resource-Availability/Resource-Availability.jsx
```JSX
import {
    TableComponent as TableView,
    Button as ButtonView
} from './components';

<div>
   <ButtonView />
   <TableView />
 </div>
```

### 9.4 Final Add Button ---> views/Resource-Availability/components/Button/components/AddButton/AddButton.jsx
```JSX
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
                '/api/resources/availability'
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
```

## 9.5 Initial EditButton
### 9.5.1 views/Resource-Availability/components/Button/components/EditButton/EditButton.jsx
```JSX
import React from 'react';

export default function EditButton() {
    return(
        <p>Edit Button is working!</p>
    )
};
```

### 9.5.2 views/Resource-Availability/components/Button/components/EditButton/index.js
```JS
export { default } from './EditButton';
```

### 9.5.3 views/Resource-Availability/components/Button/components/index.js
```JS
export { default as EditButton } from './EditButton';
```

### 9.5.4  views/Resource-Availability/components/Button/Button.jsx
```JSX
<div>
   <AddButton />
   <EditButton />
</div>
```

## 9.6 Final EditButton
```JSX
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
```

## 9.7 views/Resource-Availability/components/Button/Button.jsx
```JSX
import React from 'react';
import Box from '@material-ui/core/Box';

import { AddButton, EditButton } from './components';

export default function ButtonComponent() {
    return(
        <div style={{ width: '100%'}}>
            <Box display="flex" flexDirection="row">
                <AddButton />
                <EditButton />
            </Box>
        </div>
    )
}
```

# 10. Securizare ruta
## 10.1 Instalare pachete
```node
npm install --save jwt-decode
```

## 10.2 Creare modules/Auth.js
```JS
export default class Auth {
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }
}
```

## 10.3 Creare modules/index.js
```JS
export { default } from './SignIn';
```

## 10.4 views/SignIn/SignIn.jsx
```JSX
import Auth from '../../modules'; 
// const onSubmit = event => {
//         event.preventDefault();
//         fetch('/api/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 email,
//                 password
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(res => {
//             if(res.status === 200){
                
//                res.json().then(function(object){
                Auth.authenticateUser(object.token);
//             history.push('/resources');
//             alert('User: ' + object.user.username + ' logged in!');
//              })
//          }else{
//             res.json().then(function(object){
//                 alert('Error: ' + object.message);
//               })
//          }
//     })
// }
```

## 10.4 Resources.jsx
```JSX
import Auth from '../../modules';
// useEffect(() => {
  const token = Auth.getToken('token');
  // const fetchData = async () => {
    const result = await axios(api, {
      headers: { "Authorization": `Bearer ${token}`}
    });
//     setValues(result.data);
//   };
//   fetchData();
// }, [api]);
```

## 10.5 Auth.js
```JS
    static getToken(tokenName) {
        return localStorage.getItem(tokenName);
    }
```

## 10.6 RouteWithLayout.jsx
```JSX
import Auth from '../../modules';
// <Route
//       {...rest}
//       render={matchProps => (
        Auth.isUserAuthenticated() ? (
        //   <Layout>
        //   <Component {...matchProps} />
        // </Layout>
        ) : (
          {...alert("You are not authorized to see this page! Please log in!")},
          <Redirect
            exact
            to="/login"
            />
            
        )
        
      )}
    />
```

## 10.7 Auth.js
```JS
static isUserAuthenticated() {
  return localStorage.getItem('token') !=null;
};
```

# 11. Expirare Token
## 11.1 routes.js
```JS
// router.post('/login', function(req, res, next) {
//     passport.authenticate('local',{session: false}, (err, user, info) => {
//         if(err || !user) {
//             return res.status(400).send(info);
//         }
//         req.login(user, {session: false}, (err) => {
//             if(err){
//                 res.send(err);
//             }
            const token = jwt.sign(user.toJSON(), 'secret', {expiresIn: '10s'});
//             return res.json({user, token});
//         });
//     })(req, res);
// });
```
## 11.2 Auth.js
```JS
static isTokenExpired(token) {
       
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                alert("Token expired! Please Log In again!");
                localStorage.removeItem('token');
                return true;
            }else {
                return false;
            }
    }

    static isUserAuthenticated() {
        const token = localStorage.getItem('token');
        return token && !this.isTokenExpired(token);
    }
```

## 12. Implementare LogOut --> TopBar.jsx
```JSX
import Auth from '../../../../modules';
import { Link as RouterLink, withRouter } from 'react-router-dom';
const { className, history, ...rest } = props;
 const  handleLogOut = () => {
   Auth.removeToken('token');
    history.push('/');
  };
  export default withRouter(TopBar);
```



