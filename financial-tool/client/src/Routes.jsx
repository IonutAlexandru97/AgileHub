import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithoutLayout } from './components';
import { 
    SignUp as SignUpView,
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
            component={SignUpView}
            exact
            path="/register"
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