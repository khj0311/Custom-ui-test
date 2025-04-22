import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Columns, Column } from './Columns';
import { Paper, Typography, Box } from '@mui/material';

const meta: Meta<typeof Columns> = {
  title: 'Components/Layout/Columns',
  component: Columns,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: '컬럼간 간격',
      defaultValue: 2,
    },
    withDivider: {
      control: 'boolean',
      description: '컬럼 사이에 구분선 표시 여부',
      defaultValue: false,
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: '컬럼들의 수직 정렬 방식',
      defaultValue: 'stretch',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: '컬럼들의 수평 정렬 방식',
      defaultValue: 'flex-start',
    },
    containerStyle: {
      control: 'object',
      description: '컨테이너에 적용할 추가 스타일',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Columns>;

const ColumnItem = ({ height = 100, title = 'Column' }) => (
  <Paper 
    elevation={2} 
    sx={{ 
      height, 
      p: 2, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'primary.light',
      color: 'white'
    }}
  >
    <Typography variant="subtitle1">{title}</Typography>
  </Paper>
);

export const TwoColumns: Story = {
  render: (args) => (
    <Columns {...args}>
      <Column xs={12} md={6}>
        <ColumnItem title="Column 1" />
      </Column>
      <Column xs={12} md={6}>
        <ColumnItem title="Column 2" />
      </Column>
    </Columns>
  ),
  args: {
    spacing: 2,
  },
};

export const ThreeColumns: Story = {
  render: (args) => (
    <Columns {...args}>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 1" />
      </Column>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 2" />
      </Column>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 3" />
      </Column>
    </Columns>
  ),
  args: {
    spacing: 2,
  },
};

export const ResponsiveColumns: Story = {
  render: (args) => (
    <Columns {...args}>
      <Column xs={12} sm={6} md={4} lg={3}>
        <ColumnItem title="Column 1" />
      </Column>
      <Column xs={12} sm={6} md={4} lg={3}>
        <ColumnItem title="Column 2" />
      </Column>
      <Column xs={12} sm={6} md={4} lg={3}>
        <ColumnItem title="Column 3" />
      </Column>
      <Column xs={12} sm={6} md={12} lg={3}>
        <ColumnItem title="Column 4" />
      </Column>
    </Columns>
  ),
  args: {
    spacing: 2,
  },
};

export const WithDividers: Story = {
  render: (args) => (
    <Columns {...args}>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 1" height={150} />
      </Column>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 2" height={150} />
      </Column>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 3" height={150} />
      </Column>
    </Columns>
  ),
  args: {
    withDivider: true,
    spacing: 0,
  },
};

export const DifferentHeights: Story = {
  render: (args) => (
    <Columns {...args}>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 1" height={100} />
      </Column>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 2" height={150} />
      </Column>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 3" height={200} />
      </Column>
    </Columns>
  ),
  args: {
    spacing: 2,
  },
};

export const ColumnAlignment: Story = {
  render: (args) => (
    <Box sx={{ bgcolor: 'grey.100', p: 2 }}>
      <Columns {...args}>
        <Column xs={12} md={4}>
          <ColumnItem title="Column 1" height={100} />
        </Column>
        <Column xs={12} md={4}>
          <ColumnItem title="Column 2" height={150} />
        </Column>
        <Column xs={12} md={4}>
          <ColumnItem title="Column 3" height={200} />
        </Column>
      </Columns>
    </Box>
  ),
  args: {
    spacing: 2,
    alignItems: 'center',
    containerStyle: {
      minHeight: 250,
    },
  },
};

export const NestedColumns: Story = {
  render: (args) => (
    <Columns {...args}>
      <Column xs={12} md={6}>
        <ColumnItem title="Column 1" />
      </Column>
      <Column xs={12} md={6}>
        <Columns spacing={1}>
          <Column xs={6}>
            <ColumnItem title="Nested 1" height={80} />
          </Column>
          <Column xs={6}>
            <ColumnItem title="Nested 2" height={80} />
          </Column>
          <Column xs={12}>
            <ColumnItem title="Nested 3" height={80} />
          </Column>
        </Columns>
      </Column>
    </Columns>
  ),
  args: {
    spacing: 2,
  },
};

export const CustomSpacing: Story = {
  render: (args) => (
    <Columns {...args}>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 1" />
      </Column>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 2" />
      </Column>
      <Column xs={12} md={4}>
        <ColumnItem title="Column 3" />
      </Column>
    </Columns>
  ),
  args: {
    spacing: 4,
  },
};