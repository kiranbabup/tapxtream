import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import CompatablePage from "./Pages/CompatablePage";
import MobileCompatablePage from "./Pages/userPages/MobileCompatablePage";
// import PhoneSignUp from "./Pages/PhoneSignUp";
// import LoginPage from "./Pages/LoginPage";
// import UpdateProfile from "./Pages/UpdateProfile";
// import Pro from "./Pages/pro";
// import CreateNFC from "./Pages/CreateNFC";
// import Enquiries from "./Pages/Enquiries";
// import UserDashboard from "./Pages/userPages/UserDashboard";
import ProductsNServices from "./Pages/ProductsNServices";
import CreatePersonalProfile from "./Pages/creation/CreatePersonalProfile";
import SubmitMediaDetails from "./Pages/creation/SubmitMediaDetails";
import NFCDesignPricing from "./Pages/NFCPricing/NFCDesignPricing";
import NFCCardDisplay from "./Pages/NFCPricing/NFCCardDisplay";
import FillCompanyDetails from "./Pages/creation/FillCompanyDetails";
import ProfilePage from "./Pages/ProfilePage";
import MyNFCCard from "./Pages/userPages/MyNFCCard";
import UserProfile from "./Pages/userPages/UserProfile";
import EnquiryPage from "./Pages/userPages/EnquiryPage";
import UpdatePersonalDetails from "./Pages/updation/UpdatePersonalDetails";
import UpdateSocialDetails from "./Pages/updation/UpdateSocialDetails";
import UpdateOther from "./Pages/updation/UpdateOther";
import MuiltiReview from "./Pages/reviewCards/MuiltiReview";
import UpdateReviewLinks from "./Pages/updation/UpdateReviewLinks";
import LoginTest from "./Pages/testing/LoginTest";
import RegisterTest from "./Pages/testing/RegisterTest";
// import EmailLoginPage from "./Pages/EmailLoginPage";
// import GmailLogin from "./Pages/GmailLogin";
// import PnGSignUp from "./Pages/PnGSignUp";
// import GmailRegister from "./Pages/GmailRegister";
// import LoginSMSPage from "./Pages/LoginSMS";
import LoginSMSGMPage from "./Pages/LoginSMSGMPage";
import SignupSMSGMPage from "./Pages/SignupSMSGMPage";

const Router = () => {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/logintest" element={<LoginTest />} />
        <Route path="/registertest" element={<RegisterTest />} />

        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/loginem" element={<EmailLoginPage />} /> */}
        {/* <Route path="/logingm" element={<GmailLogin />} /> */}
        {/* <Route path="/loginsms" element={<LoginSMSPage />} /> */}
        {/* <Route path="/sign-up" element={<PnGSignUp />} /> */}

        <Route path="/login" element={<LoginSMSGMPage />} />

        <Route path="/register-now" element={<SignupSMSGMPage />} />
        {/* <Route path="/gmr" element={<GmailRegister />} /> */}
        {/* <Route path="/smssignup" element={<PhoneSignUp />} /> */}

        <Route path="/compatible-phones" element={<CompatablePage />} />

        <Route path="/404" element={<PageNotFound />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        {/* <Route path="/create-nfc-design" element={<CreateNFC />} /> */}
        <Route path="/review/:id" element={<MuiltiReview />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/create-profile" element={<CreatePersonalProfile />} />
          <Route path="/company-details" element={<FillCompanyDetails />} />
          <Route path="/fill-social-profiles" element={<SubmitMediaDetails />} />
          <Route path="/select-nfctype" element={<NFCDesignPricing />} />
          <Route path="/nfc-display" element={<NFCCardDisplay />} />

          <Route path="/user-profile" element={<UserProfile />} />

          <Route path="/update-personal-info" element={<UpdatePersonalDetails />} />
          <Route path="/update-social-info" element={<UpdateSocialDetails />} />
          <Route path="/update-other" element={<UpdateOther />} />
          <Route path="/add-products-and-services" element={<ProductsNServices />} />
          <Route path="/manage-review-links" element={<UpdateReviewLinks />} />


          <Route path="/enquery-requests" element={<EnquiryPage />} />

          <Route path="/compatible-mobiles" element={<MobileCompatablePage />} />
          <Route path="/my-nfc-card" element={<MyNFCCard />} />

          {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
          {/* <Route path="/update-profile" element={<UpdateProfile />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </UserAuthContextProvider>
  );
};

export default Router;
