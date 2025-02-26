import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useApi from '../../hooks/useApi';
import { Box } from '@mui/system';
import { showAlert } from '../../utils/showAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditNote } from '@mui/icons-material';
import PopUp from '../../components/PopUp/PopUp';
import SpecializationForm from './SpecializationForm';
import axios from 'axios';
export default function Specialization() {

function handelDelete(row) {


async  function confirmFun() {
     await axios.delete( "https://www.test.nia.com.eg/alnasr/public/api/specialists/" + row.id )
     refetch()
  }


    showAlert(  {title : "Are you sure?" , message : "You won't be able to revert this!" , icon :"warning" , confirmButtonText : "Yes Delete It"  , confirmFun  , confirmMessage : "Deleted Successfully !"} )
}







const [ShowForm, setShowForm] = useState(false)
const [updateForm, setUpdateForm] = useState(false)
function closeForm() {
    setShowForm(false)
}
 function handelUpdate(params) {
console.log(params);
    setShowForm(true)
  setUpdateForm(params)

 }



const {data , isLoading , refetch} = useApi({
    url: "https://www.test.nia.com.eg/alnasr/public/api/specialists",
    method: "get",
    queryKey: ["specialists"],
  })



  if(isLoading) return <div>Loading...</div>

  console.log(data.data);
  const visibleFields = [ "name_en", "name_ar" , "actions" ]; 

  const columns = Object.keys(data.data[0] || {}).map((key) => {

 

    return {
        field: key,
        headerClassName : "shadow-lg",  
        cellClassName: "  ",
        headerName: key.toUpperCase(),
        editable: true,
        width: 400,
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
  
  
  return <> 
<section className=' min-h-screen'>


{ShowForm ? <PopUp ShowForm   closeForm={closeForm}> <SpecializationForm refetch={refetch}  updateForm={updateForm}  /> </PopUp> : null}
  <div>
  <button type="button" className="text-white bg-main hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg  px-5 py-2.5 mx-auto my-4 " onClick={() => setShowForm(true)}>Add New</button>

  </div>
  

  <div className='w-full'>
      <DataGrid
     
      

 initialState={{
    columns: {
      columnVisibilityModel: Object.fromEntries(
        columns.map((col) => [col.field, visibleFields.includes(col.field)])
      ),
    },
  }}
          sx={{

            bgcolor:"#fff",
            shadow:"0 4px 6px rgba(0, 0, 0, 0.1)",
            '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#FF7043', // درجة أغمق من اللون البرتقالي

            //   backgroundColor: '#09c', 
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign : "center",
              
            },
            '& .MuiDataGrid-cell': {
              color: '#334155',
              fontSize: '14px',
              borderBottom: '1px solid #e5e7eb',
              textAlign : "center",
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


</section>
  
  </>
}
