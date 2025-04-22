import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { Box, Typography, FormGroup } from '@mui/material';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    componentSubtitle: 'Checkboxes allow users to select one or more items from a set',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    label: 'Basic Checkbox',
  },
};

export const Controlled = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box>
      <Typography gutterBottom>
        Checked: {checked ? 'Yes' : 'No'}
      </Typography>
      <Checkbox
        label="Controlled Checkbox"
        checked={checked}
        onChange={handleChange}
      />
    </Box>
  );
};

export const WithoutLabel: Story = {
  args: {},
  render: () => <Checkbox />,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    disabled: true,
    checked: true,
  },
};

export const ColorVariants = () => (
  <FormGroup>
    <Checkbox label="Primary (default)" color="primary" defaultChecked />
    <Checkbox label="Secondary" color="secondary" defaultChecked />
    <Checkbox label="Error" color="error" defaultChecked />
    <Checkbox label="Info" color="info" defaultChecked />
    <Checkbox label="Success" color="success" defaultChecked />
    <Checkbox label="Warning" color="warning" defaultChecked />
    <Checkbox label="Default" color="default" defaultChecked />
  </FormGroup>
);

export const Sizes = () => (
  <FormGroup>
    <Checkbox label="Medium (default)" defaultChecked />
    <Checkbox label="Small" size="small" defaultChecked />
  </FormGroup>
);

export const Indeterminate = () => {
  const [checked, setChecked] = useState([true, false]);
  
  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChild1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChild2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  return (
    <FormGroup>
      <Checkbox
        label="Parent"
        checked={checked[0] && checked[1]}
        indeterminate={checked[0] !== checked[1]}
        onChange={handleParentChange}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <Checkbox
          label="Child 1"
          checked={checked[0]}
          onChange={handleChild1Change}
        />
        <Checkbox
          label="Child 2"
          checked={checked[1]}
          onChange={handleChild2Change}
        />
      </Box>
    </FormGroup>
  );
};

export const Required: Story = {
  args: {
    label: 'Required Checkbox',
    required: true,
  },
};