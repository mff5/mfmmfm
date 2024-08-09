import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManagerHeader from '../../components/manager/ManagerHeader.jsx';
import ManagerFooter from '../../components/manager/ManagerFooter.jsx';
import OfficeRegister from '../../components/manager/OfficeRegister.jsx';
import OfficeEdit from '../../components/manager/OfficeEdit.jsx';
import ManagerInfo from './ManagerInfo';
import '/src/styles/pages/manager/ManagerPage.css';
import OfficeList from "../../components/manager/OfficeList.jsx";
import OfficeReview from "../../components/manager/OfficeReview.jsx";

const ManagerPage = () => {
    return (
        <div className="manager-page">
            <ManagerHeader />
            <main className="main-content">
                <Routes>
                    <Route path="*" element={<OfficeList/>}/>
                    <Route path="officeList" element={<OfficeList/>}/>
                    <Route path="register" element={<OfficeRegister />} />
                    <Route path="office/edit/:officeNo" element={<OfficeEdit />} />
                    <Route path="info" element={<ManagerInfo />} />
                    <Route path="office/reviews" element={<OfficeReview />} />
                </Routes>
            </main>
            <ManagerFooter />
        </div>
    );
};

export default ManagerPage;
