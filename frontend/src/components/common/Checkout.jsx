import { useState, useContext } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
//import { CartContext } from './context/Cart.jsx';
import { CartContext } from '../context/Cart';
import ProductImage from '../../assets/images/Mens/9.jpg';
import { apiUrl, userToken } from './Http';

const Checkout = () => {
     const [paymentMethod, setPaymentMethod] = useState('cod');
     const { cartData, grandTotal, subTotal, shipping } = useContext(CartContext);

     const handlePaymentMethod = (e) => {
          setPaymentMethod(e.target.value)
     }

     const{
          register,
          handleSubmit,
          formState: {errors},
     } = useForm();

     const processOrder = (data) => {
          // console.log(data);
          if (paymentMethod == 'cod') {
               saveOrder(data, 'not paid');
          }
     }

     const saveOrder = (formData, paymentStatus) => {
          // console.log(cartData);
          const newFormData = {
               ...formData,
               grand_total: grandTotal(),
               sub_total: subTotal(),
               shipping: shipping(),
               discount: 0,
               payment_status: paymentStatus,
               status: 'pending',
               cart: cartData
          }     

          fetch(`${apiUrl}/save-order`,{
               method: 'POST',
               headers: {
                    'Content-type' : 'application/json',
                    'Accept'  : 'application/json',
                    'Authorization' : `Bearer ${userToken()}`,
               },
               body: newFormData,
          })
          .then(res => res.json())
          .then(result => {
               console.log(result);
          })
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
                    <form action="" onSubmit={handleSubmit(processOrder)}>
                         <div className="row mb-5">
                              <div className="col-md-7 col-sm-12">
                                   <h3 className="border-bottom pb-3">Billing Details</h3> 
                                   <div className="row mb-4">
                                        <div className="col-md-6 col-ms-12">
                                             <div className="form-group mb-3">
                                                  <input 
                                                       {...register('name',{
                                                                 required: "The full name field is required"
                                                            })
                                                       }
                                                       type="text" 
                                                       className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                                       placeholder='Full name' />

                                                  {errors.name && (
                                                       <p className="invalid-feedback">{errors.name?.message}</p>
                                                  )}   
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input 
                                                       {...register('email',{
                                                                 required: "The e-mail field is required.",
                                                                 pattern: {
                                                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                      message: "Invalid e-mail address"
                                                                 }
                                                            })
                                                       }
                                                       type="email" 
                                                       className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                                       placeholder='E-mail' />

                                                  {errors.email && (
                                                       <p className="invalid-feedback">{errors.email?.message}</p>
                                                  )}     
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input
                                                       {...register('phone',{
                                                            required: "The phone number field is required."
                                                       })} 
                                                       type="number" 
                                                       className={`form-control ${errors.phone ? 'is-invalid' : ''}`} 
                                                       placeholder='07...' />
                                                       
                                                  {errors.phone && (
                                                       <p className="invalid-feedback">{errors.phone.message}</p>
                                                  )}     
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input
                                                       {...register('city',{
                                                                 required: "The city field is required."
                                                            })
                                                       } 
                                                       type="text" 
                                                       className={`form-control ${errors.city ? 'is-invalid' : ''}`} 
                                                       placeholder='City' />

                                                  {errors.city && (
                                                       <p className="invalid-feedback">{errors.city?.message}</p>
                                                  )}     
                                             </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                             <div className="mb-3">
                                                  <textarea
                                                       {...register('address',{
                                                                 required: "The address field is required."
                                                            })
                                                       }
                                                       className={`form-control ${errors.address ? 'is-invalid' : ''}`} 
                                                       placeholder='Address' rows={3}></textarea>

                                                  {errors.address && (
                                                       <p className="invalid-feedback">{errors.address?.message}</p>
                                                  )}
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input 
                                                       {...register('state',{
                                                            required: "The state field is required."
                                                       })}
                                                       type="text" 
                                                       className={`form-control ${errors.state ? 'is-invalid' : ''}`} 
                                                       placeholder='State' />
                                                       
                                                  {errors.state && (
                                                       <p className="invalid-feedback">{errors.state?.message}</p>
                                                  )}     
                                             </div>
                                        </div>
                                        <div className="col-md-6 col-ms-12">
                                             <div className="mb-3">
                                                  <input 
                                                       {...register('zip',{
                                                            required: "The zip code field is required."
                                                       })}
                                                       type="text" 
                                                       className={`form-control ${errors.zip ? 'is-invalid' : ''}`} 
                                                       placeholder='Zip' />

                                                  {errors.zip && (
                                                       <p className="invalid-feedback">{errors.zip?.message}</p>
                                                  )}
                                             </div>
                                        </div>
                                   </div>                              
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
                    </form>
               </div>
          </Layout>
    </>
  );
};

export default Checkout;