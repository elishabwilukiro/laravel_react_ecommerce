import ProductImage from '../../assets/images/Mens/0.jpg';
const LatestProduct = () => {
  return (
    <>
          <section className="section-2 py-5">
               <div className="container">
                    <h2 className='mb-3'>New Arrivals</h2>
                    <div className="row">
                         <div className="col-lg-3 col-md-6 col-6">
                              <div className="product card border-0">
                              <div className="card-img">
                                   <img src={ProductImage} alt="Product Image" className='w-100'/>
                              </div>
                              <div className="card-body pt-3">
                                   <a href="">Red Check Shirt For Men</a>
                                   <div className="price">
                                   50TZS <span className='text-decoration-line-through'>80TZS</span>
                                   </div>
                              </div>
                              </div>
                         </div>
                         <div className="col-lg-3 col-md-6 col-6">
                              <div className="product card border-0">
                              <div className="card-img">
                                   <img src={ProductImage} alt="Product Image" className='w-100'/>
                              </div>
                              <div className="card-body pt-3">
                                   <a href="">Red Check Shirt For Men</a>
                                   <div className="price">
                                   50TZS <span className='text-decoration-line-through'>80TZS</span>
                                   </div>
                              </div>
                              </div>
                         </div>
                         <div className="col-lg-3 col-md-6 col-6">
                              <div className="product card border-0">
                              <div className="card-img">
                                   <img src={ProductImage} alt="Product Image" className='w-100'/>
                              </div>
                              <div className="card-body pt-3">
                                   <a href="">Red Check Shirt For Men</a>
                                   <div className="price">
                                   50TZS <span className='text-decoration-line-through'>80TZS</span>
                                   </div>
                              </div>
                              </div>
                         </div>
                         <div className="col-lg-3 col-md-6 col-6">
                              <div className="product card border-0">
                              <div className="card-img">
                                   <img src={ProductImage} alt="Product Image" className='w-100'/>
                              </div>
                              <div className="card-body pt-3">
                                   <a href="">Red Check Shirt For Men</a>
                                   <div className="price">
                                   50TZS <span className='text-decoration-line-through'>80TZS</span>
                                   </div>
                              </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
    </>
  );
};

export default LatestProduct;