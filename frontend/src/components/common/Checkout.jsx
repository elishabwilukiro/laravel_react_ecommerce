import { useState, useContext } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
//import { CartContext } from './context/Cart.jsx';
import { CartContext } from '../context/Cart';
import ProductImage from '../../assets/images/Mens/9.jpg';

const Checkout = () => {
     const [paymentMethod, setPaymentMethod] = useState('cod');
     const { cartData, grandTotal, subTotal, shipping } = useContext(CartContext);

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
                                   </div>
                              </form>
                         </div>
                         <div className="col-md-5 col-sm-12">
                              <h3 className="border-bottom pb-3">Item(s)</h3>
                              <table className="table">
                                   <tbody>
                                        {
                                             cartData && cartData.map((item, index) => {
                                                  return(                                                                                         
                                                       <tr key={index}>
                                                            <td width={100}>
                                                                 <img src={item.image_url} width={80} />
                                                            </td>
                                                            <td width={600}>
                                                                 <h3>{item.name}</h3>
                                                                 <div className="d-flex align-items-center pt-3">
                                                                      <span>TZS {new Intl.NumberFormat('en-TZ').format(item.price)}</span>
                                                                           <div className='ps-3'>
                                                                                {
                                                                                     item.size && <button className='btn btn-size'>item.size</button>
                                                                                }                                                                           
                                                                           </div>
                                                                      <div className="ps-5">x {item.qty}</div>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  );
                                             })
                                        }
                                   </tbody>
                              </table>

                              <div className="col-12">
                                   <div className="d-flex justify-content-between border-bottom py-3">
                                        <div><strong>Subtotal: </strong></div>
                                        <div>TZS {new Intl.NumberFormat('en-TZ').format(subTotal())}</div>
                                   </div>

                                   <div className="d-flex justify-content-between border-bottom py-3">
                                        <div><strong>Shipping: </strong></div>
                                        <div>TZS {new Intl.NumberFormat('en-TZ').format(shipping())}</div>
                                   </div>

                                   <div className="d-flex justify-content-between border-bottom py-3">
                                        <div><strong>Grand Total: </strong></div>
                                        <div>TZS {new Intl.NumberFormat('en-TZ').format(grandTotal())}</div>
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