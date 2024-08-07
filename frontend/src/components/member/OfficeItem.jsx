import React from "react";
import { MdStarRate } from "react-icons/md";
import { PiHeartThin } from "react-icons/pi";
import "../../styles/components/member/OfficeItem.css";
import instance from "../../utils/axiosConfig.js";
import {useNavigate} from "react-router-dom";

const OfficeItem = (office) => {
    const navigate = useNavigate();

    const officeClick = async () => {
        navigate(`/member/office/${office.no}`);
    }
    return (
        <div className="office-item" onClick={officeClick}>
            <div className="image-box">
                <div className="like-on-image">
                    <PiHeartThin />
                </div>
                <div className="image">
                    <img src={`/src/assets/${office.titleImg}`} alt="Office" />
                </div>
            </div>
            <div className="content">
                <div className="top">
                    <h1>{office.title}</h1>
                    <div className="rating">
                        <MdStarRate />
                        <span>{/* 여기에 평점 추가 가능 */}</span>
                    </div>
                </div>
                <div className="middle">
                    <p className="address">{office.address}</p>
                    <p className="zip-code">{office.zipCode}</p>
                    <p className="capacity">최대인원 {office.capacity} 명</p>
                    <p className="price"><b>₩{Number(office.price).toLocaleString('ko-KR')}/1일</b></p>
                    <p className="content-description">{office.content}</p>
                </div>
            </div>
        </div>
    );
};

export default OfficeItem;
