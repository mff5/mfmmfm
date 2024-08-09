package com.kh.backend.reservation;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReservationMapper {
    /*
    List<Map<String, Object>> getBookingsByManager(@Param("no") Integer no, @Param("limit") int limit, @Param("offset") int offset);
    int countBookingsByManager(@Param("no") Integer no);

     */
    List<Reservation> getReservationsByMemberNo (int memberNo);
    int insertReservation(Reservation reservation);
    int deleteReservation(int no);
    Map<Integer, Integer> getPopularOffice();
}
