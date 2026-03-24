import { useEffect, useState } from 'react';
import { apiUrl } from './Http';
import { Link, Links } from 'react-router-dom';
const LatestProduct = () => {

     const [latests, setLatests] = useState([]);
     const fetchLatestProducts = async () => {
          const res = await fetch(`${apiUrl}/latest-products`,{
               method : 'GET',
               headers : {
                    'Content-type'  : 'application/json',
                    'Accept'        : 'application/json',
               }
          })
          .then(res => res.json())
          .then(result => {
               console.log(result.data);
               if(result.status == 200){
                    setLatests(result.data);
               }else{
                    console.log("Something went wrong.");
               }
          });
     }

     useEffect(() => {
          fetchLatestProducts();
     }, []);

  return (
    <>
          <section className="section-2 py-5">
               <div className="container">
                    <h2 className='mb-3'>New Arrivals</h2>
                    <div className="row">
                         {
                              latests && latests.length > 0 ? (
                                   latests.map((latest, index) => {
                                        return(
                                             <div key={index} className="col-lg-3 col-md-6 col-6">
                                                  <div className="product card border-0">
                                                       <div className="card-img">
                                                            <Link to={`/shop-product/${latest.id}`}>
                                                                 {
                                                                      (latest.image_url == "") ?
                                                                      <img src="https://placehold.co/400X400"/> :
                                                                      <img src={latest.image_url} width={50} className='w-100' />
                                                                 }
                                                            </Link>
                                                       </div>
                                                       <div className="card-body pt-3">
                                                            <Link to={`/shop-product/${latest.id}`}>{latest.title}</Link>
                                                            <div className="price">
                                                            {latest.price}TZS <span className='text-decoration-line-through'>{latest.compare_price}TZS</span>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        )
                                   })
                              ) : (
                                   <div className="col-12 text-start py-3">
                                        <p className="text-muted fst-italic">No product found.</p>
                                   </div>
                              )     
                         }
                    </div>
               </div>
          </section>
    </>
  );
};

export default LatestProduct;