import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRoles, selectCurrentToken } from "./authSlice";



const RequireAuth = ({allowedRoles}) => {

    const token=useSelector(selectCurrentToken);
    const roles=useSelector(selectCurrentRoles);
    // console.log(token)
    // console.log(roles)
    const location=useLocation();

  return (
    //pushing back the user where they are coming from
    roles?.find(role=>allowedRoles?.includes(role)) ? <Outlet/> :
    token ? <Navigate to='/unauthorized' state={{from:location}} replace/> :
     <Navigate to="/login"  state={{from:location}} replace/>
  )
}

export default RequireAuth


