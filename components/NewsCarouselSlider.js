import { useState, useEffect, useRef } from 'react';
import styles from '../styles/NewsCarouselSlider.module.css';

const slides = [
  "/img/DanielDialsRT.png",
  "/img/ShackMus.png",
  "/img/StreetMus1.png"
];

export default function CarouselSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const prevIndex = (current - 1 + slides.length) % slides.length;
  const nextIndex = (current + 1) % slides.length;

  const goToSlide = (index) => {
    setCurrent(index);
    setProgress(0);
    resetTimers();
  };

    useEffect(() => {
    startTimers();
    return () => {
      clearTimers();
    };
  }, []);

  const startTimers = () => {
    autoSlideRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, 15000);

    progressRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 150);
  };

  const resetTimers = () => {
    clearTimers();
    setProgress(0);
    startTimers();
  };

  const clearTimers = () => {
    clearInterval(autoSlideRef.current);
    clearInterval(progressRef.current);
  };

  const autoSlideRef = useRef();
  const progressRef = useRef();

  return (
    <div className={styles.carouselWrapper}>
      <>
      <h2 style={{ fontSize: '6rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '0.3em' }}>NEWS</h2>
      <div className={styles.carousel}>
        <div
          className={styles.previewSlide}
          onClick={() => goToSlide(prevIndex)}
        >
          <img className={styles.carouselImage} src={slides[prevIndex]} alt="Previous" />
        </div>

        <div className={styles.mainSlide}>
          <img className={styles.carouselImage} src={slides[current]} alt="Current" />
        </div>

        <div
          className={styles.previewSlide}
          onClick={() => goToSlide(nextIndex)}
        >
          <img className={styles.carouselImage} src={slides[nextIndex]} alt="Next" />
        </div>
      </div>

      <div className={styles.centerSlideProgressBarContainer}>
        <div className={styles.centerSlideProgressBar} style={{ width: `${progress}%` }} />
      </div>


      </>
      <div className={styles.indicators}>
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.dot} ${idx === current ? styles.activeDot : ''}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}