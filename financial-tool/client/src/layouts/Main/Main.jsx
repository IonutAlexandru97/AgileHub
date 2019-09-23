import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import { TopBar } from './components';

const useStyles = makeStyles(theme => ({
    content: {
      height: '100%'
    }
  }));

  const Main = props => {
      const { children } = props;
      const classes = useStyles();

      return (
          <div>
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