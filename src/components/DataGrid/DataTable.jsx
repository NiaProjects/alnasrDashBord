import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useApi from "../../hooks/useApi";
import { Box } from "@mui/system";
import { showAlert } from "../../utils/showAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ColumnSelectorGrid() {
  const { data, isLoading } = useApi({
    url: "https://www.test.nia.com.eg/alnasr/public/api/docs",
    method: "get",
    queryKey: ["docs"],
  });

  // ✅ استدعاء useState في البداية قبل أي شرط
  const [rows, setRows] = useState([]);

  // ✅ بمجرد تحميل البيانات، نقوم بتحديث الحالة
  React.useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  // ✅ دالة التعديل
  const handleEdit = (row) => {
    console.log("Editing Row:", row);
  };

  // ❌ دالة الحذف
  const handleDelete = (id) => {
    showAlert({
      title: "Are you sure?",
      message: "This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      confirmFun: () => {
        setRows(rows.filter((row) => row.id !== id));
        showAlert({ title: "Deleted!", message: "Row has been deleted.", icon: "success" });
      },
    });
  };

  // ✅ تحديث الصف عند التعديل المباشر
  const processRowUpdate = (updatedRow) => {
    setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name_en", headerName: "Name", width: 150, editable: true },
    { field: "phone", headerName: "Phone", width: 150, editable: true },
    { field: "desc_en", headerName: "Description", width: 200, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
          <button className="px-2 py-1" onClick={() => handleEdit(params.row)}>
            <EditIcon className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-all" />
          </button>
          <button className="px-2 py-1" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon className="text-red-500 hover:text-red-600 hover:scale-110 transition-all" />
          </button>
        </Box>
      ),
    },
  ];

  return (
    <div className="w-full h-[600px]">
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        initialState={{
          columns: {
            columnVisibilityModel: { desc_en: true, phone: true },
          },
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          },
          "& .MuiDataGrid-cell": {
            color: "#334155",
            fontSize: "14px",
            borderBottom: "1px solid #e5e7eb",
            textAlign: "center",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#f1f5f9",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#e0f2fe",
            cursor: "pointer",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
}
