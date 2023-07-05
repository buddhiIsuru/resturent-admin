import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PosMainLayout from "./pages/POS/posMainLayout";
import MainLayout from "./Utils/MainLayout";
import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company/Company";
import ManageCompany from "./pages/ManageCompany";
import Request from "./pages/Request";
import Categorys from "./pages/Category/Category";
import Outlets from "./pages/Outlet/Outlet";
import Layout from "./layout/Layout";
import Products from "./pages/Products/Products";
import ManageProduct from "./pages/Products/ManageProduct";
import Invoice from './pages/Invoice/Invoice';
import Users from "./pages/Users/Users";
import OrderDevice from "./pages/OrderDevice/OrderDevice";

// const ProtectedRoute = ({
//   component: Component,
//   permissions = [],
//   enabledModules = [],
//   ...restOfProps
// }) => {
//   const isAuthenticated = Helpers.getLocalStorageData("token");
//   const userdetails = Helpers.getLocalStorageData("userdetails");
//   let isPermitted = false;
//   let isModulePermitted = false;
//   if (permissions.length === 0) {
//     isPermitted = false;
//   } else if (userdetails) {
//     if (userdetails.role.permissions.length !== 0) {
//       isPermitted = checkUserPermittedRoute(
//         userdetails.role.permissions,
//         permissions
//       );
//     }
//     if (userdetails.company.enabledModules.length !== 0) {
//       isModulePermitted = checkModulePermittedRoute(
//         userdetails.company.enabledModules,
//         enabledModules
//       );
//     }
//   }

//   return (
//     <Route
//       {...restOfProps}
//       render={(props) =>
//         isAuthenticated && isPermitted && isModulePermitted ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/" />
//         )
//       }
//     />
//   );
// };

function App() {
  return (
    <div className="text-xl font-bold">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pos" element={<PosMainLayout />} />
        {/* <Route path="/admin" element={<MainLayout />} /> */}
      </Routes>
      <Layout>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
          <Route path="/admin/invoice" element={<Invoice />} />
          <Route path="/admin/companies" element={<Company />} />
          <Route path="/admin/manage-company" element={<ManageCompany />} />
          <Route path="/admin/manage-company/:id" element={<ManageCompany />} />
          <Route path="/admin/request-company" element={<Request />} />
          <Route path="/admin/category" element={<Categorys />} />
          <Route path="/admin/outlets" element={<Outlets />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/devices" element={<OrderDevice />} />
          <Route path="/admin/manage-product" element={<ManageProduct />} />
          <Route path="/admin/manage-product/:id" element={<ManageProduct />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;
