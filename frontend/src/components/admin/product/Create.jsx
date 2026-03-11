import { Link, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import Sidebar from "../Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";
import { useState } from "react";

const Create = () => {
     const [disable, setDisable] = useState(false);
     const navigate = useNavigate();
     const{
          register,
          handleSubmit,
          formState: {errors},
     } = useForm();
     const saveProduct = async (data) =>{
          setDisable(true);
          const res = await fetch(`${apiUrl}/products`,{
               method:   'POST',
               headers: {
                    'Content-type'  : 'application/json',
                    'Accept'        : 'application/json',
                    'Authorization' : `Bearer ${adminToken()}`,
               },
               body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(result => {
               setDisable(false);
               if(result.status == 200){
                    toast.success(result.message);
                    navigate('/admin/products');
               }else{
                    console.log("Something Went Wrong.")
               }
          })
     }
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
                                <div className="row card-body">
                                    <form onSubmit={handleSubmit(saveProduct)}>
                                          <div className="col-md-12 form-group mb-3">
                                            <label htmlFor="">Title <span className="text-danger">*</span></label>
                                            <input 
                                              type="text" 
                                              {...register("name", { required: "The title field is required." })} 
                                              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                              placeholder="Product title name"  />
                                              {errors.title && (
                                                <p className="invalid-feedback">{errors.title.message}</p>
                                              )} 
                                          </div>
                                          <div className="col-md-6 form-group mb-3">
                                            <label htmlFor="">Categories <span className="text-danger">*</span></label>
                                            <select 
                                              {...register("status", { required: "Please select a status." })} 
                                              className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
                                              <option value="">~Select~</option>
                                            </select>
                                            {errors.status && (
                                              <p className="invalid-feedback">{errors.category.message}</p>
                                            )} 
                                          </div>
                                          <div className="col-md-6 form-group mb-3">
                                            <label htmlFor="">Brands <span className="text-danger">*</span></label>
                                            <select 
                                              {...register("status", { required: "Please select a brand." })} 
                                              className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
                                              <option value="">~Select~</option>
                                            </select>
                                            {errors.status && (
                                              <p className="invalid-feedback">{errors.brand.message}</p>
                                            )} 
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