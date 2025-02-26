import React from 'react'
import ChartBar from '../../components/charts/BarChart'
import { LineChart } from '@mui/x-charts'
import { PieChart } from '@mui/x-charts/PieChart'

export default function Home() {
  return <>
  
<section className='p-4'>




    <ChartBar/>

  <div className='flex gap-4 my-4'>
  <LineChart className='bg-white w-1/2'
  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
  series={[
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
      area: true,
    },
  ]}
 
  height={300}
/>


<PieChart 
className='bg-white'
  series={[
    {
      data: [
        { id: 0, value: 10, label: 'Item 1', color: '#09c' },
        { id: 1, value: 50, label: 'Item 2', color: 'orange' },
        { id: 2, value: 20, label: 'Item 3', color: 'green' },
      ],
    },
  ]}
  height={300}
/>



  </div>


</section>
  

  

  </>
}
