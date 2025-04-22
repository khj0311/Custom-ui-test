import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog';
import { Button, Typography, TextField, Box } from '@mui/material';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    componentSubtitle: 'Dialogs inform users about a task and can contain critical information or require decisions',
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Basic Dialog with trigger button
export const Basic = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="Basic Dialog"
        content={<Typography>This is a basic dialog example.</Typography>}
        actions={[
          { label: 'Cancel', onClick: handleClose },
          { label: 'OK', onClick: handleClose, color: 'primary' }
        ]}
      />
    </>
  );
};

// Dialog with content text
export const WithContentText = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Dialog with Content Text
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="Dialog with Content Text"
        contentText="This text is styled as DialogContentText, which is optimized for readability."
        actions={[
          { label: 'Close', onClick: handleClose }
        ]}
      />
    </>
  );
};

// Dialog with form
export const WithForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Simulate form submission
    console.log('Form submitted:', formData);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Form Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="Dialog with Form"
        content={
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
        }
        actions={[
          { label: 'Cancel', onClick: handleClose },
          { 
            label: 'Submit', 
            onClick: handleSubmit, 
            color: 'primary',
            disabled: !formData.name || !formData.email
          }
        ]}
      />
    </>
  );
};

// Dialog with close button in title
export const WithCloseButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Dialog with Close Button
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="Dialog with Close Button"
        showCloseButton={true}
        content={<Typography>This dialog has a close button in the title area.</Typography>}
        actions={[
          { label: 'OK', onClick: handleClose, color: 'primary' }
        ]}
      />
    </>
  );
};

// Full width dialog
export const FullWidth = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Full Width Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="Full Width Dialog"
        content={<Typography>This dialog uses the full width of the screen based on the maxWidth value.</Typography>}
        actions={[
          { label: 'Close', onClick: handleClose }
        ]}
        fullWidth
        maxWidth="md"
      />
    </>
  );
};

// Full screen dialog
export const FullScreen = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Full Screen Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="Full Screen Dialog"
        showCloseButton={true}
        content={
          <Box sx={{ minHeight: '200px' }}>
            <Typography>
              This dialog takes up the full screen on all device sizes.
            </Typography>
          </Box>
        }
        actions={[
          { 
            label: 'Save Changes', 
            onClick: handleClose, 
            color: 'primary',
            variant: 'contained'
          }
        ]}
        fullScreen
      />
    </>
  );
};

// Confirmation dialog
export const Confirmation = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleOpen = () => {
    setOpen(true);
    setResult(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setResult('Confirmed');
    handleClose();
  };

  const handleCancel = () => {
    setResult('Cancelled');
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="warning" onClick={handleOpen}>
        Delete Item
      </Button>
      {result && (
        <Typography sx={{ mt: 2 }}>
          Action: {result}
        </Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        title="Confirm Deletion"
        contentText="Are you sure you want to delete this item? This action cannot be undone."
        actions={[
          { label: 'Cancel', onClick: handleCancel },
          { 
            label: 'Delete', 
            onClick: handleConfirm, 
            color: 'error',
            variant: 'contained'
          }
        ]}
        maxWidth="xs"
      />
    </>
  );
};