package com.kh.backend.review;

import com.kh.backend.office.Office;
import com.kh.backend.office.OfficeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ReviewController {
    private final ReviewService reviewService;
    private final OfficeService officeService;

    public ReviewController(ReviewService reviewService, OfficeService officeService) {
        this.reviewService = reviewService;
        this.officeService = officeService;
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

    @GetMapping("/manager/office/reviews/{managerNo}")
    public ResponseEntity<?> getReviewsByManagerNo(@PathVariable int managerNo) {
        List<Office> offices = officeService.getOfficesByManagerNo(managerNo, 1, 20, null, null);
        for (Office office : offices) {
            office.setAverageRating(reviewService.getAverageRatingByOfficeNo(office.getNo()));
        }
        Map<String, Object> response = new HashMap<>();
        response.put("offices", offices);
        return ResponseEntity.ok(response);
    }
}
