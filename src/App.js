import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TestDetailsPage from "./pages/TestDetailsPage";
import ViewUserProfile from "./pages/ViewUserProfile";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import PageNotFound from "./pages/PageNotFound";
import LicenceTest from "./pages/LicenceTest";
import UserTestDetails from "./component/UserTestDetails";
import UserLicence from "./pages/UserLicence";
import UserDetails from "./component/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test-details" element={<TestDetailsPage />} />
        <Route path="/user-profile/:userId" element={<ViewUserProfile />} />
        <Route path="/update-profile/:userId" element={<UpdateUserProfile />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/licence-test" element={<LicenceTest />} />
        <Route path="/user-test-details" element={<UserTestDetails/>} />
        <Route path="/user-licence" element={<UserLicence/>} />
        <Route path="/src/server/images/:image" element={<UserDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
