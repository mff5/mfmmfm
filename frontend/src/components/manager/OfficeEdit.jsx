import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import '/src/styles/components/manager/OfficeEdit.css';
import ManagerFooter from "./ManagerFooter.jsx";
import ManagerHeader from "./ManagerHeader.jsx";
import instance from "../../utils/axiosConfig.js";
import {getNo} from "../../utils/auth.js";

const OfficeEdit = () => {
    const navigate = useNavigate();
    const {officeNo} = useParams();
    const [office, setOffice] = useState({
        no: '',
        manager_no: '',
        title: '',
        address: '',
        zipCode: '',
        latitude: '',
        longitude: '',
        content: '',
        price: '',
        capacity: '',
        titleImg: null,
        subImg1: null,
        subImg2: null,
        availability: '1',
    });

    const [previewImages, setPreviewImages] = useState({
        titleImg: '',
        subImg1: '',
        subImg2: ''
    });

    useEffect(() => {
        instance.get(`http://localhost:8080/manager/office/edit/${officeNo}`)
            .then(response => {
                const officeData = response.data;
                setOffice({
                    no: officeData.no,
                    manager_no: officeData.manager_no,
                    title: officeData.title,
                    address: officeData.address,
                    zipCode: officeData.zipCode,
                    latitude: officeData.latitude,
                    longitude: officeData.longitude,
                    content: officeData.content,
                    price: officeData.price,
                    capacity: officeData.capacity,
                    titleImg: null,
                    subImg1: null,
                    subImg2: null,
                    availability: officeData.availability,
                });

                setPreviewImages({
                    titleImg: officeData.titleImg ? `/src/assets/${officeData.titleImg}` : '',
                    subImg1: officeData.subImg1 ? `/src/assets/${officeData.subImg1}` : '',
                    subImg2: officeData.subImg2 ? `/src/assets/${officeData.subImg2}` : ''
                });
            })
            .catch(error => {
                console.error('Error fetching office data', error);
            });
    }, [officeNo]);

    const openPostcodePopup = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setOffice(prevState => ({
                    ...prevState,
                    address: data.address,
                    zipCode: data.zonecode
                }));
            },
        }).open();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("no", office.no);
        formData.append('title', office.title);
        formData.append('managerNo', getNo());
        formData.append('address', office.address);
        formData.append('zipCode', office.zipCode);
        formData.append('content', office.content);
        formData.append('price', office.price);
        formData.append('capacity', office.capacity);
        formData.append('availability', office.availability);
        if (office.titleImg) formData.append('titleImg', office.titleImg);
        if (office.subImg1) formData.append('subImg1', office.subImg1);
        if (office.subImg2) formData.append('subImg2', office.subImg2);

        instance.patch(`http://localhost:8080/manager/office/edit/${officeNo}`, formData)
            .then(response => {
                alert("오피스 수정 성공")
                navigate("/manager/managerPage");
            })
            .catch(error => {
                alert("오피스 수정 실패")
            });
    };

    return (
        <div>
            <div className="office-edit-header">
                <ManagerHeader/>
            </div>
            <div className="office-edit">
                <h2 className="office-edit-title">오피스 수정</h2>
                <div className="office-edit-content">
                    <div className="image-previews">
                        {previewImages.titleImg && (
                            <div className="image-preview-main">
                                <img src={previewImages.titleImg} alt="메인 이미지 미리보기"/>
                            </div>
                        )}
                        <div className="image-preview-sub-container">
                            {previewImages.subImg1 && (
                                <div className="image-preview-sub">
                                    <img src={previewImages.subImg1} alt="서브 이미지 1 미리보기"/>
                                </div>
                            )}
                            {previewImages.subImg2 && (
                                <div className="image-preview-sub">
                                    <img src={previewImages.subImg2} alt="서브 이미지 2 미리보기"/>
                                </div>
                            )}
                        </div>
                    </div>
                    <form className="office-edit-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">제목</label>
                            <input id="title"
                                   type="text"
                                   placeholder="오피스 제목 입력"
                                   value={office.title || ''}
                                   onChange={(e) => setOffice({...office, title: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">상세 설명</label>
                            <textarea id="content"
                                      placeholder="오피스에 대한 상세 설명 입력"
                                      value={office.content || ''}
                                      onChange={(e) => setOffice({...office, content: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">주소</label>
                            <input id="address"
                                   type="text"
                                   placeholder="오피스 주소 입력"
                                   value={office.address || ''}
                                   onChange={(e) => setOffice({...office, address: e.target.value})}
                            />
                            <button type="button" onClick={openPostcodePopup}>주소 찾기</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="capacity">최대 인원</label>
                            <input id="capacity"
                                   type="text"
                                   placeholder="최대 인원 입력"
                                   value={office.capacity || ''}
                                   onChange={(e) => setOffice({...office, capacity: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipCode">우편 번호</label>
                            <input id="zipCode"
                                   type="text"
                                   placeholder="우편 번호 입력"
                                   value={office.zipCode || ''}
                                   onChange={(e) => setOffice({...office, zipCode: e.target.value})} readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">가격</label>
                            <input id="price"
                                   type="text"
                                   placeholder="가격 입력 (원)"
                                   value={office.price || ''}
                                   onChange={(e) => setOffice({...office, price: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="availability">사용 가능 여부</label>
                            <select id="availability" value={office.availability || ''}
                                    onChange={(e) => setOffice({...office, availability: e.target.value})}>
                                <option value="1">가능</option>
                                <option value="0">불가능</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="submit-button">수정 내용 저장</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="office-edit-footer">
                <ManagerFooter/>
            </div>
        </div>
    );
};

export default OfficeEdit;
