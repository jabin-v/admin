import React, { useEffect, useMemo, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedChart from "../../components/featuredChart/FeaturedChart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/list/List";
import Widjet from "../../components/widjets/Widjet";
import "./home.scss";
import List from "../../components/list/List";
import { selectCurrentToken } from "../../features/auth/authSlice";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/orderStatics";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../helpers/userRequest";
import { compareIncome, setIncome } from "../../features/stats/statsApiSlice";
const BASE_URL = "http://localhost:3500/api";

const Home = () => {
  const dispatch = useDispatch();

  const token = useSelector(selectCurrentToken);

  //total pending orders
  const [count, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/order/order-count",
    requestConfig: {
      headers: {
        Authorization: "Bearer " + token,
      },
      // data:{
      //   if we are sending a post request
      // }
    },
  });

  //total users
  const [userCount, usererror, userloading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/users/userstats",
    requestConfig: {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  });

  //income

  const [income, incomeError, incomeLoading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/order/income",
    requestConfig: {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  });

  useEffect(() => {
    if (income.length > 0) {
      dispatch(setIncome(income));
    }
  }, [dispatch,income]);

const incomeComparison=useSelector(compareIncome)


const percentage=(incomeComparison[1]?.total * 100) /incomeComparison[0]?.total - 100 ;







  return (
    <div className="home">
     
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar/> */}
        <div className="widjets">
          <Widjet type="user" count={userCount[0]?.num} diff="0" />
          <Widjet type="order" count={count[0]?.num}  diff="0"/>
          <Widjet type="earning"   count={incomeComparison[1]?.total}   diff={Math.floor(percentage)} />
        </div>
        <div className="charts">
          <FeaturedChart  />
          <Chart aspect={2 / 1} title="Transactions" />
        </div>
        <div className="listContainer">
          <div className="listTitle">latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
