import React, { useEffect, useState } from "react";
import "/src/styles/pages/member/MemberOffice.css";
import MemberHeader from "../../components/member/MemberHeader.jsx";
import MemberFooter from "../../components/member/MemberFooter.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import KakaoMap from "../../utils/KakaoMap.jsx";

const MemberOffice = () => {
    const navigate = useNavigate();
    const { no } = useParams();
    const [office, setOffice] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [manager, setManager] = useState({});

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
                alert("데이터를 불러오는 중 오류가 발생했습니다.");
            });
    }, [no]);

    if (!office) return <p>로딩 중...</p>;

    const bookClick = () => {
        navigate("/member/book", { state: { office } });
    };

    return (
        <div className="member-office-page">
            <MemberHeader />
            <div className="member-office-container">
                <div className="member-office-header">
                    <div className="office-meta">
                        <h1 className="member-office-name">{office.title}</h1>
                        <p className="member-office-address">
                            {office.address}{office.zipCode ? `, ${office.zipCode}` : ""}
                        </p>
                    </div>
                </div>
                <div className="member-office-gallery">
                    <div className="main-image">
                        <img src={office.mainImage || "https://via.placeholder.com/800x800"} alt="오피스 사진" />
                    </div>
                    <div className="sub-images">
                        <img src={office.subImage1 || "https://via.placeholder.com/400x400"} alt="오피스 사진 1" />
                        <img src={office.subImage2 || "https://via.placeholder.com/400x400"} alt="오피스 사진 2" />
                    </div>
                </div>
                <div className="member-office-info">
                    <h2>오피스 정보</h2>
                    <p className="member-office-description">{office.content}</p>
                    <div className="member-office-details">
                        {office.price && (
                            <div>
                                <h3>가격</h3>
                                <p>₩{Number(office.price).toLocaleString('ko-KR')} <span className="per">/ 하루</span></p>
                            </div>
                        )}
                        {office.capacity && (
                            <div>
                                <h3>수용 인원</h3>
                                <p>{office.capacity} 명</p>
                            </div>
                        )}
                        {office.amenities && office.amenities.length > 0 && (
                            <div>
                                <h3>편의 시설</h3>
                                <p>{office.amenities.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>
                <button className="member-office-reserve-button" onClick={bookClick}>예약하기</button>
                {manager && (manager.name || manager.phone || manager.email) && (
                    <div className="member-office-contact">
                        <h2>연락처 정보</h2>
                        <div className="member-office-details">
                            {manager.name && (
                                <div>
                                    <h3>관리자 이름</h3>
                                    <p>{manager.name}</p>
                                </div>
                            )}
                            {manager.phone && (
                                <div>
                                    <h3>전화번호</h3>
                                    <p>{manager.phone}</p>
                                </div>
                            )}
                            {manager.email && (
                                <div>
                                    <h3>이메일</h3>
                                    <p>{manager.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="member-office-reviews">
                    <h2>리뷰</h2>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="member-office-review">
                                <p className="member-office-review-rating">평점: {review.rating} / 5</p>
                                <p className="member-office-review-content">{review.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>리뷰가 없습니다.</p>
                    )}
                </div>
                <div className="kakao-map-container">
                    {office.latitude && office.longitude ? (
                        <KakaoMap center={{ lat: office.latitude, lng: office.longitude }} level={3} />
                    ) : (
                        <div className="map-loading">지도 로딩 중...</div>
                    )}
                </div>
            </div>
            <MemberFooter />
        </div>
    );
};

export default MemberOffice;
