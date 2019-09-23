import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing(1)
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
        <RouterLink to="/resources">
          <img
            alt="logo"
            src="/images/logos/risks.svg"
            height="50px"
          />
        </RouterLink >

        <div className={classes.flexGrow} />

        <RouterLink to="/resources"
          style={{ textDecoration: 'none', color: 'white' }}>
          <IconButton
            className={classes.button}
            color="inherit"
          >
            <GroupAddIcon />
          </IconButton>
        </RouterLink>


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