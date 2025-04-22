import { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Typography, Box } from '@mui/material';

const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    container: {
      control: 'boolean',
      description: '그리드 컨테이너로 설정',
      defaultValue: false,
    },
    item: {
      control: 'boolean',
      description: '그리드 아이템으로 설정',
      defaultValue: false,
    },
    spacing: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: '그리드 아이템 간 간격',
    },
    xs: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Extra small screen 크기에서의 열 너비',
    },
    sm: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Small screen 크기에서의 열 너비',
    },
    md: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Medium screen 크기에서의 열 너비',
    },
    lg: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Large screen 크기에서의 열 너비',
    },
    xl: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Extra large screen 크기에서의 열 너비',
    },
    backgroundColor: {
      control: 'color',
      description: '배경색',
    },
    padding: {
      control: 'text',
      description: '패딩',
    },
    borderRadius: {
      control: 'text',
      description: '테두리 반경',
    },
    elevation: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: '그림자 강도',
    },
    customStyle: {
      control: 'object',
      description: '사용자 정의 스타일',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// 그리드 아이템 렌더링 헬퍼 함수
const GridItem = ({
  color = '#bbdefb',
  height = 100,
  children,
}: {
  color?: string;
  height?: number;
  children: React.ReactNode;
}) => (
  <Box
    sx={{
      backgroundColor: color,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2,
      borderRadius: 1,
    }}
  >
    <Typography variant="subtitle1">{children}</Typography>
  </Box>
);

export const BasicGrid: Story = {
  render: (args) => (
    <Grid container spacing={2} {...args}>
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>xs=12 sm=6 md=4</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>xs=12 sm=6 md=4</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>xs=12 sm=6 md=4</GridItem>
      </Grid>
    </Grid>
  ),
};

export const ResponsiveGrid: Story = {
  render: (args) => (
    <Grid container spacing={2} {...args}>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <GridItem>xs=12 sm=6 md=3 lg=2</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <GridItem>xs=12 sm=6 md=3 lg=2</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <GridItem>xs=12 sm=6 md=3 lg=2</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <GridItem>xs=12 sm=6 md=3 lg=2</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <GridItem>xs=12 sm=6 md=3 lg=2</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <GridItem>xs=12 sm=6 md=3 lg=2</GridItem>
      </Grid>
    </Grid>
  ),
};

export const CustomSpacing: Story = {
  render: (args) => (
    <Grid container spacing={4} {...args}>
      <Grid item xs={6}>
        <GridItem>xs=6 spacing=4</GridItem>
      </Grid>
      <Grid item xs={6}>
        <GridItem>xs=6 spacing=4</GridItem>
      </Grid>
      <Grid item xs={6}>
        <GridItem>xs=6 spacing=4</GridItem>
      </Grid>
      <Grid item xs={6}>
        <GridItem>xs=6 spacing=4</GridItem>
      </Grid>
    </Grid>
  ),
  args: {
    spacing: 4,
  },
};

export const NestedGrid: Story = {
  render: (args) => (
    <Grid container spacing={2} {...args}>
      <Grid item xs={12} sm={6}>
        <GridItem color="#e3f2fd">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <GridItem color="#bbdefb" height={50}>Nested xs=6</GridItem>
            </Grid>
            <Grid item xs={6}>
              <GridItem color="#bbdefb" height={50}>Nested xs=6</GridItem>
            </Grid>
            <Grid item xs={12}>
              <GridItem color="#bbdefb" height={50}>Nested xs=12</GridItem>
            </Grid>
          </Grid>
        </GridItem>
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem>xs=12 sm=6</GridItem>
      </Grid>
    </Grid>
  ),
};

export const StyledGrid: Story = {
  render: (args) => (
    <Grid 
      container 
      spacing={2} 
      padding={16} 
      backgroundColor="#f5f5f5"
      borderRadius={8}
      elevation={2}
      {...args}
    >
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>Item 1</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>Item 2</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>Item 3</GridItem>
      </Grid>
    </Grid>
  ),
  args: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    elevation: 2,
  },
};

export const CustomStyledGrid: Story = {
  render: (args) => (
    <Grid 
      container 
      spacing={2} 
      customStyle={{
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
      {...args}
    >
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>Item 1</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>Item 2</GridItem>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <GridItem>Item 3</GridItem>
      </Grid>
    </Grid>
  ),
  args: {
    customStyle: {
      background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
  },
};