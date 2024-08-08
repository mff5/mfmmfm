import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import instance from '../../utils/axiosConfig.js';
import '/src/styles/pages/member/MemberReview.css';
import MemberHeader from "../../components/member/MemberHeader.jsx";
import MemberFooter from "../../components/member/MemberFooter.jsx";
import {getNo} from "../../utils/auth.js";

const MemberReview = () => {
    const navigate = useNavigate();
    const { officeNo } = useParams();
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [office, setOffice] = useState([]);
    const [manager, setManager] = useState([]);

    useEffect(() => {
        const fetchOfficeData = async () => {
            try {
                const response = await instance.get(`http://localhost:8080/office/${officeNo}`);
                setOffice(response.data.office);
                setManager(response.data.manager);
            } catch (error) {
                console.error('Error fetching office or manager data:', error);
            }
        };

        fetchOfficeData();
    }, [officeNo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reviewText.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        if (rating === 0) {
            alert("별점을 매겨주세요.");
            return;
        }

        try {
            const response = await instance.post(`http://localhost:8080/member/review/insert`, {
                memberNo: getNo(),
                officeNo: office.no,
                rating: rating,
                content: reviewText
            });

            if (response.status === 200) {
                alert('리뷰 등록 성공');
                navigate("/member/memberPage")
            }
        } catch (error) {
           alert(error)
            setError('Failed to add review.');
        }
    };

    return (
        <div>
            <MemberHeader />
            <div className="review-container">
                <div className="member-review">
                    <div className="office-info-container">
                        <div className="office-info">
                            <img src={`/src/assets/${office.titleImg}`} alt="Office" className="office-image" />
                        </div>
                        <div className="office-details">
                            <h2>{office.title}</h2>
                            <p>{office.address}</p>
                            <p>₩{Number(office.price).toLocaleString('ko-KR')} 1박</p>
                            <p>최대 인원: {office.capacity} 명</p>
                            <hr />
                            <h3>매니저 정보</h3>
                            <p>Name: {manager.name}</p>
                            <p>Email: {manager.email}</p>
                            <p>Phone: {manager.phone}</p>
                        </div>
                    </div>
                    <form className="review-form" onSubmit={handleSubmit}>
                        <div className="rating-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${rating >= star ? 'selected' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..." required
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            </div>
            <MemberFooter />
        </div>
    );
};

export default MemberReview;
