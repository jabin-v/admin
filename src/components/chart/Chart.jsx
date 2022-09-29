import "./chart.scss";
import { selectCurrentToken } from "../../features/auth/authSlice";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/statsChart";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Chart = ({ aspect, title }) => {
  const [userStats, setUserStats] = useState([]);
  const token = useSelector(selectCurrentToken);

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

  const [value, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/order/getmonthwise",
    requestConfig: {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  });

  let list = [];

  for (let item of value) {
    list.push({
      name: MONTHS[item._id - 1],
      Total: item.total,
    });
  }

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={list}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
