import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Checkbox component for selecting one or multiple options
 * 
 * @component
 * @example
 * <Checkbox
 *   label="Accept terms and conditions"
 *   checked={checked}
 *   onChange={handleChange}
 * />
 */
const Checkbox = ({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  color = 'primary',
  size = 'medium',
  indeterminate = false,
  required = false,
  name,
  value,
  inputProps,
  ...rest
}) => {
  // If no label is provided, return only the checkbox
  if (!label) {
    return (
      <MuiCheckbox
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        color={color}
        size={size}
        indeterminate={indeterminate}
        required={required}
        name={name}
        value={value}
        inputProps={inputProps}
        {...rest}
      />
    );
  }

  // If label is provided, wrap in FormControlLabel
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          color={color}
          size={size}
          indeterminate={indeterminate}
          required={required}
          name={name}
          value={value}
          inputProps={inputProps}
          {...rest}
        />
      }
      label={label}
      disabled={disabled}
    />
  );
};

Checkbox.propTypes = {
  /** If true, the component is checked (controlled) */
  checked: PropTypes.bool,
  /** If true, the component is initially checked (uncontrolled) */
  defaultChecked: PropTypes.bool,
  /** Callback fired when the state changes */
  onChange: PropTypes.func,
  /** Label for the checkbox */
  label: PropTypes.node,
  /** If true, the component is disabled */
  disabled: PropTypes.bool,
  /** The color of the component */
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 