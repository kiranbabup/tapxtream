// ... existing code ...
<Box sx={{ position: "relative" }}>
<img src={product.pnsImageUrl} alt={`Product ${index}`} style={{ width: "100%", height: "8rem" }} />
<Typography sx={{ 
    position: "absolute", 
    bottom: 0, 
    left: 0, 
    backgroundColor: "#333", 
    color: "white", 
    fontSize: "10px", 
    p: 2, 
    borderRadius: "0 20px 0 0" 
}}>
    <span style={{ fontWeight: "bold" }}>Price:</span> {getRupee(product.pnsPrice)}/{product.pnsDuration}
</Typography>
</Box>
// ... existing code ...

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'enquiryname', label: 'Name', minWidth: 170 },
  { id: 'enquiryemail', label: 'Email', minWidth: 170 },
  { id: 'enquiryphone', label: 'Phone', minWidth: 170 },
];

export default function Enquiries({ enquiryData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiryData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((edata) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={edata.enquiryemail}>
                    {columns.map((column) => {
                      const value = edata[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={enquiryData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

                    
                    
                    