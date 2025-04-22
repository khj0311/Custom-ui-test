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
      description: '백드롭이 열려있는지 여부',
    },
    loading: {
      control: 'boolean',
      description: '로딩 인디케이터 표시 여부',
      defaultValue: false,
    },
    loadingColor: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
      description: '로딩 인디케이터 색상',
      defaultValue: 'primary',
    },
    loadingSize: {
      control: 'number',
      description: '로딩 인디케이터 사이즈',
      defaultValue: 40,
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '백드롭 투명도',
      defaultValue: 0.7,
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

// 스토리북에서는 일반적으로 백드롭을 표시하기 위한 트리거 버튼이 필요하므로 모든 예제를 함수형 컴포넌트로 작성합니다.
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
        백드롭 열기
      </Button>
      <Backdrop
        open={open}
        onClick={handleClose}
      >
        <Typography variant="h6" color="white">
          아무 곳이나 클릭하여 닫기
        </Typography>
      </Backdrop>
    </>
  );
};

export const WithLoading = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    // 3초 후에 자동으로 닫힘
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        로딩 백드롭 열기 (3초)
      </Button>
      <Backdrop
        open={open}
        loading={true}
      />
    </>
  );
};

export const CustomLoading = () => {
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
        커스텀 로딩 백드롭 열기
      </Button>
      <Backdrop
        open={open}
        onClick={handleClose}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            로딩 중...
          </Typography>
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
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" onClick={() => setOpen1(true)}>
        투명도 0.3
      </Button>
      <Button variant="contained" onClick={() => setOpen2(true)}>
        투명도 0.7
      </Button>
      <Button variant="contained" onClick={() => setOpen3(true)}>
        투명도 0.9
      </Button>

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
    </Box>
  );
};

export const DifferentLoadingColors = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" color="primary" onClick={() => setOpen1(true)}>
        Primary
      </Button>
      <Button variant="contained" color="secondary" onClick={() => setOpen2(true)}>
        Secondary
      </Button>
      <Button variant="contained" color="error" onClick={() => setOpen3(true)}>
        Error
      </Button>

      <Backdrop
        open={open1}
        onClick={() => setOpen1(false)}
        loading={true}
        loadingColor="primary"
      />
      <Backdrop
        open={open2}
        onClick={() => setOpen2(false)}
        loading={true}
        loadingColor="secondary"
      />
      <Backdrop
        open={open3}
        onClick={() => setOpen3(false)}
        loading={true}
        loadingColor="error"
      />
    </Box>
  );
};

export const DifferentLoadingSizes = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" onClick={() => setOpen1(true)}>
        작은 크기 (20)
      </Button>
      <Button variant="contained" onClick={() => setOpen2(true)}>
        기본 크기 (40)
      </Button>
      <Button variant="contained" onClick={() => setOpen3(true)}>
        큰 크기 (80)
      </Button>

      <Backdrop
        open={open1}
        onClick={() => setOpen1(false)}
        loading={true}
        loadingSize={20}
      />
      <Backdrop
        open={open2}
        onClick={() => setOpen2(false)}
        loading={true}
        loadingSize={40}
      />
      <Backdrop
        open={open3}
        onClick={() => setOpen3(false)}
        loading={true}
        loadingSize={80}
      />
    </Box>
  );
};

export const CustomStyled = () => {
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
        커스텀 스타일 백드롭 열기
      </Button>
      <Backdrop
        open={open}
        onClick={handleClose}
        customStyle={{
          backgroundColor: 'rgba(63, 81, 181, 0.7)',
          backdropFilter: 'blur(3px)',
        }}
      >
        <Box 
          sx={{ 
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" color="primary">
            커스텀 백드롭 콘텐츠
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            닫기
          </Button>
        </Box>
      </Backdrop>
    </>
  );
};