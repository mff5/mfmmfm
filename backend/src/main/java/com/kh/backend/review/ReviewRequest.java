package com.kh.backend.review;

import lombok.Data;

@Data
public class ReviewRequest {
    private int memberNo;
    private int officeNo;
    private int rating;
    private String content;
}
