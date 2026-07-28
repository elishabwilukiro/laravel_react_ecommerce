import { memo, useEffect } from 'react';
import Layout from '../../common/Layout';
import { useForm } from 'react-hook-form';
import Sidebar from '../Sidebar';
import { apiUrl, adminToken } from '../../common/Http';
import { toast } from 'react-toastify';

const Show = () => {
     const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
     } = useForm();

     useEffect(() => {
          const fetchProfile = async () => {
               const token = adminToken();

               try {
                    const res = await fetch(`${apiUrl}/profile`, {
                         method: 'GET',
                         headers: {
                              'Accept': 'application/json',
                              'Authorization': `Bearer ${token}`
                         }
                    });

                    const result = await res.json();

                    console.log(result);

                    if (result.status === 200) {
                         setValue('name', result.user.name || '');
                         setValue('email', result.user.email || '');
                         setValue('role', result.user.role || '');
                         setValue('status', result.user.status ?? '');
                    } else {
                         toast.error(result.message || 'Failed to load profile');
                    }
               } catch (error) {
                    toast.error('Something went wrong while loading profile');
               }
          };

          fetchProfile();
     }, [setValue]);

     const updateUser = async (data) => {
          toast.info('Profile update is not implemented yet.');
     };

     return (
          <>
               <Layout>
                    <div className="container p-5">
                         <div className="d-flex justify-content-between mb-3">
                              <h4 className='h4 pb-0 mb-0'>My Profile</h4>
                         </div>
                         <div className="row">
                              <div className="col-md-3 col-sm-12 side-bar">
                                   <Sidebar />
                              </div>
                              <div className="col-md-9 col-sm-12 main-bar">
                                   <div className="card shadow">
                                        <div className="card-body table-responsive">
                                             
                                             Created At:  <span>{new Date().toLocaleString()}</span> 
                                             <br />
                                             <hr />

                                             <form onSubmit={handleSubmit(updateUser)}>
                                                  <div className="row">                                                                                                            
                                                       <div className="col-md-6 col-sm-12 form-group mb-3">
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
                                                       <div className="col-md-6 col-sm-12 form-group mb-3">
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
                                                       <div className="col-md-6 col-sm-12 form-group mb-3">
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
                                                       <div className="col-md-6 col-sm-12 form-group mb-3">
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
                                                  <div className="mb-3">
                                                       <button
                                                            type="submit"
                                                            className="btn btn-primary float-right">Update</button>
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

export default memo(Show);