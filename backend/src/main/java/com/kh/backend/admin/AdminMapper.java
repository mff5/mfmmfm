package com.kh.backend.admin;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    Admin findById(String id);
    int insertAdmin(String id, String pw);
}