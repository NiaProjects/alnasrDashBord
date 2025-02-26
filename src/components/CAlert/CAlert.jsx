import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useApi from "../../hooks/useApi";

const SpecializationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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



    const formData = new FormData()

      for (const key in values) {

        formData.append(key, values[key])
        
      }


      const {data} = await axios.post(  "https://www.test.nia.com.eg/alnasr/public/api/specialists" ,formData )
      console.log(data);
      
      formik.resetForm()
  }




  const formik = useFormik({
    initialValues: { name_en: ""  , name_ar : ""},
    validationSchema: validationSchema,
    onSubmit: handelAdd
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Add Specialization"}
        </button>
      </form>
    </div>
  );
};

export default SpecializationForm;
