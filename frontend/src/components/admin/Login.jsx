import React, { useContext } from 'react';
import Layout from '../common/Layout';
import { useForm } from "react-hook-form";
import { apiUrl } from '../common/Http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';

const Login = () => {
     // const {login} = useContext(AdminAuthContext);
     const{
          register,
          handleSubmit,
          watch,
          formState: {errors},
     } = useForm();

     const navigate = useNavigate();

     const onSubmit = async (data) => {
          console.log(data)
          const res = await fetch(`${apiUrl}/admin/login`,{
               method: 'POST',
               headers: {'Content-type' : 'application/json'},
               body: JSON.stringify(data)
          }).then(res => res.json())
          .then(result => {
               if (result.status == 200){
                    const adminInfo = {
                         token: result.token,
                         id: result.id,
                         name: result.name
                    }
                    localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
                    toast.success("Login successful")
                    // login(adminInfo)
                    setTimeout(() => {                    
                         navigate('/admin/dashboard')
                    }, 500);
               }else{
                    toast.error(result.message);
               }
          });
     }
  return (
    <>
          <Layout>
               <div className="container d-flex justify-content-center py-5 form">
                    <div className="col-md-4 col-sm-12">
                         <div className="card shadow border-0">
                              <div className="card-header">
                                   <h2 className='card-title text-center'>Login</h2>
                              </div>
                              <div className="card-body p-4">
                                   <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group mb-3">
                                             <label htmlFor="" className='form-label'>Email <span className="text-danger">*</span></label>
                                             <input
                                                  type="text" 
                                                  {...register("email", { required: "The email field is required." })}
                                                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                  placeholder='Email' />
                                                  {errors.email && (
                                                       <p className="invalid-feedback">{errors.email.message}</p>
                                                  )}   
                                        </div>
                                        <div className="form-group mb-3">
                                             <label htmlFor="" className='form-label'>Password <span className="text-danger">*</span></label>
                                             <input 
                                                  type="password" 
                                                  {...register("password",{required: "The password field is required."})}
                                                  className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                                  placeholder='Password' />
                                                  {errors.password && (
                                                       <p className='invalid-feedback'>{errors.password.message}</p>
                                                  )}
                                        </div>
                                        <div className="form-group mb-3">
                                             <button type="submit" className='btn btn-secondary w-100'>Login</button>
                                        </div>
                                        <Link to="/admin/register" className='text-decoration'>Don't have an account?</Link>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>

          </Layout>
    </>
  );
};

export default Login;