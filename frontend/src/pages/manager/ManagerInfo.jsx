import React, { useState, useEffect } from 'react';

const ManagerInfo = () => {
    const [manager, setManager] = useState({
        no: '',
        id: '',
        pw: '',
        name: '',
        phone: '',
        email: '',
        reg_date: '',
    });

    useEffect(() => {
        // Fetch the manager data from the API
        // Example: fetchManagerData().then(data => setManager(data));
    }, []);

    return (
        <div className="manager-info">
            <h2>매니저 정보</h2>
            <form>
                <div>
                    <label>아이디: </label>
                    <input type="text" value={manager.id || ''} readOnly />
                </div>
                <div>
                    <label>이름: </label>
                    <input type="text" value={manager.name || ''} readOnly />
                </div>
                <div>
                    <label>전화번호: </label>
                    <input type="text" value={manager.phone || ''} readOnly />
                </div>
                <div>
                    <label>이메일: </label>
                    <input type="text" value={manager.email || ''} readOnly />
                </div>
                <div>
                    <label>가입일: </label>
                    <input type="text" value={manager.reg_date || ''} readOnly />
                </div>
            </form>
        </div>
    );
};

export default ManagerInfo;
