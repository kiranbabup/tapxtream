import { Routes, Route } from "react-router-dom";
// import SignUp from "./Pages/SignUp";
// import LogIn from "./Pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./Pages/PageNotFound";
import UpdateProfile from "./Pages/UpdateProfile";
import Pro from "./Pages/pro";
import CreateNFC from "./Pages/CreateNFC";
// import UP from "./Pages/up";
import ProductsNServices from "./Pages/ProductsNServices";
import Enquiries from "./Pages/Enquiries";
import HomePage from "./Pages/HomePage";
import CompatablePage from "./Pages/CompatablePage";
import PhoneSignUp from "./Pages/PhoneSignUp";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import LoginPage from "./Pages/LoginPage";
import CreatePersonalProfile from "./Pages/creation/CreatePersonalProfile";
import SubmitMediaDetails from "./Pages/creation/SubmitMediaDetails";
import NFCDesignPricing from "./Pages/NFCPricing/NFCDesignPricing";
import NFCCardDisplay from "./Pages/NFCPricing/NFCCardDisplay";
import FillCompanyDetails from "./Pages/creation/FillCompanyDetails";

const Router = () => {
  return (
    <UserAuthContextProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* <Route path="/login" element={<LogIn />} /> */}
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/register-now" element={<PhoneSignUp />} />

      <Route path="/compatible-phones" element={<CompatablePage />} />


      <Route path="/404" element={<PageNotFound />} />
      <Route path="/profile/:id" element={<Pro/>} />
        {/* <Route path="/create-nfc-design" element={<CreateNFC />} /> */}

      <Route element={<ProtectedRoute />}>
        <Route path="/create-profile" element={<CreatePersonalProfile />} />
        <Route path="/company-details" element={<FillCompanyDetails />} />
        <Route path="/fill-social-profiles" element={<SubmitMediaDetails />} />
        <Route path="/select-nfctype" element={<NFCDesignPricing />} />
        <Route path="/nfc-display" element={<NFCCardDisplay />} />
        
        {/* <Route path="/update-profile" element={<UP />} /> */}
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/add-products-and-services" element={<ProductsNServices />} />
        <Route path="/enquiries" element={<Enquiries />} />
      </Route>

    </Routes>
    </UserAuthContextProvider>
  );
};

export default Router;
