import React from 'react';
import Layout from './Layout';
import ProductImage from '../../assets/images/Mens/4.jpg';
import { Link } from 'react-router-dom';


const Shop = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <nav aria-label='breadcrumb' className='py-4'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to="/">Home</Link>
              </li>
              <li className='breadcrumb-item active' aria-current="page">
                <Link to="/shop">Shop</Link>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-4">
                <div className="card-body p-4">
                  <h3 className='mb-3'>Categories</h3>
                  <ul>
                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Men</label>
                    </li>
                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Women</label>
                    </li>
                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Kids</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card shadow border-0 mb-4">
                <div className="card-body p-4">
                  <h3 className='mb-3'>Brands</h3>
                  <ul>
                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Puma</label>
                    </li>
                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Levis</label>
                    </li>
                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Flying Machine</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row pb-5">
                <div className="col-lg-4 col-md-6 col-6">
                    <div className="product card border-0">
                      <div className="card-img">
                        <img src={ProductImage} alt="Product Image" className='w-100'/>
                      </div>
                      <div className="card-body pt-3">
                        <Link to="/product">Red Check Shirt For Men</Link>
                        <div className="price">
                          50TZS <span className='text-decoration-line-through'>80TZS</span>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-6">
                    <div className="product card border-0">
                      <div className="card-img">
                        <img src={ProductImage} alt="Product Image" className='w-100'/>
                      </div>
                      <div className="card-body pt-3">
                        <Link to="/product">Red Check Shirt For Men</Link>
                        <div className="price">
                          50TZS <span className='text-decoration-line-through'>80TZS</span>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-6">
                    <div className="product card border-0">
                      <div className="card-img">
                        <img src={ProductImage} alt="Product Image" className='w-100'/>
                      </div>
                      <div className="card-body pt-3">
                        <Link to="/product">Red Check Shirt For Men</Link>
                        <div className="price">
                          50TZS <span className='text-decoration-line-through'>80TZS</span>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-6">
                    <div className="product card border-0">
                      <div className="card-img">
                        <img src={ProductImage} alt="Product Image" className='w-100'/>
                      </div>
                      <div className="card-body pt-3">
                        <Link to="/product">Red Check Shirt For Men</Link>
                        <div className="price">
                          50TZS <span className='text-decoration-line-through'>80TZS</span>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-6">
                    <div className="product card border-0">
                      <div className="card-img">
                        <img src={ProductImage} alt="Product Image" className='w-100'/>
                      </div>
                      <div className="card-body pt-3">
                        <Link to="/product">Red Check Shirt For Men</Link>
                        <div className="price">
                          50TZS <span className='text-decoration-line-through'>80TZS</span>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-6">
                    <div className="product card border-0">
                      <div className="card-img">
                        <img src={ProductImage} alt="Product Image" className='w-100'/>
                      </div>
                      <div className="card-body pt-3">
                        <Link to="/product">Red Check Shirt For Men</Link>
                        <div className="price">
                          50TZS <span className='text-decoration-line-through'>80TZS</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </Layout>
    </>
  );
};

export default Shop;