import axios from "axios";
import React from "react";

export const SocialKakao = () => {
    const handleKakao = () => {
        axios.get('http://localhost:8080/auth/kakao/login-url')
            .then(response => {
                const kakaoURL = response.data;
                window.location.href = kakaoURL;
            })
            .catch(error => {
                alert('카카오 로그인 URL을 가져오는 중 오류가 발생했습니다.');
            });
    };

    return (
        <button onClick={handleKakao} className="member-login-kakao-button">카카오 로그인</button>
    );
};

export const SocialNaver = () => {
    const handleNaver = () => {
        axios.get('http://localhost:8080/auth/naver/login-url')
            .then(response => {
                const naverURL = response.data;
                window.location.href = naverURL;
            })
            .catch(error => {
                alert('네이버 로그인 URL을 가져오는 중 오류가 발생했습니다.');
            });
    };

    return (
        <button onClick={handleNaver} className="member-login-naver-button">네이버 로그인</button>
    );
};

export const SocialGoogle = () => {
    const handleGoogle = () => {
        axios.get('http://localhost:8080/auth/google/login-url')
            .then(response => {
                const googleURL = response.data;
                window.location.href = googleURL;
            })
            .catch(error => {
                alert('구글 로그인 URL을 가져오는 중 오류가 발생했습니다.');
            });
    };

    return (
        <button onClick={handleGoogle} className="member-login-google-button">구글 로그인</button>
    );
};