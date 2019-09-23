import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithoutLayout } from './components';
import { 
    SignUp as SignUpView,
    SignIn as SignInView,
    Resources as ResourcesViews
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
            <RouteWithoutLayout
            component={ResourcesViews}
            exact
            path="/resources"
            />
        </Switch>
    )
}

export default Routes;