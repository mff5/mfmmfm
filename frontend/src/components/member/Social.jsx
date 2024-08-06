import React from "react";
import instance from "../../utils/axiosConfig.js";
import '/src/styles/components/member/Social.css';

export const SocialKakao = () => {
    const handleKakao = () => {
        instance.get('http://localhost:8080/auth/kakao/login-url')
            .then(response => {
                const kakaoURL = response.data;
                window.location.href = kakaoURL;
            })
            .catch(error => {
                alert('카카오 로그인 URL을 가져오는 중 오류가 발생했습니다.');
            });
    };

    return (
        <button onClick={handleKakao} className="social-login-button member-login-kakao-button">카카오 로그인</button>
    );
};

export const SocialNaver = () => {
    const handleNaver = () => {
        instance.get('http://localhost:8080/auth/naver/login-url')
            .then(response => {
                const naverURL = response.data;
                window.location.href = naverURL;
            })
            .catch(error => {
                alert('네이버 로그인 URL을 가져오는 중 오류가 발생했습니다.');
            });
    };

    return (
        <button onClick={handleNaver} className="social-login-button member-login-naver-button">네이버 로그인</button>
    );
};0

export const SocialGoogle = () => {
    const handleGoogle = () => {
        instance.get('http://localhost:8080/auth/google/login-url')
            .then(response => {
                const googleURL = response.data;
                window.location.href = googleURL;
            })
            .catch(error => {
                alert('구글 로그인 URL을 가져오는 중 오류가 발생했습니다.');
            });
    };

    return (
        <button onClick={handleGoogle} className="social-login-button member-login-google-button">구글 로그인</button>
    );
};