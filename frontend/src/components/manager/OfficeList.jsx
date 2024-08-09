import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axiosConfig.js";
import { getNo } from "../../utils/auth.js";
import '/src/styles/components/manager/OfficeList.css';

const OfficeList = () => {
    const navigate = useNavigate();
    const [offices, setOffices] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`http://localhost:8080/manager/office/${getNo()}`, {
                    params: {
                        page: page,
                        size: size
                    }
                });
                setOffices(response.data.offices);
                setTotal(response.data.total);
                setPage(response.data.page);
                setSize(response.data.size);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
                navigate('/login');
            }
        };

        fetchData();
    }, [page, size]);

    const handleDelete = async (officeNo) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            await instance.delete(`http://localhost:8080/manager/office/delete/${officeNo}`)
                .then(response => {
                    if (response.status === 200) {
                        alert("오피스 삭제 성공");
                        setOffices(offices.filter(office => office.no !== officeNo));
                    }
                })
                .catch(error => {
                    alert("오피스 삭제 실패");
                    setError(error);
                });
        }
    };

    if (error) {
        return <div>Error: {error.message || "An error occurred"}</div>;
    }

    return (
        <div className="office-list-wrapper">
            <div className="office-list">
                {offices.map((office, index) => (
                    <div className="office-card" key={index}>
                        <div className="image-placeholder">
                            <img src={`/src/assets/${office.titleImg}`} alt="Office" />
                        </div>
                        <div className="office-details">
                            <h3>{office.title}</h3>
                            <p>{office.address}</p>
                            <p>Price: {office.price} / 1일</p>
                            <p>Capacity: {office.capacity}</p>
                            <p>{office.availability === '1' ? 'Available' : 'Unavailable'}</p>
                        </div>
                        <div className="button-group">
                            <button className="edit-button" onClick={() => navigate(`/manager/managerPage/office/edit/${office.no}`)}>수정하기</button>
                            <button className="delete-button" onClick={() => handleDelete(office.no)}>삭제하기</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)} disabled={page * size >= total}>Next</button>
            </div>
        </div>
    );
};

export default OfficeList;
