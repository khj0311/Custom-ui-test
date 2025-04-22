import React from 'react';
import { Alert as MuiAlert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Alert component for displaying feedback messages to users
 * 
 * @component
 * @example
 * <Alert severity="success" title="Success" onClose={() => {}}>
 *   This is a success message!
 * </Alert>
 */
const Alert = ({ 
  children, 
  severity = 'info', 
  title, 
  variant = 'filled', 
  onClose,
  ...rest 
}) => {
  return (
    <MuiAlert 
      severity={severity} 
      variant={variant}
      onClose={onClose}
      {...rest}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  );
};

Alert.propTypes = {
  /** The content of the alert */
  children: PropTypes.node.isRequired,
  /** The severity of the alert */
  severity: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  /** The title displayed above the content */
  title: PropTypes.string,
  /** The variant to use */
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  /** Callback fired when the component requests to be closed */
  onClose: PropTypes.func,
};

export default Alert;