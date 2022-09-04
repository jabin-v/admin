import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar/Sidebar"
import './layout.css'

const Layout = () => {
    return (
        <main className="App">
            
            <Outlet />
            
        </main>
    )
}

export default Layout