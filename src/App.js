import Login from "./pages/login";
import Register from "./pages/register";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";

import New from "./pages/new/New";
import "./App.scss";

import Public from "./components/Public";
import Private from "./components/Private";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./features/auth/RequireAuth";
// import UsersList from "./features/users/UsersList";
// import List from "./pages/list/List";
import Categories from "./pages/categories/Categories";
import Products from "./pages/Products/Products";
import ProductDescription from "./pages/ProductDesc/ProductDesc";
import Order from "./pages/order";
import ShippingInfo from "./components/modal";
import Prefetch from "./features/auth/Prefetch";
import Users from "./pages/users/Users";

function App() {
  return (
    <Routes>
      {/* ========= login page ============ */}

      <Route path="login" element={<Login />} />

      {/* ========= register page ============ */}

      <Route path="register" element={<Register />} />

      <Route path="unauthorized" element={<Unauthorized />} />

      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          {/* ========= protected admin pages ============ */}
          <Route element={<Prefetch/>}>

          <Route index element={<Home />} />

          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":productId" element={<ProductDescription />} />
          </Route>
          <Route path="categories">
            <Route index element={<Categories />} />

            <Route path="new" element={<New title="Add New category" />} />
          </Route>
          <Route path="/orders" element={<Order />} />
          <Route path="/orders/:orderId" element={<ShippingInfo />} />
          <Route path="users">
            <Route index  element={<Users/>}/>
          </Route>

          <Route path="/private" element={<Private />} />
        </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
