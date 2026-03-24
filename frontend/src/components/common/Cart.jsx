import { useContext, useState } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/Cart';

const Cart = () => {
     const { cartData, grandTotal, subTotal, shipping, updatedCartItem } = useContext(CartContext);
     const [qty, setQty] = useState([]);

     const handleQty = (e, itemId) => {
          const newQty = e.target.value;
          setQty(prev => ({...prev, [itemId]: newQty}))
          updatedCartItem(itemId, newQty)
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
                                             <Link to="/cart">Cart</Link>
                                        </li>
                                   </ol>
                              </nav>
                         </div>
                    </div>
                    <div className="row">
                         <div className="col-lg-12 col-md-12">
                              <h2 className="border-bottom pb-3">Cart</h2>
                              <table className="table">
                                   <tbody>
                                        {
                                             cartData && cartData.length > 0 ? (

                                                  cartData.map(item => {

                                                       if (!item) return null;

                                                       return(
                                                            <tr key={item.id}>
                                                                 <td width={150}>
                                                                      <img src={item.image_url || ''} alt="" width={80} />
                                                                 </td>
                                                                 <td width={600}>
                                                                      <h3>{item.title}</h3>
                                                                      <div className="d-flex align-items-center pt-3">
                                                                           <span>{new Intl.NumberFormat('en-TZ').format(item.price)} TZS</span>
                                                                           <div className='ps-3'>
                                                                                {
                                                                                     item.size && <button className='btn btn-size'>{item.size}</button>
                                                                                }
                                                                           </div>
                                                                      </div>
                                                                 </td> 
                                                                 <td valign='middle'>
                                                                      <input style={{ width:'80px' }} 
                                                                           type="number" 
                                                                           min={1}
                                                                           max={10}
                                                                           value={qty[item.id] || item.qty} 
                                                                           className='form-control' 
                                                                           onChange={(e) => handleQty(e, item.id)}
                                                                      />
                                                                 </td>
                                                                 <td valign='middle'> 
                                                                      <div className='pt-2'>
                                                                           <button className='btn btn-sm btn-default'>                                                                      
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                                     <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                                                                </svg>
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       )
                                                  })
                                             ) : (
                                                  <tr>
                                                       <td colSpan={4}>
                                                            <p className="text-muted py-4 fst-italic h5">No item selected</p> 
                                                       </td>
                                                  </tr>
                                             )
                                        }
                                   </tbody>
                              </table>
                         </div>
                    </div>
                    <div className="row justify-content-end pb-5">
                         <div className="col-lg-3 col-md-6 col-sm-12">
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

                              <div className="d-flex justify-content-end py-3">
                                   <button className='btn btn-primary'>Proceed To Checkout</button>
                              </div>
                         </div>
                    </div>
               </div>
          </Layout>
    </>
  );
};

export default Cart;