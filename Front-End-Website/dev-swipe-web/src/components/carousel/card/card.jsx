import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigate, useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './cardCarousel.module.css';

import { Navigation, Pagination, EffectCoverflow, Mousewheel } from 'swiper/modules';
import CustomButton from '../../custom button/custombutton';

const CardCarouselComp = ({information ,issue}) => {
  const [error,setError] = useState('');
  const nav = useNavigate();

  const goToPage = (id) =>{
    console.log(id)
    nav(`/dashboard/profile/${id}`)
  }

  useEffect(()=>{
    if(issue){
      setError(issue);
    }
  },[issue])

  return (
    <>
      {!error ? (<Swiper
        direction='horizontal'
        slidesPerView={2}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: false,
        }}

        modules={[Mousewheel,Pagination, Navigation]}
        className={styles.mySwiper2}
      >
        {information.map((val)=>(
            <SwiperSlide key={val.id} className={styles.swiper_slide2}>
                <img src={`${val.matched_with.profile_image_ur}`} alt="user images" />
                <div className={styles.text_container}>
                  
                  <div>{val.matched_with.user_name}</div>
                  {val.matched_with.user_type_id === 2 ? (<div className={styles.user_title}>Developer</div>):(<div className={styles.user_title}>Recruiter</div>)}
                </div>
                <div className={styles.button_container2}>
                  <CustomButton title={'Profile'} width={120} height={32} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={14} fontWeight={'bold'} backgroundColor={'#FCC860'} onClick={()=>goToPage(val.matched_with.id)}/> 
                </div>
            </SwiperSlide>
        ))}
        
      </Swiper>):(
        <div className={styles.error_message2}>{error}</div>
      )}
    </>
  );
}

export default CardCarouselComp;