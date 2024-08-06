import React, { useEffect, useReducer, useState } from "react";
import MemberFooter from "../../components/member/MemberFooter";
import OfficeItem from "../../components/member/OfficeItem";
import PopUpMSG from "../../components/member/PopUpMSG";
import PopUpQNA from "../../components/member/PopUpQNA";
import PopupPage from "../../components/member/PopupPage";
import "../../styles/pages/member/MemberMain.css";
import {useNavigate} from "react-router-dom";
import MemberHeader from "../../components/member/MemberHeader.jsx";

const initialPopupState = {
  type: null,
  message: "",
};

const SearchResultMockData = [
  {
    id: 1,
    title: "강남역 사무실",
    rating: "4.5",
    noOfRating: "40",
    description: "강남역 사무실",
    location: "강남역",
    pricePerDay: "10000",
    officeImgURL: "/demooffice1.webp",
    xCoordinate: 127.058392,
    yCoordinate: 37.500454,
  },
  {
    id: 2,
    title: "홍대입구 코워킹스페이스",
    rating: "4.8",
    noOfRating: "55",
    description: "홍대입구 코워킹스페이스",
    location: "홍대입구",
    pricePerDay: "12000",
    officeImgURL: "/demooffice2.webp",
    xCoordinate: 126.923774,
    yCoordinate: 37.557534,
  },
  {
    id: 3,
    title: "판교 스타트업 오피스",
    rating: "4.2",
    noOfRating: "28",
    description: "판교 스타트업 오피스",
    location: "판교",
    pricePerDay: "15000",
    officeImgURL: "/demooffice3.webp",
    xCoordinate: 127.10864,
    yCoordinate: 37.402111,
  },
  {
    id: 4,
    title: "역삼동 비즈니스 센터",
    rating: "4.6",
    noOfRating: "62",
    description: "역삼동 비즈니스 센터",
    location: "역삼동",
    pricePerDay: "13000",
    officeImgURL: "/demooffice4.webp",
    xCoordinate: 127.036346,
    yCoordinate: 37.501362,
  },
  {
    id: 5,
    title: "신촌 스터디룸",
    rating: "4.3",
    noOfRating: "33",
    description: "신촌 스터디룸",
    location: "신촌",
    pricePerDay: "8000",
    officeImgURL: "/demooffice5.webp",
    xCoordinate: 126.936893,
    yCoordinate: 37.555976,
  },
];

function MemberMain() {
  // state //
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [popupState, dispatchPopup] = useReducer(
    popupReducer,
    initialPopupState
  );

  useEffect(() => {
    // event handler: Scroll 이벤트 처리  //
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

      setIsButtonVisible(distanceFromBottom <= 700 && distanceFromBottom >= 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  event handler: 팝업 상태 관리 리듀서 사용을 위한 핸들러 //
  const handlePopup = (type, message = "") => {
    dispatchPopup({ type, message });
  };

  //  function: 팝업 상태 관리 리듀서   //
  function popupReducer(state, action) {
    switch (action.type) {
      // case "LOGIN":
      //   return {
      //     type: "LOGIN",
      //     popupComponent: (
      //       <LoginPopup onClose={() => dispatchPopup({ type: "CLOSE" })} />
      //     ),
      //   };
      // case "REGISTER":
      //   return {
      //     type: "REGISTER",
      //     popupComponent: (
      //       <RegisterPopup onClose={() => dispatchPopup({ type: "CLOSE" })} />
      //     ),
      //   };
      case "QNA":
        return {
          type: "QNA",
          popupComponent: (
            <PopUpQNA onClose={() => dispatchPopup({ type: "CLOSE" })} />
          ),
          onClickBackground: () => dispatchPopup({ type: "CLOSE" }),
        };
      case "MSG":
        return {
          type: "MSG",
          popupComponent: (
            <PopUpMSG
              message={action.message}
              onClose={() => dispatchPopup({ type: "CLOSE" })}
            />
          ),
          onClickBackground: () => dispatchPopup({ type: "CLOSE" }),
        };
      case "CLOSE":
        return initialPopupState;
      default:
        return state;
    }
  }

  useEffect(() => {
    console.log("main token="+localStorage.getItem('accessToken'));
    console.log("main refreshToken="+localStorage.getItem('refreshToken'));
  }, []);

  return (
    //render 메인페이지 랜더링//
    <div className="member-main-page">
      <MemberHeader handlePopup={handlePopup} />
      <div className="main-container">
        <div className="office-item-list">
          {SearchResultMockData.map((item) => (
              <OfficeItem key={item.id} {...item} />
          ))}{" "}
          <button className={`More-Button ${isButtonVisible ? "visible" : ""}`}>
            더보기
          </button>
        </div>
      </div>
      <PopupPage
          popupComponent={popupState.popupComponent}
        onClickBackground={popupState.onClickBackground}
      />
      <MemberFooter handlePopup={handlePopup} />
    </div>
  );
}

export default MemberMain;
