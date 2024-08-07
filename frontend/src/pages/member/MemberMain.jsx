import React, { useState, useEffect } from "react";
import MemberHeader from "../../components/member/MemberHeader";
import MemberFooter from "../../components/member/MemberFooter";
import OfficeItem from "../../components/member/OfficeItem";
import "../../styles/pages/member/MemberMain.css";
import instance from "../../utils/axiosConfig.js";

const MemberMain = () => {
  const [offices, setOffices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const params = {
          page: 1,
          size: 100,
          availability: 1,
        };
        if (selectedCategory !== "All") {
          params.category = selectedCategory;
        }

        const response = await instance.get('http://localhost:8080/offices', { params });
        setOffices(response.data.offices);
      } catch (error) {
        alert("Error", error);
      }
    };

    fetchOffices();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
      <div className="member-main-page">
        <MemberHeader onCategorySelect={handleCategorySelect} />
        <div className="member-main__container">
          <div className="member-main__office-list">
            {offices.map((office) => (
                <OfficeItem key={office.no} {...office} />
            ))}
          </div>
          {isButtonVisible && (
              <button className="member-main__more-button">
                더보기
              </button>
          )}
        </div>
        <MemberFooter />
      </div>
  );
};

export default MemberMain;
