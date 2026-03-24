import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import Sidebar from "../Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Create = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('')
    const [disable, setDisable] = useState(false);
    const [sizes, setSizes] = useState([]);
    // const [checkedSizes, setCheckedSizes] = useState(()=>{
    //   const category = searchParams.get('category');
    //   return category ? category.split(',') : [];
    // });
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
  
    const navigate = useNavigate();
    
    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typing...',
      }),
      [placeholder]
    );

    const{
      register,
      handleSubmit,
      watch,
      formState: {errors},
    } = useForm();
    const saveProduct = async (data) => {
      setDisable(true);
      const formData = {...data, "description":content, "gallery":gallery}
      const res = await fetch(`${apiUrl}/products`,{
        method:   'POST',
        headers: {
          'Content-type'  : 'application/json',
          'Accept'        : 'application/json',
          'Authorization' : `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(formData)
      })
      const result = await res.json();
      // setDisable(false);
      console.log(result.data);
      if(result.status == 200){
        toast.success(result.message);
        navigate('/admin/products');
      }else{
        console.log("Something Went Wrong.")
      }
    }    
    const fetchSizes = async () => {
      const res = await fetch(`${apiUrl}/sizes`,{
        method : 'GET',
        headers : {
          'Content-type'  : 'application/json',
          'Accept'        : 'application/json',
          'Authorization' : `Bearer ${adminToken()}`,
        }
      })
      .then(res => res.json())
      .then(result => {
        if(result.status == 200){
          setSizes(result.data);
        }else{
          console.log("Something went wrong.");
        }
      });
    }
    const fetchBrands = async () => {
      const res = await fetch(`${apiUrl}/brands`,{
        method : 'GET',
        headers : {
          'Content-type'  : 'application/json',
          'Accept'        : 'application/json',
          'Authorization' : `Bearer ${adminToken()}`,
        }
      })
      .then(res => res.json())
      .then(result => {
        if(result.status == 200){
          setBrands(result.data);
        }else{
          console.log("Something went wrong.");
        }
      });
    }
    const fetchCategories = async () => {
      const res = await fetch(`${apiUrl}/categories`,{
        method : 'GET',
        headers : {
          'Content-type'  : 'application/json',
          'Accept'        : 'application/json',
          'Authorization' : `Bearer ${adminToken()}`,
        }
      })
      .then(res => res.json())
      .then(result => {
        if(result.status == 200){
          setCategories(result.data);
        }else{
          console.log("Something went wrong.");
        }
      });
    }

    const handFile = async (e) => {
      const formData = new FormData();
      const file = e.target.files[0];
      if(!file) return;
      formData.append("image", file);
      // setDisable(true);
      const res = await fetch(`${apiUrl}/temp-images`,{
        method : 'POST',
        headers : {
          'Accept'        : 'application/json',
          'Authorization' : `Bearer ${adminToken()}`,
        },
        body: formData
      })
      const result = await res.json();
      // console.log(result.data.image_url);
      if (result.status == 200) {
        gallery.push(result.data.id)
        setGallery(gallery);

        galleryImages.push(result.data.image_url);
        setGalleryImages(galleryImages)

        // setGallery(prev => [...prev, result.data.id]);
        // setGalleryImages(prev => [...prev, result.data.image_url]);
        setDisable(false);
        e.target.value = "";
      } else {
        console.log("Something went wrong.");
      }
    }

    const deleteImage = (image) => {
      const newGallery = galleryImages.filter(gallery => gallery != image)
      setGalleryImages(newGallery);
    }
    // const handleSize = (e) => {
    //   const {checked, value} = e.target;
    //   if(checked){
    //     setCheckedSizes(pre => [...pre, value])
    //   }else{
    //     setCheckedSizes(checkedSizes.filter(id => id != value));
    //   }  
    // }

    useEffect(() => {
      fetchSizes();
      fetchBrands();
      fetchCategories();
    },[]);


  return (
    <>
      <Layout>
            <div className="container p-5">
                <div className="d-flex justify-content-between mb-3">
                      <h4 className='h4 pb-0 mb-0'>Products</h4>
                      <Link to="/admin/products" className="btn btn-primary">Back</Link>
                </div>
                <div className="row">
                      <div className="col-md-3 col-sm-12 side-bar">
                          <Sidebar />
                      </div>
                      <div className="col-md-9 col-sm-12 main-bar">
                          <div className="card shadow">
                                <div className="card-header">
                                    <h3 className="card-title mt-2">Create Product</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(saveProduct)}>
                                      <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Title <span className="text-danger">*</span></label>
                                            <input 
                                              type="text" 
                                              {...register("title", { required: "The title field is required." })} 
                                              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                              placeholder="Product title name"  />
                                              {errors.title && (
                                                <p className="invalid-feedback">{errors.title?.message}</p>
                                              )} 
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Categories <span className="text-danger">*</span></label>
                                            <select 
                                              {...register("category_id", { required: "Please select a category." })} 
                                              className={`form-control ${errors.category_id ? 'is-invalid' : ''}`}>
                                              <option value="">~Select~</option>
                                              {
                                                categories && categories.map((category) => {
                                                  return (<option key={`category-${category.id}`} value={category.id}>{category.name}</option>)
                                                })
                                              }
                                            </select>
                                            {errors.category_id && (
                                              <p className="invalid-feedback">{errors.category_id?.message}</p>
                                            )} 
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Brands <span className="text-danger">*</span></label>
                                            <select 
                                              {...register("brand_id", { required: "Please select a brand." })} 
                                              className={`form-control ${errors.brand_id ? 'is-invalid' : ''}`}>
                                              <option value="">~Select~</option>
                                              {
                                                brands && brands.map((brand) => {
                                                  return (<option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>)
                                                })
                                              }
                                            </select>
                                            {errors.brand_id && (
                                              <p className="invalid-feedback">{errors.brand_id?.message}</p>
                                            )} 
                                          </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Short Description</label>
                                            <textarea {...register("short_description")} rows={3} className="form-control"></textarea>
                                          </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Description</label>
                                              <JoditEditor
                                                ref={editor}
                                                value={content}
                                                config={config}
                                                tabIndex={1}
                                                onBlur={newContent => setContent(newContent)} 
                                                onChange={newContent => {}}
                                              />
                                          </div>
                                        </div>
                                        <p className="h5 py-3 mb-3 border-bottom">Pricing</p>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Price <span className="text-danger">*</span></label>
                                            <input 
                                              type="text" 
                                              {...register("price", { required: "The price field is required." })} 
                                              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                              placeholder="Product price"  />
                                              {errors.price && (
                                                <p className="invalid-feedback">{errors.price?.message}</p>
                                              )} 
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Compare price</label>
                                            <input type="text" {...register("compare_price")} className="form-control" placeholder="Discount price"  />
                                          </div>
                                        </div> 
                                        <p className="h5 py-3 mb-3 border-bottom">Inventory</p>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">SKU <span className="text-danger">*</span></label>
                                            <input 
                                              type="text" 
                                              {...register("sku", { required: "The sku field is required." })} 
                                              className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                                              placeholder="Product sku"  />
                                              {errors.sku && (
                                                <p className="invalid-feedback">{errors.sku?.message}</p>
                                              )} 
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Barcode</label>
                                            <input type="text" {...register("barcode")} className="form-control" placeholder="Product barcode" />
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Qty <span className="text-danger">*</span></label>
                                            <input 
                                              type="text" 
                                              {...register("qty", { required: "The qty field is required." })} 
                                              className={`form-control ${errors.qty ? 'is-invalid' : ''}`}
                                              placeholder="Product quantity"  />
                                              {errors.qty && (
                                                <p className="invalid-feedback">{errors.qty?.message}</p>
                                              )} 
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Status <span className="text-danger">*</span></label>
                                            <select 
                                              {...register("status", { required: "Please select a status." })} 
                                              className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
                                              <option value="">~Select~</option>
                                              <option value="0">Active</option>
                                              <option value="1">Inactive</option>
                                            </select>
                                            {errors.status && (
                                              <p className="invalid-feedback">{errors.status?.message}</p>
                                            )} 
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                          <label htmlFor="">Sizes</label> <br />
                                            {
                                              sizes && sizes.map((size) => {
                                                return(                         
                                                <div className="form-check form-check-inline mb-3" key={`size-${size.id}`}>                         
                                                  <input key={`size-${size.id}`}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={size.id}
                                                    {...register('sizes')}
                                                  />
                                                  <label htmlFor="" className="form-check-label">
                                                    {size.name}
                                                  </label>
                                                </div>
                                                )
                                              })
                                            }
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Is featured? <span className="text-danger">*</span></label>
                                            <select 
                                              {...register("is_featured", { required: "This field is requires." })} 
                                              className={`form-control ${errors.featured ? 'is-invalid' : ''}`}>
                                              <option value="yes">Yes</option>
                                              <option value="no">No</option>
                                            </select>
                                            {errors.featured && (
                                              <p className="invalid-feedback">{errors.featured?.message}</p>
                                            )} 
                                          </div>
                                        </div>
                                        <p className="h5 py-3 mb-3 border-bottom">Gallery</p>
                                        <div className="col-md-12 col-sm-12">
                                          <div className="form-group mb-3">
                                            <label htmlFor="">Image <span className="text-danger">*</span></label>
                                            <input 
                                              type="file" 
                                              onChange={handFile}
                                              className="form-control"
                                              placeholder="Product image"  
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 mb-3">
                                          <div className="row">
                                            {
                                              galleryImages && galleryImages.map((image, index) =>{
                                                return(
                                                  <div className="col-md-2 col-sm-12" key={`image-${index}`}>
                                                    <div className="card shadow-sm">
                                                      <img src={image} alt={image} className="w-100" />
                                                      <button className="btn btn-sm btn-danger" 
                                                      onClick={() => deleteImage(image)}
                                                      >Delete</button>
                                                    </div>
                                                  </div>
                                                )
                                              })
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mb-3">
                                        <button 
                                          disabled={disable}
                                          type="submit" className="btn btn-primary float-right">Save</button>
                                      </div>
                                    </form>                                        
                                </div>
                          </div>
                      </div>
                </div>
            </div>
      </Layout>
    </>
  );
};

export default Create;