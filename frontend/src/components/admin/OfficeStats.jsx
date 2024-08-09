import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import '/src/styles/components/admin/OfficeStats.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const OfficeStats = () => {
    const totalOffices = 50;
    const averageRating = 4.2;
    const mostPopularOffice = "강남 오피스";
    const highestRatedOffice = "여의도 오피스";
    const officeBookingRate = 85; // 비율을 퍼센트 값으로 설정

    const doughnutData = {
        labels: ['예약률', '남은 비율'],
        datasets: [
            {
                label: '예약률',
                data: [officeBookingRate, 100 - officeBookingRate], // 예약된 비율과 남은 비율
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="office-stats-page">
            <div className="office-stats-container">
                <h2>오피스 통계</h2>
                <div className="chart-container">
                    <h3>오피스 예약률</h3>
                    <div className="doughnut-chart">
                        <Doughnut data={doughnutData}/>
                    </div>
                </div>
                <div className="stats-grid">
                    <div className="stat-item">
                        <h3>총 오피스 수</h3>
                        <p>{totalOffices} 개</p>
                    </div>
                    <div className="stat-item">
                        <h3>평균 평점</h3>
                        <p>{averageRating} 점</p>
                    </div>
                    <div className="stat-item">
                        <h3>가장 인기있는 오피스</h3>
                        <p>{mostPopularOffice}</p>
                    </div>
                    <div className="stat-item">
                        <h3>가장 높은 평점을 받은 오피스</h3>
                        <p>{highestRatedOffice}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfficeStats;
