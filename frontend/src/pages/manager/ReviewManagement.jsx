import React, { useState, useEffect } from 'react';

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch the review data from the API
        // Example: fetchReviewsData().then(data => setReviews(data));
    }, []);

    return (
        <div className="review-management">
            <h2>리뷰 관리</h2>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.no} className="review-item">
                        <h3>리뷰 {review.no}</h3>
                        <p>작성자 번호: {review.member_no}</p>
                        <p>오피스 번호: {review.office_no}</p>
                        <p>평점: {review.rating}</p>
                        <p>내용: {review.content}</p>
                        <p>작성일: {review.reg_date}</p>
                    </div>
                ))
            ) : (
                <p>리뷰를 불러오는 중...</p>
            )}
        </div>
    );
};

export default ReviewManagement;
