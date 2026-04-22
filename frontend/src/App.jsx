import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/common/Home';
import Shop from './components/common/Shop'
import Product from './components/common/Product';
import Cart from './components/common/Cart';
import Checkout from './components/common/Checkout';
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard';
import { AdminRequireAuth } from './components/admin/AdminRequireAuth';

import { default as AdminLogin} from './components/admin/Login';
import { default as AdminRegister } from './components/admin/Register';
import { default as UserRegister } from './components/common/Register';
import { default as UserLogin } from './components/common/Login';

import { default as ShowCategories } from './components/admin/category/Show';
import { default as CreateCategory } from './components/admin/category/Create';
import { default as EditCategory } from './components/admin/category/Edit';

import { default as ShowBrands } from './components/admin/brand/Show';
import { default as CreateBrand } from './components/admin/brand/Create';
import { default as EditBrand } from './components/admin/brand/Edit';

import { default as ShowProducts } from './components/admin/product/Show';
import { default as CreateProduct } from './components/admin/product/Create';
import { default as EditProduct } from './components/admin/product/Edit';

import { default as ShowUsers } from './components/admin/user/Show'
import { default as ShowProfile } from './components/admin/profile/Show'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop-product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          
          <Route path='/account/login' element={<UserLogin />} />
          <Route path='/account/register' element={<UserRegister />} />

          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/register' element={<AdminRegister />} />
          

          {/*----DASHBOARD----*/}
          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />            

          {/*----CATEGORIES----*/}
          <Route path='/admin/categories' element={
            <AdminRequireAuth>
              <ShowCategories />
            </AdminRequireAuth>
          } />
          <Route path='/admin/categories/create' element={
            <AdminRequireAuth>
              <CreateCategory />
            </AdminRequireAuth>
          } />
          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth>
              <EditCategory />
            </AdminRequireAuth>
          } />   

          {/*----BRANDS----*/}
          <Route path='/admin/brands' element={
            <AdminRequireAuth>
              <ShowBrands />
            </AdminRequireAuth>
          } />            
          <Route path='/admin/brands/create' element={
            <AdminRequireAuth>
              <CreateBrand />
            </AdminRequireAuth>
          } />                       
          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth>
              <EditBrand />
            </AdminRequireAuth>
          } />       

          {/*----PRODUCTS----*/}                
          <Route path='/admin/products' element={
            <AdminRequireAuth>
              <ShowProducts />
            </AdminRequireAuth>
          } />                       
          <Route path='/admin/products/create' element={
            <AdminRequireAuth>
              <CreateProduct />
            </AdminRequireAuth>
          } />                       
          <Route path='/admin/products/edit/:id' element={
            <AdminRequireAuth>
              <EditProduct />
            </AdminRequireAuth>
          } />

          <Route path='/admin/users' element={
            <AdminRequireAuth>
              <ShowUsers />
            </AdminRequireAuth>
          } />

          <Route path='/admin/profile' element={
            <AdminRequireAuth>
              <ShowProfile />
            </AdminRequireAuth>
          } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
