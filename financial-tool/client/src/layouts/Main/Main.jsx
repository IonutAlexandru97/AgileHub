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