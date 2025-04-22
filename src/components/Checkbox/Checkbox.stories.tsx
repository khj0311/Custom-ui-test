import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Box, Typography, FormGroup } from '@mui/material';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '체크박스와 함께 표시할 레이블',
    },
    checked: {
      control: 'boolean',
      description: '체크박스가 선택되었는지 여부(제어 컴포넌트)',
    },
    defaultChecked: {
      control: 'boolean',
      description: '체크박스의 초기 선택 상태(비제어 컴포넌트)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'default'],
      description: '체크박스의 색상',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: '체크박스의 크기',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: '체크박스를 비활성화',
      defaultValue: false,
    },
    indeterminate: {
      control: 'boolean',
      description: '체크박스가 중간 상태로 표시',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: '체크박스가 필수인 경우 설정',
      defaultValue: false,
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    label: '기본 체크박스',
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
        선택됨: {checked ? '예' : '아니오'}
      </Typography>
      <Checkbox
        label="제어 체크박스"
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
    label: '비활성화된 체크박스',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '비활성화된 선택됨 체크박스',
    disabled: true,
    checked: true,
  },
};

export const ColorVariants = () => (
  <FormGroup>
    <Checkbox label="Primary (기본값)" color="primary" defaultChecked />
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
    <Checkbox label="Medium (기본값)" defaultChecked />
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
        label="부모"
        checked={checked[0] && checked[1]}
        indeterminate={checked[0] !== checked[1]}
        onChange={handleParentChange}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <Checkbox
          label="자식 1"
          checked={checked[0]}
          onChange={handleChild1Change}
        />
        <Checkbox
          label="자식 2"
          checked={checked[1]}
          onChange={handleChild2Change}
        />
      </Box>
    </FormGroup>
  );
};

export const Required: Story = {
  args: {
    label: '필수 체크박스',
    required: true,
  },
};

export const CustomStyled: Story = {
  args: {
    label: '커스텀 스타일 체크박스',
    defaultChecked: true,
    customStyle: {
      color: '#52af77',
      '&.Mui-checked': {
        color: '#2e7d32',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 28,
      },
    },
  },
};