import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlacesList = () => {
    const [places, setPlaces] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('office');
    const navigate = useNavigate();

    const fetchPlaces = async () => {
        try {
            const response = await axios.get(`https://api.foursquare.com/v3/places/search`, {
                headers: {
                    'Authorization': 'fsq3hG7r/ac43TKUtVxKokflPhvPC+V+byQpfGU5dqAFKL0=' // 실제 API 키를 입력
                },
                params: {
                    query: 'office', // 검색어
                    categories: '11000', // 카테고리 ID 예: 11000 (사무실)
                    near: 'seoul', // 위치
                    limit: 10 // 결과 개수 제한
                }
            });

            const placesWithPhotos = await Promise.all(response.data.results.map(async place => {
                const photosResponse = await axios.get(`https://api.foursquare.com/v3/places/${place.fsq_id}/photos`, {
                    headers: {
                        'Authorization': 'fsq3hG7r/ac43TKUtVxKokflPhvPC+V+byQpfGU5dqAFKL0=' // 실제 API 키를 입력
                    }
                });

                if (photosResponse.data.length > 0) {
                    place.photoUrl = `${photosResponse.data[0].prefix}300x300${photosResponse.data[0].suffix}`;
                }

                return place;
            }));

            setPlaces(placesWithPhotos);
        } catch (error) {
            console.error("Error fetching places", error);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, [searchQuery, category]);

    return (
        <div>
            <h1>Places List</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for places..."
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="office">Office</option>
                <option value="coffee">Coffee Shop</option>
                <option value="restaurant">Restaurant</option>
            </select>
            <button onClick={fetchPlaces}>Search</button>
            <ul>
                {places.map(place => (
                    <li key={place.fsq_id}>
                        <h2>{place.name}</h2>
                        <p>{place.location.address}</p>
                        <p>{place.categories.map(cat => cat.name).join(', ')}</p>
                        {place.photoUrl && <img src={place.photoUrl} alt={place.name} />}
                        <button onClick={() => navigate(`/member/office/${place.fsq_id}`)}>Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlacesList;
