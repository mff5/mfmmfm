import {Route, Routes} from "react-router-dom";
import MemberStats from "../../components/admin/MemberStats.jsx";
import ReservationStats from "../../components/admin/ReservationStats.jsx";
import Notice from "../../components/admin/Notice.jsx";
import AdminHeader from "../../components/admin/AdminHeader.jsx";
import AdminFooter from "../../components/admin/AdminFooter.jsx";
import OfficeStats from "../../components/admin/OfficeStats.jsx";
import ReviewStats from "../../components/admin/ReviewStats.jsx";

const AdminPage = () => {
    return (
        <div>
            <AdminHeader/>
            <Routes>
                <Route path="*" element={<MemberStats/>}/>
                <Route path="memberStats" element={<MemberStats/>}/>
                <Route path="officeStats" element={<OfficeStats/>}/>
                <Route path="reviewStats" element={<ReviewStats/>}/>
                <Route path="reservationStats" element={<ReservationStats/>}/>
                <Route path="notice" element={<Notice/>}/>
            </Routes>
            <AdminFooter/>
        </div>
    )
}

export default AdminPage;