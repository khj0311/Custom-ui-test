import React from 'react';
import { Grid, GridProps } from '@mui/material';
import styled from 'styled-components';

export interface ColumnsProps {
  /**
   * 칼럼 간의 간격을 지정합니다.
   * @default 2
   */
  spacing?: number;
  
  /**
   * 칼럼들을 감싸는 컨테이너에 적용할 추가 스타일을 지정합니다.
   */
  containerStyle?: React.CSSProperties;
  
  /**
   * 컬럼들 사이에 구분선을 표시할지 여부를 지정합니다.
   * @default false
   */
  withDivider?: boolean;
  
  /**
   * 칼럼들의 정렬 방식을 지정합니다.
   * @default 'stretch'
   */
  alignItems?: GridProps['alignItems'];
  
  /**
   * 각 칼럼의 콘텐츠를 수직 정렬하는 방식을 지정합니다.
   * @default 'flex-start'
   */
  justifyContent?: GridProps['justifyContent'];
  
  /**
   * 칼럼의 자식 요소들입니다.
   */
  children: React.ReactNode;
}

interface ColumnProps extends GridProps {
  /**
   * 각 컬럼에 적용할 추가 스타일을 지정합니다.
   */
  columnStyle?: React.CSSProperties;
  
  /**
   * 컬럼의 자식 요소들입니다.
   */
  children: React.ReactNode;
}

interface StyledContainerProps {
  withDivider?: boolean;
}

interface StyledColumnProps {
  columnStyle?: React.CSSProperties;
}

const StyledContainer = styled(Grid)<StyledContainerProps>`
  ${({ withDivider }) => withDivider && `
    & > div:not(:last-child) {
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 10%;
        height: 80%;
        width: 1px;
        background-color: rgba(0, 0, 0, 0.12);
      }
    }
  `}
`;

const StyledColumn = styled(Grid)<StyledColumnProps>`
  ${({ columnStyle }) => columnStyle && { ...columnStyle }}
`;

/**
 * 컬럼 컴포넌트 - 하나의 열을 나타냅니다.
 */
export const Column: React.FC<ColumnProps> = ({
  xs = 12,
  sm,
  md,
  lg,
  xl,
  columnStyle,
  children,
  ...props
}) => {
  return (
    <StyledColumn
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      columnStyle={columnStyle}
      {...props}
    >
      {children}
    </StyledColumn>
  );
};

/**
 * 컬럼들을 관리하는 컨테이너 컴포넌트
 */
export const Columns: React.FC<ColumnsProps> = ({
  spacing = 2,
  containerStyle,
  withDivider = false,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  children,
}) => {
  return (
    <StyledContainer
      container
      spacing={withDivider ? 0 : spacing}
      style={containerStyle}
      alignItems={alignItems}
      justifyContent={justifyContent}
      withDivider={withDivider}
    >
      {children}
    </StyledContainer>
  );
};

export default { Columns, Column };