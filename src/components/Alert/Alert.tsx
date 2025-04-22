import React from 'react';
import { Alert as MuiAlert, AlertTitle, AlertProps as MuiAlertProps } from '@mui/material';
import styled from 'styled-components';

export interface AlertProps extends MuiAlertProps {
  /**
   * 알림 메시지의 제목
   */
  title?: string;
  
  /**
   * 알림 메시지의 내용
   */
  children: React.ReactNode;
  
  /**
   * 알림 메시지의 중요도 레벨
   * @default 'info'
   */
  severity?: 'success' | 'info' | 'warning' | 'error';
  
  /**
   * 알림 메시지의 스타일 변형
   * @default 'filled'
   */
  variant?: 'standard' | 'filled' | 'outlined';
  
  /**
   * 알림을 닫기 위한 콜백 함수
   */
  onClose?: () => void;
  
  /**
   * 알림에 적용할 추가 스타일
   */
  customStyle?: React.CSSProperties;
}

// 스타일드 컴포넌트를 사용하여 MUI Alert 확장
const StyledAlert = styled(MuiAlert)<AlertProps>`
  margin-bottom: 16px;
  
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 커스텀 알림 컴포넌트
 * Material UI Alert를 확장하여 추가 기능 제공
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  title,
  severity = 'info',
  variant = 'filled',
  onClose,
  customStyle,
  ...props
}) => {
  return (
    <StyledAlert
      severity={severity}
      variant={variant}
      onClose={onClose}
      customStyle={customStyle}
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </StyledAlert>
  );
};

export default Alert;
