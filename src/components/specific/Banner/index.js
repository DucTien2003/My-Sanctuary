import clsx from 'clsx';
import { useRef, useEffect, useState } from 'react';

import styles from './banner.module.scss';
import Cover from '@/components/common/Cover';
import { swiperList } from '@/api/home';
import { FaAngleRight, FaAngleLeft } from '@/utils';

function Banner() {
  const swiperElRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    swiperElRef.current.swiper.slideNext();
  };

  const prevSlide = () => {
    swiperElRef.current.swiper.slidePrev();
  };

  useEffect(() => {
    const swiperInstance = swiperElRef.current.swiper;

    const updateCurrentSlide = () => {
      setCurrentSlide(swiperInstance.realIndex + 1);
    };

    swiperInstance.on('slideChange', updateCurrentSlide);

    return () => {
      swiperInstance.off('slideChange', updateCurrentSlide);
    };
  }, []);

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="absolute left-4 z-30 mt-14 font-medium">
        Popular New Titles
      </h2>

      {/* Swiper control */}
      <div className="absolute bottom-3 right-4 z-20">
        <div className="flex items-center">
          {/* Number order */}
          <span className="md-primary-color mr-2 mt-1 font-semibold uppercase">
            NO.<span>{currentSlide}</span>
          </span>

          {/* Previous button */}
          <button
            className="hover-md-accent-bg mr-2 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full"
            onClick={prevSlide}>
            <span>
              <FaAngleLeft />
            </span>
          </button>

          {/* Next button */}
          <button
            className="hover-md-accent-bg flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full"
            onClick={nextSlide}>
            <span>
              <FaAngleRight />
            </span>
          </button>
        </div>
      </div>

      {/* Swiper */}
      <swiper-container
        id="swiper"
        ref={swiperElRef}
        loop={true}
        speed={500}
        autoplay-delay="2500"
        autoplay-disable-on-interaction={true}>
        {swiperList.map((swiperItem, index) => {
          return (
            <swiper-slide key={index}>
              <div
                key={swiperItem.id}
                className={clsx('relative flex overflow-hidden pt-24')}>
                {/* Background banner */}
                <img
                  src={swiperItem.cover}
                  alt="cover"
                  className={clsx(
                    styles['swiper-bg'],
                    'absolute left-0 top-0 h-[150%] w-full select-none object-cover'
                  )}
                />

                {/* Swiper content */}
                <div className="container z-40 flex flex-col">
                  <div className="w-full">
                    <div className="my-5 flex">
                      {/* Cover */}
                      <div className="w-1/4 max-w-[215px] shadow-lg">
                        <Cover comic={swiperItem} />
                      </div>

                      {/* Info */}
                      <div className="ml-4 flex flex-1 flex-col">
                        {/* Name */}
                        <h1 className="font-black">{swiperItem.name}</h1>

                        {/* Categories */}
                        <div className="text-mini flex flex-wrap items-center py-4 font-semibold">
                          {swiperItem.categories.map((category) => (
                            <span
                              key={category}
                              className="md-status-yellow-bg mr-2 rounded bg-white p-1 text-white">
                              {category}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <div className="flex-1">
                          {swiperItem.descriptions.map((desc, index) => (
                            <p key={index}>{desc}</p>
                          ))}
                        </div>

                        {/* Author, Artist */}
                        <span className="font-semibold italic">
                          {swiperItem.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay */}
                <div
                  className={clsx(
                    styles['banner-overlay'],
                    'absolute inset-0 z-10'
                  )}></div>
              </div>
            </swiper-slide>
          );
        })}
      </swiper-container>
    </div>
  );
}

export default Banner;
