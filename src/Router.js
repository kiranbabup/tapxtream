import { Routes, Route } from "react-router-dom";
// import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./Pages/PageNotFound";
import UpdateProfile from "./Pages/UpdateProfile";
import ProfilePage from "./Pages/ProfilePage";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="/p" element={<ProfilePage />} />
            {/* <Route path="/profile/:id" element={<Profile />} /> */}

            <Route
                path="/update-profile"
                element={
                    <ProtectedRoute>
                        <UpdateProfile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default Router;
