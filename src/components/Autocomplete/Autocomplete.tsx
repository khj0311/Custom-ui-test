import React from 'react';
import { 
  Autocomplete as MuiAutocomplete, 
  TextField, 
  AutocompleteProps as MuiAutocompleteProps,
  TextFieldProps,
  Chip,
  Box
} from '@mui/material';
import styled from 'styled-components';

export interface AutocompleteOption {
  /**
   * 옵션의 고유 식별자
   */
  id: string | number;
  
  /**
   * 화면에 표시될 옵션의 레이블
   */
  label: string;
  
  /**
   * 옵션에 대한 추가 정보 (선택 사항)
   */
  [key: string]: any;
}

export interface AutocompleteProps<
  T = AutocompleteOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
  MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  'renderInput'
> {
  /**
   * 자동완성 입력 필드의 레이블
   */
  label?: string;
  
  /**
   * 자동완성 입력 필드의 플레이스홀더
   */
  placeholder?: string;
  
  /**
   * 자동완성 입력 필드의 헬퍼 텍스트
   */
  helperText?: string;
  
  /**
   * 에러 메시지 또는 에러 상태 여부
   */
  error?: boolean | string;
  
  /**
   * 텍스트 필드에 전달할 추가 속성
   */
  textFieldProps?: Partial<TextFieldProps>;
  
  /**
   * 옵션 렌더링을 위한 커스텀 함수
   */
  customRenderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;
  
  /**
   * 선택된 태그 렌더링을 위한 커스텀 함수 (Multiple 모드에서만 사용)
   */
  customRenderTags?: (value: T[], getTagProps: (index: number) => {}) => React.ReactNode;
  
  /**
   * 옵션의 그룹화 여부
   * @default false
   */
  groupBy?: (option: T) => string;
  
  /**
   * 자동완성에 적용할 추가 스타일
   */
  customStyle?: React.CSSProperties;
}

// 스타일드 컴포넌트를 사용하여 MUI Autocomplete 확장
const StyledAutocomplete = styled(MuiAutocomplete)<any>`
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

/**
 * 커스텀 자동완성 컴포넌트
 * Material UI Autocomplete를 확장하여 추가 기능 제공
 */
export const Autocomplete = <
  T extends AutocompleteOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  label = '선택',
  placeholder = '',
  helperText = '',
  error = false,
  textFieldProps = {},
  customRenderOption,
  customRenderTags,
  options,
  groupBy,
  multiple,
  customStyle,
  ...rest
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {

  // 기본 옵션 렌더링 함수
  const defaultRenderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: T) => (
    <li {...props}>
      {option.label}
    </li>
  );

  // 기본 태그 렌더링 함수
  const defaultRenderTags = (value: T[], getTagProps: (index: number) => {}) => (
    value.map((option: T, index: number) => (
      <Chip
        label={option.label}
        {...getTagProps(index)}
        key={option.id}
      />
    ))
  );

  return (
    <StyledAutocomplete
      options={options}
      multiple={multiple}
      groupBy={groupBy}
      getOptionLabel={(option: T) => option.label || ''}
      isOptionEqualToValue={(option: T, value: T) => option.id === value.id}
      renderOption={customRenderOption || defaultRenderOption}
      renderTags={multiple && customRenderTags ? customRenderTags : multiple ? defaultRenderTags : undefined}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={!!error}
          {...textFieldProps}
        />
      )}
      customStyle={customStyle}
      {...rest}
    />
  );
};

export default Autocomplete;