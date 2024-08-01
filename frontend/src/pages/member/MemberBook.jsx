import React, { useEffect, useState } from 'react';
import '/src/styles/pages/member/MemberBook.css';
import { useLocation } from "react-router-dom";

const MemberBook = () => {
    const location = useLocation();
    const { office } = location.state || {};
    const [startDate, setStartDate] = useState('2024-08-01');
    const [endDate, setEndDate] = useState('2024-08-02');
    const [guest, setGuest] = useState(1);
    const [guestError, setGuestError] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const totalPrice = office ? Math.max(office.price * ((new Date(endDate).getDate() - new Date(startDate).getDate() + 1)), 0) : 0;
    const [dateError, setDateError] = useState('');
    const tax = totalPrice * 0.1;
    const finalPrice = totalPrice + tax;

    useEffect(() => {
        dateCheck();
    }, [startDate, endDate]);

    const dateCheck = () => {
        if (startDate > endDate) {
            setDateError('시작날짜는 종료날짜보다 뒤일 수 없습니다.');
        } else {
            setDateError('');
        }
    };

    const guestCheck = () => {
        if (guest > Number(office.capacity)) {
            setGuest(Number(office.capacity));
        } else if (guest < 1)   {
            setGuest(1)
        }
    }
    useEffect(() => {
        guestCheck();
    }, [guest]);

    const handlePayment = () => {
        alert(`결제가 완료되었습니다. 총 결제 금액: ₩${finalPrice.toLocaleString('ko-KR')}`);
    };

    return (
        <div className="MemberBook-container">
            <div className="MemberBook-logo">
                <img src="/src/assets/logo.png" alt="Logo" />
            </div>
            <h1 className="MemberBook-title">결제 페이지</h1>
            <p className="MemberBook-description">
                임대 시작 날짜와 종료 날짜, 인원을 선택하고 결제 방법을 선택해주세요. <br/>아래에서 총 결제 금액을 확인할 수 있습니다.
            </p>

            <div className="order-summary">
                <h2>주문 요약</h2>
                <p>{office.title} 예약</p>
                <p>최대 {office.capacity}명 수용 가능</p>
                <p>하루 ₩{Number(office.price).toLocaleString('ko-KR')}</p>
            </div>

            <div className="cost-details">
                <h2>비용 상세 내역</h2>
                <p>기본 가격 1일 ₩{Number(office.price).toLocaleString('ko-KR')}</p>
                <p>세금 10%</p>
            </div>

            <div className="MemberBook-content">
                <div className="MemberBook-left">
                    <div className="MemberBook-detail">
                        <label>시작일:</label>
                        <input id="startDate"
                               type="date"
                               value={startDate}
                               onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="MemberBook-detail">
                        <label>종료일:</label>
                        <input id="endDate"
                               type="date"
                               value={endDate}
                               onChange={(e) => setEndDate(e.target.value)} onKeyUp={dateCheck}
                        />
                        <span id="dateInfo">{dateError}</span>
                    </div>
                    <div className="MemberBook-detail">
                        <label>인원:</label>
                        <input id="guest"
                               type="number"
                               value={guest}
                               min="1"
                               max={office.capacity}
                               onChange={(e) => setGuest(e.target.value)}
                        />
                    </div>
                    <div className="MemberBook-detail">
                        <label>결제수단:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="Credit Card">Credit Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="MemberBook-footer">
                <button className="MemberBook-payment-button" onClick={handlePayment}>
                    결제하기 (총 금액: ₩{finalPrice.toLocaleString('ko-KR')})
                </button>
                <p className="security-info">결제 정보는 안전하게 암호화되어 전송됩니다.</p>
            </div>
        </div>
    );
};

export default MemberBook;
