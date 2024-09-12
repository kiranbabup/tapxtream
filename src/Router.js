import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./Pages/PageNotFound";
import CreateProfile from "./Pages/CreateProfile";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="/profile/:id" element={<Profile />} />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <CreateProfile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default Router;
