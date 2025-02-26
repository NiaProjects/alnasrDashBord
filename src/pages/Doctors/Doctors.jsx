
import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useApi from '../../hooks/useApi';
import { Box } from '@mui/system';
import { showAlert } from '../../utils/showAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditNote } from '@mui/icons-material';
import axios from 'axios';
import PopUp from '../../components/PopUp/PopUp';
import DoctorsForm from './DoctorsForm';
export default function Doctors() {

    function handelDelete(row) {


        async  function confirmFun() {
             await axios.delete( "https://www.test.nia.com.eg/alnasr/public/api/docs/" + row.id )
             refetch()
          }
        
        
            showAlert(  {title : "Are you sure?" , message : "You won't be able to revert this!" , icon :"warning" , confirmButtonText : "Yes Delete It"  , confirmFun  , confirmMessage : "Deleted Successfully !"} )
        }
        
        
        
        
        
        
        
        const [ShowForm, setShowForm] = useState(false)
        const [updateForm, setUpdateForm] = useState(false)
        function closeForm() {
            setShowForm(false)
            setUpdateForm(null)
        }
         function handelUpdate(params) {



          const copyOfData = JSON.parse(JSON.stringify(params))




           copyOfData.img = null
           copyOfData.cv = null
           
            // copyOfData.exp =   copyOfData.exp  ? JSON.parse(copyOfData.exp) : []
            // copyOfData.certificate = copyOfData.certificate ?  JSON.parse(copyOfData.certificate) : []
            setShowForm(true)
          setUpdateForm(copyOfData)
        
         }
        

const {data , isLoading , refetch} = useApi({
    url: "https://www.test.nia.com.eg/alnasr/public/api/docs",
    method: "get",
    queryKey: ["docs"],
  })



  if(isLoading) return <div>Loading...</div>
  // console.log(JSON.parse(data.data[data.data.length - 1].exp));
  const visibleFields = [ "photo", "name_en", "show" , "actions" , "active" , "desc_en" , "phone" ]; 

  const columns = Object.keys(data.data[0] || {}).filter((key) => !key.endsWith("ar")).map((key) => {

    if(key === "active") return {
        field: key,
        headerName: key.toUpperCase(),
        width: 200,
            algin : "center",
        headerAlign : "center",
        renderCell : ({ row : { show}}) => {
            return (

                <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width : "100%",
                  height: '100%',
                  borderRadius: '12px',

                }}
              >
                {show ?  <span className="text-sm px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium ">active</span> :<span className="text-sm px-6 py-2 rounded-lg bg-red-600 font-medium text-white">Freeze</span>}
                
              </Box>

            )
        }
    }
    if(key === "show") return {
        field: key,
        headerName: key.toUpperCase(),
        width: 200,
            algin : "center",
        headerAlign : "center",
        renderCell : ({ row : { show}}) => {
            return (

                <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width : "100%",
                  height: '100%',
                  borderRadius: '12px',

                }}
              >
                {show ?  <span className="text-sm px-6 py-2 rounded-lg bg-cyan-700 text-white font-medium ">Show</span> :<span className="text-sm px-6 py-2 rounded-lg bg-red-400 font-medium text-white">No Show</span>}
                
              </Box>

            )
        }
    }
    if(key.includes("_en")) return {
        field: key,
        headerName: key.split("_")[0].toUpperCase(),
        width: 200,
        algin : "center",
        headerAlign : "center"
    }
    if(key === "img") return {
        field: "photo",
        headerName: "PHOTO",
        width: 100,
        algin : "center",
        headerAlign : "center",
        renderCell: (params) => (
            <img className='w-12 h-12 rounded-full m-auto' src={ "https://www.test.nia.com.eg/alnasr/storage/app/public/"+ params.row.img} alt="" />
        )
    }
    return {
        field: key,
        headerName: key.toUpperCase(),

        width: 200,
        // flex: 1, 
        // algin : "center",
        headerAlign : "center"
      }


  });
  

  columns.unshift({
    field: "actions",
    headerClassName : "bg-emerald-200 text-black font-bold rounded-lg shadow-lg mb-2 ",  

    headerName: "ACTIONS",
    width: 300,
        algin : "center",
        headerAlign : "center",
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 , justifyContent: "center" , alignItems: "center" }}>
        <button
          className="px-2 py-1 "
          onClick={() => handelUpdate(params.row)}
        >
                <EditNote className='text-blue-500 hover:text-blue-600 hover:scale-110 transition-all' />

        </button>
        <button
          className="px-2 py-1   "
          onClick={() => handelDelete(params.row)}
        >
                <DeleteIcon className='text-red-500 hover:text-red-600 hover:scale-110 transition-all' />

        </button>
      </Box>
    ),
  },)
  
  return (
    <div className='w-full h-[600px]'>


{ShowForm ? <PopUp ShowForm   closeForm={closeForm}> <DoctorsForm refetch={refetch}  updateForm={updateForm}  /> </PopUp> : null}
  <div>
  <button type="button" className="text-white bg-main hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg  px-5 py-2.5 mx-auto my-4 " onClick={() => setShowForm(true)}>Add New</button>

  </div>

<div className=''>
<DataGrid

initialState={{
   columns: {
     columnVisibilityModel: Object.fromEntries(
       columns.map((col) => [col.field, visibleFields.includes(col.field)])
     ),
   },
 }}
         sx={{
           backgroundColor : "white",
           '& .MuiDataGrid-columnHeaders': {
             backgroundColor: '#fff', 
             color: '#000',
             fontSize: '16px',
             fontWeight: 'bold',
             textAlign : "center"
           },
           '& .MuiDataGrid-cell': {
             color: '#334155',
             fontSize: '14px',
             borderBottom: '1px solid #e5e7eb',
             textAlign : "center"
           },
           '& .MuiDataGrid-row:nth-of-type(even)': {
             backgroundColor: '#f1f5f9',
           },
           '& .MuiDataGrid-row:hover': {
             backgroundColor: '#e0f2fe',
             cursor: 'pointer',
           },
           '& .MuiDataGrid-footerContainer': {
             backgroundColor: '#f8fafc',
             borderTop: '1px solid #e2e8f0',
           },
         }}
       columns={columns}
       rows={data.data}
       // disableColumnFilter
       // disableColumnSelector
       // disableDensitySelector
       slots={{ toolbar: GridToolbar }}
       slotProps={{
         toolbar: {
           showQuickFilter: true,
         },
       }}
     />
</div>



    </div>
  );
}