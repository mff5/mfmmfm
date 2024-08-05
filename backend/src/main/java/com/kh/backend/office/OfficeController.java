package com.kh.backend.office;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class OfficeController {

    @Autowired
    private OfficeService officeService;

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

    // 오피스 no로 오피스 정보 삭제
    @DeleteMapping("/manager/office/delete/{no}")
    public ResponseEntity<Void> deleteOffice(@PathVariable int no) {
        officeService.deleteOffice(no);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/office/register")
    public ResponseEntity<Void> officeRegister( @RequestParam("title") String title,
                                                @RequestParam("managerNo") String managerNo,
                                                @RequestParam("address") String address,
                                                @RequestParam("zipCode") String zipCode,
                                                @RequestParam("latitude") String latitude,
                                                @RequestParam("longitude") String longitude,
                                                @RequestParam("content") String content,
                                                @RequestParam("price") String price,
                                                @RequestParam("capacity") String capacity,
                                                @RequestParam("availability") String availability,
                                                @RequestParam(value = "titleImg", required = false) MultipartFile titleImg,
                                                @RequestParam(value = "subImg1", required = false) MultipartFile subImg1,
                                                @RequestParam(value = "subImg2", required = false) MultipartFile subImg2) {
        String titleImgUrl = saveFile(titleImg);
        String subImg1Url = saveFile(subImg1);
        String subImg2Url = saveFile(subImg2);

        Office office = new Office();

        office.setManagerNo(Integer.parseInt(managerNo));
        office.setTitle(title);
        office.setAddress(address);
        office.setZipCode(zipCode);
        office.setLatitude(Double.parseDouble(latitude));
        office.setLongitude(Double.parseDouble(longitude));
        office.setContent(content);
        office.setPrice(Integer.parseInt(price));
        office.setCapacity(Integer.parseInt(capacity));
        office.setTitleImg(titleImgUrl);
        office.setSubImg1(subImg1Url);
        office.setSubImg2(subImg2Url);
        office.setAvailability(Integer.parseInt(availability));

        System.out.println("office="+office);

        try {
             officeService.insertOffice(office);
            return ResponseEntity.ok().build();
        } catch (Exception e)   {
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
            return "/files/" + new File(filePath).getName(); // Assuming a file URL path
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
