import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";

interface ImageSlideData {
  id: string;
  imageUrl: string;
  location: string;
  country: string;
  description: string;
  rating: number;
  activities: number;
}

interface CinematicSliderProps {
  slides: ImageSlideData[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const VideoSlider = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
}: VideoSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-slider-container w-full">
      <div className="video-slider-wrapper w-full">
        {/* Main Video Display */}
        <div className="main-video-container w-full">
          <div className="video-content w-full">
            <video
              key={slides[currentSlide]?.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="main-video w-full h-full object-cover"
            >
              <source src={slides[currentSlide]?.videoUrl} type="video/mp4" />
            </video>

            {/* Video Overlay */}
            <div className="video-overlay">
              <div className="video-info">
                <div className="location-badge">
                  <span className="location-name">
                    {slides[currentSlide]?.location}
                  </span>
                  <span className="country-name">
                    {slides[currentSlide]?.country}
                  </span>
                </div>

                <div className="rating-info">
                  <div className="rating">
                    <span className="star-icon">⭐</span>
                    <span className="rating-value">
                      {slides[currentSlide]?.rating}
                    </span>
                  </div>
                  <span className="activities-count">
                    {slides[currentSlide]?.activities} experiences
                  </span>
                </div>
              </div>

              <p className="video-description">
                {slides[currentSlide]?.description}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            className="nav-btn nav-btn-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="nav-btn nav-btn-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Play/Pause Control */}
          <button
            className="play-pause-btn"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" fill="currentColor" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="5,3 19,12 5,21" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="thumbnail-container">
          <div className="thumbnail-wrapper">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={cn(
                  "thumbnail-item",
                  index === currentSlide && "thumbnail-active"
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${slide.location} slide`}
              >
                <video
                  muted
                  playsInline
                  className="thumbnail-video"
                  poster={`${slide.videoUrl}#t=1`}
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
                <div className="thumbnail-overlay">
                  <span className="thumbnail-location">{slide.location}</span>
                  <span className="thumbnail-country">{slide.country}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="progress-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "progress-dot",
                index === currentSlide && "progress-dot-active"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide && isPlaying && (
                <div className="progress-ring" data-duration={autoPlayInterval}>
                  <svg className="progress-circle" viewBox="0 0 36 36">
                    <path
                      className="progress-circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                    />
                    <path
                      className="progress-circle-fill"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
