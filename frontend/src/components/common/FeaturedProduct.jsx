import { useEffect, useState } from 'react';
import { apiUrl } from './Http';
import { Link } from 'react-router-dom';

const FeaturedProduct = () => {
     const [features, setFeatures] = useState([]);
     const fetchFeaturedProducts = async () => {
          const res = await fetch(`${apiUrl}/featured-products`,{
               method : 'GET',
               headers : {
               'Content-type'  : 'application/json',
               'Accept'        : 'application/json',
               }
          })
          const result = await res.json()
          console.log(result);
          if(result.status == 200){
               setFeatures(result.data);
          }else{
               console.log("Something went wrong.");
          }
     }

     useEffect(() => {
          fetchFeaturedProducts();
     },[]);
  return (
    <>
          <section className="section-2 py-5">
               <div className="container">
                    <h2 className='mb-3'>Featured Products</h2>
                    <div className="row">
                         {
                              features && features.length > 0 ? (
                                   features.map((feature, index) => {
                                        return(                                        
                                             <div key={`featured-${index}`} className="col-lg-3 col-md-6 col-6">
                                                  <div className="product card border-0">
                                                       <div className="card-img">
                                                            <Link to={`/shop-product/${feature.id}`}>
                                                                 {
                                                                      (feature.image_url == "") ?
                                                                      <img src="https://placehold.co/400X400"/> :
                                                                      <img src={feature.image_url} width={50} className='w-100' />
                                                                 }
                                                            </Link>                                                       
                                                       </div>
                                                       <div className="card-body pt-3">
                                                            <Link to={`/shop-product/${feature.id}`}>{feature.title}</Link>
                                                            <div className="price">
                                                            {feature.price}TZS <span className='text-decoration-line-through'>{feature.compare_price}TZS</span>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        )
                                   })
                              ) : (
                                   <div className="col-12 text-start py-3">
                                        <p className="text-muted fst-italic">No featured product found.</p>
                                   </div>
                              )
                         }
                    </div>
               </div>
          </section>
    </>
  );
};

export default FeaturedProduct;