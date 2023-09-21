import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigate, useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

import '../../styles/cardCarousel.css';

import { Navigation, Pagination, EffectCoverflow, Mousewheel } from 'swiper/modules';
import CustomButton from '../custom button/custombutton';

const CardCarouselComp = ({information ,issue}) => {
  const [error,setError] = useState('');
  const nav = useNavigate();

  console.log(information)
  const goToPage = (id) =>{
    console.log(id)
    nav(`/dashboard/users/profile/${id}`)
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
        slidesPerView={1}
        spaceBetween={10}
        mousewheel={true}
        pagination={{
          clickable: false,
        }}

        modules={[Mousewheel,Pagination, Navigation]}
        className="mySwiper2"
      >
        {information.map((val)=>(
            <SwiperSlide key={val.id} className='swiper-slide2'>
                <img src={`${val.user.profile_image_url}`} alt="user images" />
                <div className='text_container'>
                  
                  <div>{val.user.user_name}</div>
                  {val.user.user_type_id === 2 ? (<div className='user_title'>Developer</div>):(<div className='user_title'>Recruiter</div>)}
                </div>
                <div className='button_container2'>
                  <CustomButton title={'Profile'} width={120} height={32} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={14} fontWeight={'bold'} backgroundColor={'#FCC860'} onClick={()=>goToPage(val.user.id)}/> 
                </div>
            </SwiperSlide>
        ))}
        
      </Swiper>):(
        <div className='error_message2'>{error}</div>
      )}
    </>
  );
}

export default CardCarouselComp;