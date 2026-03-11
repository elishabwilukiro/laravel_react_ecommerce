import { memo, useState } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import ProductImage from '../../assets/images/Mens/9.jpg';

const Checkout = () => {
     const [paymentMethod, setPaymentMethod] = useState('cod');
     const handlePaymentMethod = (e) => {
          setPaymentMethod(e.target.value)
     }
  return (
    <>
          <Layout>
               <div className="container">
                    <div className="row">
                         <div className="col-md-12 col-sm-12">
                              <nav aria-label='breadcrumb' className='py-4'>
                                   <ol className='breadcrumb'>
                                        <li className='breadcrumb-item'>
                                             <Link to="/">Home</Link>
                                        </li>
                                        <li className='breadcrumb-item active' aria-current="page">
                                             <Link to="#">Checkout</Link>
                                        </li>
                                   </ol>
                              </nav>
                         </div>
                    </div>
                    <div className="row mb-5">
                         <div className="col-md-7 col-sm-12">
                              <h3 className="border-bottom pb-3">Billing Details</h3>
                              <form action="">
                                   <div className="row mb-4">
                                        <div className="col-md-6 col-ms-12">
                                             <div className="form-group mb-3">
                                                  <input type="text" className='form-control' placeholder='Name' />
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input type="email" className='form-control' placeholder='Email' />
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input type="text" className='form-control' placeholder='City' />
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input type="text" className='form-control' placeholder='State' />
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input type="text" className='form-control' placeholder='Zip' />
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input type="text" className='form-control' placeholder='Phone number' />
                                             </div>
                                        </div>

                                        <div className="col-md-12">
                                             <div className="mb-3">
                                                  <button type="submit" className='btn btn-primary w-20'>Submit</button>
                                             </div>
                                        </div>
                                   </div>
                              </form>
                         </div>
                         <div className="col-md-5 col-sm-12">
                              <h3 className="border-bottom pb-3">Item(s)</h3>
                              <table className="table">
                                   <tbody>
                                        <tr>
                                             <td width={100}>
                                                  <img src={ProductImage} alt="" width={80} />
                                             </td>
                                             <td width={600}>
                                                  <h3>Dummy Product Title</h3>
                                                  <div className="d-flex align-items-center pt-3">
                                                       <span>100 Tsh</span>
                                                       <div className='ps-3'>
                                                            <button className='btn btn-size'>Tsh</button>
                                                       </div>
                                                       <div className="ps-5">x 1</div>
                                                  </div>
                                             </td>
                                        </tr>
                                   </tbody>
                              </table>

                              <div className="col-12">
                                   <div className="d-flex justify-content-between border-bottom py-3">
                                        <div><strong>Subtotal: </strong></div>
                                        <div>200 Tsh</div>
                                   </div>

                                   <div className="d-flex justify-content-between border-bottom py-3">
                                        <div><strong>Shipping: </strong></div>
                                        <div>200 Tsh</div>
                                   </div>

                                   <div className="d-flex justify-content-between border-bottom py-3">
                                        <div><strong>Grand Total: </strong></div>
                                        <div>200 Tsh</div>
                                   </div>
                              </div>   
                              <div className="payment">
                                   <h3 className="border-bottom mt-4 pb-3"><strong>Payment Method</strong></h3>
                                   <div className=''>
                                        <input className='' type="radio" onClick={handlePaymentMethod} checked={paymentMethod == 'stripe'} value={'stripe'} name="" id="" />
                                        <label htmlFor="" className='form-label ps-2'>Stripe</label>

                                        <input className='ms-3' type="radio" onClick={handlePaymentMethod} checked={paymentMethod == 'cod'} value={'cod'} name="" id="" />
                                        <label htmlFor="" className='form-label ps-2'>COD</label>
                                   </div>                                   
                                   <div className="d-flex justify-content-start py-3">
                                        <button className='btn btn-primary'>Pay Now</button>
                                   </div>
                              </div>                           
                         </div>
                    </div>
               </div>
          </Layout>
    </>
  );
};

export default Checkout;