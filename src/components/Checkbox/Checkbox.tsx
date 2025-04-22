import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, CheckboxProps as MuiCheckboxProps } from '@mui/material';
import styled from 'styled-components';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'size'> {
  /**
   * 체크박스와 함께 표시할 레이블
   */
  label?: React.ReactNode;
  
  /**
   * 체크박스가 선택되었는지 여부(제어 컴포넌트)
   */
  checked?: boolean;
  
  /**
   * 체크박스의 초기 선택 상태(비제어 컴포넌트)
   */
  defaultChecked?: boolean;
  
  /**
   * 체크박스 상태가 변경될 때 호출되는 콜백 함수
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  
  /**
   * 체크박스의 크기를 지정합니다.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  
  /**
   * 체크박스의 색상을 지정합니다.
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  
  /**
   * 체크박스를 비활성화합니다.
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 체크박스가 중간 상태로 표시됩니다.
   * @default false
   */
  indeterminate?: boolean;
  
  /**
   * 체크박스가 필수인 경우 설정합니다.
   * @default false
   */
  required?: boolean;
  
  /**
   * 체크박스에 적용할 추가 스타일을 지정합니다.
   */
  customStyle?: React.CSSProperties;
}

// 스타일드 컴포넌트를 사용하여 MUI Checkbox 확장
const StyledCheckbox = styled(MuiCheckbox)<MuiCheckboxProps>`
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 커스텀 체크박스 컴포넌트
 * Material UI Checkbox를 확장하여 추가 기능 제공
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  color = 'primary',
  size = 'medium',
  indeterminate = false,
  required = false,
  customStyle,
  ...props
}) => {
  // 레이블이 없는 경우, 체크박스만 반환
  if (!label) {
    return (
      <StyledCheckbox
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        color={color}
        size={size}
        indeterminate={indeterminate}
        required={required}
        customStyle={customStyle}
        {...props}
      />
    );
  }

  // 레이블이 있는 경우, FormControlLabel로 감싸서 반환
  return (
    <FormControlLabel
      control={
        <StyledCheckbox
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          color={color}
          size={size}
          indeterminate={indeterminate}
          required={required}
          customStyle={customStyle}
          {...props}
        />
      }
      label={label}
      disabled={disabled}
    />
  );
};

export default Checkbox;