import React from "react";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

const Input = React.forwardRef(
  (
    {
      id,
      name,
      label,
      subLabel,
      hint,
      placeholder,
      hasError,
      helpText,
      onChange,
      value,
      onClick,
      onBlur,
      endAdornment,
      startAdornment,
      type,
      inputProps = {},
      multiline,
      rows,
      readOnly,
      defaultValue,
      disabled,
      ...other
    },
    ref
  ) => {
    return (
      <FormControl
        variant="standard"
        margin="normal"
        error={hasError}
        sx={{ width: "100%" }}
        {...other}
      >
        <TextField
          label={label}
          type={type}
          id={id}
          name={name}
          defaultValue={defaultValue}
          inputRef={ref}
          placeholder={placeholder}
          fullWidth
          value={value}
          onChange={onChange}
          variant="outlined"
          multiline={multiline}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          onBlur={onBlur}
          error={hasError}
          startAdornment={
            startAdornment && (
              <InputAdornment
                position="start"
                sx={{ position: "absolute", left: 8, zIndex: 1 }}
              >
                {startAdornment}
              </InputAdornment>
            )
          }
          endAdornment={
            endAdornment && (
              <InputAdornment
                position="end"
                sx={{ position: "absolute", right: 8 }}
              >
                {endAdornment}
              </InputAdornment>
            )
          }
          {...inputProps}
        />
        {hint && (
          <Typography variant="caption" color="textSecondary">
            {hint}
          </Typography>
        )}
        {hasError && <FormHelperText>{helpText}</FormHelperText>}
      </FormControl>
    );
  }
);

Input.displayName = "TextInput";

export default Input;
