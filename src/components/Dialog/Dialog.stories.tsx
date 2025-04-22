import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button, Typography, TextField, Box } from '@mui/material';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Feedback/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '다이얼로그 열림 상태',
    },
    title: {
      control: 'text',
      description: '다이얼로그 제목',
    },
    showCloseButton: {
      control: 'boolean',
      description: '제목에 닫기 버튼 표시 여부',
      defaultValue: false,
    },
    contentText: {
      control: 'text',
      description: '다이얼로그 내용 텍스트',
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: '다이얼로그 최대 너비',
      defaultValue: 'sm',
    },
    fullWidth: {
      control: 'boolean',
      description: '다이얼로그 전체 너비 확장 여부',
      defaultValue: false,
    },
    fullScreen: {
      control: 'boolean',
      description: '다이얼로그 전체 화면 표시 여부',
      defaultValue: false,
    },
    onClose: { action: 'closed' },
  },
};

export default meta;

// 스토리북에서는 일반적으로 다이얼로그를 표시하기 위한 트리거 버튼이 필요하므로 모든 예제를 함수형 컴포넌트로 작성합니다.
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
        다이얼로그 열기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="기본 다이얼로그"
        content={<Typography>이것은 기본 다이얼로그 예제입니다.</Typography>}
        actions={[
          { label: '취소', onClick: handleClose },
          { label: '확인', onClick: handleClose, color: 'primary' }
        ]}
      />
    </>
  );
};

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
        내용 텍스트가 있는 다이얼로그 열기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="내용 텍스트가 있는 다이얼로그"
        contentText="이 텍스트는 DialogContentText로 스타일링되어 가독성이 향상됩니다."
        actions={[
          { label: '닫기', onClick: handleClose }
        ]}
      />
    </>
  );
};

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
    // 폼 제출 시뮬레이션
    console.log('폼 제출됨:', formData);
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
        폼이 있는 다이얼로그 열기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="폼이 있는 다이얼로그"
        content={
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="이름"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="이메일 주소"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
        }
        actions={[
          { label: '취소', onClick: handleClose },
          { 
            label: '제출', 
            onClick: handleSubmit, 
            color: 'primary',
            disabled: !formData.name || !formData.email
          }
        ]}
      />
    </>
  );
};

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
        닫기 버튼이 있는 다이얼로그 열기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="닫기 버튼이 있는 다이얼로그"
        showCloseButton={true}
        content={<Typography>이 다이얼로그는 제목 영역에 닫기 버튼이 있습니다.</Typography>}
        actions={[
          { label: '확인', onClick: handleClose, color: 'primary' }
        ]}
      />
    </>
  );
};

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
        전체 너비 다이얼로그 열기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="전체 너비 다이얼로그"
        content={<Typography>이 다이얼로그는 maxWidth 값에 따라 화면 너비를 모두 사용합니다.</Typography>}
        actions={[
          { label: '닫기', onClick: handleClose }
        ]}
        fullWidth
        maxWidth="md"
      />
    </>
  );
};

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
        전체 화면 다이얼로그 열기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="전체 화면 다이얼로그"
        showCloseButton={true}
        content={
          <Box sx={{ minHeight: '200px' }}>
            <Typography>
              이 다이얼로그는 모든 디바이스 크기에서 전체 화면을 차지합니다.
            </Typography>
          </Box>
        }
        actions={[
          { 
            label: '변경사항 저장', 
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
    setResult('확인됨');
    handleClose();
  };

  const handleCancel = () => {
    setResult('취소됨');
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="warning" onClick={handleOpen}>
        항목 삭제
      </Button>
      {result && (
        <Typography sx={{ mt: 2 }}>
          작업 결과: {result}
        </Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        title="삭제 확인"
        contentText="이 항목을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다."
        actions={[
          { label: '취소', onClick: handleCancel },
          { 
            label: '삭제', 
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
        커스텀 스타일 다이얼로그 열기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title="커스텀 스타일 다이얼로그"
        content={<Typography>커스텀 스타일이 적용된 다이얼로그입니다.</Typography>}
        actions={[
          { label: '닫기', onClick: handleClose, color: 'primary' }
        ]}
        customStyle={{
          '& .MuiPaper-root': {
            backgroundColor: '#f8f9fa',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          },
          '& .MuiDialogTitle-root': {
            backgroundColor: '#4caf50',
            color: 'white',
          },
        }}
      />
    </>
  );
};