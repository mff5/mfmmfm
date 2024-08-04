import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import ManagerSidebar from '../../components/manager/ManagerSidebar';
import ManagerHeader from '../../components/manager/ManagerHeader';
import { LuBarChart3, LuStar } from "react-icons/lu";
import { FaWonSign } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
import '../../styles/pages/manager/ManagerMain.css';

const COLORS = ['#57C9A6', '#EEBD6F'];

const ManagerTest = () => {
    const monthlyData = [];
    const genderData = [];
    const offices = [];
    const bookings = [];
    const officePageCount = 0;
    const bookingPageCount = 0;

    const handleBookingPageClick = () => {};
    const handleOfficePageClick = () => {};

    return (
        <>
            <ManagerSidebar />
            <ManagerHeader />
            <div className="main-content">
                <div className="dashboard">
                    <div className='mini-container'>
                        <div className='mini-stats'>
                            <div>
                                <p>누적 수익</p>
                            </div>
                            <div className='statcontent'>
                                <span>0</span>&nbsp;<FaWonSign size={12} color='#4171DD' />
                            </div>
                        </div>
                        <div className='mini-stats'>
                            <div>
                                <p>누적 이용자</p>
                            </div>
                            <div className='statcontent'>
                                <span>0</span>&nbsp;🤦
                            </div>
                        </div>
                        <div className='mini-stats'>
                            <div>
                                <p>총 평점</p>
                            </div>
                            <div className='statcontent'>
                                <span>0</span>&nbsp;<LuStar color='#57C9A6' />
                            </div>
                        </div>
                        <div className='mini-stats'>
                            <div>
                                <p>이용 중</p>
                            </div>
                            <div className='statcontent'>
                                <span>0</span>&nbsp;<LuBarChart3 color='#f1b85b' />
                            </div>
                        </div>
                    </div>
                    <div className="statistics">
                        <div className="chart-container">
                            <h4>매출</h4><br />
                            <ResponsiveContainer width="100%" height={230}>
                                <BarChart data={monthlyData} margin={{ top: 0, left: 0, right: 20 }}>
                                    <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11 }} tickLine={false} />
                                    <Tooltip contentStyle={{ fontSize: 12 }} />
                                    <Bar dataKey="revenue" fill="#4171DD" barSize={9} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='booking'>
                            <h4>이용자 성비</h4><br />
                            <ResponsiveContainer width="100%" height={250} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} >
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        innerRadius={70}
                                        fill="#8884d8"
                                        label
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className='bottom-content'>
                        <div className='info'>
                            <h4>오피스 등록 상태</h4>
                            <div className='office-status'>
                                <ul>
                                    {offices.map((office, index) => (
                                        <li key={index} className='statusli'>
                                            오피스 {index + 1}
                                            <span className='pending'>대기 중</span>
                                        </li>
                                    ))}
                                </ul>
                                <ReactPaginate
                                    previousLabel={'이전'}
                                    nextLabel={'다음'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={officePageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handleOfficePageClick}
                                    containerClassName={'office-pagination'}
                                    pageClassName={'pagination-item'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>
                        <div className="reserve">
                            <h4>예약 내역</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>예약 번호</th>
                                        <th>예약일</th>
                                        <th>예약자명</th>
                                        <th>예약자 전화번호</th>
                                        <th>예약기간</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td>예약 {index + 1}</td>
                                            <td>2024-01-01</td>
                                            <td>홍길동</td>
                                            <td>010-1234-5678</td>
                                            <td>2024-01-01 ~ 2024-01-02</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <ReactPaginate
                                    previousLabel={'이전'}
                                    nextLabel={'다음'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={bookingPageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handleBookingPageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManagerTest;
