package com.kh.backend.common.jwt;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// JwtAuthFilter.java
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String accessToken = getAccessTokenFromRequest(request);
        System.out.println("accessToken : " + accessToken);
        if (accessToken != null && jwtUtil.validateAccessToken(accessToken)) {
            try {
                String username = jwtUtil.getUsernameFromAccessToken(accessToken);
                String role = jwtUtil.getRoleFromAccessToken(accessToken);
                int no = jwtUtil.getNoFromAccessToken(accessToken);

                System.out.println("Extracted username: " + username);
                System.out.println("Extracted role: " + role);
                System.out.println("Extracted no: " + no);

                if (username == null) {
                    throw new IllegalArgumentException("Username extracted from token is null");
                }

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.singletonList(new SimpleGrantedAuthority(role)));
                authentication.setDetails(no);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Authenticated user: " + username);
            } catch (Exception e) {
                System.out.println("Error during token processing: " + e.getMessage());
            }
        } else {
            System.out.println("Invalid or missing token");
        }
        filterChain.doFilter(request, response);
    }


    private String getAccessTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}