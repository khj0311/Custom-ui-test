import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Icons, IconsProps } from './Icons';
import { Box } from '@mui/material';

const meta: Meta<typeof Icons> = {
  title: 'Documentation/Icons',
  component: Icons,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Material UI Icons browser and search component. Click on an icon to copy its name.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    searchPlaceholder: {
      control: 'text',
      description: '아이콘 검색 필드에 표시될 플레이스홀더 텍스트',
      defaultValue: 'Search icons...',
    },
    onIconClick: {
      action: 'iconClicked',
      description: '아이콘을 클릭했을 때 실행될 콜백 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icons>;

export const IconsBrowser: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Icons {...args} />
    </Box>
  ),
  args: {
    searchPlaceholder: 'Search Material UI icons...',
  },
};

export const IconsByCategories: Story = {
  render: (args) => {
    // 이 스토리는 카테고리별로 아이콘을 분류해서 보여주는 예시입니다
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 4 }}>
          <h2>How to use icons</h2>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '4px', overflow: 'auto' }}>
            {`// 1. Import the icon
import { AccessAlarm } from '@mui/icons-material';

// 2. Use it in your component
<AccessAlarm />

// With custom color and size
<AccessAlarm color="primary" fontSize="large" />`}
          </pre>
        </Box>
        
        <Icons {...args} />
      </Box>
    );
  },
  args: {
    searchPlaceholder: 'Filter icons by name...',
  },
};