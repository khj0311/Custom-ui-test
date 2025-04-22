import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, TextField, Typography, Grid, Paper, IconButton, 
  Tooltip, Tabs, Tab, Divider, Chip, useTheme, InputAdornment,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styled from 'styled-components';

// 직접 필요한 Material UI 아이콘 가져오기
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RemoveIcon from '@mui/icons-material/Remove';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import ForumIcon from '@mui/icons-material/Forum';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VideocamIcon from '@mui/icons-material/Videocam';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicIcon from '@mui/icons-material/Mic';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
  'Navigation': ['Home', 'Menu', 'MoreVert', 'ArrowBack', 'ArrowForward', 'Close', 'ExpandMore', 'ExpandLess', 'KeyboardArrowLeft', 'KeyboardArrowRight'],
  'Status': ['Info', 'Warning', 'Error', 'Help', 'Notifications', 'CheckCircle', 'Done', 'Clear'],
  'Communication': ['Email', 'Message', 'Phone', 'Chat', 'Forum', 'Send'],
  'Media': ['Image', 'Movie', 'MusicNote', 'Videocam', 'CameraAlt', 'Mic', 'PlayArrow', 'Pause', 'Stop', 'VolumeUp', 'VolumeMute'],
  'Social': ['Person', 'People', 'Group', 'Share', 'Public', 'School', 'Favorite', 'ThumbUp', 'AccountCircle']
};

// Material UI 아이콘 맵 정의
const MATERIAL_ICONS: { [key: string]: React.ElementType } = {
  Add: AddIcon,
  Delete: DeleteIcon,
  Edit: EditIcon,
  Remove: RemoveIcon,
  Done: DoneIcon,
  Clear: ClearIcon,
  Send: SendIcon,
  Save: SaveIcon,
  Print: PrintIcon,
  Search: SearchIcon,
  Settings: SettingsIcon,
  Home: HomeIcon,
  Menu: MenuIcon,
  MoreVert: MoreVertIcon,
  ArrowBack: ArrowBackIcon,
  ArrowForward: ArrowForwardIcon,
  Close: CloseIcon,
  ExpandMore: ExpandMoreIcon,
  ExpandLess: ExpandLessIcon,
  KeyboardArrowLeft: KeyboardArrowLeftIcon,
  KeyboardArrowRight: KeyboardArrowRightIcon,
  Info: InfoIcon,
  Warning: WarningIcon,
  Error: ErrorIcon,
  Help: HelpIcon,
  Notifications: NotificationsIcon,
  CheckCircle: CheckCircleIcon,
  Email: EmailIcon,
  Message: MessageIcon,
  Phone: PhoneIcon,
  Chat: ChatIcon,
  Forum: ForumIcon,
  Image: ImageIcon,
  Movie: MovieIcon,
  MusicNote: MusicNoteIcon,
  Videocam: VideocamIcon,
  CameraAlt: CameraAltIcon,
  Mic: MicIcon,
  PlayArrow: PlayArrowIcon,
  Pause: PauseIcon,
  Stop: StopIcon,
  VolumeUp: VolumeUpIcon,
  VolumeMute: VolumeMuteIcon,
  Person: PersonIcon,
  People: PeopleIcon,
  Group: GroupIcon,
  Share: ShareIcon,
  Public: PublicIcon,
  School: SchoolIcon,
  Favorite: FavoriteIcon,
  ThumbUp: ThumbUpIcon,
  AccountCircle: AccountCircleIcon,
  Star: StarIcon,
  Cloud: CloudIcon,
  AccessAlarm: AccessAlarmIcon,
  AccessTime: AccessTimeIcon,
  DateRange: DateRangeIcon,
  Lock: LockIcon,
  Visibility: VisibilityIcon,
  VisibilityOff: VisibilityOffIcon,
  Bookmark: BookmarkIcon,
  ShoppingCart: ShoppingCartIcon,
  LocalShipping: LocalShippingIcon,
  AttachFile: AttachFileIcon,
  Link: LinkIcon,
  LocationOn: LocationOnIcon,
  CalendarToday: CalendarTodayIcon,
  ContentCopy: ContentCopyIcon
};

export interface IconsBrowserProps {
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
export const Icons: React.FC<IconsBrowserProps> = ({
  searchPlaceholder = 'Search Material UI icons...',
  onIconClick,
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // 모든 아이콘 목록 가져오기
  const allIcons = useMemo(() => {
    return Object.keys(MATERIAL_ICONS);
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

  // 아이콘 렌더링 함수
  const renderIcon = (iconName: string) => {
    const IconComponent = MATERIAL_ICONS[iconName];
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