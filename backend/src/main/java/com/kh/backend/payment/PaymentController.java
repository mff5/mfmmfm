package com.kh.backend.payment;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
/*
    @GetMapping("/manager/booking/{no}")
    public ResponseEntity<Map<String, Object>> getBookingsByManager(
            @PathVariable Integer no,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        System.out.println("Fetching bookings for manager with no: " + no + ", page: " + page + ", size: " + size);
        Map<String, Object> result = paymentService.getBookingsByManager(no, page, size);
        System.out.println("Fetched bookings: " + result);
        return ResponseEntity.ok(result);
    }

 */

    @SneakyThrows
    @PostMapping("/member/payment")
    public ResponseEntity<?> insertPayment(@RequestBody PaymentRequest paymentRequest) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println("Received payment request: " + paymentRequest);
        int memberNo = paymentRequest.getNo();
        int officeNo = paymentRequest.getOfficeNo();
        int guests = paymentRequest.getGuests();
        String startDateString = paymentRequest.getStartDate();
        String endDateString = paymentRequest.getEndDate();

        // Null 체크 추가
        if (startDateString == null || endDateString == null) {
            System.out.println("Start date or end date is null.");
            return ResponseEntity.badRequest().body("Start date and end date must not be null.");
        }

        Date startDate = formatter.parse(startDateString);
        Date endDate = formatter.parse(endDateString);
        String paymentMethod = paymentRequest.getPaymentMethod();
        int price = paymentRequest.getPrice();

        Payment payment = new Payment();
        payment.setMemberNo(memberNo);
        payment.setOfficeNo(officeNo);
        payment.setGuests(guests);
        payment.setStartDate(startDate);
        payment.setEndDate(endDate);
        payment.setPaymentMethod(paymentMethod);
        payment.setPrice(price);

        System.out.println("Inserting payment: " + payment);
        boolean result = paymentService.insertPayment(payment);
        if (result) {
            System.out.println("Payment inserted successfully.");
            return ResponseEntity.ok().build();
        } else {
            System.out.println("Failed to insert payment.");
            return ResponseEntity.badRequest().build();
        }
    }
}
