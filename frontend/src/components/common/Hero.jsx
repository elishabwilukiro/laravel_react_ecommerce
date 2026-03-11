import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SlideImageOne from '../../assets/images/banner-1.jpg';
import SlideImageTwo from '../../assets/images/banner-2.jpg';

const Hero = () => {
  return (
    <>
     <section className='section-1'>
          <Swiper
               modules={[Autoplay]}
               slidesPerView={1}
               spaceBetween={0}
               autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
               }}
               loop={true}
               >               
               <SwiperSlide>
                    <div className="content" style={{ backgroundImage: `url(${SlideImageOne})` }}>                        
                    </div>                   
               </SwiperSlide>
               <SwiperSlide>
                    <div className="content" style={{ backgroundImage: `url(${SlideImageTwo})` }}>                        
                    </div>
               </SwiperSlide>                
          </Swiper>
     </section>
    </>
  );
};

export default Hero;