
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { adminToken ,apiUrl } from '../common/Http';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

const Dashboard = () => {
     const [stats, setStats] = useState({
          totalUser: 0,
          totalProduct: 0,
          totalCategory: 0,
          totalBrand: 0
     });

     const chartData = {
          labels: ["Users", "Products", "Categories", "Brands"],
          datasets: [
               {
                    label: "System Data",
                    data: [
                         stats.totalUser ?? 0,
                         stats.totalProduct ?? 0,
                         stats.totalCategory ?? 0,
                         stats.totalBrand ?? 0
                    ],
                    backgroundColor: [
                         "rgba(54, 162, 235, 0.6)",   // Users (blue)
                         "rgba(255, 159, 64, 0.6)",   // Products (orange)
                         "rgba(75, 192, 192, 0.6)",   // Categories (green)
                         "rgba(153, 102, 255, 0.6)"   // Brands (purple)
                    ],
                    borderColor: [
                         "rgba(54, 162, 235, 1)",
                         "rgba(255, 159, 64, 1)",
                         "rgba(75, 192, 192, 1)",
                         "rgba(153, 102, 255, 1)"
                    ],
                    borderWidth: 1
               }
          ]
     };

     const chartOptions = {
          responsive: true,
          plugins: {
               legend: {
                    position: "top"
               },
               title: {
                    display: true,
                    text: "Dashboard Overview"
               }
          }
     };

     useEffect(() => {
          fetch(`${apiUrl}/dashboard`, {
               method : 'GET',
               headers : {
                    'Content-type'  : 'application/json',
                    'Accept'        : 'application/json',
                    'Authorization' : `Bearer ${adminToken()}`,
               }
          })
          .then(res => res.json())
          .then(result => {
               console.log(result.data);
               if(result.status === 200){
                    setStats(result.data);
               }else{
                    console.log("Something went wrong.");
               }
          })
          .catch(err => console.log(err));
     }, []);
     return (
     <Layout>
               <div className="container p-5">
                    <h3 className='py-3'>Dashboard</h3>
                    <div className="row">
                         <div className="col-md-3 col-sm-12 side-bar">
                              <Sidebar />
                         </div>

                         <div className="col-md-9 col-sm-12 main-bar">
                              <div className="row">
                                   <div className="col-md-3 col-sm-12 mb-3">
                                        <div className="card shadow">
                                             <Link to={`/admin/users`}>
                                                  <div className="card-body">
                                                       <h2>{stats.totalUser ?? 0}</h2>
                                                       <span>Users</span>
                                                  </div>
                                             </Link>
                                        </div>
                                   </div>
                                   <div className="col-md-3 col-sm-12 mb-3">
                                        <div className="card shadow">
                                             <Link to={`/admin/products`}>
                                                  <div className="card-body">
                                                       <h2>{stats.totalProduct ?? 0}</h2>
                                                       <span>Products</span>
                                                  </div>
                                             </Link>
                                        </div>
                                   </div>
                                   <div className="col-md-3 col-sm-12 mb-3">
                                        <div className="card shadow">
                                             <Link to={`/admin/categories`}>
                                                  <div className="card-body">
                                                       <h2>{stats.totalCategory ?? 0}</h2>
                                                       <span>Categories</span>
                                                  </div>
                                             </Link>
                                        </div>
                                   </div>
                                   <div className="col-md-3 col-sm-12 mb-3">
                                        <div className="card shadow">
                                             <Link to={`/admin/brands`}>
                                                  <div className="card-body">
                                                       <h2>{stats.totalBrand ?? 0}</h2>
                                                       <span>Brands</span>
                                                  </div>
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                              
                              <hr className='my-4' />

                              <div className="col-md-12 mt-4">
                                   <div className="card shadow">
                                        <div className="card-body">
                                             <Bar data={chartData} options={chartOptions} />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
     </Layout>
     );
};

export default Dashboard;