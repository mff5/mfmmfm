import React from 'react';
import '/src/styles/pages/manager/OfficeReview.css';

const OfficeReview = () => {
    const offices = [
        { no: 1, title: "오피스 1", address: "서울시 강남구", zip_code: "06030", price: 50000, capacity: 10, title_img: "office1.jpg", average_rating: 4.5, availability: 1 },
        { no: 2, title: "오피스 2", address: "서울시 서초구", zip_code: "06500", price: 70000, capacity: 20, title_img: "office2.jpg", average_rating: 4.0, availability: 1 },
        { no: 3, title: "오피스 3", address: "서울시 종로구", zip_code: "03192", price: 60000, capacity: 15, title_img: "office3.jpg", average_rating: 3.5, availability: 1 },
        { no: 4, title: "오피스 4", address: "서울시 중구", zip_code: "04500", price: 55000, capacity: 12, title_img: "office4.jpg", average_rating: 4.2, availability: 1 },
        { no: 5, title: "오피스 5", address: "서울시 마포구", zip_code: "12110", price: 50000, capacity: 10, title_img: "office5.jpg", average_rating: 4.7, availability: 1 },
        { no: 6, title: "오피스 6", address: "서울시 송파구", zip_code: "05620", price: 65000, capacity: 18, title_img: "office6.jpg", average_rating: 4.3, availability: 1 },
        { no: 7, title: "오피스 7", address: "서울시 용산구", zip_code: "04380", price: 72000, capacity: 22, title_img: "office7.jpg", average_rating: 4.6, availability: 1 },
        { no: 8, title: "오피스 8", address: "서울시 성동구", zip_code: "04770", price: 80000, capacity: 25, title_img: "office8.jpg", average_rating: 4.9, availability: 1 },
        { no: 9, title: "오피스 9", address: "서울시 강동구", zip_code: "05340", price: 48000, capacity: 8, title_img: "office9.jpg", average_rating: 3.9, availability: 1 }
    ];

    return (
        <div className="office-review-list">
            <h1>오피스 리뷰 개요</h1>
            <div className="office-review-cards">
                {offices.map((office) => (
                    <div key={office.no} className="office-card">
                        <img src={`/src/assets/${office.title_img}`} alt={office.title} />
                        <div className="office-card-content">
                            <h2>{office.title}</h2>
                            <p><span className="office-info-label">주소:</span> {office.address}</p>
                            <p><span className="office-info-label">우편 번호:</span> {office.zip_code}</p>
                            <p><span className="office-info-label">가격:</span> {office.price} 원</p>
                            <p><span className="office-info-label">수용 가능 인원:</span> {office.capacity}명</p>
                            <p><span className="office-info-label">평균 평점:</span> {office.average_rating}</p>
                            <p><span className="office-info-label">사용 가능 여부:</span> {office.availability ? "가능" : "불가능"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OfficeReview;
