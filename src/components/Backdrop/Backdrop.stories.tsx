import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Backdrop } from './Backdrop';
import { Box, Button, Typography, CircularProgress, TextField } from '@mui/material';

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Feedback/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '백드롭이 열려있는지 여부',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: '로딩 표시기를 표시할지 여부',
      defaultValue: false,
    },
    loaderColor: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
      description: '로딩 표시기의 색상',
      defaultValue: 'primary',
    },
    loaderSize: {
      control: 'number',
      description: '로딩 표시기의 크기',
      defaultValue: 40,
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '백드롭의 배경색 투명도',
      defaultValue: 0.7,
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

// 백드롭 컴포넌트는 열림/닫힘 상태를 관리해야 하므로 모든 예제를 함수형 컴포넌트로 구현합니다.
export const Basic = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button variant="contained" onClick={handleToggle}>
        백드롭 토글
      </Button>
      <Typography sx={{ mt: 2 }}>
        백드롭을 닫으려면 아무 곳이나 클릭하세요.
      </Typography>
      <Backdrop open={open} onClick={handleClose} />
    </Box>
  );
};

export const WithLoading = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button variant="contained" onClick={handleToggle}>
        로딩 백드롭 토글
      </Button>
      <Typography sx={{ mt: 2 }}>
        3초 후에 자동으로 닫힙니다.
      </Typography>
      <Backdrop 
        open={open} 
        loading={true}
        loaderColor="primary"
      />
      {open && setTimeout(() => setOpen(false), 3000)}
    </Box>
  );
};

export const WithCustomLoader = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button variant="contained" onClick={handleToggle}>
        커스텀 로더 백드롭 토글
      </Button>
      <Backdrop open={open} onClick={handleClose}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 3,
          borderRadius: 2,
          color: '#333'
        }}>
          <CircularProgress color="secondary" size={60} />
          <Typography sx={{ mt: 2 }}>
            데이터를 처리 중입니다...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};

export const WithForm = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`구독 이메일: ${email}`);
    setEmail('');
    handleClose();
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button variant="contained" onClick={handleToggle}>
        뉴스레터 구독 폼 열기
      </Button>
      <Backdrop 
        open={open} 
        onClick={handleClose}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}
      >
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          sx={{ 
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            width: 300,
            maxWidth: '90%'
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            뉴스레터 구독
          </Typography>
          <TextField
            autoFocus
            label="이메일 주소"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            구독하기
          </Button>
        </Box>
      </Backdrop>
    </Box>
  );
};

export const DifferentOpacity = () => {
  const [open, setOpen] = useState(false);
  const [opacity, setOpacity] = useState(0.5);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>불투명도: {opacity}</Typography>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
        />
      </Box>
      <Button variant="contained" onClick={handleToggle}>
        백드롭 토글
      </Button>
      <Backdrop 
        open={open} 
        onClick={handleClose}
        opacity={opacity}
      />
    </Box>
  );
};

export const CustomStyled = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button variant="contained" onClick={handleToggle}>
        커스텀 스타일 백드롭 토글
      </Button>
      <Backdrop 
        open={open} 
        onClick={handleClose}
        customStyle={{
          background: 'linear-gradient(45deg, rgba(66,66,231,0.7) 0%, rgba(155,65,244,0.7) 100%)',
          backdropFilter: 'blur(3px)',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'white', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)' 
          }}
        >
          커스텀 스타일 백드롭
        </Typography>
      </Backdrop>
    </Box>
  );
};