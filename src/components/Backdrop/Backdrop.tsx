import React from 'react';
import { Backdrop as MuiBackdrop, CircularProgress, BackdropProps as MuiBackdropProps } from '@mui/material';
import styled from 'styled-components';

export interface BackdropProps extends MuiBackdropProps {
  /**
   * 백드롭이 열려있는지 여부
   */
  open: boolean;
  
  /**
   * 백드롭 클릭 시 호출되는 콜백 함수
   */
  onClick?: () => void;
  
  /**
   * 백드롭 내부 콘텐츠
   */
  children?: React.ReactNode;
  
  /**
   * 로딩 인디케이터 표시 여부
   * @default false
   */
  loading?: boolean;
  
  /**
   * 로딩 인디케이터 색상
   * @default 'primary'
   */
  loadingColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  
  /**
   * 로딩 인디케이터 사이즈
   * @default 40
   */
  loadingSize?: number;
  
  /**
   * 백드롭 투명도 (0-1 사이 값)
   * @default 0.7
   */
  opacity?: number;
  
  /**
   * 백드롭에 적용할 추가 스타일
   */
  customStyle?: React.CSSProperties;
}

// 스타일드 컴포넌트를 사용하여 MUI Backdrop 확장
const StyledBackdrop = styled(MuiBackdrop)<BackdropProps>`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  color: #fff;
  background-color: ${({ opacity = 0.7 }) => `rgba(0, 0, 0, ${opacity})`};
  
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 커스텀 백드롭 컴포넌트
 * Material UI Backdrop을 확장하여 추가 기능 제공
 */
export const Backdrop: React.FC<BackdropProps> = ({
  open,
  onClick,
  children,
  loading = false,
  loadingColor = 'primary',
  loadingSize = 40,
  opacity = 0.7,
  customStyle,
  ...rest
}) => {
  return (
    <StyledBackdrop
      open={open}
      onClick={onClick}
      opacity={opacity}
      customStyle={customStyle}
      {...rest}
    >
      {loading ? (
        <CircularProgress color={loadingColor} size={loadingSize} />
      ) : children}
    </StyledBackdrop>
  );
};

export default Backdrop;