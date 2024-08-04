package com.kh.backend.payment;

import lombok.Data;

import java.util.Date;

@Data
public class Payment {
    private int no;
    private int memberNo;
    private int officeNo;
    private int guests;
    private String paymentMethod;
    private Date startDate;
    private Date endDate;
    private int price;
    private Date regDate;
}
