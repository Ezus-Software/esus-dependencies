// @material-ui/core v4 sized its inputs on 1.1876em where @mui/material v5 uses 1.4375em,
// and its IconButton had a 12px padding (8px in v5). The app's CSS was written against
// the v4 metrics, so the pickers' input keeps them to stay aligned with the fields next to it.
export const v4InputSx = {
  lineHeight: '1.1876em',
  '& .MuiInputBase-input': {
    height: '1.1876em',
  },
};

export const v4IconButtonSx = {
  padding: '12px',
};
