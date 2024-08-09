import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import '/src/styles/components/admin/MemberStats.css';
import instance from "../../utils/axiosConfig.js";
import {useNavigate} from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const MemberStats = () => {
    const navigate = useNavigate();
    const [totalMembers, setTotalMembers] = useState(0);
    const [newMembers, setNewMembers] = useState(0);
    const [manCount, setManCount] = useState(0);
    const [womanCount, setWomanCount] = useState(0);
    const [ageGroupData, setAgeGroupData] = useState({
        labels: [],
        datasets: [
            {
                label: '회원 수',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        instance.get('http://localhost:8080/admin/memberStats')
            .then(response => {
                const { totalMembers, newMembers, manCount, womanCount, ageGroupDistribution } = response.data;

                setTotalMembers(totalMembers);
                setNewMembers(newMembers);
                setManCount(manCount);
                setWomanCount(womanCount);

                const ageLabels = ageGroupDistribution.map(group => group.AGEGROUP);
                const ageCounts = ageGroupDistribution.map(group => group.MEMBERCOUNT);


                setAgeGroupData({
                    labels: ageLabels,
                    datasets: [
                        {
                            label: '회원 수',
                            data: ageCounts,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch(error => {
                console.error("Error occurred:", error);
                if (error.response && error.response.status === 403) {
                    navigate('/login');
                }
            });
    }, []);



    // 성별 비율 데이터
    const genderData = {
        labels: ['남성', '여성'],
        datasets: [
            {
                data: [manCount, womanCount],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '연령대 분포',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="member-stats-page">
            <div className="member-stats-container">
                <h2>회원 통계</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <h3>총 회원 수</h3>
                        <p>{totalMembers} 명</p>
                    </div>
                    <div className="stat-item">
                        <h3>신규 가입자 수(1달)</h3>
                        <p>{newMembers} 명</p>
                    </div>
                    <div className="doughnut-chart-container">
                        <h3>성별 비율</h3>
                        <div className="doughnut-chart">
                            <Doughnut data={genderData} />
                        </div>
                    </div>
                    <div className="bar-chart-container">
                        <h3>연령대 분포</h3>
                        <div className="bar-chart">
                            <Bar data={ageGroupData} options={barOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberStats;
