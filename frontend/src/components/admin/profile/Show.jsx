import { memo } from 'react';
import Layout from '../../common/Layout';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

const Show = () => {

     
  return (
     <>
          <Layout>
               <div className="container p-5">
                    <div className="d-flex justify-content-between mb-3">
                         <h4 className='h4 pb-0 mb-0'>My Profile</h4>
                         {/* <Link to="/admin/profile/create" className="btn btn-primary">Add New</Link> */}
                    </div>
                    <div className="row">
                         <div className="col-md-3 col-sm-12 side-bar">
                              <Sidebar />
                         </div>
                         <div className="col-md-9 col-sm-12 main-bar">
                              <div className="card shadow">
                                   <div className="card-body">

                                        
                                        <form onSubmit={handleSubmit(updateUser)}>
                                             <div className="form-group mb-3">
                                                  <label htmlFor="" className='form-label'>Name <span className="text-danger">*</span></label>
                                                  <input
                                                       type="text" 
                                                       {...register("name", { 
                                                            required: "The name field is required." 
                                                       })}
                                                       className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                       placeholder='Full name' 
                                                  />
                                                  {errors.name && (
                                                       <p className="invalid-feedback">{errors.name.message}</p>
                                                  )}   
                                             </div>
                                             <div className="form-group mb-3">
                                                  <label htmlFor="" className='form-label'>Email <span className="text-danger">*</span></label>
                                                  <input
                                                       type="text" 
                                                       {...register("email", { 
                                                            required: "The email field is required." 
                                                       })}
                                                       className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                       placeholder='Email' 
                                                  />
                                                  {errors.email && (
                                                       <p className="invalid-feedback">{errors.email.message}</p>
                                                  )}   
                                             </div>
                                             
                                             <div className="form-group mb-3">
                                                  <label htmlFor="">Role <span className="text-danger">*</span></label>
                                                  <select 
                                                       {...register("role", { required: "Please select a role." })} 
                                                       className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                                                       <option value="">~Select~</option>
                                                       <option value="admin">Admin</option>
                                                       <option value="customer">Customer</option>
                                                  </select>
                                                  {errors.role && (
                                                       <p className="invalid-feedback">{errors.role?.message}</p>
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
                                                       <p className="invalid-feedback">{errors.status?.message}</p>
                                                  )} 
                                             </div>
                                             
                                             <div className="mb-3">
                                                  <button 
                                                  disabled={disable}
                                                  type="submit" className="btn btn-primary float-right">Update</button>
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

export default Show;