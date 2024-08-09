import React, { useEffect, useState } from 'react';
import '/src/styles/pages/member/MemberPayment.css';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {getNo} from "../../utils/auth.js";
import instance from "../../utils/axiosConfig.js";

const MemberPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { office } = location.state || {};
    const [dateError, setDateError] = useState('');
    const [guestsError, setGuestsError] = useState('');

    const [payment, setPayment] = useState({
        officeNo: office.no,
        startDate: '2024-08-01',
        endDate: '2024-08-02',
        guests: 1,
        paymentMethod: '신용카드',
    });

    useEffect(() => {
        dateCheck(payment.startDate, payment.endDate);
    }, [payment.startDate, payment.endDate]);

    useEffect(() => {
        guestsCheck(payment.guests);
    }, [payment.guests]);

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPayment((payment) => ({
            ...payment,
            [name]: value,
        }));
    };

    const dateCheck = (startDate, endDate) => {
        if (startDate > endDate) {
            setDateError('시작 날짜는 종료 날짜보다 앞서야 합니다.');
        } else {
            setDateError('');
        }
    };

    const guestsCheck = (guests) => {
        if (guests > Number(office.capacity)) {
            setPayment((prevPayment) => ({
                ...prevPayment,
                guests: Number(office.capacity),
            }));
            setGuestsError(`최대 인원은 ${office.capacity}명입니다.`);
        } else if (guests < 1) {
            setPayment((prevPayment) => ({
                ...prevPayment,
                guests: 1,
            }));
            setGuestsError('최소 인원은 1명입니다.');
        } else {
            setGuestsError('');
        }
    };

    const totalPrice = office ? Math.max(
        office.price * ((new Date(payment.endDate) - new Date(payment.startDate)) / (1000 * 60 * 60 * 24) + 1), 0) : 0;
    const tax = totalPrice * 0.1;
    const finalPrice = totalPrice + tax;

    const handlePaymentSubmit = () => {
        if (dateError === '' && guestsError === '') {
            const no = getNo(); // 추출된 no 사용
            if (!no) {
                alert('유효하지 않은 사용자입니다. 다시 로그인해주세요.');
                return;
            }

            const paymentSuccess = {
                ...payment,
                price: finalPrice,
                no: no
            };

            instance.post("http://localhost:8080/member/reservation/insert", paymentSuccess, {withCredentials: true
            })
                .then(response => {
                    alert("결제가 완료되었습니다.");
                    navigate('/member/memberPage?activeTab=reservations');
                })
                .catch(error => {
                    alert("결제 처리 중 오류가 발생했습니다."+error);
                });
        } else {
            alert("결제 정보를 확인해주세요.");
        }
    };

    const logoClick = () => {
        navigate("/");
    }

    return (
        <div className="MemberPayment">
            <div className="MemberPayment__header">
                <img src="/src/assets/logo1.png" alt="로고" className="MemberPayment__logo" onClick={logoClick} />
                <h1 className="MemberPayment__title">결제 페이지</h1>
                <p className="MemberPayment__description">
                    임대 시작 날짜와 종료 날짜, 인원을 선택하고 결제 방법을 선택해주세요. <br />아래에서 총 결제 금액을 확인할 수 있습니다.
                </p>
            </div>

            <div className="MemberPayment__content">
                <div className="MemberPayment__left">
                    <h2 className="MemberPayment__sectionTitle">오피스 정보</h2>
                    <div className="MemberPayment__summary">
                        <p><strong>{office.title}</strong> 예약</p>
                        <p>최대 {office.capacity}명</p>
                        <p>₩{Number(office.price).toLocaleString('ko-KR')} / 1일</p>
                    </div>
                    <div className="MemberPayment__costDetails">
                        <p>기본 가격 1일 ₩{Number(office.price).toLocaleString('ko-KR')}</p>
                        <p>세금 10%</p>
                    </div>
                </div>
                <div className="MemberPayment__right">
                    <h2 className="MemberPayment__sectionTitle">예약 정보</h2>
                    <div className="MemberPayment__detail">
                        <label>시작일:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={payment.startDate}
                            onChange={handlePaymentChange}
                        />
                        <span className="MemberPayment__error">{dateError}</span>
                    </div>
                    <div className="MemberPayment__detail">
                        <label>종료일:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={payment.endDate}
                            onChange={handlePaymentChange}
                        />
                        <span className="MemberPayment__error">{dateError}</span>
                    </div>
                    <div className="MemberPayment__detail">
                        <label>인원:</label>
                        <input
                            type="number"
                            name="guests"
                            value={payment.guests}
                            min="1"
                            max={office.capacity}
                            onChange={handlePaymentChange}
                        />
                        <span className="MemberPayment__error">{guestsError}</span>
                    </div>
                    <div className="MemberPayment__detail">
                        <label>결제수단:</label>
                        <select
                            name="paymentMethod"
                            value={payment.paymentMethod}
                            onChange={handlePaymentChange}>
                            <option value="신용카드">신용카드</option>
                            <option value="모바일결제">모바일 결제</option>
                            <option value="가상계좌">가상계좌</option>
                            <option value="페이팔">PayPal</option>
                            <option value="기프트카드">기프트 카드</option>
                        </select>
                    </div>
                    <button className="MemberPayment__button" onClick={handlePaymentSubmit}>
                        결제하기 (총 금액: ₩{finalPrice.toLocaleString('ko-KR')})
                    </button>
                    <p className="MemberPayment__securityInfo">결제 정보는 안전하게 암호화되어 전송됩니다.</p>
                </div>
            </div>
        </div>
    );
};

export default MemberPayment;
