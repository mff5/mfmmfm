import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManagerHeader from './ManagerHeader';
import ManagerFooter from './ManagerFooter';
import OfficeRegister from './OfficeRegister';
import OfficeEdit from './OfficeEdit';
import ManagerInfo from './ManagerInfo';
import '/src/styles/pages/manager/ManagerPage.css';
import OfficeList from "./OfficeList.jsx";
import OfficeReview from "./OfficeReview.jsx";

const ManagerPage = () => {
    return (
        <div className="manager-page">
            <ManagerHeader />
            <main className="main-content">
                <Routes>
                    <Route path="register" element={<OfficeRegister />} />
                    <Route path="office/edit/:officeNo" element={<OfficeEdit />} />
                    <Route path="info" element={<ManagerInfo />} />
                    <Route path="office/review/:officeNo" element={<OfficeReview />} />
                    <Route path="officeList" element={<OfficeList/>}/>
                    <Route path="*" element={<OfficeList/>}/>
                </Routes>
            </main>
            <ManagerFooter />
        </div>
    );
};

export default ManagerPage;
