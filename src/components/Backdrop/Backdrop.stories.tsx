import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Backdrop } from './Backdrop';
import { Button, Box, Typography, CircularProgress } from '@mui/material';

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
      description: 'Backdrop이 보이는지 여부',
    },
    loading: {
      control: 'boolean',
      description: 'true인 경우 로딩 인디케이터를 표시합니다.',
      defaultValue: false,
    },
    loadingColor: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
      description: '로딩 인디케이터의 색상',
      defaultValue: 'primary',
    },
    loadingSize: {
      control: 'number',
      description: '로딩 인디케이터의 크기',
      defaultValue: 40,
    },
    opacity: {
      control: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      description: 'Backdrop의 배경색 불투명도',
      defaultValue: 0.7,
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

// 일반적으로 Backdrop은 상태 관리가 필요하므로 모든 예제를 함수형 컴포넌트로 작성합니다.
export const Basic = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggle}>
        기본 Backdrop 열기
      </Button>
      <Backdrop
        open={open}
        onClick={handleToggle}
      >
        <Typography color="white">백드롭 영역을 클릭하여 닫기</Typography>
      </Backdrop>
    </>
  );
};

export const WithLoading = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  // 5초 후 자동으로 닫힘
  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        로딩 Backdrop 열기 (5초 후 자동 닫힘)
      </Button>
      <Backdrop
        open={open}
        loading={true}
      />
    </>
  );
};

export const WithCustomLoading = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggle}>
        커스텀 로딩 Backdrop 열기
      </Button>
      <Backdrop
        open={open}
        onClick={handleToggle}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress color="success" />
          <Typography color="white" sx={{ mt: 2 }}>로딩 중...</Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export const DifferentOpacity = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="contained" color="primary" onClick={() => setOpen1(true)}>
          낮은 불투명도 (0.3)
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setOpen2(true)}>
          기본 불투명도 (0.7)
        </Button>
        <Button variant="contained" color="error" onClick={() => setOpen3(true)}>
          높은 불투명도 (0.9)
        </Button>
      </Box>
      
      <Backdrop
        open={open1}
        onClick={() => setOpen1(false)}
        opacity={0.3}
        loading={true}
      />
      
      <Backdrop
        open={open2}
        onClick={() => setOpen2(false)}
        opacity={0.7}
        loading={true}
      />
      
      <Backdrop
        open={open3}
        onClick={() => setOpen3(false)}
        opacity={0.9}
        loading={true}
      />
    </>
  );
};

export const ColorVariants = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'>('primary');

  const handleOpen = (selectedColor: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning') => {
    setColor(selectedColor);
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="contained" color="primary" onClick={() => handleOpen('primary')}>
          Primary
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleOpen('secondary')}>
          Secondary
        </Button>
        <Button variant="contained" color="error" onClick={() => handleOpen('error')}>
          Error
        </Button>
        <Button variant="contained" color="info" onClick={() => handleOpen('info')}>
          Info
        </Button>
        <Button variant="contained" color="success" onClick={() => handleOpen('success')}>
          Success
        </Button>
        <Button variant="contained" color="warning" onClick={() => handleOpen('warning')}>
          Warning
        </Button>
      </Box>
      
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        loading={true}
        loadingColor={color}
      />
    </>
  );
};

export const CustomLoaderSize = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<number>(40);

  const handleOpen = (loaderSize: number) => {
    setSize(loaderSize);
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="contained" onClick={() => handleOpen(30)}>
          작은 로더 (30px)
        </Button>
        <Button variant="contained" onClick={() => handleOpen(60)}>
          큰 로더 (60px)
        </Button>
        <Button variant="contained" onClick={() => handleOpen(100)}>
          매우 큰 로더 (100px)
        </Button>
      </Box>
      
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        loading={true}
        loadingSize={size}
      />
    </>
  );
};

export const CustomStyled = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggle}>
        커스텀 스타일 Backdrop 열기
      </Button>
      <Backdrop
        open={open}
        onClick={handleToggle}
        loading={true}
        customStyle={{
          backgroundColor: 'rgba(76, 175, 80, 0.6)',
          backdropFilter: 'blur(3px)',
          '& .MuiCircularProgress-root': {
            color: '#ffffff',
          },
        }}
      />
    </>
  );
};