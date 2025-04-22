import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/Basic Elements/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Default TextField',
    placeholder: 'Enter text here',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined TextField',
    placeholder: 'Enter text here',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled TextField',
    placeholder: 'Enter text here',
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
    label: 'Standard TextField',
    placeholder: 'Enter text here',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small TextField',
    placeholder: 'Enter text here',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Medium TextField',
    placeholder: 'Enter text here',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large TextField',
    placeholder: 'Enter text here',
  },
};

export const Rounded: Story = {
  args: {
    rounded: true,
    label: 'Rounded TextField',
    placeholder: 'Enter text here',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width TextField',
    placeholder: 'Enter text here',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'With Helper Text',
    placeholder: 'Enter text here',
    helperText: 'This is a helper text',
  },
};

export const Error: Story = {
  args: {
    label: 'Error TextField',
    placeholder: 'Enter text here',
    error: true,
    helperText: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled TextField',
    placeholder: 'Enter text here',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
  },
};

export const CustomStyled: Story = {
  args: {
    label: 'Custom Styled TextField',
    placeholder: 'Enter text here',
    customStyle: {
      '& .MuiOutlinedInput-root': {
        background: 'rgba(245, 245, 245, 0.9)',
        '&:hover fieldset': {
          borderColor: '#FF8E53',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#FE6B8B',
          borderWidth: 2,
        },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#FE6B8B',
      },
    } as any,
  },
};