package com.kh.backend.reservation;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
/*
    @GetMapping("/manager/booking/{no}")
    public ResponseEntity<Map<String, Object>> getBookingsByManager(
            @PathVariable Integer no,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        System.out.println("Fetching bookings for manager with no: " + no + ", page: " + page + ", size: " + size);
        Map<String, Object> result = reservationService.getBookingsByManager(no, page, size);
        System.out.println("Fetched bookings: " + result);
        return ResponseEntity.ok(result);
    }

 */
    @SneakyThrows
    @PostMapping("/member/reservation/insert")
    public ResponseEntity<?> insertReservation(@RequestBody ReservationRequest reservationRequest) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println("Received reservation request: " + reservationRequest);
        int memberNo = reservationRequest.getNo();
        int officeNo = reservationRequest.getOfficeNo();
        int guests = reservationRequest.getGuests();
        String startDateString = reservationRequest.getStartDate();
        String endDateString = reservationRequest.getEndDate();

        // Null 체크 추가
        if (startDateString == null || endDateString == null) {
            System.out.println("Start date or end date is null.");
            return ResponseEntity.badRequest().body("Start date and end date must not be null.");
        }

        Date startDate = formatter.parse(startDateString);
        Date endDate = formatter.parse(endDateString);
        String paymentMethod = reservationRequest.getPaymentMethod();
        int price = reservationRequest.getPrice();

        Reservation reservation = new Reservation();
        reservation.setMemberNo(memberNo);
        reservation.setOfficeNo(officeNo);
        reservation.setGuests(guests);
        reservation.setStartDate(startDate);
        reservation.setEndDate(endDate);
        reservation.setPaymentMethod(paymentMethod);
        reservation.setPrice(price);

        System.out.println("Inserting reservation: " + reservation);
        boolean result = reservationService.insertReservation(reservation);
        if (result) {
            System.out.println("Reservation inserted successfully.");
            return ResponseEntity.ok().build();
        } else {
            System.out.println("Failed to insert reservation.");
            return ResponseEntity.badRequest().build();
        }
    }
    @DeleteMapping("/member/reservation/delete/{no}")
    public ResponseEntity<?> deleteReservation(@PathVariable int no) {
        System.out.println("Deleting reservation: " + no);
        boolean result = reservationService.deleteReservation(no);
        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
