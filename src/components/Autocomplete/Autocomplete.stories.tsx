import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Autocomplete, AutocompleteOption } from './Autocomplete';
import { Box, Avatar, Typography, Chip } from '@mui/material';

// 예제용 영화 옵션 데이터
const movieOptions: AutocompleteOption[] = [
  { id: 1, label: '인셉션', year: 2010, director: '크리스토퍼 놀란' },
  { id: 2, label: '다크 나이트', year: 2008, director: '크리스토퍼 놀란' },
  { id: 3, label: '매트릭스', year: 1999, director: '워쇼스키 형제' },
  { id: 4, label: '인터스텔라', year: 2014, director: '크리스토퍼 놀란' },
  { id: 5, label: '어벤져스', year: 2012, director: '조스 웨던' },
  { id: 6, label: '아이언맨', year: 2008, director: '존 파브로' },
  { id: 7, label: '포레스트 검프', year: 1994, director: '로버트 저메키스' },
  { id: 8, label: '글래디에이터', year: 2000, director: '리들리 스콧' },
  { id: 9, label: '타이타닉', year: 1997, director: '제임스 카메론' },
  { id: 10, label: '아바타', year: 2009, director: '제임스 카메론' },
];

// 예제용 사용자 옵션 데이터
const userOptions: AutocompleteOption[] = [
  { id: 1, label: '김철수', role: '관리자', email: 'kim@example.com' },
  { id: 2, label: '이영희', role: '개발자', email: 'lee@example.com' },
  { id: 3, label: '박지민', role: '디자이너', email: 'park@example.com' },
  { id: 4, label: '최동욱', role: '개발자', email: 'choi@example.com' },
  { id: 5, label: '정수진', role: '마케터', email: 'jung@example.com' },
];

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Inputs/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '자동완성 입력 필드의 레이블',
      defaultValue: '선택',
    },
    placeholder: {
      control: 'text',
      description: '자동완성 입력 필드의 플레이스홀더',
    },
    helperText: {
      control: 'text',
      description: '자동완성 입력 필드의 헬퍼 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      defaultValue: false,
    },
    multiple: {
      control: 'boolean',
      description: '다중 선택 모드',
      defaultValue: false,
    },
    freeSolo: {
      control: 'boolean',
      description: '자유 입력 모드',
      defaultValue: false,
    },
    options: {
      description: '선택 가능한 옵션 목록',
    },
  },
};

export default meta;

// 기본 자동완성
export const Basic = () => {
  const [value, setValue] = useState<AutocompleteOption | null>(null);

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={movieOptions}
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        label="영화 선택"
        placeholder="영화를 검색하세요"
      />
      {value && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          선택된 영화: {value.label} ({value.year})
        </Typography>
      )}
    </Box>
  );
};

// 다중 선택 자동완성
export const Multiple = () => {
  const [value, setValue] = useState<AutocompleteOption[]>([]);

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        multiple
        options={movieOptions}
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        label="영화 선택"
        placeholder="영화를 검색하세요"
      />
      {value.length > 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          선택된 영화: {value.map(movie => movie.label).join(', ')}
        </Typography>
      )}
    </Box>
  );
};

// 그룹화된 자동완성
export const Grouped = () => {
  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={movieOptions}
        groupBy={(option) => `${option.year}년대`}
        label="년도별 영화"
        placeholder="영화를 검색하세요"
        getOptionLabel={(option) => `${option.label} (${option.year})`}
      />
    </Box>
  );
};

// 자유 입력 모드 자동완성
export const FreeSolo = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        options={movieOptions.map(option => option.label)}
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        label="영화 검색"
        placeholder="영화 제목 입력 또는 선택"
      />
      {value && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          입력/선택된 값: {value}
        </Typography>
      )}
    </Box>
  );
};

// 에러 상태 자동완성
export const WithError = () => {
  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={movieOptions}
        label="영화 선택"
        error={true}
        helperText="필수 항목입니다."
      />
    </Box>
  );
};

// 비활성화 상태 자동완성
export const Disabled = () => {
  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={movieOptions}
        label="영화 선택"
        disabled
        defaultValue={movieOptions[0]}
      />
    </Box>
  );
};

// 커스텀 옵션 렌더링
export const CustomOption = () => {
  const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: AutocompleteOption) => (
    <li {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
          {option.label.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="body1">{option.label}</Typography>
          <Typography variant="caption" color="text.secondary">
            {(option as any).role} - {(option as any).email}
          </Typography>
        </Box>
      </Box>
    </li>
  );

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={userOptions}
        label="사용자 선택"
        customRenderOption={renderOption}
      />
    </Box>
  );
};

// 커스텀 태그 렌더링
export const CustomTags = () => {
  const renderTags = (value: AutocompleteOption[], getTagProps: (index: number) => {}) => 
    value.map((option, index) => (
      <Chip
        label={option.label}
        {...getTagProps(index)}
        key={option.id}
        variant="outlined"
        color="primary"
        size="small"
        avatar={<Avatar>{option.label.charAt(0)}</Avatar>}
      />
    ));

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        multiple
        options={userOptions}
        label="사용자 선택"
        customRenderTags={renderTags}
      />
    </Box>
  );
};

// 커스텀 스타일 자동완성
export const CustomStyled = () => {
  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={movieOptions}
        label="영화 선택"
        customStyle={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4caf50',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#4caf50',
          },
        }}
      />
    </Box>
  );
};