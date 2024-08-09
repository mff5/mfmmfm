package com.kh.backend.member;

import org.apache.ibatis.annotations.Mapper;

import java.rmi.MarshalledObject;
import java.util.List;
import java.util.Map;

@Mapper
public interface MemberMapper {
    void insertMember(Member member);

    Member findById(String id);

    Member findByEmail(String email);

    Member findByPhone(String phone);

    List<String> findIdByPhone(String phone);

    void resetPw(String pw, String id);

    Member findByNo(int no);

    int updatePw(int no, String pw);

    int deleteMemberById(String id);

    int getMemberCount();

    int getMonthMemberCount();

    int manCount();

    List<Map<String, Object>> getAgeGroupDistribution();
}