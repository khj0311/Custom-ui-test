import { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';
import { Box } from '@mui/material';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Components/Media/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '비디오 URL',
    },
    type: {
      control: 'select',
      options: ['video/mp4', 'video/webm', 'video/ogg'],
      description: '비디오 타입',
      defaultValue: 'video/mp4',
    },
    autoPlay: {
      control: 'boolean',
      description: '자동 재생 여부',
      defaultValue: false,
    },
    muted: {
      control: 'boolean',
      description: '음소거 여부',
      defaultValue: true,
    },
    loop: {
      control: 'boolean',
      description: '반복 재생 여부',
      defaultValue: false,
    },
    poster: {
      control: 'text',
      description: '포스터 이미지 URL',
    },
    controls: {
      control: 'boolean',
      description: '컨트롤 바 표시 여부',
      defaultValue: true,
    },
    width: {
      control: 'text',
      description: '비디오 플레이어 너비',
      defaultValue: '100%',
    },
    height: {
      control: 'text',
      description: '비디오 플레이어 높이',
      defaultValue: 'auto',
    },
    customStyle: {
      control: 'object',
      description: '사용자 정의 스타일',
    },
    onPlay: { action: 'played' },
    onPause: { action: 'paused' },
    onEnded: { action: 'ended' },
  },
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

// Sample mp4 videos from public sources (Creative Commons license)
const sampleVideos = {
  bigBuckBunny: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  elephantsDream: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  sintel: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
};

export const Default: Story = {
  args: {
    src: sampleVideos.bigBuckBunny,
    width: '100%',
    height: '400px',
  },
};

export const WithControls: Story = {
  args: {
    src: sampleVideos.elephantsDream,
    controls: true,
    width: '100%',
    height: '400px',
  },
};

export const WithoutControls: Story = {
  args: {
    src: sampleVideos.bigBuckBunny,
    controls: false,
    width: '100%',
    height: '400px',
  },
};

export const WithPoster: Story = {
  args: {
    src: sampleVideos.sintel,
    poster: 'https://i.ytimg.com/vi_webp/O2_YF2r1Zkg/maxresdefault.webp',
    width: '100%',
    height: '400px',
  },
};

export const AutoPlayMuted: Story = {
  args: {
    src: sampleVideos.elephantsDream,
    autoPlay: true,
    muted: true,
    width: '100%',
    height: '400px',
  },
};

export const LoopVideo: Story = {
  args: {
    src: sampleVideos.bigBuckBunny,
    loop: true,
    width: '100%',
    height: '400px',
  },
};

export const FixedDimensions: Story = {
  args: {
    src: sampleVideos.sintel,
    width: 640,
    height: 360,
  },
};

export const CustomStyled: Story = {
  args: {
    src: sampleVideos.bigBuckBunny,
    width: '100%',
    height: '400px',
    customStyle: {
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    },
  },
};

export const ResponsiveContainer: Story = {
  render: (args) => (
    <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <VideoPlayer {...args} />
    </Box>
  ),
  args: {
    src: sampleVideos.elephantsDream,
    width: '100%',
    height: 'auto',
    customStyle: {
      aspectRatio: '16/9',
    },
  },
};