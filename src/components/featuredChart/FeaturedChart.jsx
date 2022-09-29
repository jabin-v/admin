import React, { useMemo } from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { selectCurrentToken } from '../../features/auth/authSlice'
import useAxios from '../../hooks/useAxios'
import axios from "../../apis/statsChart";

import "./featuredChart.scss";
import { useSelector } from 'react-redux';

const data = [
  {
    name: "Page A",
    uv: 4000,
   
  },
  {
    name: "Page B",
    uv: 3000,
   
  },
  {
    name: "Page C",
    uv: 2000,
  
  },
  {
    name: "Page D",
    uv: 2780,
    
  },
  {
    name: "Page E",
    uv: 1890,
   
  },
  {
    name: "Page F",
    uv: 2390,
   
  },
  {
    name: "Page F",
    uv: 2390,
   
  },
  {
    name: "Page F",
    uv: 2390,
   
  },
  {
    name: "Page G",
    uv: 3490,
   
  }
];




const FeaturedChart = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const token = useSelector(selectCurrentToken);
  const [value, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/users/stats",
    requestConfig: {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  });

  let list=[];


  for(let item of value){

    list.push({
      name: MONTHS[item._id - 1],
       "users": item.total


    })
  }









  return (
    <div className='featured'>
     
     <div className="bottom">
     <div className="title">Users</div>
    
      
     <BarChart
      width={500}
      height={250}
      data={list}
      margin={{
        top: 5,
        right: 30,
        left: 5,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="users" fill="#8884d8" />
    </BarChart>

   
           
         

        



     </div>
    </div>
  )
}

export default FeaturedChart