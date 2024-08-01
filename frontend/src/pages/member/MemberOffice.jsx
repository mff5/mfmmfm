import React, { useEffect, useState } from "react";
import "/src/styles/pages/member/MemberOffice.css";
import MemberHeader from "../../components/member/MemberHeader.jsx";
import MemberFooter from "../../components/member/MemberFooter.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import KakaoMap from "../../utils/KakaoMap.jsx";

const MemberOffice = () => {
    const {no} = useParams();
    const [office, setOffice] = useState([]); // 초기 상태를 null로 설정
    const [reviews, setReviews] = useState([]);
    const [manager, setManager] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/member/office/${no}`)
            .then(response => {
                if (response.status === 200) {
                    const { office, manager, reviews } = response.data;
                    setOffice(office);
                    setManager(manager);
                    setReviews(reviews);
                }
            })
            .catch(error => {
                alert("로딩중 오류 발생");
            });
    }, [no]);
    const formattedPrice = office.price.toLocaleString('ko-KR');

    return (
        <div className="member-office-page page">
            <div className="no-style">
                <MemberHeader />
            </div>
            <div className="member-office-container container">
                <div className="member-office-header header">
                    <h1 className="member-office-name name">{office.title}</h1>
                    <p className="member-office-address address">{office.address}</p>
                    <p className="member-office-address address">{office.zipCode}</p>
                </div>
                <div className="member-office-images images">
                    <img src="https://via.placeholder.com/800x800" alt="Office" />
                </div>
                <div className="member-office-info info">
                    <h2>오피스 상세정보</h2>
                    <p className="member-office-description description">
                        {office.content}
                    </p>
                    <p className="member-office-price price">
                       가격: {formattedPrice} <span className="currency">KRW</span><span className="per">per day</span>
                    </p>
                    <p className="member-office-max-occupancy max-occupancy">최대 수용인원: {office.capacity}명</p>
                </div>
                <button className="member-office-reserve-button reserve-button">예약하기</button>
                <div className="member-office-contact contact">
                    <h2>관리자 정보</h2>
                    <p>관리자명: {manager.name}</p>
                    <p>관리자 전화번호: {manager.phone}</p>
                    <p>관리자 이메일: {manager.email}</p>
                </div>
                <div className="member-office-reviews reviews">
                    <h2>리뷰</h2>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="member-office-review review">
                                <p className="member-office-review-rating review-rating">Rating: {review.rating} / 5</p>
                                <p className="member-office-review-content review-content">{review.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </div>
            <div>
                {office && office.latitude && office.longitude ? (
                    <KakaoMap center={{ lat:  37.49005349318003, lng: 127.1369446434107  }} level={3} />
                ) : (
                    <p>Loading map...</p>
                )}
            </div>
            <div className="no-style">
                <MemberFooter />
            </div>
        </div>
    );
};

export default MemberOffice;
