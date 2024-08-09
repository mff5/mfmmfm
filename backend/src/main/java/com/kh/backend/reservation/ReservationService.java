package com.kh.backend.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReservationService {

    @Autowired
    private ReservationMapper reservationMapper;
/*
    public Map<String, Object> getBookingsByManager(Integer managerNo, int page, int size) {
        int offset = (page - 1) * size;
        List<Map<String, Object>> bookings = reservationMapper.getBookingsByManager(managerNo, size, offset);
        int totalBookings = reservationMapper.countBookingsByManager(managerNo);
        int totalPages = (int) Math.ceil((double) totalBookings / size);

        Map<String, Object> result = new HashMap<>();
        result.put("bookings", bookings);
        result.put("totalPages", totalPages);
        result.put("currentPage", page);
        return result;
    }

 */
    public List<Reservation> getReservationsByMemberNo(int memberNo) {
        return reservationMapper.getReservationsByMemberNo(memberNo);
    }
    public boolean insertReservation(Reservation getReservationsByMemberNo) {
        return reservationMapper.insertReservation(getReservationsByMemberNo) > 0;
    }
    public boolean deleteReservation(int no) {
        return reservationMapper.deleteReservation(no) > 0;
    }
    public Map<Integer, Integer> getPopularOffice() {
        return reservationMapper.getPopularOffice();
    }
}
