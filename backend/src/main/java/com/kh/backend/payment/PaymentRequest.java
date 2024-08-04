package com.kh.backend.payment;

import lombok.Data;

@Data
public class PaymentRequest {
    private int no;
    private int officeNo;
    private String startDate;
    private String endDate;
    private int guests;
    private String paymentMethod;
    private int price;
}
