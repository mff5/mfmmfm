package com.kh.backend.reservation;

import lombok.Data;

@Data
public class ReservationRequest {
    private int no;
    private int officeNo;
    private String startDate;
    private String endDate;
    private int guests;
    private String paymentMethod;
    private int price;
}
