import { GET_INFO } from '@/query/info';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { DataGrid } from '@mui/x-data-grid';

const Detail = () => {

  const [getInfo, { data, loading }] = useLazyQuery(GET_INFO);

  useEffect(() => {
    getInfo();
  }, [])
  
  const columns = [
    {
      field: 'id', headerName: 'ID', width: 20,
      valueGetter: (params) => `${params.row.id}`
    },
    {
      field: 'company_uen', headerName: 'Company UEN', minWidth: 150,
      valueGetter: (params) => `${params.row.company_uen}`
    },
    {
      field: 'company_name',
      headerName: 'Company Name',
      minWidth: 150,
      valueGetter: (params) => params.row.company_name
    },
    {
      field: 'fullname',
      headerName: 'Full Name',
      minWidth: 180,
      valueGetter: (params) => params.row.full_name
    },
    {
      field: 'position',
      headerName: 'Position in Company',
      minWidth: 200,
      valueGetter: (params) => params.row.position
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 230,
      valueGetter: (params) => params.row.email
    },
  ];

  return (
    <div>
      {loading && (
        <Box
          sx={{
            flex: 1,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div style={{ height: 700, width: 1000, padding: 10 }}>
    {data?.userinfo?.length > 0 && (<DataGrid
      getRowId={(row)=> row.id}
      rows={data?.userinfo}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      pageSizeOptions={[5, 10, 20]}
    />)}
  </div>
    </div>
  );
}

export default Detail