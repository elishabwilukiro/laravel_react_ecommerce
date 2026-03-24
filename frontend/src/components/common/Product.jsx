import { useContext, useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import Layout from './Layout';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl } from './Http';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { CartContext } from '../context/Cart';
import { toast } from 'react-toastify';

const Product = () => {
     const [rating, setRating] = useState(4.5);
     const [thumbsSwiper, setThumbsSwiper] = useState(null);
     const [products, setProducts] = useState([]);
     const [productImages, setProductImages] = useState([]);
     const [productSizes, setProductSizes] = useState([]);
     const [sizeSelected, setSizeSelected] = useState(null);
     const params = useParams();
     const { addToCart } = useContext(CartContext);

     const fetchProducts = async () => {
          const res = await fetch(`${apiUrl}/shop-product/${params.id}`,{
               method : 'GET',
               headers : {
               'Content-type'  : 'application/json',
               'Accept'        : 'application/json',
               }
          })
          const result = await res.json();
          console.log(result.data)
          if(result.status == 200){
               setProducts(result.data);
               setProductImages(result.data.product_images);
               setProductSizes(result.data.product_sizes);
          }else{
               console.log("Something went wrong.");
          }
     }

     const handleAddToCart = () => {
          if(productSizes.length > 0){
               if(sizeSelected == null){
                    toast.error("Please select a size")
               }else{
                    addToCart(products,sizeSelected)
                    toast.success("Product successfully added to cart")
               }
          }else{
               addToCart(products,null)
               toast.success("Product successfully added to cart")
          }
     }
     useEffect(() => {
          fetchProducts();
     },[]);
     
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
                                             <Link to="#">{products.title}</Link>
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
                                             {
                                                  productImages && productImages.map((product_image)=>{
                                                       return(
                                                            <SwiperSlide>
                                                                 <div className='content' key={product_image.id}>
                                                                      <img src={product_image.image_url} height={100} className='w-100' />
                                                                 </div>                                                                      
                                                            </SwiperSlide>
                                                       )
                                                  })
                                             }
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
                                             {
                                                  productImages && productImages.map((product_image)=>{
                                                       return(
                                                            <SwiperSlide >
                                                                 <div className='content' key={product_image.id}>
                                                                      <img 
                                                                           src={product_image.image_url}
                                                                           className='w-100' 
                                                                      />
                                                                 </div>
                                                            </SwiperSlide> 
                                                       )
                                                  })
                                             }
                                        </Swiper>
                                   </div>
                              </div>
                         </div>
                         <div className="col-md-7 col-sm-12">
                              <h3>{products.title}</h3>
                              <div className='d-flex'>
                                   <Rating
                                        size={20}
                                        readonly
                                        initialValue={rating}
                                   />
                                   <span className="pt-1 ps-2">10 Reviews</span>
                              </div>
                              <div className="price h4 py-3">
                                   TZS{new Intl.NumberFormat('en-TZ').format( products.price)}
                                   <span className="text-decoration-line-through ps-3"> 
                                   TZS{new Intl.NumberFormat('en-TZ').format(products.compare_price)}
                                   </span>
                              </div>
                              <div className="description pe-3">
                                   {products.description?.replace(/<[^>]+>/g, '')}
                              </div>
                              <div className="sizes pt-4">
                                   <h5 className="">Select Size</h5>
                                   {
                                        productSizes && productSizes.map(product_size => {
                                             return(                                             
                                                  <button 
                                                       onClick={() => setSizeSelected(product_size.size.name)} 
                                                       className={`btn btn-size ms-1 ${sizeSelected == product_size.size.name ? 'active' : ''}`} key={product_size.id}>
                                                       {product_size.size.name}
                                                  </button>
                                             )
                                        })
                                   }
                              </div>
                              <div className="add-to-cart my-4">
                                   <button onClick={()=>{handleAddToCart()}} className='btn btn-primary text-uppercase'>Add To Cart</button>
                              </div>
                              <hr />
                              <div>
                                   <strong>SKU: </strong>
                                   {products.sku}
                              </div>
                         </div>
                    </div>
                    <div className='row mb-5'>
                         <div className="col-md-12 col-sm-12">
                              <Tabs
                                   defaultActiveKey="home"
                                   id="uncontrolled-tab-example"
                                   className="mb-3"                              >
                                   <Tab eventKey="home" title="Description" className='active'>
                                        {products.short_description?.replace(/<[^>]+>/g, '')}
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