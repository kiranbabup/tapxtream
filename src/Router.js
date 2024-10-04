import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./Pages/PageNotFound";
import UpdateProfile from "./Pages/UpdateProfile";
import Pro from "./Pages/pro";
import CreateNFC from "./Pages/CreateNFC";
import UP from "./Pages/up";
import ProductsNServices from "./Pages/ProductsNServices";
import Enquiries from "./Pages/Enquiries";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="/profile/:id" element={<Pro/>} />

      <Route element={<ProtectedRoute />}>

        {/* <Route path="/update-profile" element={<UP />} /> */}
        <Route path="/update-profile" element={<UpdateProfile />} />
        {/* <Route path="/create-nfc-design" element={<CreateNFC />} /> */}
        <Route path="/add-products-and-services" element={<ProductsNServices />} />
        <Route path="/enquiries" element={<Enquiries />} />
      </Route>

    </Routes>
  );
};

export default Router;
