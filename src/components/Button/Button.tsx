import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import styled from 'styled-components';

export interface ButtonProps extends MuiButtonProps {
  /**
   * 버튼의 크기를 지정합니다.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  
  /**
   * 버튼의 너비를 100%로 설정합니다.
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * 버튼에 둥근 모서리를 적용합니다.
   * @default false
   */
  rounded?: boolean;
  
  /**
   * 버튼을 비활성화합니다.
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 버튼에 적용할 추가 스타일을 지정합니다.
   */
  customStyle?: React.CSSProperties;
}

// 스타일드 컴포넌트를 사용하여 MUI Button을 확장
const StyledButton = styled(MuiButton)<ButtonProps>`
  ${({ size }) => size === 'xlarge' && `
    padding: 12px 24px;
    font-size: 1.2rem;
  `}
  
  ${({ rounded }) => rounded && `
    border-radius: 24px;
  `}
  
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 커스텀 버튼 컴포넌트
 * Material UI 버튼을 확장하여 추가 기능 제공
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  rounded = false,
  disabled = false,
  customStyle,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      rounded={rounded}
      disabled={disabled}
      customStyle={customStyle}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;