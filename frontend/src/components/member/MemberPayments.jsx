import React from 'react';
import '/src/styles/components/member/MemberPayments.css';

const MemberPayments = ({ payments }) => {
    return (
        <div className="member-payments-list">
            <h3 className="member-payments-title">내 예약</h3>
            {payments && payments.length > 0 ? (
                payments.map((payment) => (
                    <div className="member-payments-item" key={payment.no}>
                        <div className="member-payments-details">
                            <p className="member-payments-title">오피스 번호: {payment.officeNo}</p>
                            <p>
                                예약 기간: {new Date(payment.startDate).toLocaleDateString()} ~{' '}
                                {new Date(payment.endDate).toLocaleDateString()}
                            </p>
                            <p>가격: {payment.price}원</p>
                            <p>결제 방법: {payment.paymentMethod}</p>
                        </div>
                        <div className="member-payments-actions">
                            <button className="cancel-button">취소</button>
                            <button className="review-button">리뷰</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>예약 내역이 없습니다.</p>
            )}
        </div>
    );
};

export default MemberPayments;
