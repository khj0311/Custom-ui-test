import React from 'react';
import { Alert as MuiAlert, AlertTitle } from '@mui/material';

/**
 * Alert component for displaying feedback messages to users
 * 
 * @component
 * @example
 * <Alert severity="success" title="Success" onClose={() => {}}>
 *   This is a success message!
 * </Alert>
 */

export interface AlertProps {
  /** The content of the alert */
  children: React.ReactNode;
  /** The severity of the alert */
  severity?: 'success' | 'info' | 'warning' | 'error';
  /** The title displayed above the content */
  title?: string;
  /** The variant to use */
  variant?: 'standard' | 'filled' | 'outlined';
  /** Callback fired when the component requests to be closed */
  onClose?: () => void;
  /** Additional props to pass to the component */
  [key: string]: any;
}

const Alert: React.FC<AlertProps> = ({ 
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

export default Alert;