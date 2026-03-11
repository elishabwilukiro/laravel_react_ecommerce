import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Layout from "../../common/Layout";
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

     const saveBrand = async (data) => {
          setDisable(true);
          const res =  await fetch(`${apiUrl}/brands`, {
               method:   'POST',
               headers:  {
                    'Content-type'  : 'application/json',
                    'Accept'        : 'application/json',
                    'Authorization' : `Bearer ${adminToken()}`,
               },
               body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(result => {
               if(result.status == 200){
                    toast.success(result.message)
                    navigate('/admin/brands');
               }else{
                    console.log('Something Went Wrong.');
               }
          })
     }

  return (
     <>
          <Layout>
               <div className="container p-5">
                    <div className="d-flex justify-content-between mb-3">
                         <h4 className='h4 pb-0 mb-0'>Brands</h4>
                         <Link to="/admin/brands" className="btn btn-primary">Back</Link>
                    </div>
                    <div className="row">
                         <div className="col-md-3 col-sm-12 side-bar">
                              <Sidebar />
                         </div>
                         <div className="col-md-9 col-sm-12 main-bar">
                              <div className="card shadow">
                                   <div className="card-header">
                                        <h3 className="card-title mt-2">Create Brand</h3>
                                   </div>
                                   <div className="card-body">
                                        <form onSubmit={handleSubmit(saveBrand)}>
                                             <div className="form-group mb-3">
                                                  <label htmlFor="">Name <span className="text-danger">*</span></label>
                                                  <input 
                                                       type="text" 
                                                       {...register("name", { required: "The name field is required." })} 
                                                       className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                       placeholder="Brand name"  />

                                                       {errors.name && (
                                                            <p className="invalid-feedback">{errors.name.message}</p>
                                                       )} 
                                             </div>
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
                                                       <p className="invalid-feedback">{errors.status.message}</p>
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