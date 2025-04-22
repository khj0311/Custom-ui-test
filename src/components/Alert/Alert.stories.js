import React from 'react';
import Alert from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    componentSubtitle: 'Alerts display important feedback messages to users',
  },
};

const Template = (args) => <Alert {...args} />;

export const Success = Template.bind({});
Success.args = {
  severity: 'success',
  title: 'Success',
  children: 'This operation was completed successfully!',
};

export const Info = Template.bind({});
Info.args = {
  severity: 'info',
  title: 'Information',
  children: 'For your information, this is an alert message.',
};

export const Warning = Template.bind({});
Warning.args = {
  severity: 'warning',
  title: 'Warning',
  children: 'Please be careful with this operation.',
};

export const Error = Template.bind({});
Error.args = {
  severity: 'error',
  title: 'Error',
  children: 'There was an error processing your request.',
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  severity: 'info',
  children: 'This is an alert without a title.',
};

export const WithClose = Template.bind({});
WithClose.args = {
  severity: 'success',
  title: 'Dismissible Alert',
  children: 'Click the X to dismiss this alert.',
  onClose: () => console.log('Alert dismissed'),
};

export const Outlined = Template.bind({});
Outlined.args = {
  severity: 'info',
  title: 'Outlined Style',
  children: 'This is an alert with outlined styling.',
  variant: 'outlined',
};

export const Standard = Template.bind({});
Standard.args = {
  severity: 'info',
  title: 'Standard Style',
  children: 'This is an alert with standard styling.',
  variant: 'standard',
};
