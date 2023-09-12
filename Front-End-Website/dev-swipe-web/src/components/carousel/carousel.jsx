import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './carousel.css';

// import required modules
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

const CarouselComp = ({value}) => {

    const openImage = () =>{
        console.log('hi')
    }
  return (
    <>
      <Swiper
        centeredSlides={true}
        effect={'coverflow'}
        slidesPerView={3}
        spaceBetween={25}
        navigation={{
            nextEl:'.swiper-button-next',
            prevElEl:'.swiper-button-prev',
            clickable: true
        }}
        pagination={{
          clickable: false,
        //   el: '.swiper-pagination'
        }}
        loop= { true}
        initialSlide={1}
        coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5
        }}
        // breakpoints={{
        //   '@0.00': {
        //     slidesPerView: 1,
        //     spaceBetween: 10,
        //   },
        //   '@0.75': {
        //     slidesPerView: 2,
        //     spaceBetween: 20,
        //   },
        //   '@1.00': {
        //     slidesPerView: 3,
        //     spaceBetween: 40,
        //   },
        //   '@1.50': {
        //     slidesPerView: 4,
        //     spaceBetween: 50,
        //   },
        // }} EffectCoverflow
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {value.map((val)=>(
            <SwiperSlide key={val.id} onClick={openImage}>
                <img src={`${val.image_url}`} alt="user images" />
            </SwiperSlide>
        ))}
        
        {/* <div className='slider-controler'>
            <div className='swiper-button-prev slider-arrow'>
                <ion-icon nmme="arrow-back-outline"></ion-icon>
                <img src="/arrow.png" alt="" />
            </div>
            <div className='swiper-button-next slider-arrow'>
                <ion-icon na  me="arrow-forward-outline"></ion-icon>
            </div>
            <div className='swiper-pagination'></div>
        </div> */}
      </Swiper>
    </>
  );
}

export default CarouselComp;