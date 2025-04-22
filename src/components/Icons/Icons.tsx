import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Grid, Paper, IconButton, Tooltip } from '@mui/material';
import styled from 'styled-components';

// 아이콘 가져오기 (명시적으로 일부 아이콘을 가져옵니다)
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReplayIcon from '@mui/icons-material/Replay';
import LoopIcon from '@mui/icons-material/Loop';

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

// 직접 아이콘 목록 정의
const ICON_LIST = [
  { name: 'Search', component: SearchIcon },
  { name: 'Home', component: HomeIcon },
  { name: 'Settings', component: SettingsIcon },
  { name: 'AccountCircle', component: AccountCircleIcon },
  { name: 'Add', component: AddIcon },
  { name: 'Delete', component: DeleteIcon },
  { name: 'Edit', component: EditIcon },
  { name: 'Info', component: InfoIcon },
  { name: 'Warning', component: WarningIcon },
  { name: 'Error', component: ErrorIcon },
  { name: 'CheckCircle', component: CheckCircleIcon },
  { name: 'Favorite', component: FavoriteIcon },
  { name: 'Star', component: StarIcon },
  { name: 'Cloud', component: CloudIcon },
  { name: 'AccessAlarm', component: AccessAlarmIcon },
  { name: 'AccessTime', component: AccessTimeIcon },
  { name: 'DateRange', component: DateRangeIcon },
  { name: 'Menu', component: MenuIcon },
  { name: 'MoreVert', component: MoreVertIcon },
  { name: 'ArrowBack', component: ArrowBackIcon },
  { name: 'ArrowForward', component: ArrowForwardIcon },
  { name: 'KeyboardArrowLeft', component: KeyboardArrowLeftIcon },
  { name: 'KeyboardArrowRight', component: KeyboardArrowRightIcon },
  { name: 'ShoppingCart', component: ShoppingCartIcon },
  { name: 'Person', component: PersonIcon },
  { name: 'Email', component: EmailIcon },
  { name: 'Phone', component: PhoneIcon },
  { name: 'LocationOn', component: LocationOnIcon },
  { name: 'Visibility', component: VisibilityIcon },
  { name: 'VisibilityOff', component: VisibilityOffIcon },
  { name: 'Lock', component: LockIcon },
  { name: 'LockOpen', component: LockOpenIcon },
  { name: 'Send', component: SendIcon },
  { name: 'AttachFile', component: AttachFileIcon },
  { name: 'CameraAlt', component: CameraAltIcon },
  { name: 'Photo', component: PhotoIcon },
  { name: 'VideoCall', component: VideoCallIcon },
  { name: 'Mic', component: MicIcon },
  { name: 'VolumeUp', component: VolumeUpIcon },
  { name: 'VolumeOff', component: VolumeOffIcon },
  { name: 'PlayArrow', component: PlayArrowIcon },
  { name: 'Pause', component: PauseIcon },
  { name: 'Stop', component: StopIcon },
  { name: 'SkipPrevious', component: SkipPreviousIcon },
  { name: 'SkipNext', component: SkipNextIcon },
  { name: 'Replay', component: ReplayIcon },
  { name: 'Loop', component: LoopIcon },
];

// 아이콘 카테고리
const ICON_CATEGORIES = {
  'Navigation': ['Home', 'ArrowBack', 'ArrowForward', 'KeyboardArrowLeft', 'KeyboardArrowRight', 'Menu'],
  'Actions': ['Add', 'Delete', 'Edit', 'Search', 'Settings', 'Send'],
  'Status': ['Info', 'Warning', 'Error', 'CheckCircle'],
  'Social': ['Favorite', 'Star', 'Person', 'AccountCircle'],
  'Media': ['PlayArrow', 'Pause', 'Stop', 'SkipPrevious', 'SkipNext', 'VolumeUp', 'VolumeOff'],
  'Communication': ['Email', 'Phone', 'Send', 'ChatBubble'],
};

/**
 * Material UI 아이콘을 검색하고 표시하는 컴포넌트
 */
export const Icons: React.FC<IconsProps> = ({
  searchPlaceholder = 'Search icons...',
  onIconClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIcons, setFilteredIcons] = useState(ICON_LIST);
  const [copied, setCopied] = useState<string | null>(null);
  
  useEffect(() => {
    // 검색어로 아이콘 필터링
    const filtered = ICON_LIST.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIcons(filtered);
  }, [searchTerm]);
  
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
          startAdornment: <SearchIcon />,
        }}
      />
      
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {filteredIcons.length} icons found. Click on an icon to copy its name.
      </Typography>
      
      <IconGrid container spacing={2}>
        {filteredIcons.map(({ name, component: IconComponent }) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={name}>
            <Tooltip 
              title={copied === name ? 'Copied!' : 'Click to copy'} 
              arrow
            >
              <IconPaper 
                elevation={1} 
                onClick={() => handleIconClick(name)}
                sx={{
                  bgcolor: copied === name ? 'rgba(233, 80, 31, 0.1)' : 'white',
                  borderColor: copied === name ? 'primary.main' : 'transparent',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
              >
                <IconButton color="inherit" disableRipple>
                  <IconComponent />
                </IconButton>
                <IconName variant="caption">{name}</IconName>
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

      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          How to use these icons
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
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
    </IconSearchContainer>
  );
};

export default Icons;