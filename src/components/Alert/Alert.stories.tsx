import { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: '알림 메시지의 중요도 레벨',
      defaultValue: 'info',
    },
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'outlined'],
      description: '알림 메시지의 스타일 변형',
      defaultValue: 'filled',
    },
    title: {
      control: 'text',
      description: '알림 메시지의 제목',
    },
    children: {
      control: 'text',
      description: '알림 메시지의 내용',
    },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    severity: 'success',
    title: '성공',
    children: '작업이 성공적으로 완료되었습니다.',
  },
};

export const Info: Story = {
  args: {
    severity: 'info',
    title: '정보',
    children: '참고하세요: 이것은 정보 알림입니다.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    title: '경고',
    children: '이 작업을 수행할 때 주의하세요.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    title: '오류',
    children: '요청을 처리하는 중 오류가 발생했습니다.',
  },
};

export const NoTitle: Story = {
  args: {
    severity: 'info',
    children: '제목 없는 알림 메시지입니다.',
  },
};

export const WithCloseButton: Story = {
  args: {
    severity: 'success',
    title: '닫기 가능한 알림',
    children: 'X를 클릭하여 이 알림을 닫을 수 있습니다.',
    onClose: () => console.log('Alert closed'),
  },
};

export const Outlined: Story = {
  args: {
    severity: 'info',
    title: '외곽선 스타일',
    children: '외곽선 스타일이 적용된 알림입니다.',
    variant: 'outlined',
  },
};

export const Standard: Story = {
  args: {
    severity: 'info',
    title: '기본 스타일',
    children: '기본 스타일이 적용된 알림입니다.',
    variant: 'standard',
  },
};

export const CustomStyled: Story = {
  args: {
    severity: 'info',
    title: '커스텀 스타일',
    children: '커스텀 스타일이 적용된 알림입니다.',
    customStyle: {
      backgroundColor: '#e8f5e9',
      border: '1px solid #81c784',
      '& .MuiAlert-icon': {
        color: '#388e3c',
      },
    },
  },
};