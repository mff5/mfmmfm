import React, { useEffect, useState } from 'react';
import '/src/styles/components/member/MemberReservations.css';
import instance from "../../utils/axiosConfig.js";
import { useNavigate } from "react-router-dom";
import { getNo } from "../../utils/auth.js"; // 현재 사용자의 번호를 가져오는 함수

const MemberReservations = ({ reservations }) => {
    const navigate = useNavigate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [reviewedOffices, setReviewedOffices] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const memberNo = getNo();
                const response = await instance.get(`http://localhost:8080/member/reviewed/${memberNo}`);
                const reviewedOfficeNos = response.data.map(review => review.officeNo);
                setReviewedOffices(reviewedOfficeNos);
            } catch (error) {
                alert("오류 발생");
            }
        };

        fetchReviews();
    }, []);

    const cancelClick = (reservationNo) => {
        instance.delete(`http://localhost:8080/member/reservation/delete/${reservationNo}`)
            .then(response => {
                if (response.status === 200) {
                    alert("예약 삭제 완료");
                }
            })
            .catch(error => {
                alert("예약 삭제 실패: " + error);
            });
    };

    const reviewClick = (officeNo) => {
        navigate(`/member/review/${officeNo}`);
    }

    return (
        <div className="member-reservations-list">
            <h3 className="member-reservations-title">내 예약</h3>
            {reservations && reservations.length > 0 ? (
                reservations.map((reservation) => {
                    const startDate = new Date(reservation.startDate);
                    const endDate = new Date(reservation.endDate);
                    const isPast = endDate < today;
                    const hasReviewed = reviewedOffices.includes(reservation.officeNo);

                    return (
                        <div className="member-reservations-item" key={reservation.no}>
                            <div className="member-reservations-details">
                                <p className="member-reservations-title">오피스 번호: {reservation.officeNo}</p>
                                <p>
                                    예약 기간: {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
                                </p>
                                <p>가격: {reservation.price}원</p>
                                <p>결제 방법: {reservation.paymentMethod}</p>
                            </div>
                            <div className="member-reservations-actions">
                                <button className="cancel-button" disabled={isPast}
                                        onClick={() => cancelClick(reservation.no)}>
                                    취소
                                </button>
                                <button className="review-button" disabled={!isPast || hasReviewed} onClick={() => reviewClick(reservation.officeNo)}>
                                    리뷰
                                </button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>예약 내역이 없습니다.</p>
            )}
        </div>
    );
};

export default MemberReservations;
