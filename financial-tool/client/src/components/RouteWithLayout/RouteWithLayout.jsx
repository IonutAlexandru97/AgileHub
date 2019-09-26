import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Auth from '../../modules';
const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        Auth.isUserAuthenticated() ? (
          <Layout>
          <Component {...matchProps} />
        </Layout>
        ) : (
          {...alert("You are not authorized to see this page! Please log in!")},
          <Redirect
            exact
            to="/login"
            />
            
        )
        
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