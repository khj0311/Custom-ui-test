import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof Slider> = {
  title: 'Components/Inputs/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: '슬라이더의 최소값',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      description: '슬라이더의 최대값',
      defaultValue: 100,
    },
    step: {
      control: 'number',
      description: '슬라이더의 스텝 값',
      defaultValue: 1,
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: '슬라이더의 색상',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: '슬라이더의 크기',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      defaultValue: false,
    },
    marks: {
      control: 'boolean',
      description: '슬라이더에 마크 표시',
      defaultValue: false,
    },
    valueLabelDisplay: {
      control: 'select',
      options: ['auto', 'on', 'off'],
      description: '값 레이블 표시 방법',
      defaultValue: 'auto',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '슬라이더의 방향',
      defaultValue: 'horizontal',
    },
    track: {
      control: 'select',
      options: ['normal', false, 'inverted'],
      description: '트랙 표시 방법',
      defaultValue: 'normal',
    },
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
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: 30,
  },
};

// 예제들은 React state를 사용하므로 함수형 컴포넌트로 작성
export const Basic = () => {
  const [value, setValue] = useState<number>(30);
  
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  
  return (
    <>
      <Typography gutterBottom>값: {value}</Typography>
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
      <Typography gutterBottom>범위: {value[0]} - {value[1]}</Typography>
      <Slider 
        value={value} 
        onChange={handleChange} 
      />
    </>
  );
};

export const WithMarks: Story = {
  args: {
    defaultValue: 50,
    marks: [
      { value: 0, label: '0°C' },
      { value: 25, label: '25°C' },
      { value: 50, label: '50°C' },
      { value: 75, label: '75°C' },
      { value: 100, label: '100°C' },
    ],
    valueLabelDisplay: 'on',
  },
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

export const Sizes: Story = {
  render: () => (
    <Box sx={{ '& > :not(:last-child)': { marginBottom: 4 } }}>
      <Typography gutterBottom>작은 크기</Typography>
      <Slider defaultValue={30} size="small" />
      <Typography gutterBottom sx={{ mt: 4 }}>기본 크기</Typography>
      <Slider defaultValue={40} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: 30,
    disabled: true,
  },
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ height: 200, display: 'inline-flex' }}>
      <Slider
        orientation="vertical"
        defaultValue={30}
        valueLabelDisplay="on"
      />
    </Box>
  ),
};

export const CustomTrack: Story = {
  render: () => (
    <Box sx={{ '& > :not(:last-child)': { marginBottom: 4 } }}>
      <Typography>일반 트랙</Typography>
      <Slider defaultValue={30} track="normal" />
      
      <Typography>반전 트랙</Typography>
      <Slider defaultValue={30} track="inverted" />
      
      <Typography>트랙 없음</Typography>
      <Slider defaultValue={30} track={false} />
    </Box>
  ),
};

export const CustomStep: Story = {
  args: {
    defaultValue: 20,
    step: 10,
    marks: true,
    min: 0,
    max: 100,
    valueLabelDisplay: 'on',
  },
};

export const CustomStyled: Story = {
  args: {
    defaultValue: 60,
    customStyle: {
      color: '#52af77',
      height: 8,
      '& .MuiSlider-track': {
        border: 'none',
      },
      '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
          boxShadow: 'inherit',
        },
        '&::before': {
          display: 'none',
        },
      },
      '& .MuiSlider-valueLabel': {
        backgroundColor: '#52af77',
      },
    },
  },
};