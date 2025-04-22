import React from 'react';
import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@mui/material';
import styled from 'styled-components';

export interface SliderProps extends MuiSliderProps {
  /**
   * 슬라이더의 최소값
   * @default 0
   */
  min?: number;
  
  /**
   * 슬라이더의 최대값
   * @default 100
   */
  max?: number;
  
  /**
   * 슬라이더의 스텝 값
   * @default 1
   */
  step?: number;
  
  /**
   * 슬라이더의 기본값 (비제어 컴포넌트)
   */
  defaultValue?: number | number[];
  
  /**
   * 슬라이더의 현재값 (제어 컴포넌트)
   */
  value?: number | number[];
  
  /**
   * 값이 변경될 때 호출되는 콜백 함수
   */
  onChange?: (event: Event, value: number | number[]) => void;
  
  /**
   * 슬라이더에 표시할 마크 여부
   * @default false
   */
  marks?: boolean | { value: number; label?: React.ReactNode }[];
  
  /**
   * 현재 값 레이블 표시 방법
   * @default 'auto'
   */
  valueLabelDisplay?: 'auto' | 'on' | 'off';
  
  /**
   * 슬라이더의 방향
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * 트랙 표시 방법
   * @default 'normal'
   */
  track?: 'normal' | false | 'inverted';
  
  /**
   * 슬라이더에 적용할 추가 스타일
   */
  customStyle?: React.CSSProperties;
}

// 스타일드 컴포넌트를 사용하여 MUI Slider 확장
const StyledSlider = styled(MuiSlider)<SliderProps>`
  ${({ orientation }) => orientation === 'vertical' && `
    height: 200px;
  `}
  
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 커스텀 슬라이더 컴포넌트
 * Material UI Slider를 확장하여 추가 기능 제공
 */
export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value,
  onChange,
  marks = false,
  valueLabelDisplay = 'auto',
  color = 'primary',
  size = 'medium',
  orientation = 'horizontal',
  track = 'normal',
  disabled = false,
  customStyle,
  ...props
}) => {
  return (
    <StyledSlider
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      marks={marks}
      valueLabelDisplay={valueLabelDisplay}
      color={color}
      size={size}
      orientation={orientation}
      track={track}
      disabled={disabled}
      customStyle={customStyle}
      {...props}
    />
  );
};

export default Slider;