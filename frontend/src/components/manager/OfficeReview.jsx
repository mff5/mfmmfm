import React, {useEffect, useState} from 'react';
import '/src/styles/components/manager/OfficeReview.css';
import instance from "../../utils/axiosConfig.js";
import {getNo} from "../../utils/auth.js";

const OfficeReview = () => {
    const [offices, setOffices] = useState([]);
    useEffect(() => {
        instance.get(`http://localhost:8080/manager/office/reviews/${getNo()}`)
            .then(response => {
                setOffices(response.data.offices);
            })
            .catch(error => {
                alert("오류 발생")
            })
    },[])

    return (
        <div className="office-review-list">
            <h1>나의 오피스 리뷰</h1>
            <div className="office-review-cards">
                {offices.map((office) => (
                    <div key={office.no} className="office-card">
                        <img src={`/src/assets/${office.titleImg}`} alt={office.title} />
                        <div className="office-card-content">
                            <h2>{office.title}</h2>
                            <p><span className="office-info-label"></span> {office.address}</p>
                            <p><span className="office-info-label"></span> {office.zipCode}</p>
                            <p><span className="office-info-label"></span>₩{Number(office.price).toLocaleString('ko-KR')} / 1일</p>
                            <p><span className="office-info-label">최대 인원:</span> {office.capacity}명</p>
                            <p><span className="office-info-label">평균 평점:</span> {office.averageRating}</p>
                            <p><span className="office-info-label">사용 가능 여부:</span> {office.availability ? "가능" : "불가능"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OfficeReview;
