import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    componentSubtitle: 'A slider component for selecting values from a range',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300, margin: '0 auto' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

// For examples that require React state, we need to use render functions
export const Basic = () => {
  const [value, setValue] = useState(30);
  
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  
  return (
    <>
      <Typography gutterBottom>Value: {value}</Typography>
      <Slider 
        value={value} 
        onChange={handleChange} 
      />
    </>
  );
};

export const Range = () => {
  const [value, setValue] = useState<number[]>([20, 75]);
  
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  
  return (
    <>
      <Typography gutterBottom>Range: {value[0]} - {value[1]}</Typography>
      <Slider 
        value={value} 
        onChange={handleChange} 
      />
    </>
  );
};

type Story = StoryObj<typeof Slider>;

export const WithMarks: Story = {
  render: () => {
    const marks = [
      { value: 0, label: '0°C' },
      { value: 25, label: '25°C' },
      { value: 50, label: '50°C' },
      { value: 75, label: '75°C' },
      { value: 100, label: '100°C' },
    ];
    
    return (
      <Slider 
        defaultValue={50} 
        marks={marks}
        valueLabelDisplay="on" 
      />
    );
  }
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ '& > :not(:last-child)': { marginBottom: 4 } }}>
      <Slider defaultValue={30} color="primary" />
      <Slider defaultValue={40} color="secondary" />
      <Slider defaultValue={50} color="error" />
      <Slider defaultValue={60} color="info" />
      <Slider defaultValue={70} color="success" />
      <Slider defaultValue={80} color="warning" />
    </Box>
  )
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ '& > :not(:last-child)': { marginBottom: 4 } }}>
      <Slider defaultValue={30} size="small" />
      <Slider defaultValue={30} />
    </Box>
  )
};

export const Disabled: Story = {
  args: {
    defaultValue: 30,
    disabled: true
  }
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ height: 200, display: 'inline-flex', marginLeft: 2 }}>
      <Slider
        orientation="vertical"
        defaultValue={30}
        valueLabelDisplay="on"
      />
    </Box>
  )
};

export const CustomTrack: Story = {
  render: () => (
    <Box sx={{ '& > :not(:last-child)': { marginBottom: 4 } }}>
      <Typography>Normal Track</Typography>
      <Slider defaultValue={30} track="normal" />
      
      <Typography>Inverted Track</Typography>
      <Slider defaultValue={30} track="inverted" />
      
      <Typography>No Track</Typography>
      <Slider defaultValue={30} track={false} />
    </Box>
  )
};

export const CustomStep: Story = {
  args: {
    defaultValue: 20,
    step: 10,
    marks: true,
    min: 0,
    max: 100,
    valueLabelDisplay: "on"
  }
};