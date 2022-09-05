import "./widjet.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useAxios from "../../hooks/useAxios";

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const Widjet = ({ type,count,diff }) => {



let data;
  //temporary
  const amount = 100;
  // const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        to:"/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS PENDING",
        isMoney: false,  
       
        link: "View all orders",
        to:"/orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS THIS MONTH",
        isMoney: true,
        link: "View net earnings",
        to:"/orders",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "TOTAL PRODUCTS",
        isMoney: true,
        link: "See details",
        to:"/orders",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widjet">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {count}
        </span>
        <Link  className="linkto" to={data.to}><span className="link">{data.link}</span></Link>
      </div>
      <div className="right">
        <div className="percentage positive">

          {
            diff >  0 ? <KeyboardArrowUpIcon /> :  <KeyboardArrowDown />
          }
          
         
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widjet;