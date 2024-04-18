import {
  drawMarkerInfoOnMap,
  drawMarkerOnMap,
  setKakaoMap
} from "@/utils/drawKakaoMap";
import React, { useEffect } from "react";

declare const kakao: any;

// ./src/components/apply/CourseSelect.tsx:29:31
// Type error: Parameter ‘check’ implicitly has an ‘any’ type.
//   27 |   const [checkedCourse, setCheckedCourse] = useState(new Map());
//   28 |
// > 29 |   const checkCourseHandler = (check, id) => {
//      |                               ^
//   30 |     const map = new Map();
//   31 |     map.set(check, id);
//   32 |     setCheckedCourse(map);
// error Command failed with exit code 1.

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
    <div id="map" className="w-[390px] h-[281px]">
      Map
    </div>
  );
};

export default Map;
