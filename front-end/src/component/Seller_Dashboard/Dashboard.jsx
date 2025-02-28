import React, { useEffect, useState } from 'react'
import Charts from './Charts';
import Recent_Orders from './Recent_Orders';
import All_StatusColor from './All_StatusColor';

const Dashboard = ({ Order_Data }) => {

  const [Sales_Chart, setSales_Chart] = useState(null)
  const [Order_Chart, setOrder_Chart] = useState(null)
  const [TotalEarning, setTotalEarning] = useState(null)
  const [TotalOrders, setTotalOrders] = useState(null)

  const getChartData = () => {
    if (!Order_Data || Order_Data.length === 0) return;
    let currentDate = new Date();
    let monthsData = {};
    for (let i = 5; i >= 0; i--) {
      let d = new Date();
      d.setMonth(currentDate.getMonth() - i);
      let monthName = d.toLocaleString("en-US", { month: "short" });
      monthsData[monthName] = 0;
    }
    Order_Data.forEach(order => {
      let orderDate = new Date(order.createdAt);
      let monthName = orderDate.toLocaleString("en-US", { month: "short" });
      if (monthsData.hasOwnProperty(monthName)) {
        monthsData[monthName] += order.total_price || 0;
      }
    });
    let formattedData = Object.keys(monthsData).map(month => ({
      name: month,
      sales: monthsData[month],
    }));
    setSales_Chart(formattedData)
  };

  const getOrderChartData = () => {
    if (!Order_Data || Order_Data.length === 0) return;

    let currentDate = new Date();
    let monthsData = {};
    for (let i = 5; i >= 0; i--) {
      let d = new Date();
      d.setMonth(currentDate.getMonth() - i);
      let monthName = d.toLocaleString("en-US", { month: "short" });
      monthsData[monthName] = 0;
    }
    Order_Data.forEach(order => {
      let orderDate = new Date(order.createdAt);
      let monthName = orderDate.toLocaleString("en-US", { month: "short" });
      if (monthsData.hasOwnProperty(monthName)) {
        monthsData[monthName] += order?.products?.quantity || 0;
      }
    });
    let formattedData = Object.keys(monthsData).map(month => ({
      name: month,
      orders: monthsData[month],
    }));
    setOrder_Chart(formattedData)
  };

  const GetTotalEarnings = () => {
    if (!Order_Data || Order_Data.length === 0) return;
    const totalSales = Order_Data.reduce((total, order) => {
      return total + (order.total_price);
    }, 0);
    setTotalEarning(totalSales);
  };

  const GetTotalOrders = () => {
    if (!Order_Data || Order_Data.length === 0) return
    const TotalOrder = Order_Data.reduce((total, order) => {
      return total + (order?.products?.quantity)
    }, 0)
    setTotalOrders(TotalOrder)
  }

  useEffect(() => {
    GetTotalEarnings()
    GetTotalOrders()
    getChartData()
    getOrderChartData()
  }, [Order_Data])

  const statusColors = {
    Processing: "bg-yellow-500",
    Shipped: "bg-blue-500",
    OutForDelivery: "bg-orange-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  return (
    <>
      <div>
        <div className='flex'>
          <Charts data={Order_Chart} TotalOrders={TotalOrders} name={'Total Orders'} />
          <Charts data={Sales_Chart} TotalEarning={TotalEarning} name={'Total Earnings'} isCurrency={true} />
        </div>
        <div>
          <div className='p-4'>
            <div className='p-2 rounded-[15px] w-max ml-[2rem]'>
              <h1 className='font-bold text-[1.2rem]'>Recent Orders</h1>
              <div className='mt-4'>
                <div className='flex w-max font-bold'>
                  <h1 className='w-[12rem]'>Name</h1>
                  <h1 className='w-[12rem]'>Date</h1>
                  <h1 className='w-[12rem]'>Price</h1>
                  <h1 className='w-[5rem]'>Status</h1>
                </div>
              </div>
              <Recent_Orders Order_Data={Order_Data} statusColors={statusColors} />
              <All_StatusColor statusColors={statusColors} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard