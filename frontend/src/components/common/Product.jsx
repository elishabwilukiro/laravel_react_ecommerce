import { memo } from 'react';
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import Layout from './Layout';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductImage1 from '../../assets/images/Mens/1.jpg';
import ProductImage2 from '../../assets/images/Mens/2.jpg';
import ProductImage3 from '../../assets/images/Mens/3.jpg';

const Product = () => {
     const [rating, setRating] = useState(4.5);
     const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
          <Layout>
               <div className="container product-details">
                    <div className="row">
                         <div className="col-md-12 col-sm-12">
                              <nav aria-label='breadcrumb' className='py-4'>
                                   <ol className='breadcrumb'>
                                        <li className='breadcrumb-item'>
                                             <Link to="/">Home</Link>
                                        </li>
                                        <li className='breadcrumb-item active' aria-current="page">
                                             <Link to="/shop">Shop</Link>
                                        </li>
                                        <li className='breadcrumb-item active' aria-current="page">
                                             <Link to="#">Dummy Product</Link>
                                        </li>
                                   </ol>
                              </nav>
                         </div>
                    </div>
                    <div className="row mb-5">
                         <div className="col-md-5 col-sm-12">
                              <div className="row">
                                   <div className="col-2">
                                        <Swiper
                                             style={{
                                                  '--swiper-navigation-color': '#000',
                                                  '--swiper-pagination-color': '#000',
                                                  }}
                                                  onSwiper={setThumbsSwiper}
                                                  loop={true}
                                                  direction={`vertical`}
                                                  spaceBetween={10}
                                                  slidesPerView={6}
                                                  freeMode={true}
                                                  watchSlidesProgress={true}
                                                  modules={[FreeMode, Navigation, Thumbs]}
                                                  className="mySwiper mt-2"
                                             >
                                                       
                                             <SwiperSlide>
                                                  <div className='content'>
                                                       <img 
                                                            src={ProductImage1} 
                                                            alt="" 
                                                            height={100}
                                                            className='w-100' />
                                                  </div>                                                                      
                                             </SwiperSlide>

                                             <SwiperSlide>
                                                  <div className='content'>
                                                       <img 
                                                            src={ProductImage2} 
                                                            alt="" 
                                                            height={100}
                                                            className='w-100' />
                                                  </div>                                                                      
                                             </SwiperSlide>

                                             <SwiperSlide>
                                                  <div className='content'>
                                                       <img 
                                                            src={ProductImage3} 
                                                            alt="" 
                                                            height={100}
                                                            className='w-100' />
                                                  </div>                                                                      
                                             </SwiperSlide>
                                        </Swiper>

                                   </div>
                                   <div className="col-10">
                                        <Swiper
                                             style={{
                                             '--swiper-navigation-color': '#000',
                                             '--swiper-pagination-color': '#000',
                                             }}
                                             loop={true}
                                             spaceBetween={0}
                                             navigation={true}
                                             thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                             modules={[FreeMode, Navigation, Thumbs]}
                                             className="mySwiper2"
                                             >
                                             
                                             <SwiperSlide >
                                                  <div className='content'>
                                                  <img 
                                                       src={ProductImage1} 
                                                       alt="" 
                                                       className='w-100' />
                                                  </div>
                                             </SwiperSlide> 
                                             
                                             <SwiperSlide >
                                                  <div className='content'>
                                                  <img 
                                                       src={ProductImage2} 
                                                       alt="" 
                                                       className='w-100' />
                                                  </div>
                                             </SwiperSlide> 
                                             
                                             <SwiperSlide >
                                                  <div className='content'>
                                                  <img 
                                                       src={ProductImage3} 
                                                       alt="" 
                                                       className='w-100' />
                                                  </div>
                                             </SwiperSlide>           
                                        </Swiper>
                                   </div>
                              </div>


                         </div>
                         <div className="col-md-7 col-sm-12">
                              <h3>Dummy Product</h3>
                              <div className='d-flex'>
                                   <Rating
                                        size={20}
                                        readonly
                                        initialValue={rating}
                                   />
                                   <span className="pt-1 ps-2">10 Reviews</span>
                              </div>
                              <div className="price h4 py-3">
                                   20Ths <span className="text-decoration-line-through ps-2">25Ths</span>
                              </div>
                              <div className="description pe-3">
                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet adipisci molestiae earum aperiam? Quibusdam, natus.
                              </div>
                              <div className="sizes pt-4">
                                   <h5 className="">Select Size</h5>
                                   <button className="btn btn-size ms-1">S</button>
                                   <button className="btn btn-size ms-1">M</button>
                                   <button className="btn btn-size ms-1">L</button>
                                   <button className="btn btn-size ms-1">XL</button>
                              </div>
                              <div className="add-to-cart my-4">
                                   <button className='btn btn-primary text-uppercase'>Add To Cart</button>
                              </div>
                              <hr />
                              <div>
                                   <strong>SKU: </strong>
                                   DDXX2234
                              </div>
                         </div>
                    </div>
                    <div className='row mb-5'>
                         <div className="col-md-12 col-sm-12">
                              <Tabs
                                   defaultActiveKey="home"
                                   id="uncontrolled-tab-example"
                                   className="mb-3"                              >
                                   <Tab eventKey="home" title="Description">
                                        Description Area
                                   </Tab>
                                   <Tab eventKey="profile" title="Review">
                                        Review Area (10)
                                   </Tab>
                              </Tabs>
                         </div>
                    </div>
               </div>
          </Layout>
    </>
  );
};

export default Product;