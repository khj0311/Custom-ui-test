import React from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Dialog component for displaying modal content
 * 
 * @component
 * @example
 * <Dialog
 *   open={open}
 *   onClose={handleClose}
 *   title="Confirmation"
 *   content="Are you sure you want to continue?"
 *   actions={[
 *     { label: 'Cancel', onClick: handleClose },
 *     { label: 'Confirm', onClick: handleConfirm, color: 'primary' }
 *   ]}
 * />
 */

export interface DialogAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button color */
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  /** Button variant */
  variant?: 'text' | 'outlined' | 'contained';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional props to pass to the button */
  [key: string]: any;
}

export interface DialogProps {
  /** Controls whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog is closed */
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick') => void;
  /** Dialog title */
  title?: React.ReactNode;
  /** Whether to show a close button in the title */
  showCloseButton?: boolean;
  /** Dialog content */
  content?: React.ReactNode;
  /** Dialog content text */
  contentText?: React.ReactNode;
  /** Array of action buttons to display */
  actions?: DialogAction[];
  /** Children to render inside the dialog */
  children?: React.ReactNode;
  /** The maximum width of the dialog */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /** If true, the dialog stretches to maximum width */
  fullWidth?: boolean;
  /** If true, the dialog will be full-screen */
  fullScreen?: boolean;
  /** Additional props to pass to the component */
  [key: string]: any;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  showCloseButton = false,
  content,
  contentText,
  actions,
  children,
  maxWidth = 'sm',
  fullWidth = false,
  fullScreen = false,
  ...rest
}) => {
  const handleClose = (reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick') => {
    if (onClose) {
      onClose({}, reason);
    }
  };

  return (
    <MuiDialog
      open={open}
      onClose={(event, reason) => handleClose(reason)}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      {...rest}
    >
      {title && (
        <DialogTitle 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          {title}
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={() => handleClose('closeButtonClick')}
              sx={{ ml: 2 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      {(content || contentText || children) && (
        <DialogContent>
          {contentText && <DialogContentText>{contentText}</DialogContentText>}
          {content}
          {children}
        </DialogContent>
      )}

      {actions && actions.length > 0 && (
        <DialogActions>
          {actions.map((action, index) => {
            const { label, onClick, color = 'inherit', variant = 'text', disabled = false, ...actionProps } = action;
            return (
              <Button
                key={index}
                onClick={onClick}
                color={color}
                variant={variant}
                disabled={disabled}
                {...actionProps}
              >
                {label}
              </Button>
            );
          })}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;