import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Grid, Paper, IconButton, Tooltip } from '@mui/material';
import styled from 'styled-components';

// Material Icons - 모든 아이콘 가져오기
import * as MuiIcons from '@mui/icons-material';

// 아이콘 검색 컴포넌트 스타일링
const IconSearchContainer = styled(Box)`
  padding: 16px;
  max-width: 100%;
`;

const SearchField = styled(TextField)`
  margin-bottom: 24px;
  width: 100%;
  max-width: 600px;
`;

const IconGrid = styled(Grid)`
  margin-top: 16px;
`;

const IconPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  height: 100px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconName = styled(Typography)`
  margin-top: 8px;
  font-size: 0.8rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export interface IconsProps {
  /**
   * 아이콘 검색 필드에 표시될 플레이스홀더 텍스트
   */
  searchPlaceholder?: string;
  
  /**
   * 아이콘을 클릭했을 때 실행될 콜백 함수
   */
  onIconClick?: (iconName: string) => void;
}

/**
 * Material UI 아이콘을 검색하고 표시하는 컴포넌트
 */
export const Icons: React.FC<IconsProps> = ({
  searchPlaceholder = 'Search icons...',
  onIconClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIcons, setFilteredIcons] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  
  // 모든 Material 아이콘 목록 가져오기
  const allIcons = Object.keys(MuiIcons).filter(key => 
    key !== 'default' && typeof MuiIcons[key as keyof typeof MuiIcons] === 'function'
  );
  
  useEffect(() => {
    // 검색어로 아이콘 필터링
    const filtered = allIcons.filter(icon => 
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIcons(filtered);
  }, [searchTerm]);
  
  // 초기 렌더링 시 모든 아이콘 표시
  useEffect(() => {
    setFilteredIcons(allIcons);
  }, []);
  
  // 아이콘 클릭 핸들러
  const handleIconClick = (iconName: string) => {
    // 아이콘 이름을 클립보드에 복사
    navigator.clipboard.writeText(iconName);
    setCopied(iconName);
    
    // 3초 후 복사 상태 초기화
    setTimeout(() => {
      setCopied(null);
    }, 3000);
    
    // 전달된 콜백 실행
    if (onIconClick) {
      onIconClick(iconName);
    }
  };
  
  // 동적으로 아이콘 렌더링하는 헬퍼 함수
  const renderIcon = (iconName: string) => {
    const IconComponent = MuiIcons[iconName as keyof typeof MuiIcons] as React.ElementType;
    return <IconComponent fontSize="medium" />;
  };

  return (
    <IconSearchContainer>
      <Typography variant="h5" gutterBottom>
        Material UI Icons
      </Typography>
      
      <SearchField
        variant="outlined"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: renderIcon('Search'),
        }}
      />
      
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {filteredIcons.length} icons found. Click on an icon to copy its name.
      </Typography>
      
      <IconGrid container spacing={2}>
        {filteredIcons.map((iconName) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={iconName}>
            <Tooltip 
              title={copied === iconName ? 'Copied!' : 'Click to copy'} 
              arrow
            >
              <IconPaper 
                elevation={1} 
                onClick={() => handleIconClick(iconName)}
                sx={{
                  bgcolor: copied === iconName ? 'rgba(233, 80, 31, 0.1)' : 'white',
                  borderColor: copied === iconName ? 'primary.main' : 'transparent',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
              >
                <IconButton color="inherit" disableRipple>
                  {renderIcon(iconName)}
                </IconButton>
                <IconName variant="caption">{iconName}</IconName>
              </IconPaper>
            </Tooltip>
          </Grid>
        ))}
      </IconGrid>
      
      {filteredIcons.length === 0 && (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            No icons found matching "{searchTerm}"
          </Typography>
        </Box>
      )}
    </IconSearchContainer>
  );
};

export default Icons;