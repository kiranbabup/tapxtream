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



import React, { useState } from 'react';
import { Box, Typography, IconButton, Drawer, Divider, Menu, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMediaQuery } from '@mui/material';
import companyLogo from "../../data/images/tapxtream.png";
import LogoutButtonComp from '../LogoutButtonComp';

const UserHeaderComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // For handling subItems menu
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const isActiveRoute = (route) => location.pathname === route;

    const navItems = [
        { label: "Profile", route: "/user-profile" },
        { label: "My NFC Card", route: "/my-nfc-card" },
        { label: "Compatible Phones", route: "/compatible-mobiles" },
        {
            label: "Update Profile",
            subItems: [
                { label: "Update Info", route: "/update-personal-info" },
                { label: "Update Social", route: "/update-social-info" },
                { label: "Update Data", route: "/update-ac-data" },
                { label: "Add Products & Services", route: "/add-products-and-services" }
            ]
        },
        { label: "View Enquiries", route: "/enquery-requests" },
        { isComponent: true, component: <LogoutButtonComp /> },
    ];

    // Open subItems menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close subItems menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{
            width: "100%",
            height: "10vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            zIndex: "10",
            background: "white"
        }}>
            <Box
                component="img"
                alt="Company Logo"
                src={companyLogo}
                sx={{
                    width: "70px",
                    ml: 3,
                    cursor: "pointer",
                }}
                onClick={() => navigate('/')}
            />

            {isMobile ? (
                <>
                    <IconButton onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <Box
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                            sx={{ width: "250px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", mt: 2 }}
                        >
                            <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: "flex-start", ml: 2 }}>
                                <ArrowForwardIosIcon color="info" />
                            </IconButton>
                            <Box width="100%"><Divider /></Box>
                            {navItems.map((item, index) =>
                                item.isComponent ? (
                                    <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                                        {item.component}
                                    </Box>
                                ) : item.subItems ? (
                                    <Box key={index}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                cursor: "pointer",
                                                color: "black",
                                                "&:hover": { color: "gray" }
                                            }}
                                            onClick={handleMenuOpen}
                                        >
                                            {item.label}
                                        </Typography>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            {item.subItems.map((subItem, subIndex) => (
                                                <MenuItem
                                                    key={subIndex}
                                                    onClick={() => {
                                                        navigate(subItem.route);
                                                        handleMenuClose();
                                                    }}
                                                >
                                                    {subItem.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                ) : (
                                    <Typography
                                        key={item.route}
                                        sx={{
                                            fontWeight: 'bold',
                                            cursor: "pointer",
                                            color: isActiveRoute(item.route) ? "gray" : "black",
                                            "&:hover": {
                                                color: "gray"
                                            }
                                        }}
                                        onClick={() => navigate(item.route)}
                                    >
                                        {item.label}
                                    </Typography>
                                )
                            )}
                        </Box>
                    </Drawer>
                </>
            ) : (
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: 10,
                    gap: "20px"
                }}>
                    {navItems.map((item, index) =>
                        item.isComponent ? (
                            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                                {item.component}
                            </Box>
                        ) : item.subItems ? (
                            <Box key={index} sx={{ position: "relative" }}>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        cursor: "pointer",
                                        color: "black",
                                        "&:hover": { color: "gray" }
                                    }}
                                    onMouseEnter={handleMenuOpen}
                                >
                                    {item.label}
                                </Typography>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    onMouseLeave={handleMenuClose}
                                >
                                    {item.subItems.map((subItem, subIndex) => (
                                        <MenuItem
                                            key={subIndex}
                                            onClick={() => {
                                                navigate(subItem.route);
                                                handleMenuClose();
                                            }}
                                        >
                                            {subItem.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (
                            <Typography
                                key={item.route}
                                sx={{
                                    fontWeight: 'bold',
                                    cursor: "pointer",
                                    color: isActiveRoute(item.route) ? "gray" : "black",
                                    "&:hover": {
                                        color: "gray"
                                    }
                                }}
                                onClick={() => navigate(item.route)}
                            >
                                {item.label}
                            </Typography>
                        )
                    )}
                </Box>
            )}
        </Box>
    );
};

export default UserHeaderComponent;
