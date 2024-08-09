package com.kh.backend.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    ReviewMapper reviewMapper;
    public List<Review> getReviewsByOfficeNo(int officeNo) {
        return reviewMapper.getReviewsByOfficeNo(officeNo);
    }
    public boolean insertReview(Review review) {
        return reviewMapper.insertReview(review) > 0;
    }
    public List<Review> getReviewsByMemberNo(int memberNo) {
        return reviewMapper.getReviewsByMemberNo(memberNo);
    }
    public double getAverageRatingByOfficeNo(int officeNo) {
        Integer sum = reviewMapper.getRatingSumByOfficeNo(officeNo);
        Integer count = reviewMapper.getCountByOfficeNo(officeNo);

        if (sum == null || count == null || count == 0) {
            return 0.0;
        }

        return (double) sum / count;
    }
}
