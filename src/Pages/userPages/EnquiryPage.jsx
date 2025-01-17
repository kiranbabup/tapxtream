import React, { useEffect, useState } from "react";
import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import UserHeaderComponent from "../../components/mainComponents/UserHeaderComponent";
import SelectnBuyComp from "../../components/SelectnBuyComp";

const columns = [
    { id: 'enquiryphone', label: 'Phone', },
    { id: 'enquiryname', label: 'Name', },
    { id: 'enquiryemail', label: 'Email', },
];

const EnquiryPage = () => {
    const [enquiryData, setEnquiryData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [paymentStatus, setPaymentStatus] = useState("");

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
                setPaymentStatus(data.paymentStatus || "")
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
        <Box sx={{
            width: { md: "100vw", xs: "100vw" }, backgroundColor: "#111010",
            height: "100vh"
        }}>
            <UserHeaderComponent />
            <Box sx={{ height: "10vh" }} ></Box>
            {
                ((paymentStatus === "Pending") || (paymentStatus === "")) ?
                    (
                        <SelectnBuyComp />
                    ) : (
                        <Box
                            sx={{ width: "100%", display: "flex", justifyContent: "center", padding: "1rem 0px", }}
                        >
                            {
                                enquiryData.length != 0 ?
                                    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
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
                                    :
                                    <Typography sx={{
                                        backgroundColor: "white",
                                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                                        borderRadius: "10px",
                                        p: "1rem"
                                    }} >
                                        No enquires received yet
                                    </Typography>
                            }
                        </Box >
                    )
            }
        </Box >
    );
};

export default EnquiryPage;