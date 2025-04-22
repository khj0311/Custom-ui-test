import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import styled from 'styled-components';

// 사이즈 타입 확장을 위한 선언
declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true;
  }
}

export interface CustomTextFieldProps {
  /**
   * 입력 필드 크기를 지정합니다.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 입력 필드 너비를 100%로 설정합니다.
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * 입력 필드에 둥근 모서리를 적용합니다.
   * @default false
   */
  rounded?: boolean;
  
  /**
   * 입력 필드에 적용할 추가 스타일을 지정합니다.
   */
  customStyle?: React.CSSProperties;
  
  /**
   * 입력 필드의 variant를 지정합니다.
   * @default 'outlined'
   */
  variant?: 'standard' | 'filled' | 'outlined';
  
  /**
   * 입력 필드의 색상을 지정합니다.
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  
  /**
   * 라벨 텍스트
   */
  label?: React.ReactNode;
  
  /**
   * 도움말 텍스트
   */
  helperText?: React.ReactNode;
  
  /**
   * 에러 상태
   */
  error?: boolean;
  
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
}

export type TextFieldProps = CustomTextFieldProps & Omit<MuiTextFieldProps, 'variant' | 'color'>;

// 스타일드 컴포넌트를 사용하여 MUI TextField를 확장
const StyledTextField = styled(MuiTextField)<TextFieldProps>`
  ${({ size }) => size === 'large' && `
    & .MuiInputBase-root {
      font-size: 1.2rem;
    }
    & .MuiInputLabel-root {
      font-size: 1.2rem;
    }
    & .MuiInputBase-input {
      padding: 16px 14px;
    }
  `}
  
  ${({ rounded }) => rounded && `
    & .MuiOutlinedInput-root {
      border-radius: 24px;
    }
  `}
  
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 커스텀 텍스트 필드 컴포넌트
 * Material UI TextField를 확장하여 추가 기능 제공
 */
export const TextField: React.FC<TextFieldProps> = ({
  variant = 'outlined',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  rounded = false,
  customStyle,
  ...props
}) => {
  return (
    <StyledTextField
      variant={variant as any}
      color={color as any}
      size={size !== 'large' ? size : 'medium'} // MUI는 'large' 사이즈가 없어서 커스텀 스타일로 처리
      fullWidth={fullWidth}
      rounded={rounded}
      customStyle={customStyle}
      {...props}
    />
  );
};

export default TextField;