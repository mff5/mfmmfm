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
@RequestMapping("/member")
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

    @GetMapping("/idCheck")
    public ResponseEntity<String> idCheck(@RequestParam String id) {
        if (memberService.idCheck(id)) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/checkId")
    public ResponseEntity<?> checkId(@RequestParam String id) {
        if (!memberService.idCheck(id)) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PostMapping("/register")
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
    @PostMapping("/resetPw")
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
    @PatchMapping("/updatePw")
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
}
