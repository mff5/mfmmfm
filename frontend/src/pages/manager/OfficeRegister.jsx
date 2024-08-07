import React, { useState } from 'react';
import axios from 'axios';
import '/src/styles/pages/manager/OfficeRegister.css';
import instance from "../../utils/axiosConfig.js";
import { useNavigate } from "react-router-dom";
import {getNo} from "../../utils/auth.js";

const OfficeRegister = () => {
    const navigate = useNavigate();

    const initialState = {
        no: '',
        manager_no: getNo(),
        title: '',
        address: '',
        zipCode: '',
        latitude: '',
        longitude: '',
        content: '',
        price: 0,
        capacity: 0,
        titleImg: null,
        subImg1: null,
        subImg2: null,
        availability: '1',
    };

    const [office, setOffice] = useState(initialState);
    const [previewImages, setPreviewImages] = useState({
        titleImg: '',
        subImg1: '',
        subImg2: ''
    });

    const openPostcodePopup = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                setOffice(prevState => ({
                    ...prevState,
                    address: data.address,
                    zipCode: data.zonecode
                }));
            },
        }).open();
    };

    const handleImageChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages(prevState => ({
                    ...prevState,
                    [name]: reader.result
                }));
            };
            reader.readAsDataURL(file);
            setOffice(prevState => ({
                ...prevState,
                [name]: file
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', office.title);
        formData.append('managerNo', getNo());
        formData.append('address', office.address);
        formData.append('zipCode', office.zipCode);
        formData.append('latitude', office.latitude);
        formData.append('longitude', office.longitude);
        formData.append('content', office.content);
        formData.append('price', office.price);
        formData.append('capacity', office.capacity);
        formData.append('availability', office.availability);
        formData.append('titleImg', office.titleImg);
        formData.append('subImg1', office.subImg1);
        formData.append('subImg2', office.subImg2);

        instance.post('http://localhost:8080/office/register', formData)
            .then(response => {
                console.log('Form submitted successfully', response.data);
                alert("오피스 등록 성공");

                // 폼 초기화
                setOffice(initialState);
                setPreviewImages({
                    titleImg: '',
                    subImg1: '',
                    subImg2: ''
                });

                navigate("/manager/managerPage/register");
            })
            .catch(error => {
                console.error('Error submitting form', error);
            });
    };

    return (
        <div className="office-register">
            <h2 className="office-register-title">오피스 등록</h2>
            <div className="office-register-content">
                <div className="image-previews">
                    {previewImages.titleImg && (
                        <div className="image-preview-main">
                            <img src={previewImages.titleImg} alt="메인 이미지 미리보기" />
                        </div>
                    )}
                    <div className="image-preview-sub-container">
                        {previewImages.subImg1 && (
                            <div className="image-preview-sub">
                                <img src={previewImages.subImg1} alt="서브 이미지 1 미리보기" />
                            </div>
                        )}
                        {previewImages.subImg2 && (
                            <div className="image-preview-sub">
                                <img src={previewImages.subImg2} alt="서브 이미지 2 미리보기" />
                            </div>
                        )}
                    </div>
                </div>
                <form className="office-register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input id="title"
                               type="text"
                               placeholder="오피스 제목 입력"
                               value={office.title || ''}
                               onChange={(e) => setOffice({...office, title: e.target.value})} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">상세 설명</label>
                        <textarea id="content"
                                  placeholder="오피스에 대한 상세 설명 입력"
                                  value={office.content || ''}
                                  onChange={(e) => setOffice({...office, content: e.target.value})} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">주소</label>
                        <input id="address"
                               type="text"
                               placeholder="오피스 주소 입력"
                               value={office.address || ''}
                               onChange={(e) => setOffice({...office, address: e.target.value})} required readOnly
                        />
                        <button type="button" onClick={openPostcodePopup}>주소 찾기</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">최대 인원</label>
                        <input id="capacity"
                               type="number"
                               placeholder="수용 가능 인원 입력"
                               value={office.capacity || ''}
                               onChange={(e) => setOffice({...office, capacity: e.target.value})} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipCode">우편 번호</label>
                        <input id="zipCode"
                               type="text"
                               placeholder="우편 번호 입력"
                               value={office.zipCode || ''}
                               onChange={(e) => setOffice({...office, zipCode: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">가격</label>
                        <input id="price"
                               type="number"
                               placeholder="가격 입력 (원)"
                               value={office.price || ''}
                               onChange={(e) => setOffice({...office, price: e.target.value})} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="titleImg">메인 이미지</label>
                        <input id="titleImg"
                               type="file"
                               name="titleImg"
                               accept="image/*"
                               onChange={handleImageChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availability">사용 가능 여부</label>
                        <select id="availability" value={office.availability || ''}
                                onChange={(e) => setOffice({...office, availability: e.target.value})}> required
                            <option value="1">가능</option>
                            <option value="0">불가능</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="subImg1">서브 이미지 1</label>
                        <input id="subImg1"
                               type="file"
                               name="subImg1"
                               accept="image/*"
                               onChange={handleImageChange} required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">등록하기</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subImg2">서브 이미지 2</label>
                        <input id="subImg2"
                               type="file"
                               name="subImg2"
                               accept="image/*"
                               onChange={handleImageChange} required
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OfficeRegister;
