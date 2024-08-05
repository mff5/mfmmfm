import React from 'react';

const OfficeList = () => {
    const offices = [
        { title: 'Office A', price: '1000원', capacity: '10명', availability: '가능' },
        { title: 'Office B', price: '2000원', capacity: '20명', availability: '가능' },
        { title: 'Office C', price: '1500원', capacity: '15명', availability: '불가능' },
        { title: 'Office D', price: '800원', capacity: '8명', availability: '가능' },
        { title: 'Office E', price: '3000원', capacity: '25명', availability: '가능' },
        { title: 'Office F', price: '1200원', capacity: '12명', availability: '가능' },
        { title: 'Office G', price: '900원', capacity: '9명', availability: '불가능' },
        { title: 'Office H', price: '3500원', capacity: '30명', availability: '가능' },
        { title: 'Office I', price: '1800원', capacity: '18명', availability: '불가능' },
    ];

    return (
        <div className="office-list">
            {offices.map((office, index) => (
                <div className="office-card" key={index}>
                    <div className="image-placeholder">
                        <img src="https://via.placeholder.com/800x800" alt="Office" />
                    </div>
                    <div className="office-details">
                        <h3>{office.title}</h3>
                        <p>{office.price}</p>
                        <p>{office.capacity}</p>
                        <p>{office.availability}</p>
                    </div>
                    <button className="edit-button">수정하기</button>
                </div>
            ))}
        </div>
    );
};

export default OfficeList;
