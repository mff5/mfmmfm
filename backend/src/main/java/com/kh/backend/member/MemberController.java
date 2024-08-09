package com.kh.backend.member;

import com.kh.backend.manager.Manager;
import com.kh.backend.manager.ManagerService;
import com.kh.backend.office.Office;
import com.kh.backend.office.OfficeMapper;
import com.kh.backend.office.OfficeService;
import com.kh.backend.review.Review;
import com.kh.backend.review.ReviewMapper;
import com.kh.backend.review.ReviewService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MemberController {

    private final MemberService memberService;
    private final OfficeMapper officeMapper;
    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;
    private final OfficeService officeService;
    private final ManagerService managerService;

    public MemberController(MemberService memberService, OfficeMapper officeMapper, ReviewMapper reviewMapper, ReviewService reviewService, OfficeService officeService, ManagerService managerService) {
        this.memberService = memberService;
        this.officeMapper = officeMapper;
        this.reviewMapper = reviewMapper;
        this.reviewService = reviewService;
        this.officeService = officeService;
        this.managerService = managerService;
    }

    @GetMapping("/member/idCheck")
    public ResponseEntity<String> idCheck(@RequestParam String id) {
        if (memberService.idCheck(id)) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/member/checkId")
    public ResponseEntity<?> checkId(@RequestParam String id) {
        if (!memberService.idCheck(id)) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PostMapping("/member/register")
    public ResponseEntity<?> registerMember(@RequestBody Member member) {
        try {
            memberService.registerMember(member.getId(), member.getPw(),
                    member.getName(), member.getPhone(), member.getEmail(),
                    member.getBirth(), member.getGender());
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/member/resetPw")
    public ResponseEntity<?> resetPw(@RequestBody Map<String, String> map) {
        String pw = map.get("pw");
        String id = map.get("id");
        
        boolean result = memberService.resetPw(pw, id);
        if (result) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PatchMapping("/member/updatePw")
    public ResponseEntity<?> updatePw(@RequestBody PwRequest pwRequest)    {
        int no = pwRequest.getNo();
        String pw = pwRequest.getPw();
        boolean result = memberService.updatePw(no, pw);
        if (result) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @DeleteMapping("/member/delete/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable String id, @RequestBody Map<String, String> data) {
        String pw = data.get("pw");
        boolean result = memberService.deleteMember(id, pw);
        if (result) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @GetMapping("/admin/memberStats")
    public ResponseEntity<?> memberStats() {
        try {
            int totalMembers = memberService.getMemberCount();
            System.out.println("totalMember:"+totalMembers);
            int newMembers = memberService.getMonthMemberCount();
            System.out.println("newMembers:"+newMembers);
            int manCount = memberService.manCount();
            System.out.println("manCount:"+manCount);
            int womanCount = totalMembers - manCount;
            System.out.println("womanCount:"+womanCount);
            List<Map<String, Object>> ageGroupDistribution = memberService.getAgeGroupDistribution();
            System.out.println("ageGroupDistribution:"+ageGroupDistribution);

            Map<String, Object> response = new HashMap<>();
            response.put("totalMembers", totalMembers);
            response.put("newMembers", newMembers);
            response.put("manCount", manCount);
            response.put("womanCount", womanCount);
            response.put("ageGroupDistribution", ageGroupDistribution);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
