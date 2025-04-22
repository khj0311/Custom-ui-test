import React from 'react';
import { Slider as MuiSlider } from '@mui/material';

/**
 * Slider component for selecting a value from a range
 * 
 * @component
 * @example
 * <Slider
 *   min={0}
 *   max={100}
 *   step={1}
 *   defaultValue={50}
 *   valueLabelDisplay="auto"
 *   onChange={handleChange}
 * />
 */

export interface SliderProps {
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step value */
  step?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number | number[];
  /** Current value (controlled) */
  value?: number | number[];
  /** Callback fired when the value changes */
  onChange?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
  /** Whether to show marks */
  marks?: boolean | { value: number; label?: React.ReactNode }[];
  /** How to display the current value label */
  valueLabelDisplay?: 'auto' | 'on' | 'off';
  /** The color of the component */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** The size of the component */
  size?: 'small' | 'medium';
  /** The orientation of the slider */
  orientation?: 'horizontal' | 'vertical';
  /** The track presentation */
  track?: 'normal' | false | 'inverted';
  /** If true, the component is disabled */
  disabled?: boolean;
  /** Additional props to pass to the component */
  [key: string]: any;
}

const Slider: React.FC<SliderProps> = ({ 
  min = 0, 
  max = 100, 
  step = 1, 
  defaultValue, 
  value, 
  onChange,
  marks = false,
  valueLabelDisplay = 'auto',
  color = 'primary',
  size = 'medium',
  orientation = 'horizontal',
  track = 'normal',
  disabled = false,
  ...rest
}) => {
  return (
    <MuiSlider
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      marks={marks}
      valueLabelDisplay={valueLabelDisplay}
      color={color}
      size={size}
      orientation={orientation}
      track={track}
      disabled={disabled}
      {...rest}
    />
  );
};

export default Slider;