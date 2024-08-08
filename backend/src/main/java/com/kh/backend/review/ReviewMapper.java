package com.kh.backend.review;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<Review> getReviews(int officeNo);
    int insertReview(Review review);
    List<Review> getReviewsByMemberNo(int memberNo);
}
