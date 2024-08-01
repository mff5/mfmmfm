import React, { useReducer, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../../styles/components/member/MemberHeader.css";
import Calendar from "./Calendar";

// render: 오피스 카테고리 목록 //
const OFFICE_CATEGORIES = [
  "강남 오피스",
  "논산 오피스",
  "상록 오피스",
  "강북 오피스",
  "서울역 오피스",
  "판교 오피스",
  "역삼 오피스",
  "홍대입구 오피스",
  "여의도 오피스",
  "성수 오피스",
];

// state //
const initialState = {
  showCalendar: false,
  showAttendance: false,
};

// function: 팝업 상태 관리를 위한 리듀서 //
function popupReducer(state, action) {
  switch (action.type) {
    case "SHOW_CALENDAR":
      return { ...initialState, showCalendar: true };
    case "SHOW_ATTENDANCE":
      return { ...initialState, showAttendance: true };
    case "HIDE_ALL":
      return initialState;
    default:
      return state;
  }
}

const MemberHeader = () => {
  // state //
  const [popupState, dispatch] = useReducer(popupReducer, initialState);
  const [expanded, setExpanded] = useState(true);
  const [attendance, setAttendance] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // event handler: 외부 클릭 처리 //
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
    dispatch({ type: "HIDE_ALL" });
  };

  // event handler: 스크롤 처리 //
  const handleScroll = () => {
    if (window.scrollY < 500) {
      setExpanded(true);
    } else if (window.scrollY > 300) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  // event handler: 카테고리 클릭 처리 //
  const handleCategoryClick = (category) => {
    console.log("Category selected:", category);
    // TODO: Implement category selection functionality
  };

  // function: 사용자 메뉴 이벤트 처리 //
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // function: 날짜 포맷 //
  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // function: 달력 클릭 처리 //
  const handleCalendarClick = () => {
    dispatch({ type: "SHOW_CALENDAR" });
  };

  // function: 인원 선택 클릭 처리 //
  const handleAttendanceClick = () => {
    dispatch({ type: "SHOW_ATTENDANCE" });
  };

  // function: 인원 변경 처리 //
  const handleAttendanceChange = (change) => {
    setAttendance((prev) => Math.max(1, prev + change));
  };

  // event listeners
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <div className="header-container">
        <div className={`categories-container ${expanded ? "expanded" : ""}`}>
          <div className="categories-wrapper">
            {OFFICE_CATEGORIES.map((category, index) => (
                <div
                    key={index}
                    className="category-button"
                    onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
            ))}
          </div>
        </div>

        <div className="fixed-logo-wrapper">OFFICE24</div>
        <div
            className="fixed-menu-wrapper"
            onClick={toggleDropdown}
            ref={dropdownRef}
        >
          <div className="menu-icon-wrapper">
            <IoIosMenu />
          </div>
          <div className="profile-img-wrapper">
            <FaCircleUser style={{ color: "gray" }} />
            {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-option" onClick={() => navigate("/login")}>
                    로그인
                  </div>
                  <div className="dropdown-option" onClick={() => navigate("/member/register")}>
                    회원가입
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-option">Q&A</div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default MemberHeader;
