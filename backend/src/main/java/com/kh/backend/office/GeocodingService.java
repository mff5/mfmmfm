package com.kh.backend.office;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GeocodingService {

    private static final String GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

    @Value("${google.maps.api.key}")
    private String apiKey;

    public Coordinates getCoordinates(String address) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        String uri = UriComponentsBuilder.fromHttpUrl(GEOCODING_API_URL)
                .queryParam("address", address)
                .queryParam("key", apiKey)
                .toUriString();

        // API 응답 받기
        String response = restTemplate.getForObject(uri, String.class);


        System.out.println("API Response zip: " + response);

        // JSON 파싱
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);
        JsonNode location = root.path("results").path(0).path("geometry").path("location");

        // 위도와 경도 추출
        double lat = location.path("lat").asDouble();
        double lng = location.path("lng").asDouble();

        return new Coordinates(lat, lng);
    }

    // 위도와 경도를 담는 클래스
    public static class Coordinates {
        private double latitude;
        private double longitude;

        public Coordinates(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }

        public double getLatitude() {
            return latitude;
        }

        public double getLongitude() {
            return longitude;
        }

        @Override
        public String toString() {
            return "Coordinates{" +
                    "latitude=" + latitude +
                    ", longitude=" + longitude +
                    '}';
        }
    }
}