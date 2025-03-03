import { useFormik } from 'formik'
import React, { useState } from 'react'
import Select from "react-select";
import useApi from '../../hooks/useApi';


export default function OffersForm() {

    const {data , isLoading} = useApi({url : "https://www.test.nia.com.eg/alnasr/public/api/docs" , method : "get" , queryKey : ["docs"]})

    const options = data?.data?.map((doc) => ({ value: doc.id, label: doc.name_ar }))
    function handleSubmit(values) {
        
    }
    const formik = useFormik({
        initialValues : {
            img: null , 
            doc_id : null
        },
        onSubmit : handleSubmit
    })

    const [selectedOption, setSelectedOption] = useState(null);
if(isLoading) return <h1>Loading...</h1>
  return <div className='overflow-y-hidden'>
    <form onSubmit={formik.handleSubmit} >

    <Select
    className='mb-10'
      options={options}
      value={selectedOption}
      onChange={setSelectedOption}
      isSearchable
      placeholder="Select an option..."
    />
   <div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize " htmlFor="file_input">Upload offer image</label>
  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
</div>




    </form>
  </div>
}
