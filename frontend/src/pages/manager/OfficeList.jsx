import React, { useEffect, useState } from 'react';
import axios from "axios";
import '/src/styles/pages/manager/OfficeList.css';
import {useNavigate} from "react-router-dom";

const OfficeList = () => {
    const navigate = useNavigate();
    const [offices, setOffices] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/manager/office/5`, {
            params: {
                page: page,
                size: size
            }
        })
            .then((response) => {
                setOffices(response.data.offices);
                setTotal(response.data.total);
                setPage(response.data.page);
                setSize(response.data.size);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(error);
            });
    }, [page, size]);

    const handleDelete = (officeId) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8080/manager/office/${officeId}`)
                .then(response => {
                    console.log("Office deleted:", response.data);
                    setOffices(offices.filter(office => office.no !== officeId));
                })
                .catch(error => {
                    console.error("Error deleting office:", error);
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
                            <p>{office.price}</p>
                            <p>{office.capacity}</p>
                            <p>{office.availability}</p>
                        </div>
                        <div className="button-group">
                            <button className="edit-button" onClick={() => navigate(`/manager/officeEdit/${office.no}`)}>수정하기</button>
                            <button className="delete-button" onClick={() => handleDelete(office.no)}>삭제하기</button>
                            <button className="review-button" onClick={() => navigate(`/manager/officeReviews/${office.no}`)}>리뷰 보기</button>
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
