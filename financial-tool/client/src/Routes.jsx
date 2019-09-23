import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithoutLayout } from './components';
import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';
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
            <RouteWithLayout
            component={ResourcesViews}
            exact
            layout={MainLayout}
            path="/resources"
            />
        </Switch>
    )
}

export default Routes;