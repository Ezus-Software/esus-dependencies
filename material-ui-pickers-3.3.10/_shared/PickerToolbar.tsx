import * as React from 'react';
import clsx from 'clsx';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import { ExtendMui } from '../typings/extendMui';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(
  theme => ({
    toolbar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.primary.main
          : theme.palette.background.default,
    },
    toolbarLandscape: {
      height: 'auto',
      maxWidth: 150,
      padding: 8,
      justifyContent: 'flex-start',
    },
  }),
  { name: 'MuiPickersToolbar' }
);

interface PickerToolbarProps extends ExtendMui<ToolbarProps> {
  isLandscape: boolean;
}

const PickerToolbar: React.SFC<PickerToolbarProps> = ({
  children,
  isLandscape,
  className = null,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Toolbar
      className={clsx(classes.toolbar, { [classes.toolbarLandscape]: isLandscape }, className)}
      {...other}
    >
      {children}
    </Toolbar>
  );
};

export default PickerToolbar;
