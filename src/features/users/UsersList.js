import { useGetUsersQuery } from "./userApiSlice"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.scss"

const UsersList = () => {
    const {
        data:users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    // console.log(user)

//    const users=useSelector(selectAllUsers)

 return(
    <div>
         <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">Username</TableCell>
            <TableCell className="tableCell">UserRoles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="tableCell">{user._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src="https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg" alt="" className="image" />
                  {user.username}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {
                    user.roles.User
                }
                {
                  user.roles?.Admin && ` &  ${user.roles?.Admin}`
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        
    </div>
 )
}
export default UsersList