import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '/src/styles/components/admin/ReservationStats.css';

const ReservationStats = () => {
    // 예시 데이터
    const totalReservations = 150;
    const averageDuration = 5.4; // 평균 예약기간 (일)
    const mostBookedOffice = "강남 오피스";
    const paymentMethods = {
        labels: ['신용카드', '모바일 결제', '가상계좌', 'PayPal', '기프트 카드'],
        datasets: [
            {
                label: '결제 방법',
                data: [40, 25, 15, 10, 10],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
            },
        ],
    };

    return (
        <div className="reservation-stats-page">
            <div className="reservation-stats-container">
                <h2>예약 통계</h2>
                <div className="stats-grid">
                    <div className="stat-item total-reservations">
                        <h3>총 예약 건수</h3>
                        <p>{totalReservations} 건</p>
                    </div>
                    <div className="stat-item average-duration">
                        <h3>평균 예약 기간</h3>
                        <p>{averageDuration} 일</p>
                    </div>
                    <div className="stat-item most-booked-office">
                        <h3>가장 많이 예약된 오피스</h3>
                        <p>{mostBookedOffice}</p>
                    </div>
                    <div className="stat-item payment-methods">
                        <h3>결제 방법 통계</h3>
                        <div className="chart-container">
                            <Doughnut data={paymentMethods} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationStats;
