import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';
import { Box, Typography } from '@mui/material';

// 데모용 옵션 데이터
const countries = [
  { label: '대한민국', value: 'kr' },
  { label: '미국', value: 'us' },
  { label: '일본', value: 'jp' },
  { label: '중국', value: 'cn' },
  { label: '영국', value: 'gb' },
  { label: '프랑스', value: 'fr' },
  { label: '독일', value: 'de' },
  { label: '이탈리아', value: 'it' },
  { label: '캐나다', value: 'ca' },
  { label: '호주', value: 'au' },
];

const programmingLanguages = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'py' },
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'cs' },
  { label: 'C++', value: 'cpp' },
  { label: 'PHP', value: 'php' },
  { label: 'Ruby', value: 'rb' },
  { label: 'Go', value: 'go' },
  { label: 'Swift', value: 'swift' },
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
    },
    options: {
      description: '자동완성 옵션 배열',
    },
    multiple: {
      control: 'boolean',
      description: '다중 선택 모드 활성화 여부',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: '필수 필드 여부',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태 여부',
      defaultValue: false,
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 상태 여부',
      defaultValue: false,
    },
    filterMode: {
      control: 'select',
      options: ['startsWith', 'contains', 'exact', 'custom'],
      description: '옵션 필터링 방법 설정',
      defaultValue: 'startsWith',
    },
    allowNewValues: {
      control: 'boolean',
      description: '새 항목 생성 허용 여부',
      defaultValue: false,
    },
    addNewText: {
      control: 'text',
      description: '새 항목을 생성할 때 표시할 텍스트',
      defaultValue: '추가: ',
    },
    onChange: { action: 'changed' },
    onNewValueAdd: { action: 'new value added' },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Basic: Story = {
  args: {
    label: '국가 선택',
    options: countries,
  },
};

export const Multiple = () => {
  const [selectedValues, setSelectedValues] = useState<any[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: any[]) => {
    setSelectedValues(newValue);
  };

  return (
    <Box sx={{ width: 350 }}>
      <Autocomplete
        label="프로그래밍 언어 (다중 선택)"
        options={programmingLanguages}
        multiple
        value={selectedValues}
        onChange={handleChange}
      />
      <Typography sx={{ mt: 2 }}>
        선택된 언어: {selectedValues.map(v => v.label).join(', ')}
      </Typography>
    </Box>
  );
};

export const WithDefaultValue: Story = {
  args: {
    label: '국가 선택',
    options: countries,
    defaultValue: countries[0],
  },
};

export const Disabled: Story = {
  args: {
    label: '국가 선택',
    options: countries,
    disabled: true,
    defaultValue: countries[0],
  },
};

export const ReadOnly: Story = {
  args: {
    label: '국가 선택',
    options: countries,
    readOnly: true,
    defaultValue: countries[0],
  },
};

export const Required: Story = {
  args: {
    label: '국가 선택',
    options: countries,
    required: true,
  },
};

export const ContainsFilter = () => {
  return (
    <Box sx={{ width: 350 }}>
      <Typography gutterBottom>
        필터 모드: contains (포함)
      </Typography>
      <Autocomplete
        label="국가 선택"
        options={countries}
        filterMode="contains"
      />
    </Box>
  );
};

export const StartsWithFilter = () => {
  return (
    <Box sx={{ width: 350 }}>
      <Typography gutterBottom>
        필터 모드: startsWith (시작문자)
      </Typography>
      <Autocomplete
        label="국가 선택"
        options={countries}
        filterMode="startsWith"
      />
    </Box>
  );
};

export const ExactFilter = () => {
  return (
    <Box sx={{ width: 350 }}>
      <Typography gutterBottom>
        필터 모드: exact (정확히 일치)
      </Typography>
      <Autocomplete
        label="국가 선택"
        options={countries}
        filterMode="exact"
      />
    </Box>
  );
};

export const AllowNewValues = () => {
  const [options, setOptions] = useState([...programmingLanguages]);
  const [value, setValue] = useState<any>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  const handleNewValue = (newValue: string) => {
    const newOption = { label: newValue, value: newValue.toLowerCase().replace(/\s+/g, '_') };
    setOptions(prev => [...prev, newOption]);
  };

  return (
    <Box sx={{ width: 350 }}>
      <Typography gutterBottom>
        새 언어를 직접 추가할 수 있습니다
      </Typography>
      <Autocomplete
        label="프로그래밍 언어"
        options={options}
        value={value}
        onChange={handleChange}
        allowNewValues
        addNewText="추가: "
        onNewValueAdd={handleNewValue}
      />
      {value && (
        <Typography sx={{ mt: 2 }}>
          선택된 언어: {value.label}
        </Typography>
      )}
    </Box>
  );
};

export const CustomStyle: Story = {
  args: {
    label: '국가 선택',
    options: countries,
    customStyle: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        '&:hover fieldset': {
          borderColor: '#4caf50',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#4caf50',
          borderWidth: '2px',
        },
      },
      '& .MuiAutocomplete-tag': {
        backgroundColor: '#e8f5e9',
        borderColor: '#81c784',
        color: '#2e7d32',
      },
    },
  },
};