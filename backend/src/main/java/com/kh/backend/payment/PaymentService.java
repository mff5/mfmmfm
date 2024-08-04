package com.kh.backend.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    private PaymentMapper paymentMapper;
/*
    public Map<String, Object> getBookingsByManager(Integer managerNo, int page, int size) {
        int offset = (page - 1) * size;
        List<Map<String, Object>> bookings = paymentMapper.getBookingsByManager(managerNo, size, offset);
        int totalBookings = paymentMapper.countBookingsByManager(managerNo);
        int totalPages = (int) Math.ceil((double) totalBookings / size);

        Map<String, Object> result = new HashMap<>();
        result.put("bookings", bookings);
        result.put("totalPages", totalPages);
        result.put("currentPage", page);
        return result;
    }

 */
    public List<Payment> getPaymentsByMemberNo(int memberNo) {
        return paymentMapper.getPaymentsByMemberNo(memberNo);
    }
    public boolean insertPayment(Payment payment) {
        return paymentMapper.insertPayment(payment) > 0;
    }
}
