import React from 'react';
import '/src/styles/components/admin/ReviewStats.css';

const ReviewStats = () => {
    // 예시 데이터
    const totalReviews = 350;
    const averageRating = 4.5;
    const mostReviewedOffice = "강남 오피스";
    const highestRatedOffice = "여의도 오피스";

    return (
        <div className="review-stats-page">
            <div className="review-stats-container">
                <h2>리뷰 통계</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <h3>총 리뷰 수</h3>
                        <p>{totalReviews} 개</p>
                    </div>
                    <div className="stat-item">
                        <h3>평균 평점</h3>
                        <p>{averageRating} 점</p>
                    </div>
                    <div className="stat-item">
                        <h3>가장 많이 리뷰된 오피스</h3>
                        <p>{mostReviewedOffice}</p>
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

export default ReviewStats;
