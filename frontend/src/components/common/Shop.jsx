import { useEffect, useState } from 'react';
import Layout from './Layout';
import { Link, useSearchParams } from 'react-router-dom';
import { apiUrl } from './Http';


const Shop = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [checkedBrands, setCheckedBrands] = useState(() => {
    const brand = searchParams.get('brands');
    return brand ? brand.split(',') : [];
  });
  
  const [checkedCategories, setCheckedCategories] = useState(() => {
    const category = searchParams.get('category');
    return category ? category.split(',') : [];
  });
  
  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brand-products`,{
      method : 'GET',
      headers : {
      'Content-type'  : 'application/json',
      'Accept'        : 'application/json',
      }
    })
    const result = await res.json()
    console.log(result);
    if(result.status == 200){
      setBrands(result.data);
    }else{
      console.log("Something went wrong.");
    }
  }

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/category-products`,{
      method : 'GET',
      headers : {
        'Content-type'  : 'application/json',
        'Accept'        : 'application/json',
      }
    })
    const result = await res.json()
    console.log(result);
    if(result.status == 200){
      setCategories(result.data);
    }else{
      console.log("Something went wrong.");
    }
  }

  const fetchProducts = async () => {
    console.log(checkedBrands);
    console.log(checkedCategories);

    let search = [];
    let params = '';

    if(checkedBrands.length > 0){
      search.push(['brand', checkedBrands])
    }
    if(checkedCategories.length > 0){
      search.push(['category', checkedCategories])
    }
    if(search.length > 0){
      params = new URLSearchParams(search);
      setSearchParams(params);
    }else{
      setSearchParams([]);
    }
    const res = await fetch(`${apiUrl}/shop-products?${params}`,{
      method : 'GET',
      headers : {
        'Content-type' : 'application/json',
        'Accept'       : 'application/json',
      }
    })
    const result = await res.json();
    console.log(result.data);
    if(result.status == 200){
      setProducts(result.data);
    }else{
      console.log("Something Went Wrong.");
    }
  }


  const handleBrand = (e) => { 
    const {checked, value} = e.target;
    if(checked){
      setCheckedBrands(pre => [...pre, value])
    }else{
      setCheckedBrands(checkedBrands.filter(id => id != value));
    }  
  }
  const handleCategory = (e) => {
    const {checked, value} = e.target;
    if(checked){
      setCheckedCategories(pre => [...pre, value])
    }else{
      setCheckedCategories(checkedCategories.filter(id => id != value));
    }  
  }


  useEffect(() => {
    fetchBrands();
    fetchCategories();
    fetchProducts();
  },[checkedCategories, checkedBrands]);


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
                    {
                      categories && categories.map((category) => {
                        return(
                          <li className='mb-2' key={`category-${category.id}`}>
                            <input 
                              type="checkbox"
                              value={category.id}
                              onChange={handleCategory}
                              checked={
                                searchParams.get('category') ?
                                searchParams.get('category').includes(category.id) :
                                false
                              }
                            />
                            <label htmlFor="" className='ps-2'>{category.name}</label>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className="card shadow border-0 mb-4">
                <div className="card-body p-4">
                  <h3 className='mb-3'>Brands</h3>
                  <ul>
                    {
                      brands && brands.map((brand) => {
                        return(                          
                          <li className='mb-2' key={`brand-${brand.id}`}>
                            <input 
                              type="checkbox"
                              value={brand.id}
                              onChange={handleBrand}
                              checked={
                                searchParams.get('brand') ?
                                searchParams.get('brand').includes(brand.id) :
                                false
                              }
                            />
                            <label htmlFor="" className='ps-2'>{brand.name}</label>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row pb-5">
                {
                  products && products.length > 0 ? (
                    products.map((product) => {
                      return(                      
                        <div className="col-lg-4 col-md-6 col-6" key={`product-${product.id}`}>
                            <div className="product card border-0">
                              <div className="card-img">
                                <Link to={`/shop-product/${product.id}`}>
                                {
                                  (product.image_url == "") ?
                                  <img src="https://placehold.co/400X400"/> :
                                  <img src={product.image_url} width={50} className='w-100' />
                                }
                                </Link>
                              </div>
                              <div className="card-body pt-3">
                                <Link to={`/shop-product/${product.id}`}>
                                  {product.title}
                                </Link>
                                <div className="price">
                                  {product.price}TZS <span className='text-decoration-line-through'>{product.compare_price}TZS</span>
                                </div>
                              </div>
                            </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="col-12 text-start">
                      <p className="text-muted py-4 fst-italic h5">No product image found.</p>
                    </div>
                  )
                }
              </div>

            </div>
          </div>
        </div>

      </Layout>
    </>
  );
};

export default Shop;