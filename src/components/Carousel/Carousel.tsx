import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export interface CarouselProps {
  /**
   * 캐러셀에 표시할 아이템 목록
   */
  items: React.ReactNode[];
  
  /**
   * 자동 슬라이드 간격 (ms), 0일 경우 자동 슬라이드 비활성화
   * @default 0
   */
  autoSlide?: number;
  
  /**
   * 화살표 버튼 표시 여부
   * @default true
   */
  showArrows?: boolean;
  
  /**
   * 인디케이터 표시 여부 (하단 점)
   * @default true
   */
  showIndicators?: boolean;
  
  /**
   * 캐러셀의 높이
   * @default '300px'
   */
  height?: string | number;
  
  /**
   * 캐러셀에 적용할 추가 스타일
   */
  customStyle?: React.CSSProperties;
  
  /**
   * 이미지 전환 애니메이션 시간 (ms)
   * @default 300
   */
  transitionDuration?: number;
  
  /**
   * 캐러셀 슬라이드 변경 시 호출되는 콜백
   */
  onChange?: (index: number) => void;
}

const CarouselContainer = styled(Box)<{
  customStyle?: React.CSSProperties;
  height?: string | number;
}>`
  position: relative;
  width: 100%;
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  overflow: hidden;
  ${({ customStyle }) => customStyle && { ...customStyle }}
`;

const CarouselTrack = styled(Box)<{ duration: number }>`
  display: flex;
  height: 100%;
  transition: transform ${({ duration }) => duration}ms ease;
`;

const CarouselItem = styled(Box)`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

const CarouselArrow = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const LeftArrow = styled(CarouselArrow)`
  left: 10px;
`;

const RightArrow = styled(CarouselArrow)`
  right: 10px;
`;

const IndicatorsContainer = styled(Box)`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 2;
`;

const Indicator = styled('button')<{ active: boolean }>`
  width: 10px;
  height: 10px;
  padding: 0;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.7)')};
  }
`;

/**
 * 캐러셀 컴포넌트
 * 이미지, 카드 등 다양한 콘텐츠를 슬라이드로 표시
 */
export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoSlide = 0,
  showArrows = true,
  showIndicators = true,
  height = '300px',
  customStyle,
  transitionDuration = 300,
  onChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    // 범위를 벗어나지 않도록 함
    const newIndex = Math.max(0, Math.min(items.length - 1, index));
    setCurrentIndex(newIndex);
    onChange?.(newIndex);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % items.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    // 자동 슬라이드 설정
    if (autoSlide > 0 && items.length > 1) {
      timerRef.current = setInterval(nextSlide, autoSlide);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoSlide, currentIndex, items.length]);

  if (!items.length) {
    return null;
  }

  return (
    <CarouselContainer customStyle={customStyle} height={height}>
      <CarouselTrack
        duration={transitionDuration}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </CarouselTrack>

      {showArrows && items.length > 1 && (
        <>
          <LeftArrow onClick={prevSlide} aria-label="Previous slide">
            <KeyboardArrowLeft />
          </LeftArrow>
          <RightArrow onClick={nextSlide} aria-label="Next slide">
            <KeyboardArrowRight />
          </RightArrow>
        </>
      )}

      {showIndicators && items.length > 1 && (
        <IndicatorsContainer>
          {items.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </IndicatorsContainer>
      )}
    </CarouselContainer>
  );
};

export default Carousel;