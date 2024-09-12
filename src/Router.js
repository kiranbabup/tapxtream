import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default Router;
