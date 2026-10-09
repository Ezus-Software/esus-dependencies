import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { ExtendMui } from '../typings/extendMui';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export interface ToolbarTextProps extends ExtendMui<TypographyProps> {
  selected?: boolean;
  label: string;
}

export const useStyles = makeStyles(
  theme => {
    const textColor =
      theme.palette.mode === 'light'
        ? theme.palette.primary.contrastText
        : theme.palette.getContrastText(theme.palette.background.default);

    return {
      toolbarTxt: {
        color: alpha(textColor, 0.54),
      },
      toolbarBtnSelected: {
        color: textColor,
      },
    };
  },
  { name: 'MuiPickersToolbarText' }
);

const ToolbarText: React.FunctionComponent<ToolbarTextProps> = ({
  selected,
  label,
  className = null,
  ...other
}) => {
  const classes = useStyles();
  return (
    <Typography
      children={label}
      className={clsx(classes.toolbarTxt, className, {
        [classes.toolbarBtnSelected]: selected,
      })}
      {...other}
    />
  );
};

export default ToolbarText;
