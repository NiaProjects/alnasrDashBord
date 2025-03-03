import React, { useState } from 'react'
import useApi from '../../hooks/useApi'
import PopUp from '../../components/PopUp/PopUp'
import OffersForm from './OffersForm'

export default function Offers() {
        const [ShowForm, setShowForm] = useState(false)
        function closeForm() {
            setShowForm(false)
        }
    const {data , isLoading} = useApi({url : "https://www.test.nia.com.eg/alnasr/public/api/offers" , method : "get" , queryKey : ["offers"]})
    if(isLoading) return <h1>Loading...</h1>


  return <> 
  {ShowForm && <PopUp ShowForm closeForm={closeForm}> <OffersForm/>  </PopUp>}
  <button onClick={() => setShowForm(true)} type="button" className="text-white bg-main hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg  px-5 py-2.5 mx-auto my-4 " onClick={() => setShowForm(true)}>Add New</button>
  <div className='grid grid-cols-4 gap-4 '>
  {data.data.map((offer)=> <div className='bg-white p-4 rounded-xl  shadow-xl hover:scale-[1.02] transition-all duration-300'  key={offer.id}>

        <img src={ "https://www.test.nia.com.eg/alnasr/storage/app/public/" + offer.img} className='w-full rounded-xl' alt="" />
        <button className='py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl my-2 block mx-auto'>Delete</button>

  </div>)}
  </div>
  </>
}
