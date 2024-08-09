import { React } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ManagerLogin from './pages/manager/ManagerLogin';
import ManagerMain from './pages/manager/ManagerMain';
import MemberDelete from './pages/member/MemberDelete';
import MemberRegister from './pages/member/MemberRegister';
import Main from './pages/common/Main.jsx';
import MemberSearch from './pages/member/MemberSearch';
import MemberUpdate from './pages/member/MemberUpdate';
import AdminLogin from './pages/admin/AdminLogin';
import ManagerRegister from './pages/manager/ManagerRegister';
import PrivateRoute from './components/common/PrivateRoute';
import ManagerOffice from './pages/manager/ManagerOffice';
import MemberFindId from "./pages/member/MemberFindId.jsx";
import MemberResetPw from "./pages/member/MemberResetPw.jsx";
import MemberFindIdResult from "./pages/member/MemberFindIdResult.jsx";
import Office from "./pages/common/Office.jsx";
import MemberPayment from "./pages/member/MemberPayment.jsx";
import MemberPage from "./pages/member/MemberPage.jsx";
import ManagerTest from "./pages/manager/ManagerTest.jsx";
import ManagerPage from "./pages/manager/ManagerPage.jsx";
import Login from "./pages/common/Login.jsx";
import MemberReview from "./pages/member/MemberReview.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:category" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/member/register" element={<MemberRegister />} />
        <Route path="/manager/register" element={<ManagerRegister />} />
        <Route path="/member/findId" element={<MemberFindId/>}/>
        <Route path="/member/findIdResult" element={<MemberFindIdResult/>}/>
        <Route path="/member/resetPw" element={<MemberResetPw/>}/>
        <Route path="/office/:no" element={<Office/>}/>
        <Route path="/member/payment" element={<MemberPayment/>}/>
        <Route path="/member/memberPage" element={<MemberPage/>}/>
        <Route path="/managerTest" element={<ManagerTest/>}/>
        <Route path="/manager/managerPage/*" element={<ManagerPage />} />
        <Route path="/member/review/:officeNo" element={<MemberReview/>}/>

        <Route path="/admin/adminPage/*" element={<AdminPage/>}/>


        {/* 멤버 보호 라우트 */}
        <Route path="/member/update" element={<PrivateRoute requiredRole="ROLE_MEMBER"><MemberUpdate /></PrivateRoute>} />
        <Route path="/member/delete" element={<PrivateRoute requiredRole="ROLE_MEMBER"><MemberDelete /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute requiredRole="ROLE_MEMBER"><MemberSearch /></PrivateRoute>} />

        {/* 매니저 보호 라우트*/}
        <Route path="/manager" element={<ManagerLogin />} />
        <Route path="/manager/:no" element={<PrivateRoute requiredRole="ROLE_MANAGER"><ManagerMain /></PrivateRoute>} />
        <Route path="/manager/office/:no" element={<PrivateRoute requiredRole="ROLE_MANAGER"><ManagerOffice /></PrivateRoute>} />


        {/* 어드민 라우트 추가
        <Route path="/admin" element={<PrivateRoute requiredRole="ROLE_ADMIN"><AdminMain /></PrivateRoute>} />
        */}
      </Routes>
    </Router>
  );
}
export default App;