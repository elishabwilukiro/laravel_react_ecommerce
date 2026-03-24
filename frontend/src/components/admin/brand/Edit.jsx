import { memo } from 'react';
import Sidebar from '../Sidebar';
import Layout from '../../common/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/Http';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Edit = () => {
     const [disable, setDisable] = useState(false);
     const [brand, setBrand] = useState([]);
     const navigate = useNavigate();
     const params = useParams();
     const{
          register,
          handleSubmit,
          reset,
          formState: {errors},
     } = useForm({
          defaultValues: async () => {
               const res = await fetch(`${apiUrl}/brands/${params.id}`,{
                    method:   'GET',
                    headers: {
                         'Content-type'  : 'application/json',
                         'Accept'        : 'application/json',
                         'Authorization' : `Bearer ${adminToken()}`,
                    },
               })
               .then(res => res.json())
               .then(result => {
                    if(result.status == 200){
                         reset({
                              name: result.data.name,
                              status: result.data.status
                         });
                    }else{
                         console.log("Something Went Wrong.")
                    }
               })
               
          }
     });

     const updateBrand = async (data) => {
          setDisable(true);
          console.log(data)
          const res = await fetch(`${apiUrl}/brands/${params.id}`,{
               method:   'PUT',
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
                    navigate('/admin/brands');
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
                                        <h3 className="card-title mt-2">Edit Category</h3>
                                   </div>
                                   <div className="card-body">
                                        <form onSubmit={handleSubmit(updateBrand)}>
                                             <div className="form-group mb-3">
                                                  <label htmlFor="">Name <span className="text-danger">*</span></label>
                                                  <input 
                                                       type="text" 
                                                       {...register("name", { required: "The name field is required." })} 
                                                       className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                       placeholder="Brand name"  />

                                                       {errors.name && (
                                                            <p className="invalid-feedback">{errors.name?.message}</p>
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

export default Edit;