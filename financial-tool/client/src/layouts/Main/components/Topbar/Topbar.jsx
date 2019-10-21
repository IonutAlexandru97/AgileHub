import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TimelineIcon from '@material-ui/icons/Timeline';

import Auth from '../../../../modules';

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
  const { className, history, ...rest } = props;
  const classes = useStyles();

  const  handleLogOut = () => {
   Auth.removeToken('token');
    history.push('/');
  };

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
          <IconButton
            className={classes.button}
            color="inherit"
            onClick={handleLogOut}
          >
            <InputIcon />
          </IconButton>
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string
}

export default withRouter(TopBar);