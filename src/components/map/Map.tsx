import {
  drawMarkerInfoOnMap,
  drawMarkerOnMap,
  setKakaoMap
} from "@/utils/drawKakaoMap";
import React, { useEffect } from "react";

declare const kakao;

const Map = ({
  name,
  latitude,
  longitude
}: {
  name: string;
  latitude: number;
  longitude: number;
}) => {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      kakao.maps.load(() => {
        // 지도 정의
        const mapDetail = setKakaoMap(latitude, longitude);

        // 지도 그리기
        const map = new kakao.maps.Map(
          mapDetail.mapContainer,
          mapDetail.mapOptions
        );

        // 마커 그리기
        const marker = drawMarkerOnMap(map, latitude, longitude);

        // 마커 정보 그리기
        drawMarkerInfoOnMap(map, marker, name, latitude, longitude);
      });
    };
  }, [name, latitude, longitude]);

  return (
    <div id="map" className="h-[281px]">
      Map
    </div>
  );
};

export default Map;
