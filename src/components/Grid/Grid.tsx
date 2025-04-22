import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps, styled } from '@mui/material';

export interface GridProps extends MuiGridProps {
  /**
   * 그리드 배경색
   */
  backgroundColor?: string;
  
  /**
   * 그리드 패딩
   */
  padding?: string | number;
  
  /**
   * 그리드 테두리 반경
   */
  borderRadius?: string | number;
  
  /**
   * 그리드 그림자 효과
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  
  /**
   * 그리드에 적용할 추가 스타일
   */
  customStyle?: React.CSSProperties;
}

const StyledGrid = styled(MuiGrid)<GridProps>`
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
  ${({ padding }) => padding && `padding: ${typeof padding === 'number' ? `${padding}px` : padding};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius};`}
  ${({ elevation }) => {
    if (elevation === undefined) return '';
    const elevationValues = {
      0: 'none',
      1: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)',
      2: '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
      3: '0 3px 3px -2px rgba(0,0,0,0.2), 0 3px 4px 0 rgba(0,0,0,0.14), 0 1px 8px 0 rgba(0,0,0,0.12)',
      4: '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)',
      5: '0 3px 5px -1px rgba(0,0,0,0.2), 0 5px 8px 0 rgba(0,0,0,0.14), 0 1px 14px 0 rgba(0,0,0,0.12)',
    };
    return `box-shadow: ${elevationValues[elevation]};`;
  }}
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 그리드 컴포넌트
 * Material UI Grid를 확장하여 추가 기능 제공
 */
export const Grid: React.FC<GridProps> = ({
  children,
  container = false,
  item = false,
  backgroundColor,
  padding,
  borderRadius,
  elevation,
  customStyle,
  ...props
}) => {
  return (
    <StyledGrid
      container={container}
      item={item}
      backgroundColor={backgroundColor}
      padding={padding}
      borderRadius={borderRadius}
      elevation={elevation}
      customStyle={customStyle}
      {...props}
    >
      {children}
    </StyledGrid>
  );
};

export default Grid;