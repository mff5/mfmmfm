package com.kh.backend.common.auth;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kh.backend.payment.Payment;
import com.kh.backend.payment.PaymentService;
import com.kh.backend.member.MemberMapper;
import com.kh.backend.member.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.kh.backend.admin.Admin;
import com.kh.backend.common.jwt.JwtUtil;
import com.kh.backend.manager.Manager;
import com.kh.backend.member.Member;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final AuthService authService;
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final PaymentService paymentService;

    public AuthController(JwtUtil jwtUtil, AuthService authService, MemberService memberService, MemberMapper memberMapper, PaymentService paymentService) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.paymentService = paymentService;
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        if (jwtUtil.validateRefreshToken(refreshToken)) {
            String username = jwtUtil.getUsernameFromRefreshToken(refreshToken);
            String role = jwtUtil.getRoleFromRefreshToken(refreshToken);
            int no = jwtUtil.getNoFromRefreshToken(refreshToken);
            String newAccessToken = jwtUtil.generateAccessToken(username, role, no);
            return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken, no));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/member/login")
    public ResponseEntity<?> loginMember(@RequestBody LoginRequest loginRequest) {
        System.out.println("Fetching member with ID: " + loginRequest.getId());
        Member member = authService.authenticateMember(loginRequest.getId(), loginRequest.getPw());
        if (member != null) {
            System.out.println("Login successful for member ID: " + member.getId()); // 로그 추가
            String accessToken = jwtUtil.generateAccessToken(member.getId(), "ROLE_MEMBER", member.getNo());
            String refreshToken = jwtUtil.generateRefreshToken(member.getId(), "ROLE_MEMBER", member.getNo());
            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, member.getNo()));
        } else {
            return ResponseEntity.badRequest().body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }


    @PostMapping("/manager/login")
    public ResponseEntity<?> loginManager(@RequestBody LoginRequest loginRequest) {
        Manager manager = authService.authenticateManager(loginRequest.getId(), loginRequest.getPw());
        if (manager != null) {
            String accessToken = jwtUtil.generateAccessToken(manager.getId(), "ROLE_MANAGER", manager.getNo());
            String refreshToken = jwtUtil.generateRefreshToken(manager.getId(), "ROLE_MANAGER", manager.getNo());
            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, manager.getNo()));
        } else {
            return ResponseEntity.badRequest().body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest loginRequest) {
        Admin admin = authService.authenticateAdmin(loginRequest.getId(), loginRequest.getPw());
        if (admin != null) {
            String accessToken = jwtUtil.generateAccessToken(admin.getId(), "ROLE_ADMIN", admin.getNo());
            String refreshToken = jwtUtil.generateRefreshToken(admin.getId(), "ROLE_ADMIN", admin.getNo());
            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, admin.getNo()));
        } else {
            return ResponseEntity.badRequest().body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }

    @GetMapping("/kakao/login-url")
    public ResponseEntity<String> getKakaoLoginUrl() {
        String kakaoLoginUrl = memberService.getKakaoLoginUrl();
        return ResponseEntity.ok(kakaoLoginUrl);
    }

    @GetMapping("/kakao/callback")
    public void kakaoCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
        try {
            Member member = memberService.findOrCreateKakaoUser(code);
            response.sendRedirect("http://localhost:5173/login?message=success");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("http://localhost:5173/login?message=error");
        }
    }

    @GetMapping("/naver/login-url")
    public ResponseEntity<String> getNaverLoginUrl() {
        String naverLoginUrl = memberService.getNaverLoginUrl();
        return ResponseEntity.ok(naverLoginUrl);
    }

    @GetMapping("/naver/callback")
    public void naverCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
        try {
            Member member = memberService.findOrCreateNaverUser(code);
            response.sendRedirect("http://localhost:5173/login?message=success");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("http://localhost:5173/login?message=error");
        }
    }

    @GetMapping("/google/login-url")
    public ResponseEntity<String> getGoogleLoginUrl() {
        String googleLoginURl = memberService.getGoogleLoginUrl();
        return ResponseEntity.ok(googleLoginURl);
    }

    @GetMapping("/google/callback")
    public void googleCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
        try {
            Member member = memberService.findOrCreateGoogleUser(code);
            response.sendRedirect("http://localhost:5173/login?message=success");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("http://localhost:5173/login?message=error");
        }
    }

    @GetMapping("/idExist")
    public ResponseEntity<?> idExist(@RequestParam String phone) {
        List<String> ids = memberService.idExist(phone);
        if (ids != null && !ids.isEmpty()) {
            return new ResponseEntity<>(ids, HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().body("아이디가 존재하지 않습니다.");
        }
    }

    @GetMapping("/member")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        if (authentication == null) {
            System.out.println("Authentication object is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        String name = authentication.getName();
        System.out.println("Authenticated user: " + name);
        Member member = memberMapper.findById(name);
        if (member == null) {
            System.out.println("Member not found with name: " + name);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
        }
        int memberNo = member.getNo();
        System.out.println("Member number: " + memberNo);

        Map<String, Object> response = new HashMap<>();

        List<Payment> payments = null;
        try {
            payments = paymentService.getPaymentsByMemberNo(memberNo);
            System.out.println("Payments retrieved: " + payments.size());
        } catch (Exception e) {
            System.out.println("Error fetching payments: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching payments");
        }

        response.put("member", member);
        System.out.println("Member details: " + member);
        response.put("payments", payments);

        return ResponseEntity.ok(response);
    }

}
