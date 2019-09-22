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
            to="/register"
            />
            <RouteWithoutLayout
            component={SignUpView}
            exact
            path="/register"
            />
        </Switch>
    )
}

export default Routes;