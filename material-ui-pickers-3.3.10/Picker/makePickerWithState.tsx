import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { BasePickerProps } from '../typings/BasePicker';
import { Picker, ToolbarComponentProps } from './Picker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { PureDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { StateHookOptions, usePickerState } from '../_shared/hooks/usePickerState';
import {
  BaseKeyboardPickerProps,
  useKeyboardPickerState,
} from '../_shared/hooks/useKeyboardPickerState';

export type WithKeyboardInputProps = DateValidationProps &
  BaseKeyboardPickerProps &
  ExtendWrapper<KeyboardDateInputProps>;

export type WithPureInputProps = DateValidationProps &
  BasePickerProps &
  ExtendWrapper<PureDateInputProps>;

export interface MakePickerOptions<T extends any> {
  Input: any;
  useState: typeof usePickerState | typeof useKeyboardPickerState;
  useOptions: (props: any) => StateHookOptions;
  getCustomProps?: (props: T) => Partial<T>;
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

// Matches the @material-ui/core v4 default palette so the vendored pickers
// keep their original look now that they render through @mui/material v5,
// which ships different default colors (e.g. primary #1976d2 instead of #3f51b5).
const pickersTheme = createTheme({
  palette: {
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
    },
  },
});

export function makePickerWithState<T extends any>({
  Input,
  useState,
  useOptions,
  getCustomProps,
  DefaultToolbarComponent,
}: MakePickerOptions<T>): React.FC<T> {
  function PickerWithState(props: T) {
    const {
      allowKeyboardControl,
      ampm,
      animateYearScrolling,
      autoOk,
      dateRangeIcon,
      disableFuture,
      disablePast,
      disableToolbar,
      emptyLabel,
      format,
      forwardedRef,
      hideTabs,
      initialFocusedDate,
      invalidDateMessage,
      invalidLabel,
      labelFunc,
      leftArrowButtonProps,
      leftArrowIcon,
      loadingIndicator,
      maxDate,
      maxDateMessage,
      minDate,
      minDateMessage,
      minutesStep,
      onAccept,
      onChange,
      onClose,
      onMonthChange,
      onOpen,
      onYearChange,
      openTo,
      orientation,
      renderDay,
      rightArrowButtonProps,
      rightArrowIcon,
      shouldDisableDate,
      strictCompareDates,
      timeIcon,
      ToolbarComponent = DefaultToolbarComponent,
      value,
      variant,
      views,
      ...other
    } = props;

    const injectedProps = getCustomProps ? getCustomProps(props) : {};

    const options = useOptions(props);
    const { pickerProps, inputProps, wrapperProps } = useState(props as any, options);

    return (
      <ThemeProvider theme={pickersTheme}>
        <Wrapper
          variant={variant}
          InputComponent={Input}
          DateInputProps={inputProps}
          {...injectedProps}
          {...wrapperProps}
          {...other}
        >
          <Picker
            {...pickerProps}
            allowKeyboardControl={allowKeyboardControl}
            ampm={ampm}
            animateYearScrolling={animateYearScrolling}
            dateRangeIcon={dateRangeIcon}
            disableFuture={disableFuture}
            disablePast={disablePast}
            disableToolbar={disableToolbar}
            hideTabs={hideTabs}
            leftArrowButtonProps={leftArrowButtonProps}
            leftArrowIcon={leftArrowIcon}
            loadingIndicator={loadingIndicator}
            maxDate={maxDate}
            minDate={minDate}
            minutesStep={minutesStep}
            onMonthChange={onMonthChange}
            onYearChange={onYearChange}
            openTo={openTo}
            orientation={orientation}
            renderDay={renderDay}
            rightArrowButtonProps={rightArrowButtonProps}
            rightArrowIcon={rightArrowIcon}
            shouldDisableDate={shouldDisableDate}
            strictCompareDates={strictCompareDates}
            timeIcon={timeIcon}
            ToolbarComponent={ToolbarComponent}
            views={views}
          />
        </Wrapper>
      </ThemeProvider>
    );
  }

  return PickerWithState;
}
