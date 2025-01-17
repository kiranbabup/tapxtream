import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import PhoneSignUp from "./Pages/PhoneSignUp";
import LoginPage from "./Pages/LoginPage";
import CompatablePage from "./Pages/CompatablePage";
import UpdateProfile from "./Pages/UpdateProfile";
// import Pro from "./Pages/pro";
// import CreateNFC from "./Pages/CreateNFC";
import ProductsNServices from "./Pages/ProductsNServices";
// import Enquiries from "./Pages/Enquiries";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import CreatePersonalProfile from "./Pages/creation/CreatePersonalProfile";
import SubmitMediaDetails from "./Pages/creation/SubmitMediaDetails";
import NFCDesignPricing from "./Pages/NFCPricing/NFCDesignPricing";
import NFCCardDisplay from "./Pages/NFCPricing/NFCCardDisplay";
import FillCompanyDetails from "./Pages/creation/FillCompanyDetails";
import ProfilePage from "./Pages/ProfilePage";
import UserDashboard from "./Pages/userPages/UserDashboard";
import MyNFCCard from "./Pages/userPages/MyNFCCard";
import MobileCompatablePage from "./Pages/userPages/MobileCompatablePage";
import UserProfile from "./Pages/userPages/UserProfile";
import EnquiryPage from "./Pages/userPages/EnquiryPage";
import UpdatePersonalDetails from "./Pages/updation/UpdatePersonalDetails";
import UpdateSocialDetails from "./Pages/updation/UpdateSocialDetails";
import UpdateOther from "./Pages/updation/UpdateOther";
import LoginTest from "./Pages/testing/LoginTest";

const Router = () => {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/logintest" element={<LoginTest />} />
        <Route path="/register-now" element={<PhoneSignUp />} />

        <Route path="/compatible-phones" element={<CompatablePage />} />

        <Route path="/404" element={<PageNotFound />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        {/* <Route path="/create-nfc-design" element={<CreateNFC />} /> */}

        <Route element={<ProtectedRoute />}>
          <Route path="/create-profile" element={<CreatePersonalProfile />} />
          <Route path="/company-details" element={<FillCompanyDetails />} />
          <Route path="/fill-social-profiles" element={<SubmitMediaDetails />} />
          <Route path="/select-nfctype" element={<NFCDesignPricing />} />
          <Route path="/nfc-display" element={<NFCCardDisplay />} />

          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/compatible-mobiles" element={<MobileCompatablePage />} />
          <Route path="/my-nfc-card" element={<MyNFCCard />} />
          <Route path="/update-personal-info" element={<UpdatePersonalDetails />} />
          <Route path="/update-social-info" element={<UpdateSocialDetails />} />
          <Route path="/update-other" element={<UpdateOther />} />
          <Route path="/add-products-and-services" element={<ProductsNServices />} />
          <Route path="/enquery-requests" element={<EnquiryPage />} />

          {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
          {/* <Route path="/update-profile" element={<UpdateProfile />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </UserAuthContextProvider>
  );
};

export default Router;
