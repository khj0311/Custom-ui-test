import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Alert, { AlertProps } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    componentSubtitle: 'Alerts display important feedback messages to users',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    severity: 'success',
    title: 'Success',
    children: 'This operation was completed successfully!',
  },
};

export const Info: Story = {
  args: {
    severity: 'info',
    title: 'Information',
    children: 'For your information, this is an alert message.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    title: 'Warning',
    children: 'Please be careful with this operation.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    title: 'Error',
    children: 'There was an error processing your request.',
  },
};

export const NoTitle: Story = {
  args: {
    severity: 'info',
    children: 'This is an alert without a title.',
  },
};

export const WithClose: Story = {
  args: {
    severity: 'success',
    title: 'Dismissible Alert',
    children: 'Click the X to dismiss this alert.',
    onClose: () => console.log('Alert dismissed'),
  },
};

export const Outlined: Story = {
  args: {
    severity: 'info',
    title: 'Outlined Style',
    children: 'This is an alert with outlined styling.',
    variant: 'outlined',
  },
};

export const Standard: Story = {
  args: {
    severity: 'info',
    title: 'Standard Style',
    children: 'This is an alert with standard styling.',
    variant: 'standard',
  },
};