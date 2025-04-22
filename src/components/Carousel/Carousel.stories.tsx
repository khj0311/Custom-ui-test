import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { Box, Typography, Paper } from '@mui/material';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Media/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    autoSlide: {
      control: { type: 'number', min: 0, step: 500 },
      description: '자동 슬라이드 간격 (ms)',
      defaultValue: 0,
    },
    showArrows: {
      control: 'boolean',
      description: '화살표 버튼 표시 여부',
      defaultValue: true,
    },
    showIndicators: {
      control: 'boolean',
      description: '인디케이터 표시 여부',
      defaultValue: true,
    },
    height: {
      control: 'text',
      description: '캐러셀 높이',
      defaultValue: '300px',
    },
    transitionDuration: {
      control: { type: 'number', min: 100, max: 1000, step: 100 },
      description: '전환 애니메이션 시간 (ms)',
      defaultValue: 300,
    },
    customStyle: {
      control: 'object',
      description: '사용자 정의 스타일',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const generateSlide = (color: string, text: string) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      color: '#fff',
    }}
  >
    <Typography variant="h4">{text}</Typography>
  </Box>
);

const colorSlides = [
  generateSlide('#3f51b5', 'Slide 1'),
  generateSlide('#f50057', 'Slide 2'),
  generateSlide('#4caf50', 'Slide 3'),
  generateSlide('#ff9800', 'Slide 4'),
];

const contentSlides = [
  <Paper
    key="slide1"
    elevation={4}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
      backgroundColor: '#f5f5f5',
    }}
  >
    <Typography variant="h4" color="primary" gutterBottom>
      Welcome to Our Product
    </Typography>
    <Typography variant="body1" align="center">
      This amazing product will transform your life with its incredible features.
    </Typography>
  </Paper>,
  <Paper
    key="slide2"
    elevation={4}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
      backgroundColor: '#e3f2fd',
    }}
  >
    <Typography variant="h4" color="secondary" gutterBottom>
      Cutting-Edge Technology
    </Typography>
    <Typography variant="body1" align="center">
      Using the latest innovations to provide you with the best experience possible.
    </Typography>
  </Paper>,
  <Paper
    key="slide3"
    elevation={4}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
      backgroundColor: '#e8f5e9',
    }}
  >
    <Typography variant="h4" style={{ color: '#4caf50' }} gutterBottom>
      Eco-Friendly Design
    </Typography>
    <Typography variant="body1" align="center">
      Made with sustainable materials and processes to protect our planet.
    </Typography>
  </Paper>,
];

export const Basic: Story = {
  args: {
    items: colorSlides,
    height: '300px',
  },
};

export const WithAutoSlide: Story = {
  args: {
    items: colorSlides,
    autoSlide: 3000,
    height: '300px',
  },
};

export const NoControls: Story = {
  args: {
    items: colorSlides,
    showArrows: false,
    showIndicators: false,
    height: '300px',
  },
};

export const CustomHeight: Story = {
  args: {
    items: colorSlides,
    height: '500px',
  },
};

export const ContentSlides: Story = {
  args: {
    items: contentSlides,
    height: '400px',
  },
};

export const CustomTransition: Story = {
  args: {
    items: colorSlides,
    transitionDuration: 800,
    height: '300px',
  },
};

export const CustomStyle: Story = {
  args: {
    items: colorSlides,
    height: '300px',
    customStyle: {
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
  },
};