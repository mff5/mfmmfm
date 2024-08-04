package com.kh.backend.payment;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface PaymentMapper {
    /*
    List<Map<String, Object>> getBookingsByManager(@Param("no") Integer no, @Param("limit") int limit, @Param("offset") int offset);
    int countBookingsByManager(@Param("no") Integer no);

     */
    List<Payment> getPaymentsByMemberNo(int memberNo);
    int insertPayment(Payment payment);
}
