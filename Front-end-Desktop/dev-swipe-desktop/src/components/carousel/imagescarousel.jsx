import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import '../../styles/imagescarousel.css';
import SyncLoader from "react-spinners/ClipLoader";

import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

const CarouselComp = ({value ,issue}) => {
  const [error,setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      if(value.length <= 0){
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
        }, 3000)
      }else{
          setLoading(false)
      }
  },[value])

  useEffect(()=>{
    if(issue){
      setError('no images here');
    }
  },[issue])

  return (
    <>
      {!error ?( !loading ?(<Swiper
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
        }}
        loop= { true}
        initialSlide={1}
        coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5
        }}

        modules={[Pagination, Navigation]}
        className='mySwiper3'
      >
        {value.map((val)=>(
            <SwiperSlide className='swiper-slide3' key={val.id}>
                <img src={`${val.image_url}`} alt="user images" />
            </SwiperSlide>
        ))}
                
      </Swiper>):( <div className='container'><SyncLoader color="#36d7b7" /></div>)):(
        <div className='error_message'>
          <img src='/images.png'/>
          <div>{error}</div>
        </div>
      )}
    </>
  );
}

export default CarouselComp;