import React from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  DialogProps as MuiDialogProps
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

export interface DialogAction {
  /**
   * 버튼 레이블
   */
  label: string;
  
  /**
   * 클릭 핸들러
   */
  onClick: () => void;
  
  /**
   * 버튼 색상
   * @default 'inherit'
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  
  /**
   * 버튼 변형
   * @default 'text'
   */
  variant?: 'text' | 'outlined' | 'contained';
  
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 추가 속성
   */
  [key: string]: any;
}

export interface DialogProps extends MuiDialogProps {
  /**
   * 다이얼로그 열림 상태
   */
  open: boolean;
  
  /**
   * 다이얼로그가 닫힐 때 호출되는 콜백 함수
   */
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick') => void;
  
  /**
   * 다이얼로그 제목
   */
  title?: React.ReactNode;
  
  /**
   * 제목에 닫기 버튼 표시 여부
   * @default false
   */
  showCloseButton?: boolean;
  
  /**
   * 다이얼로그 내용
   */
  content?: React.ReactNode;
  
  /**
   * 다이얼로그 내용 텍스트
   */
  contentText?: React.ReactNode;
  
  /**
   * 표시할 액션 버튼 배열
   */
  actions?: DialogAction[];
  
  /**
   * 다이얼로그 최대 너비
   * @default 'sm'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  
  /**
   * true일 경우, 다이얼로그는 최대 너비로 확장됩니다.
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * true일 경우, 다이얼로그는 전체 화면으로 표시됩니다.
   * @default false
   */
  fullScreen?: boolean;
  
  /**
   * 다이얼로그에 적용할 추가 스타일
   */
  customStyle?: React.CSSProperties;
}

// 스타일드 컴포넌트를 사용하여 MUI Dialog 확장
const StyledDialog = styled(MuiDialog)<DialogProps>`
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 커스텀 다이얼로그 컴포넌트
 * Material UI Dialog를 확장하여 추가 기능 제공
 */
export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  showCloseButton = false,
  content,
  contentText,
  actions,
  children,
  maxWidth = 'sm',
  fullWidth = false,
  fullScreen = false,
  customStyle,
  ...rest
}) => {
  const handleClose = (reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick') => {
    if (onClose) {
      onClose({}, reason);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={(event, reason) => handleClose(reason)}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      customStyle={customStyle}
      {...rest}
    >
      {title && (
        <DialogTitle 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          {title}
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={() => handleClose('closeButtonClick')}
              sx={{ ml: 2 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      {(content || contentText || children) && (
        <DialogContent>
          {contentText && <DialogContentText>{contentText}</DialogContentText>}
          {content}
          {children}
        </DialogContent>
      )}

      {actions && actions.length > 0 && (
        <DialogActions>
          {actions.map((action, index) => {
            const { label, onClick, color = 'inherit', variant = 'text', disabled = false, ...actionProps } = action;
            return (
              <Button
                key={index}
                onClick={onClick}
                color={color}
                variant={variant}
                disabled={disabled}
                {...actionProps}
              >
                {label}
              </Button>
            );
          })}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default Dialog;