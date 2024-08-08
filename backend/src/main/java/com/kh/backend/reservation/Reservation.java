package com.kh.backend.reservation;

import lombok.Data;

import java.util.Date;

@Data
public class Reservation {
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
