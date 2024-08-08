package com.kh.backend.office;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

import com.kh.backend.manager.Manager;
import com.kh.backend.manager.ManagerService;
import com.kh.backend.review.Review;
import com.kh.backend.review.ReviewService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class OfficeController {

    private final OfficeService officeService;
    private final ManagerService managerService;
    private final GeocodingService geocodingService;
    private final ReviewService reviewService;

    public OfficeController(OfficeService officeService, ManagerService managerService, GeocodingService geocodingService, ReviewService reviewService) {
        this.officeService = officeService;
        this.managerService = managerService;
        this.geocodingService = geocodingService;
        this.reviewService = reviewService;
    }

    // 통계 메소드
    @GetMapping("/manager/office/stats/{no}")
    public ResponseEntity<Map<String, Object>> getStatistics(@PathVariable int no) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRevenue", officeService.getTotalRevenue(no));       // 누적 수익
        stats.put("totalUsage", officeService.getTotalUsage(no));           // 누적 이용자
        stats.put("totalRating", officeService.getTotalRating(no));         // 총 평점 (보유한 전체 오피스)
        stats.put("totalActive", officeService.getActiveOfficeCount(no));   // 현재 이용 중인 숫자

        List<Map<String, Object>> monthlyRevenue = officeService.getMonthlyRevenue(no);
        stats.put("monthlyRevenue", monthlyRevenue); // 월 매출
        List<Map<String, Object>> genderRatio = officeService.getTotalGenderRatio(no);
        stats.put("genderRatio", genderRatio); // 이용자 성비
        Map<String, Object> officeStatus = getOfficeStatusPaged(no, 1, 100);
        stats.put("offices", officeStatus.get("offices")); // 오피스 등록 상태 (승인, 대기)
        return ResponseEntity.ok(stats);
    }

    // 오피스 상태 목록 조회 (페이지네이션)
    @GetMapping("/manager/office/status/{no}")
    public Map<String, Object> getOfficeStatusPaged(@PathVariable int no,
                                                    @RequestParam(defaultValue = "1") int page,
                                                    @RequestParam(defaultValue = "5") int size) {
        List<Office> offices = officeService.getOfficeStatusPaged(no, page, size); // 오피스 목록
        int total = officeService.getOfficeStatusCount(no); // 오피스 수

        Map<String, Object> response = new HashMap<>();
        response.put("offices", offices);
        response.put("total", total);
        response.put("page", page);
        response.put("size", size);

        return response;
    }

    // 오피스 no로 오피스 정보 삭제
    @DeleteMapping("/manager/office/delete/{no}")
    public ResponseEntity<Void> deleteOffice(@PathVariable int no) {
        officeService.deleteOffice(no);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/manager/office/register")
    public ResponseEntity<Void> officeRegister(@RequestParam("title") String title,
                                               @RequestParam("managerNo") int managerNo,
                                               @RequestParam("address") String address,
                                               @RequestParam("zipCode") String zipCode,
                                               @RequestParam("content") String content,
                                               @RequestParam("price") int price,
                                               @RequestParam("capacity") int capacity,
                                               @RequestParam("availability") String availability,
                                               @RequestParam(value = "titleImg", required = false) MultipartFile titleImg,
                                               @RequestParam(value = "subImg1", required = false) MultipartFile subImg1,
                                               @RequestParam(value = "subImg2", required = false) MultipartFile subImg2) throws Exception {
        String titleImgUrl = saveFile(titleImg);
        String subImg1Url = saveFile(subImg1);
        String subImg2Url = saveFile(subImg2);

        Office office = new Office();

        office.setManagerNo(managerNo);
        office.setTitle(title);
        office.setAddress(address);
        office.setZipCode(zipCode);
        office.setLatitude(geocodingService.getCoordinates(zipCode).getLatitude());
        office.setLongitude(geocodingService.getCoordinates(zipCode).getLongitude());
        office.setContent(content);
        office.setPrice(price);
        office.setCapacity(capacity);
        office.setTitleImg(titleImgUrl);
        office.setSubImg1(subImg1Url);
        office.setSubImg2(subImg2Url);
        office.setAvailability(Integer.parseInt(availability));



        try {
            officeService.insertOffice(office);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @Value("${file.upload-dir}")
    private String uploadDir;

    private String saveFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String filePath = uploadDir + File.separator + UUID.randomUUID() + "_" + fileName;

        try {
            Files.copy(file.getInputStream(), Paths.get(filePath));
            return new File(filePath).getName(); // Assuming a file URL path
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/manager/office/edit/{no}")
    public ResponseEntity<?> editOffice(@PathVariable int no) {
        Office office = officeService.getOffice(no);
        if (office != null) {
            return ResponseEntity.ok(office);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/manager/office/edit/{no}")
    public ResponseEntity<Void> updateOffice(@RequestParam("no") int no,
                                             @RequestParam("title") String title,
                                             @RequestParam("managerNo") int managerNo,
                                             @RequestParam("address") String address,
                                             @RequestParam("zipCode") String zipCode,
                                             @RequestParam("content") String content,
                                             @RequestParam("price") int price,
                                             @RequestParam("capacity") int capacity,
                                             @RequestParam("availability") String availability) throws Exception {

        Office office = new Office();

        office.setNo(no);
        office.setManagerNo(managerNo);
        office.setTitle(title);
        office.setAddress(address);
        office.setZipCode(zipCode);
        office.setLatitude(geocodingService.getCoordinates(zipCode).getLatitude());
        office.setLongitude(geocodingService.getCoordinates(zipCode).getLongitude());
        office.setContent(content);
        office.setPrice(price);
        office.setCapacity(capacity);
        office.setAvailability(Integer.parseInt(availability));



        try {
            officeService.updateOffice(office);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    // availability, searchText에 따라 오피스 목록 조회
    @GetMapping("/manager/office/{no}")
    public Map<String, Object> getAllOffices(@PathVariable int no, @RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "10") int size, @RequestParam(required = false) Integer availability,
                                             @RequestParam(required = false) String searchText) {

        List<Office> offices = officeService.getOffices(no, page, size, availability, searchText); // 조건에 맞는 오피스 목록
        int total = officeService.getOfficeCount(no, availability, searchText); // 조건에 맞는 오피스 수

        Map<String, Object> response = new HashMap<>();
        response.put("offices", offices);
        response.put("total", total);
        response.put("page", page);
        response.put("size", size);

        return response;
    }

    @GetMapping("/offices")
    public Map<String, Object> getOffices(@RequestParam(defaultValue = "1") int page,
                                          @RequestParam(defaultValue = "50") int size,
                                          @RequestParam(required = false) Integer availability,
                                          @RequestParam(required = false) String category) {

        List<Office> offices;
        if (category == null || category.equalsIgnoreCase("All")) {
            offices = officeService.getAllOffices(page, size, availability);
        } else {
            offices = officeService.getByCategory(page, size, availability, category);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("offices", offices);
        response.put("page", page);
        response.put("size", size);
        return response;
    }

    @GetMapping("/office/{no}")
    public ResponseEntity<?> getOffice(@PathVariable int no) {
        Office office = officeService.getOffice(no);
        int managerNo = office.getManagerNo();
        Manager manager = managerService.findByNo(managerNo);
        List<Review> reviews = reviewService.getReviews(no);
        if (office != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("office", office);
            response.put("manager", manager);
            response.put("reviews", reviews);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
