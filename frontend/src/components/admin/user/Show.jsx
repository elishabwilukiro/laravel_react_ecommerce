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
                         <h4 className='h4 pb-0 mb-0'>Users</h4>
                         <Link to="/admin/user/create" className="btn btn-primary">Add New</Link>
                    </div>
                    <div className="row">
                         <div className="col-md-3 col-sm-12 side-bar">
                              <Sidebar />
                         </div>
                         <div className="col-md-9 col-sm-12 main-bar">
                              <div className="card shadow">
                                   <div className="card-body">



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