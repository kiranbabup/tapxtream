import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
// import HomeLayout from "./layouts/HomeLayout";
// import PageNotFound from "./layouts/PageNotFound";
// import ProtectedRoute from "./layouts/ProtectedRoute";
// import AdminLogin from "./layouts/AdminLogin";
// import AdminSidebarLayout from "./layouts/adminLayout/indexAdmin";
// import AdminDashboard from "./pages/adminPages/AdminDashboard";
// import UsersListPage from "./pages/adminPages/UsersListPage";
// import EventsListPage from "./pages/adminPages/EventsListPage";
// import ProfilePage from "./pages/ProfilePage";
// import Profile from "./pages/Profile";
// import ProfileId from "./pages/ProfileId";
// import EventPage from "./pages/EventPage";

const Router = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Navigate to="/profile/:id" replace />} /> */}
            <Route path="/" element={<Navigate to="/" replace />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/profile/:id" element={<ProfileId />} /> */}
            {/* <Route path="/404" element={<PageNotFound />} /> */}
            {/* <Route path="/adminmnwlogin" element={<AdminLogin />} /> */}
            {/* <Route path="/event/:id" element={<EventPage />} /> */}
            {/* <Route path="/pro" element={<ProfilePage />} /> */}


            {/* <Route path="/admin" element={<ProtectedRoute type="admin" />}>
                <Route path="" element={<AdminSidebarLayout type="admin" />}>
                    <Route path="mnwdashboard" element={<AdminDashboard />} />
                    <Route path="mnwuserslist" element={<UsersListPage />} />
                    <Route path="mnweventslist" element={<EventsListPage />} />
                    
                </Route>
            </Route> */}


            {/* <Route path="employees" element={<Employees />} />
                <Route path="worksheet" element={<Worksheet />} />
                <Route path="clients" element={<Clients />} />
                <Route path="finance" element={<Finance />} /> */}
            {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
        </Routes>
    );
};

export default Router;
