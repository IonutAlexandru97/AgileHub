import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import { TopBar } from './components';

const useStyles = makeStyles(theme => ({
    root: {
      paddingTop: 56,
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64
      }
    },
    shiftContent: {
      paddingLeft: 240
    },
    content: {
      height: '100%'
    }
  }));

  const Main = props => {
      const { children } = props;
      const classes = useStyles();

      return (
          <div className={clsx({
              [classes.root]:true
          })}>
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