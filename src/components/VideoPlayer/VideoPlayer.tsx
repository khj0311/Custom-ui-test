import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  styled,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
} from '@mui/icons-material';

export interface VideoPlayerProps {
  /**
   * 비디오 URL
   */
  src: string;
  
  /**
   * 비디오 타입 (mp4, webm 등)
   * @default 'video/mp4'
   */
  type?: string;
  
  /**
   * 자동 재생 여부
   * @default false
   */
  autoPlay?: boolean;
  
  /**
   * 자동 재생시 음소거 여부 (대부분의 브라우저에서 자동 재생은 음소거 상태에서만 가능)
   * @default true
   */
  muted?: boolean;
  
  /**
   * 반복 재생 여부
   * @default false
   */
  loop?: boolean;
  
  /**
   * 기본 표시 포스터 이미지 URL
   */
  poster?: string;
  
  /**
   * 컨트롤 바 표시 여부
   * @default true
   */
  controls?: boolean;
  
  /**
   * 비디오 플레이어 너비
   * @default '100%'
   */
  width?: string | number;
  
  /**
   * 비디오 플레이어 높이
   * @default 'auto'
   */
  height?: string | number;
  
  /**
   * 비디오 플레이어에 적용할 추가 스타일
   */
  customStyle?: React.CSSProperties;
  
  /**
   * 비디오 재생이 시작될 때 호출되는 콜백
   */
  onPlay?: () => void;
  
  /**
   * 비디오 재생이 일시 정지될 때 호출되는 콜백
   */
  onPause?: () => void;
  
  /**
   * 비디오 재생이 종료될 때 호출되는 콜백
   */
  onEnded?: () => void;
}

const PlayerContainer = styled(Box)<{
  customStyle?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
}>`
  position: relative;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  background-color: #000;
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

const VideoElement = styled('video')`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ControlsContainer = styled(Box)<{ visible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ControlsRow = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

const TimeDisplay = styled(Typography)`
  color: white;
  font-size: 0.8rem;
  min-width: 80px;
`;

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * 비디오 플레이어 컴포넌트
 * 커스텀 컨트롤과 함께 비디오 재생 기능 제공
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  type = 'video/mp4',
  autoPlay = false,
  muted = true,
  loop = false,
  poster,
  controls = true,
  width = '100%',
  height = 'auto',
  customStyle,
  onPlay,
  onPause,
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(isMuted ? 0 : 100);
  const [showControls, setShowControls] = useState(false);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        onPause?.();
      } else {
        videoRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
      
      // 음소거 해제 시 이전 볼륨으로 복원
      if (!newMuteState && volume === 0) {
        setVolume(50);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const volumeValue = newValue as number;
    if (videoRef.current) {
      videoRef.current.volume = volumeValue / 100;
      setVolume(volumeValue);
      setIsMuted(volumeValue === 0);
      videoRef.current.muted = volumeValue === 0;
    }
  };

  const handleTimeChange = (_event: Event, newValue: number | number[]) => {
    const timeValue = newValue as number;
    if (videoRef.current) {
      videoRef.current.currentTime = timeValue;
      setCurrentTime(timeValue);
    }
  };

  const enterFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    
    // 일정 시간 후 컨트롤 숨기기
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    
    hideControlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, []);

  return (
    <PlayerContainer
      customStyle={customStyle}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <VideoElement
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        onClick={togglePlay}
        controlsList="nodownload"
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </VideoElement>
      
      {controls && (
        <ControlsContainer visible={showControls || !isPlaying}>
          <ControlsRow>
            <Slider
              value={currentTime}
              max={duration || 100}
              onChange={handleTimeChange}
              aria-label="Video progress"
              sx={{
                color: '#f50057',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.3s',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgba(245, 0, 87, 0.16)',
                  },
                  '&.Mui-active': {
                    width: 12,
                    height: 12,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
              }}
            />
          </ControlsRow>
          
          <ControlsRow>
            <IconButton onClick={togglePlay} size="small" sx={{ color: 'white' }}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            
            <ControlsRow sx={{ maxWidth: '150px' }}>
              <IconButton onClick={toggleMute} size="small" sx={{ color: 'white' }}>
                {isMuted ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                size="small"
                sx={{
                  color: 'white',
                  width: '100px',
                  height: 4,
                  '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                  },
                }}
              />
            </ControlsRow>
            
            <TimeDisplay>{`${formatTime(currentTime)} / ${formatTime(duration || 0)}`}</TimeDisplay>
            
            <Box flexGrow={1} />
            
            <IconButton onClick={enterFullscreen} size="small" sx={{ color: 'white' }}>
              <Fullscreen />
            </IconButton>
          </ControlsRow>
        </ControlsContainer>
      )}
    </PlayerContainer>
  );
};

export default VideoPlayer;