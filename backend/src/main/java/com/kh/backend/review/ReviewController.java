package com.kh.backend.review;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {
    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }
    @GetMapping("/member/reviewed/{memberNo}")
    public ResponseEntity<?> getReviews(@PathVariable("memberNo") int memberNo) {
        List<Review> reviews = reviewService.getReviewsByMemberNo(memberNo);
        return ResponseEntity.ok(reviews);
    }
    @PostMapping("/member/review/insert")
    public ResponseEntity<?> insertReview(@RequestBody ReviewRequest reviewRequest) {
        Review review = new Review();
        review.setMemberNo(reviewRequest.getMemberNo());
        review.setOfficeNo(reviewRequest.getOfficeNo());
        review.setRating(reviewRequest.getRating());
        review.setContent(reviewRequest.getContent());

        boolean result = reviewService.insertReview(review);
        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }
}
