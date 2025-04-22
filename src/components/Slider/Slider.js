import React from 'react';
import { Slider as MuiSlider } from '@mui/material';
import PropTypes from 'prop-types';

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
const Slider = ({ 
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

Slider.propTypes = {
  /** Minimum allowed value */
  min: PropTypes.number,
  /** Maximum allowed value */
  max: PropTypes.number,
  /** Step value */
  step: PropTypes.number,
  /** Default value (uncontrolled) */
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  /** Current value (controlled) */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  /** Callback fired when the value changes */
  onChange: PropTypes.func,
  /** Whether to show marks */
  marks: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.node
      })
    )
  ]),
  /** How to display the current value label */
  valueLabelDisplay: PropTypes.oneOf(['auto', 'on', 'off']),
  /** The color of the component */
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
  /** The size of the component */
  size: PropTypes.oneOf(['small', 'medium']),
  /** The orientation of the slider */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** The track presentation */
  track: PropTypes.oneOf(['normal', false, 'inverted']),
  /** If true, the component is disabled */
  disabled: PropTypes.bool
};

export default Slider;