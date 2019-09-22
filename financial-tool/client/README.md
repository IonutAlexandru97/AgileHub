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

## 3.5 Creare views/SignIn/SignIn.jsx
```JSX
import React from 'react';
function SignIn() {
    return(
        <p>Signin is working!</p>
    )
}

export default SignIn;
```

## 3.6 Creare views/SignIn/index.js
```JS
export { default } from './SignIn';
```

## 3.7 Creare views/index.js
```JS
export { default as SignIn } from './SignIn';
```

## 3.8 Creare Routes.jsx
```JSX
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithoutLayout } from './components';
import { 
    SignIn as SignInView
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
            component={SignInView}
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
