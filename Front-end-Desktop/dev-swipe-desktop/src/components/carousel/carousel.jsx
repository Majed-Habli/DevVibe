import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import '../../styles/carousel.css';

import { Navigation, Pagination, EffectCoverflow, Mousewheel } from 'swiper/modules';

const CarouselComp = ({value ,issue}) => {
  const [error,setError] = useState('');
  const openImage = () =>{
      console.log('hi')
  }

  useEffect(()=>{
    if(issue){
      setError(issue);
    }
  },[issue])

  return (
    <>
      {!error ? (<Swiper
        direction='vertical'
        slidesPerView={1}
        spaceBetween={10}
        mousewheel={true}
        pagination={{
          clickable: false,
        }}

        modules={[Mousewheel,Pagination, Navigation]}
        className="mySwiper"
      >
        {value.map((val)=>(
            <SwiperSlide key={val.id} onClick={openImage}>
                <img src={`${val.image_url}`} alt="user images" />
            </SwiperSlide>
        ))}
        
      </Swiper>):(
        <div className='error_message'>{error}</div>
      )}
    </>
  );
}

export default CarouselComp;