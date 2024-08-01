import React, { useEffect, useRef } from 'react';

const loadScript = (url, callback) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
};

const KakaoMap = ({ center, level }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const initializeMap = () => {
            if (center.lat && center.lng) {
                const container = mapRef.current;
                const options = {
                    center: new window.kakao.maps.LatLng(center.lat, center.lng),
                    level: level,
                };
                const map = new window.kakao.maps.Map(container, options);

                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(center.lat, center.lng),
                    map: map,
                });
            }
        };

        if (!window.kakao) {
            loadScript(`https://dapi.kakao.com/v2/maps/sdk.js?appkey=00a24fa0b6589c96ce9a3618644a04c0&autoload=false`, () => {
                window.kakao.maps.load(initializeMap);
            });
        } else {
            window.kakao.maps.load(initializeMap);
        }

        return () => {
            if (window.kakao) {
                delete window.kakao;
            }
        };
    }, [center, level]);

    return (
        <div className="kakao-map-container">
            <div ref={mapRef} className="kakao-map" />
            {!center.lat && !center.lng && (
                <div className="map-loading">Loading map...</div>
            )}
        </div>
    );
};

export default KakaoMap;
