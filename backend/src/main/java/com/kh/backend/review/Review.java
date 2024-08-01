package com.kh.backend.review;

import lombok.Data;

import java.util.Date;

@Data
public class Review {
    private int no;
    private int memberNo;
    private int officeNo;
    private int rating;
    private String content;
    private Date regDate;
}
