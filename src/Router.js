import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./Pages/PageNotFound";
import UpdateProfile from "./Pages/UpdateProfile";
// import ProfilePage from "./Pages/ProfilePage"; // Assuming you want to use this
import Pro from "./Pages/pro";
import CreateNFC from "./Pages/CreateNFC";

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="/profile/:id" element={<Pro />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Nested Protected Components */}
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/create-nfc-design" element={<CreateNFC />} />
      </Route>

      {/* Catch-all route to handle 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
