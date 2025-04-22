import React, { useState } from 'react';
import Slider from './Slider';
import { Box, Typography } from '@mui/material';

export default {
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

export const Basic = () => {
  const [value, setValue] = useState(30);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  const [value, setValue] = useState([20, 75]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
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

export const WithMarks = () => {
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
};

export const Colors = () => {
  return (
    <Box sx={{ '& > :not(:last-child)': { marginBottom: 4 } }}>
      <Slider defaultValue={30} color="primary" />
      <Slider defaultValue={40} color="secondary" />
      <Slider defaultValue={50} color="error" />
      <Slider defaultValue={60} color="info" />
      <Slider defaultValue={70} color="success" />
      <Slider defaultValue={80} color="warning" />
    </Box>
  );
};

export const Sizes = () => {
  return (
    <Box sx={{ '& > :not(:last-child)': { marginBottom: 4 } }}>
      <Slider defaultValue={30} size="small" />
      <Slider defaultValue={30} />
    </Box>
  );
};

export const Disabled = () => <Slider defaultValue={30} disabled />;

export const Vertical = () => (
  <Box sx={{ height: 200, display: 'inline-flex', marginLeft: 2 }}>
    <Slider
      orientation="vertical"
      defaultValue={30}
      valueLabelDisplay="on"
    />
  </Box>
);

export const CustomTrack = () => (
  <Box sx={{ '& > :not(:last-child)': { marginBottom: 4 } }}>
    <Typography>Normal Track</Typography>
    <Slider defaultValue={30} track="normal" />
    
    <Typography>Inverted Track</Typography>
    <Slider defaultValue={30} track="inverted" />
    
    <Typography>No Track</Typography>
    <Slider defaultValue={30} track={false} />
  </Box>
);

export const CustomStep = () => (
  <Slider
    defaultValue={20}
    step={10}
    marks
    min={0}
    max={100}
    valueLabelDisplay="on"
  />
);
