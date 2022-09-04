import React from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedChart from '../../components/featuredChart/FeaturedChart'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Table from '../../components/list/List'
import Widjet from '../../components/widjets/Widjet'
import "./home.scss"
import List from '../../components/list/List'

const Home = () => {
  return (
    <div className="home">
      <Sidebar/>
      <div className='homeContainer'>
      {/* <Navbar/> */}
      <div className='widjets'>
        <Widjet type="user"/>
        <Widjet type="order"/>
        <Widjet type="earning"/>
        <Widjet type="balance"/>

      </div>
      <div className="charts">
        <FeaturedChart/>
        <Chart aspect={2 / 1} title="Transactions"/>
      </div>
      <div className="listContainer">
        <div className="listTitle">latest Transactions</div>
         <List/>
        

      </div>


      </div>
      
      
      </div>
  )
}




export default Home