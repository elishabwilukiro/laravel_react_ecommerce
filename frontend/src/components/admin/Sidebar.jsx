import { useContext } from 'react';
import { AdminAuthContext } from '../context/AdminAuth';
import { Link } from 'react-router-dom';

const Sidebar = () => {
     // const { logout } = useContext(AdminAuthContext);
  return (
    <>
          <div className="card shadow mb-5">
               <div className="card-body p-3">
                    <ul>
                         <li><Link to="/admin/dashboard">Dashboard</Link></li>
                         <li><Link to="/admin/categories">Categories</Link></li>
                         <li><Link to="/admin/brands">Brands</Link></li>
                         <li><Link to="/admin/products">Products</Link></li>
                         <li><Link>Orders</Link></li>
                         <li><Link>Users</Link></li>
                         <li><Link>Shipping</Link></li>
                         <li><Link>Change Password</Link></li>
                         <li><Link>Logout</Link></li>
                    </ul>
               </div>
          </div>
    </>
  );
};

export default Sidebar;