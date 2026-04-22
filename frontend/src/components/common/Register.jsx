import React from 'react';
import Layout from '../common/Layout';
import { useForm } from "react-hook-form";
import { apiUrl } from '../common/Http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
     const{
          register,
          handleSubmit,
          formState: {errors},
     } = useForm();
     const navigate = useNavigate();

     const onSubmit = async (data) => {
          try {
               const res = await fetch(`${apiUrl}/user-register`,{
                    method: 'POST',
                    headers: {
                         'Content-type' : 'application/json',
                         'Accept'  : 'application/json'
                    },
                    body: JSON.stringify(data)
               })
               .then(res => res.json()) 
               .then(result => {
               
                    if(result.status === 200){                    
                         
                         toast.success(result.message || "You have registered successfully");
                         
                         setTimeout(() => {                    
                              navigate('/account/login');
                         }, 500);

                    }else{

                         if (result.errors) {
                              toast.error(result.message || "Registration failed");
                         } else {
                              toast.error("Please fix the form errors");
                         }
                         toast.error("Please fix the form errors");
                    }
               });
          } catch (error) {
               console.error(error);
               toast.error("Network error. Try again.");
          }
     }
  return (
    <>
          <Layout>
               <div className="container d-flex justify-content-center py-5 form">
                    <div className="col-md-4 col-sm-12">
                         <div className="card shadow border-0">
                              <div className="card-header">
                                   <h2 className='card-title text-center'>Register</h2>
                              </div>
                              <div className="card-body p-4">
                                   <form onSubmit={handleSubmit(onSubmit)}>
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
                                             <label htmlFor="" className='form-label'>Password <span className="text-danger">*</span></label>
                                             <input 
                                                  type="password" 
                                                  {...register("password",{
                                                       required: "The password field is required."
                                                  })}
                                                  className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                                  placeholder='Password' 
                                             />
                                             {errors.password && (
                                                  <p className='invalid-feedback'>{errors.password.message}</p>
                                             )}
                                        </div>
                                        <div className="form-group mb-3">
                                             <button type="submit" className='btn btn-secondary w-100'>Register</button>
                                        </div>
                                        <Link to="/account/login" className='text-decoration'>Already have an account?</Link>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>

          </Layout>
    </>
  );
};

export default Register;