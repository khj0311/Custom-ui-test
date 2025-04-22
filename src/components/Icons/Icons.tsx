import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, TextField, Typography, Grid, Paper, IconButton, 
  Tooltip, Tabs, Tab, Divider, Chip, useTheme, InputAdornment,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styled from 'styled-components';

// Material UI 아이콘 모두 임포트
import * as Icons from '@mui/icons-material';

// 스타일링
const IconsContainer = styled(Box)`
  min-height: 100vh;
  background-color: #fafafa;
`;

const Header = styled(Box)`
  padding: 40px 0 24px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const SearchContainer = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
`;

const MainContent = styled(Box)`
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 16px;
`;

const IconCard = styled(Paper)`
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.palette?.primary?.main || '#e9501f'};
    
    .copy-indicator {
      opacity: 1;
    }
  }
`;

const IconName = styled(Typography)`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 4px;
`;

const CopyIndicator = styled(Box)`
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const CategoryContainer = styled(Box)`
  margin: 24px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const NoResults = styled(Box)`
  padding: 64px 0;
  text-align: center;
`;

// 아이콘 카테고리 정의
const ICON_CATEGORIES = {
  'All': [], // 모든 아이콘
  'Actions': ['Add', 'Delete', 'Edit', 'Remove', 'Done', 'Clear', 'Send', 'Save', 'Print', 'Search', 'Settings'],
  'Navigation': ['Home', 'Menu', 'More', 'Back', 'Forward', 'Close', 'Expand', 'Up', 'Down', 'ArrowBack', 'KeyboardArrowLeft'],
  'Status': ['Info', 'Warning', 'Error', 'Check', 'Help', 'Alert', 'Notifications', 'CheckCircle'],
  'Communication': ['Email', 'Message', 'Phone', 'Chat', 'Comment', 'Forum', 'Contact'],
  'Media': ['Image', 'Movie', 'Music', 'Video', 'Camera', 'Mic', 'Play', 'Pause', 'Stop', 'Volume'],
  'Social': ['Person', 'People', 'Group', 'Share', 'Public', 'School', 'Favorite', 'ThumbUp']
};

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
  searchPlaceholder = 'Search Material UI icons...',
  onIconClick,
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // 모든 아이콘 가져오기
  const allIcons = useMemo(() => {
    const icons = Object.keys(Icons).filter(key => {
      // React 컴포넌트인 아이콘만 필터링
      return (
        key !== 'default' && 
        typeof Icons[key as keyof typeof Icons] === 'function' &&
        key.match(/^[A-Z]/) // 대문자로 시작하는 이름만 (컴포넌트)
      );
    });
    return icons;
  }, []);
  
  // 필터링된 아이콘 관리
  const [filteredIcons, setFilteredIcons] = useState<string[]>(allIcons);
  
  // 카테고리 변경 시 필터링
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredIcons(allIcons.filter(icon => 
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      return;
    }
    
    // 특정 카테고리에 속하는 아이콘 필터링
    const categoryKeywords = ICON_CATEGORIES[activeCategory as keyof typeof ICON_CATEGORIES];
    const categoryIcons = allIcons.filter(icon => {
      // 키워드 기반 필터링 (부분 일치)
      return categoryKeywords.some(keyword => 
        icon.toLowerCase().includes(keyword.toLowerCase())
      ) && icon.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    setFilteredIcons(categoryIcons);
  }, [activeCategory, searchTerm, allIcons]);
  
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
  
  // 카테고리 탭 변경 핸들러
  const handleCategoryChange = (_: React.SyntheticEvent, newCategory: string) => {
    setActiveCategory(newCategory);
  };
  
  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 동적으로 아이콘 렌더링하는 헬퍼 함수
  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ElementType;
    return IconComponent ? <IconComponent fontSize="medium" color="primary" /> : null;
  };

  return (
    <IconsContainer>
      <Header>
        <SearchContainer>
          <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
            Material UI Icons
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Browse {allIcons.length} icons from Material UI library
          </Typography>
          
          <TextField
            variant="outlined"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                bgcolor: '#fff',
              },
            }}
          />
          
          <Box sx={{ mt: 3 }}>
            <Tabs 
              value={activeCategory} 
              onChange={handleCategoryChange} 
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ 
                '& .MuiTabs-indicator': { height: 3 },
                '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 }
              }}
            >
              {Object.keys(ICON_CATEGORIES).map((category) => (
                <Tab key={category} label={category} value={category} />
              ))}
            </Tabs>
          </Box>
        </SearchContainer>
      </Header>
      
      <MainContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredIcons.length} icons found
          </Typography>
          <Chip 
            label={`Category: ${activeCategory}`} 
            color="primary" 
            variant="outlined" 
            size="small"
          />
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        <Grid container spacing={3}>
          {filteredIcons.map((iconName) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={iconName}>
              <Tooltip title={copied === iconName ? 'Copied!' : `${iconName} - Click to copy`} arrow>
                <IconCard 
                  elevation={1} 
                  onClick={() => handleIconClick(iconName)}
                  sx={{
                    bgcolor: copied === iconName ? `${theme.palette.primary.main}10` : 'white',
                    boxShadow: copied === iconName ? `0 0 0 1px ${theme.palette.primary.main}` : undefined,
                  }}
                >
                  <IconButton color="inherit" disableRipple>
                    {renderIcon(iconName)}
                  </IconButton>
                  <IconName variant="caption">{iconName}</IconName>
                  <CopyIndicator className="copy-indicator">
                    <ContentCopyIcon color="action" fontSize="small" />
                  </CopyIndicator>
                </IconCard>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
        
        {filteredIcons.length === 0 && (
          <NoResults>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No icons found matching "{searchTerm}"
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              sx={{ mt: 2 }}
            >
              Clear search and view all icons
            </Button>
          </NoResults>
        )}
        
        <Box mt={8} mb={4}>
          <Typography variant="h5" gutterBottom>
            How to use these icons
          </Typography>
          <Paper sx={{ p: 3, bgcolor: '#fafafa', borderRadius: 2 }}>
            <pre style={{ margin: 0, overflow: 'auto' }}>
{`// 1. Import the icon
import { IconName } from '@mui/icons-material';

// Example:
import { Home } from '@mui/icons-material';

// 2. Use it in your component
<Home />

// With custom color and size
<Home color="primary" fontSize="large" />`}
            </pre>
          </Paper>
        </Box>
      </MainContent>
    </IconsContainer>
  );
};

export default Icons;