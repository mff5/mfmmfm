import React, { useState, useEffect } from "react";
import MemberHeader from "../../components/member/MemberHeader";
import MemberFooter from "../../components/member/MemberFooter";
import OfficeItem from "../../components/member/OfficeItem";
import "../../styles/pages/member/MemberMain.css";
import instance from "../../utils/axiosConfig.js";
import {useParams} from "react-router-dom";

const MemberMain = () => {
  const {category} = useParams();
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const params = {
          page: 1,
          size: 100,
          availability: 1,
          category: category
        };
        const response = await instance.get('http://localhost:8080/offices', { params });
        setOffices(response.data.offices);
      } catch (error) {
        alert("Error", error);
      }
    };

    fetchOffices();
  }, [category]);



  return (
      <div className="member-main-page">
        <MemberHeader/>
        <div className="member-main__container">
          <div className="member-main__office-list">
            {offices.map((office) => (
                <OfficeItem key={office.no} {...office} />
            ))}
          </div>
        </div>
        <MemberFooter />
      </div>
  );
};

export default MemberMain;
