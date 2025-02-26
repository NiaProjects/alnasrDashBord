import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useApi from "../../hooks/useApi";

const SpecializationForm = ({updateForm , refetch}) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name_en: Yup.string()
      .required("Required")
      .min(3, "Too short!")
      .max(50, "Too long!"),
    name_ar: Yup.string()
      .required("Required")
      .min(3, "Too short!")
      .max(50, "Too long!"),
  });





 async function handelAdd(values) {


  setLoading(true);


    const formData = new FormData()

      for (const key in values) {

        formData.append(key, values[key])
        
      }


      const {data} = await axios.post(  "https://www.test.nia.com.eg/alnasr/public/api/specialists" ,formData )
      console.log(data);
      
      formik.resetForm()
      setLoading(false)
      refetch()
  }
 async function handelUpdate(values) {


  setLoading(true);


    const formData = new FormData()

      for (const key in values) {

        formData.append(key, values[key])
        
      }


      const {data} = await axios.post(  "https://www.test.nia.com.eg/alnasr/public/api/specialists" ,formData )
      console.log(data);
      
      formik.resetForm()
      setLoading(false)
      refetch()
  }




const initialValues = {
 name_en: ""  ,
  name_ar : ""
}


if(updateForm) {
  initialValues.name_en = updateForm.name_en
  initialValues.name_ar = updateForm.name_ar
}

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit:   updateForm ? handelUpdate : handelAdd,
  });

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Add Specialization</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Specialization Name */}
        <div>
          <label htmlFor="name_en" className="block text-sm font-medium text-gray-700">
            Specialization Name (English)
          </label>
          <input
            type="text"
            id="name_en"
            name="name_en"
            value={formik.values.name_en}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Enter specialization in English"
          />
          {formik.errors.name_en && formik.touched.name_en && (
            <div className="text-red-500 font-semibold text-sm mt-1">{formik.errors.name_en}</div>
          )}
        </div>
        <div>
          <label htmlFor="name_en" className="block text-sm font-medium text-gray-700">
            Specialization Name (Arabic)
          </label>
          <input
            type="text"
            id="name_ar"
            name="name_ar"
            value={formik.values.name_ar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Enter specialization in Arabic"
          />
          {formik.errors.name_ar && formik.touched.name_ar && (
            <div className="text-red-500 font-semibold text-sm mt-1">{formik.errors.name_ar}</div>
          )}
        </div>

        {/* Submit Button */}



        {loading ? <button disabled type="button" className="text-white bg-main hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 mx-auto font-medium rounded-lg text-sm px-5 py-2.5 text-center  w-1/2 block items-center">
<svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Loading...
</button> :        <button
          type="submit"
          className="w-1/2 mx-auto block bg-main text-white py-2 rounded-md hover:bg-orange-400 transition"
        >
          Save Specialization
        </button> }
      </form>
    </div>
  );
};

export default SpecializationForm;
