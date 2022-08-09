import Login from "./pages/login";
import Register from "./pages/register";
import {Route,Routes} from "react-router-dom"
import Layout from "./components/Layout";
import Home from './pages/home/Home'
import Single from './pages/single/Single'
import New from "./pages/new/New";
import './App.scss'

import Public from "./components/Public";
import Private from "./components/Private";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./features/auth/RequireAuth";
// import UsersList from "./features/users/UsersList";
import List from "./pages/list/List";
import Categories from "./pages/categories/Categories";
import Products from "./pages/Products/Products";
import Users from "./pages/users/Users";


function App() {
  return (
    <Routes>
        {/* ========= login page ============ */}

        <Route path="login" element={<Login/>}/>

      
        
        {/* ========= register page ============ */}

        <Route path="register" element={<Register/>}/>




      <Route path="/" element={<Layout/>}>
        {/* public */}

    
        
        <Route path="unauthorized" element={<Unauthorized/>} />


        {/* ========= protected admin pages ============ */}
        {/* <Route element={<RequireAuth allowedRoles={[5150]}/>} > */}
        <Route index element={<Home/>}/>
        {/* <Route path="users" >
        <Route index element={<List/>}/>
        <Route path=":userId" element={<Single/>}/>
        <Route path="new" element={<New title="Add New User" />}/>
        </Route> */}
        <Route path="products" >
        <Route index element={<Products/>}/>
        <Route path=":producId" element={<Single/>}/>
        <Route path="new" element={<New  title="Add New Product" />}/>
        </Route>
        <Route path="categories" >
        <Route index element={<Categories/>}/>
        <Route path=":category" element={<Single/>}/>
        <Route path="new" element={<New  title="Add New category" />}/>
        </Route> 
        {/* <Route path="/users" element={<Users/>}/> */}
        <Route path="/users" element={<Users/>}/>
        

        <Route path="/private" element={<Private/>}/>
        {/* <Route path="/userslist" element={<UsersList />} /> */}

        {/* </Route> */}

        

        


      
        
        


      </Route>

    </Routes>
  );
}

export default App;
