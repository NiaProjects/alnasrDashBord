import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import useApi from "../../hooks/useApi";
import { showAlert } from "../../utils/showAlert";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const DoctorsForm = ({ updateForm, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const validationSchema = Yup.object({
    name_en: Yup.string().min(3, "Too short!").max(50, "Too long!"),
    name_ar: Yup.string().min(3, "Too short!").max(50, "Too long!"),
    title_en: Yup.string(),
    title_ar: Yup.string(),
    desc_en: Yup.string(),
    desc_ar: Yup.string(),
    phone: Yup.string(),
    whats: Yup.string(),
    day_en: Yup.string(),
    day_ar: Yup.string(),
    time_from: Yup.string(),
    time_to: Yup.string(),
    floor: Yup.string(),
    specialist_id: Yup.number(),
    img: Yup.mixed(),
    cv: Yup.mixed(),
    certificate: Yup.array().of(
      Yup.object({ name_en: Yup.string(), name_ar: Yup.string(), date: Yup.string() })
    ),
    exp: Yup.array().of(
      Yup.object({ name_en: Yup.string(), name_ar: Yup.string(), date: Yup.string() })
    ),
  });

  const initialValues = updateForm || {
    name_en: "",
    name_ar: "",
    title_en: "",
    title_ar: "",
    desc_en: "",
    desc_ar: "",
    phone: "",
    whats: "",
    day_en: "",
    day_ar: "",
    time_from: "",
    time_to: "",
    floor: "",
    specialist_id: "",
    img: null,
    cv: null,
    certificate: [],
    exp: [],
    active : 1,
    show : 0,
    
  };

  const {data: specialists , isLoading: isLoadingSpecialists } = useApi({
      url: "https://www.test.nia.com.eg/alnasr/public/api/specialists",
      method: "get",
      queryKey: ["specialists"],
    })
  

  async function handleSubmit(values) {
    console.log("🔴 Form is submitting! Step:", step);

    console.log(values);
    // if (!values.img) {
    //   values.img = updateForm?.img 
    // }
    // if (!values.cv) {
    //   values.cv = updateForm?.cv 
    // }
    // setLoading(true);
    const formData = new FormData();

    for (const key in values) {
      if (key === "certificate" || key === "exp") {
        if (Array.isArray(values[key])) {
          values[key].forEach((item, index) => {
            formData.append(`${key}[${index}][name_en]`, item.name_en);
            formData.append(`${key}[${index}][name_ar]`, item.name_ar);
            formData.append(`${key}[${index}][date]`, item.date);
          });
        } else {
          console.error(`❌ ${key} is not an array`, values[key]);
        }
      } else if (key === "active" ) {
        formData.append(key, values[key]);
      }
        else if (key === "show"){
          
          formData.append(key, values[key]);
        }
       else if (values[key] !== null && values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    }
    
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    
    const {data} =  await axios.post("https://www.test.nia.com.eg/alnasr/public/api/docs", formData);
    console.log(formData);
    console.log(data);
    formik.resetForm();
    setLoading(false);

    MySwal.fire({
      title: "Done!",
      text: "Doctor added successfully",
      icon: "success",
       confirmButtonColor:"#F48120"
    });
    refetch();
  }
  async function handelUpdate(values) {
    console.log(values);
    // if (!values.img) {
    //   values.img = updateForm?.img 
    // }
    // if (!values.cv) {
    //   values.cv = updateForm?.cv 
    // }
    // setLoading(true);
    
    const formData = new FormData();

    for (const key in values) {
      if (key === "certificate" || key === "exp") {
        if (Array.isArray(values[key])) {
          values[key].forEach((item, index) => {
            formData.append(`${key}[${index}][name_en]`, item.name_en);
            formData.append(`${key}[${index}][name_ar]`, item.name_ar);
            formData.append(`${key}[${index}][date]`, item.date);
          });
        } else {
          console.error(`❌ ${key} is not an array`, values[key]);
        }
      } else if (key === "active" || key === "show") {
        formData.append(key, values[key]);
      } else if (values[key] !== null && values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    }
    
  
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  
    
    const {data} =  await axios.post(`https://www.test.nia.com.eg/alnasr/public/api/docs/${values.id}?_method=patch`, formData);
    console.log(data);
    // formik.resetForm();
    setLoading(false);
    MySwal.fire({
      title: "Done!",
      text: "Doctor updated successfully",
      icon: "success",
      confirmButtonColor:"#F48120"
    });
    refetch();
  }

  const formik = useFormik({ initialValues,
     //validationSchema,
   onSubmit:   updateForm ? handelUpdate :  handleSubmit });

  // Function to remove certificate or experience
  const handleRemoveItem = (type, index) => {
    const updatedItems = [...formik.values[type]];
    updatedItems.splice(index, 1);
    formik.setFieldValue(type, updatedItems);
  };

  if(isLoadingSpecialists) return <div>Loading...</div>

  return (
    <div className="max-w- mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-[#F48120]">Add Doctor</h2>

      {/* Flowbite Stepper */}
      <div className="flex gap-4 justify-between mb-6">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`px-4 py-2 rounded ${step === 1 ? 'bg-[#F48120] text-white' : 'bg-gray-300'}`}
        >
          Doctor Info
        </button>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={`px-4 py-2 rounded ${step === 2 ? 'bg-[#F48120] text-white' : 'bg-gray-300'}`}
        >
          Experience & Certificates
        </button>
 

        <button type="button" onClick={() => setStep(3)} className={`px-4 py-2 rounded ${step === 3 ? 'bg-[#F48120] text-white' : 'bg-gray-300'}`}>Schedule & Settings</button>
        <button
          type="button"
          onClick={() => setStep(4)}
          className={`px-4 py-2 rounded ${step === 4 ? 'bg-[#F48120] text-white' : 'bg-gray-300'}`}
        >
          Image & CV
        </button>
      </div>

      <form onSubmit={(e)=> e.preventDefault()} className="space-y-4">
        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Doctor Name (English)</label>
            <input type="text" {...formik.getFieldProps("name_en")} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">Doctor Name (Arabic)</label>
            <input type="text" {...formik.getFieldProps("name_ar")} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">Title (English)</label>
            <input type="text" {...formik.getFieldProps("title_en")} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">Title (Arabic)</label>
            <input type="text" {...formik.getFieldProps("title_ar")} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">Description (English)</label>
            <textarea {...formik.getFieldProps("desc_en")} className="w-full p-2 border rounded" rows="4" />
            <label className="block text-sm font-medium text-gray-700">Description (Arabic)</label>
            <textarea {...formik.getFieldProps("desc_ar")} className="w-full p-2 border rounded" rows="4" />
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" {...formik.getFieldProps("phone")} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
            <input type="text" {...formik.getFieldProps("whats")} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">Specialist</label>
            <select {...formik.getFieldProps("specialist_id")} className="w-full p-2 border rounded">
              <option disabled selected value="">Select</option>
              
              {specialists.data.map((specialist) => (
                <option key={specialist.id} value={specialist.id}>
                  {specialist.name_ar}
                </option>
              ))}

            </select>

            {/* Experience */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              {formik.values.exp.map((_, index) => (
                <div key={index} className="mb-4 bg-slate-200 p-4 rounded-xl">
                  <input
                    type="text"
                    {...formik.getFieldProps(`exp[${index}].name_en`)}
                    placeholder="Experience (English)"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    {...formik.getFieldProps(`exp[${index}].name_ar`)}
                    placeholder="Experience (Arabic)"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="date"
                    {...formik.getFieldProps(`exp[${index}].date`)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("exp", index)}
                    className="text-red-500 flex items-center gap-2 font-semibold mt-2"
                  >
                    <FaTrashAlt />
                    Remove Experience
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => formik.setFieldValue("exp", [...formik.values.exp, { name_en: "", name_ar: "", date: "" }])}
                className="bg-[#F48120] text-white px-4 py-2 rounded mt-2"
              >
                Add Experience
              </button>
            </div>

            {/* Certificates */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Certificates</label>
              {formik.values.certificate.map((_, index) => (
                <div key={index} className="mb-4 bg-slate-200 p-4 rounded-xl">
                  <input
                    type="text"
                    {...formik.getFieldProps(`certificate[${index}].name_en`)}
                    placeholder="Certificate (English)"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    {...formik.getFieldProps(`certificate[${index}].name_ar`)}
                    placeholder="Certificate (Arabic)"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="date"
                    {...formik.getFieldProps(`certificate[${index}].date`)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("certificate", index)}
                    className="text-red-500 flex items-center gap-2 font-semibold mt-2"
                  >
                    <FaTrashAlt />
                    Remove Certificate
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => formik.setFieldValue("certificate", [...formik.values.certificate, { name_en: "", name_ar: "", date: "" }])}
                className="bg-[#F48120] text-white px-4 py-2 rounded mt-2"
              >
                Add Certificate
              </button>
            </div>
          </>
        )}
 {step === 3 && (
          <>
       <div className="flex items-center gap-4 mt-4">
       <label className="block text-sm font-medium text-gray-700">Days(English)</label>
            <input type="text" {...formik.getFieldProps("day_en")} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">Days(Arabic)</label>
            <input type="text" {...formik.getFieldProps("day_ar")} className="w-full p-2 border rounded" />
       </div>
       <div className="flex items-center gap-4 mt-4">
       <label className="block text-sm font-medium text-gray-700">Time From</label>
            <input type="time" {...formik.getFieldProps("time_from")} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">Time To</label>
            <input type="time" {...formik.getFieldProps("time_to")} className="w-full p-2 border rounded" />
       </div>
            <label className="block text-sm font-medium text-gray-700">Floor Number</label>
            <input type="text" {...formik.getFieldProps("floor")} className="w-full p-2 border rounded" />
            <div className="flex justify-around items-center gap-4 mt-4">
            <div >
  <p className="capitalize text-center text-lg mb-1">active</p>
  <label className="relative flex items-center w-20 h-9 cursor-pointer rounded-full border border-gray-200 bg-gray-200 transition-all">
        <input
          type="checkbox"
          className="hidden"
          checked={formik.values.active}
          onChange={() => formik.setFieldValue("active", +(!formik.values.active))}
        />
        <span
          className={`absolute flex items-center justify-center w-7 h-7  rounded-full shadow-md transition-all duration-200 ease-in-out transform ${formik.values.active ? "translate-x-12 bg-green-500" : "translate-x-[2px] bg-red-500"}`}
        >
          {formik.values.active ? <IoCheckmarkSharp className="text-white text-xl" /> : <IoCloseSharp className="text-white text-xl" />}
        </span>
      </label>
</div>

<div>
  <p className="capitalize text-center text-lg mb-1">show</p>
  <label className="relative flex items-center w-20 h-9 cursor-pointer rounded-full border border-gray-200 bg-gray-200 transition-all">
        <input
          type="checkbox"
          className="hidden"
          checked={formik.values.show}
          onChange={() => formik.setFieldValue("show", +(!formik.values.show))}
        />
        <span
          className={`absolute flex items-center justify-center w-7 h-7  rounded-full shadow-md transition-all duration-200 ease-in-out transform ${formik.values.show ? "translate-x-12 bg-green-500" : "translate-x-[2px] bg-red-500"}`}
        >
          {formik.values.show ? <IoCheckmarkSharp className="text-white text-xl" /> : <IoCloseSharp className="text-white text-xl" />}
        </span>
      </label>
</div>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Doctor photo</label>
            <input type="file"  onChange={(e) => formik.setFieldValue("img", e.target.files[0])} className="w-full p-2 border rounded" />
            <label className="block text-sm font-medium text-gray-700">CV (PDF)</label>
            <input type="file"  onChange={(e) => formik.setFieldValue("cv", e.target.files[0])} className="w-full p-2 border rounded" />
          </>
        )}

        <div className="flex justify-between mt-4">
          {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>}
          {step === 4 ? <button type="submit" onClick={formik.handleSubmit}   className="bg-green-500 text-white px-4 py-2 rounded">{loading ? "Loading..." : "Save Doctor"}</button> :

            <button type="button" onClick={() =>{ setStep(step + 1)}} className="bg-[#F48120] text-white px-4 py-2 rounded">Next</button>
           
            
          }
          
        </div>
      </form>
    </div>
  );
};

export default DoctorsForm;
