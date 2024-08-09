package com.kh.backend.member;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.kh.backend.admin.Admin;
import com.kh.backend.admin.AdminMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class MemberService {
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final AdminMapper adminMapper;
    public MemberService(MemberMapper memberMapper, PasswordEncoder passwordEncoder, AdminMapper adminMapper) {
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.adminMapper = adminMapper;
    }

    public boolean idCheck(String id) {
        return memberMapper.findById(id) == null;
    }

    public List<String> idExist(String phone) {
        List<String> ids = memberMapper.findIdByPhone(phone);
        return ids;
    }

    @Transactional
    public void registerMember(String id, String pw, String name, String phone, String email, Date birth, String gender) {
        Member member = new Member();
        member.setId(id);
        member.setPw(passwordEncoder.encode(pw));
        member.setName(name);
        member.setPhone(phone);
        member.setEmail(email);
        member.setBirth(birth);
        member.setGender(gender);

        try {
            memberMapper.insertMember(member);
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            throw new RuntimeException("알 수 없는 오류가 발생했습니다.", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("회원 등록 중 오류가 발생했습니다.", e);
        }
    }
    public boolean resetPw(String pw, String id)    {
        try {
            memberMapper.resetPw(passwordEncoder.encode(pw), id);
            return true;
        } catch (Exception e)   {
            e.printStackTrace();
            return false;
        }
    }
    public boolean updatePw(int no,String pw)  {
        return memberMapper.updatePw(no, passwordEncoder.encode(pw)) > 0;
    }
    public boolean deleteMember(String id, String pw) {
        Member member = memberMapper.findById(id);

        if (passwordEncoder.matches(pw, member.getPw())) {
            return memberMapper.deleteMemberById(id) > 0;
        } else {
            System.out.println("Password does not match.");
            return false;
        }
    }
    public boolean createAdmin() {
        return adminMapper.insertAdmin("admin", passwordEncoder.encode("admin")) > 0;
    }
    public int getMemberCount() {
        return memberMapper.getMemberCount();
    }
    public int getMonthMemberCount() {
        return memberMapper.getMonthMemberCount();
    }
    public int manCount() {
        return memberMapper.manCount();
    }
    public List<Map<String, Object>> getAgeGroupDistribution() {
        return memberMapper.getAgeGroupDistribution();
    }
}
