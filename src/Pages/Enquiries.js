import React, { useEffect, useState } from "react";
import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import LogoutButtonComp from "../components/LogoutButtonComp";

const columns = [
    { id: 'enquiryname', label: 'Name', minWidth: 170 },
    { id: 'enquiryemail', label: 'Email', minWidth: 170 },
    { id: 'enquiryphone', label: 'Phone', minWidth: 80 },
  ];

const Enquiries = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const fetchEnquiry = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userData = await getDoc(userDoc);

        if (userData.exists()) {
          const data = userData.data();
          setEnquiryData(data.enquiry || []);
        }
      }
    };

    fetchEnquiry();
  }, [user]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ pl: 2, pr: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "end", m: 1 }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/update-profile")}>Update Profile</Button>
        <Box p={1} />
        <LogoutButtonComp />
      </Box>
      <Box p={1} />

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
      <Box p={2} />
    </Box >
  );
};

export default Enquiries;