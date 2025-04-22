import React from 'react';
import { 
  Autocomplete as MuiAutocomplete, 
  TextField, 
  Chip,
  AutocompleteProps as MuiAutocompleteProps,
  TextFieldProps,
  createFilterOptions,
  FilterOptionsState
} from '@mui/material';
import styled from 'styled-components';

// 옵션 타입 정의
export interface OptionType {
  label: string;
  value: string | number;
  [key: string]: any;
}

// 필터 옵션 타입 정의
export interface FilterOptionType {
  inputValue?: string;
  getOptionLabel?: (option: any) => string;
}

export interface AutocompleteProps extends Omit<MuiAutocompleteProps<any, any, any, any>, 'renderInput'> {
  /**
   * 자동완성 입력 필드의 레이블
   */
  label?: string;
  
  /**
   * 자동완성 옵션 배열
   */
  options: OptionType[];
  
  /**
   * 선택된 값 (제어 컴포넌트)
   */
  value?: any;
  
  /**
   * 초기 선택 값 (비제어 컴포넌트)
   */
  defaultValue?: any;
  
  /**
   * 값이 변경될 때 호출되는 콜백 함수
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  
  /**
   * 입력 필드 속성을 지정합니다.
   */
  inputProps?: TextFieldProps;
  
  /**
   * 다중 선택 모드 활성화 여부
   * @default false
   */
  multiple?: boolean;
  
  /**
   * 필수 필드 여부
   * @default false
   */
  required?: boolean;
  
  /**
   * 비활성화 상태 여부
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 읽기 전용 상태 여부
   * @default false
   */
  readOnly?: boolean;
  
  /**
   * 옵션 필터링 방법 설정
   * @default 'startsWith'
   */
  filterMode?: 'startsWith' | 'contains' | 'exact' | 'custom';
  
  /**
   * 커스텀 필터 함수 (filterMode가 'custom'일 때만 사용)
   */
  customFilterOptions?: (options: OptionType[], state: FilterOptionsState<OptionType>) => OptionType[];
  
  /**
   * 새 항목 생성 허용 여부
   * @default false
   */
  allowNewValues?: boolean;
  
  /**
   * 새 항목을 생성할 때 표시할 텍스트
   * @default '추가: '
   */
  addNewText?: string;
  
  /**
   * 새 항목 생성 시 호출되는 콜백 함수
   */
  onNewValueAdd?: (newValue: string) => void;
  
  /**
   * 자동완성 컴포넌트에 적용할 추가 스타일
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
export const Autocomplete: React.FC<AutocompleteProps> = ({
  label = '',
  options,
  value,
  defaultValue,
  onChange,
  inputProps,
  multiple = false,
  required = false,
  disabled = false,
  readOnly = false,
  filterMode = 'startsWith',
  customFilterOptions,
  allowNewValues = false,
  addNewText = '추가: ',
  onNewValueAdd,
  customStyle,
  ...rest
}) => {
  // 필터 옵션 생성
  const getFilterOptions = () => {
    const baseFilter = createFilterOptions<OptionType>();
    
    if (filterMode === 'custom' && customFilterOptions) {
      return customFilterOptions;
    }
    
    return (options: OptionType[], state: FilterOptionsState<OptionType>) => {
      let filteredOptions = options;
      
      // 기본 필터 옵션
      if (filterMode === 'startsWith') {
        filteredOptions = options.filter(option => 
          option.label.toLowerCase().startsWith(state.inputValue.toLowerCase())
        );
      } else if (filterMode === 'contains') {
        filteredOptions = options.filter(option => 
          option.label.toLowerCase().includes(state.inputValue.toLowerCase())
        );
      } else if (filterMode === 'exact') {
        filteredOptions = options.filter(option => 
          option.label.toLowerCase() === state.inputValue.toLowerCase()
        );
      }
      
      // 새 값 추가 허용 시 추가 옵션 제공
      if (allowNewValues && state.inputValue !== '') {
        const isExisting = options.some(
          option => option.label.toLowerCase() === state.inputValue.toLowerCase()
        );
        
        if (!isExisting) {
          filteredOptions.push({
            label: `${addNewText}${state.inputValue}`,
            value: state.inputValue,
            isNew: true
          });
        }
      }
      
      return filteredOptions;
    };
  };
  
  // 새 값 추가 처리
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    if (onChange) {
      // 다중 선택 모드일 경우 배열 처리
      if (multiple && Array.isArray(newValue)) {
        const lastOption = newValue[newValue.length - 1];
        
        if (lastOption && lastOption.isNew && onNewValueAdd) {
          const updatedValue = [...newValue.slice(0, -1), {
            label: lastOption.value,
            value: lastOption.value
          }];
          
          onNewValueAdd(lastOption.value);
          onChange(event, updatedValue);
          return;
        }
      } 
      // 단일 선택 모드일 경우
      else if (newValue && newValue.isNew && onNewValueAdd) {
        const updatedValue = {
          label: newValue.value,
          value: newValue.value
        };
        
        onNewValueAdd(newValue.value);
        onChange(event, updatedValue);
        return;
      }
      
      onChange(event, newValue);
    }
  };
  
  // 칩 렌더링 (다중 선택 시)
  const renderTags = (value: any[], getTagProps: any) => {
    return value.map((option, index) => (
      <Chip 
        label={option.label} 
        {...getTagProps({ index })} 
        size="small"
        disabled={disabled || readOnly}
      />
    ));
  };
  
  return (
    <StyledAutocomplete
      options={options}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      multiple={multiple}
      disabled={disabled}
      readOnly={readOnly}
      customStyle={customStyle}
      filterOptions={getFilterOptions()}
      getOptionLabel={(option) => option.label || ''}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderTags={multiple ? renderTags : undefined}
      renderInput={(params) => (
        <TextField 
          {...params}
          label={label}
          required={required}
          {...inputProps}
        />
      )}
      {...rest}
    />
  );
};

export default Autocomplete;