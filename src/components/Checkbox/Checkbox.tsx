import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

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

export interface CheckboxProps {
  /** If true, the component is checked (controlled) */
  checked?: boolean;
  /** If true, the component is initially checked (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback fired when the state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /** Label for the checkbox */
  label?: React.ReactNode;
  /** If true, the component is disabled */
  disabled?: boolean;
  /** The color of the component */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  /** The size of the component */
  size?: 'small' | 'medium';
  /** If true, the component appears indeterminate */
  indeterminate?: boolean;
  /** If true, the input element is required */
  required?: boolean;
  /** Name attribute of the input element */
  name?: string;
  /** The value of the component */
  value?: unknown;
  /** Props applied to the input element */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Additional props to pass to the component */
  [key: string]: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
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

export default Checkbox;