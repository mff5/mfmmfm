import React from 'react';
import '/src/styles/components/admin/Notice.css';

const Notice = () => {
    // 예시 데이터
    const notices = [
        { id: 1, title: '공지사항 1', content: '공지사항 1의 내용입니다.', views: 120 },
        { id: 2, title: '공지사항 2', content: '공지사항 2의 내용입니다.', views: 85 },
        { id: 3, title: '공지사항 3', content: '공지사항 3의 내용입니다.', views: 45 },
    ];

    return (
        <div className="notice-page">
            <div className="notice-container">
                <h2>공지사항</h2>
                <table className="notice-table">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>내용</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notices.map((notice, index) => (
                        <tr key={notice.id}>
                            <td>{index + 1}</td>
                            <td>{notice.title}</td>
                            <td>{notice.content}</td>
                            <td>{notice.views}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className="write-button">글쓰기</button>
            </div>
        </div>
    );
}

export default Notice;
