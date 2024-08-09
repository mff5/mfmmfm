package com.kh.backend.office;

import java.util.Date;

import lombok.Data;

@Data
public class Office {
    private int no;
    private int managerNo;
    private String title;
    private Double averageRating;
    private String address;
    private String zipCode;
    private Double latitude;
    private Double longitude;
    private String content;
    private int price;
    private int capacity;
    private String titleImg;
    private String subImg1;
    private String subImg2;
    private String availability;
    private Date regDate;
}
