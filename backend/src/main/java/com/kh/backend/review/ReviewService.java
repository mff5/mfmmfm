package com.kh.backend.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    ReviewMapper reviewMapper;
    public List<Review> getReviews(int officeNo) {
        return reviewMapper.getReviews(officeNo);
    }
    public boolean insertReview(Review review) {
        return reviewMapper.insertReview(review) > 0;
    }
    public List<Review> getReviewsByMemberNo(int memberNo) {
        return reviewMapper.getReviewsByMemberNo(memberNo);
    }
}
