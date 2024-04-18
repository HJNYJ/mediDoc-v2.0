declare const kakao: any;

// 지도를 정의하는 함수
export const setKakaoMap = (latitude: number, longitude: number) => {
  // 지도 div 정의
  const mapContainer = document.getElementById("map");
  // 지도 옵션 정의
  const mapOptions = {
    center: new kakao.maps.LatLng(latitude, longitude), // 지도를 표시할 중심 좌표
    level: 3 // 지도 확대 정도 (1이 가장 확대)
  };

  return { mapContainer, mapOptions };
};

// 지도에 마커를 그리는 함수
export const drawMarkerOnMap = (
  map: object,
  latitude: number,
  longitude: number
) => {
  // 마커 위치 정의
  const markerPosition = new kakao.maps.LatLng(latitude, longitude);
  // 마커 정의
  const marker = new kakao.maps.Marker({
    position: markerPosition
  });

  // 마커 그리기
  marker.setMap(map);

  return marker;
};

// 지도에 마커의 설명을 그리는 함수
export const drawMarkerInfoOnMap = (
  map: object,
  marker: object,
  name: string,
  latitude: number,
  longitude: number
) => {
  // 마커 설명 위치 정의
  const markerInfoPosition = new kakao.maps.LatLng(latitude, longitude);
  // 마커 설명 내용 정의
  const markerInfoContent = `
  <div>
    <p>${name}</p>
    <p>
      <a href="https://map.kakao.com/link/map/${name},${latitude},${longitude}" style="color:#FF9A00FF" target="_blank">큰지도보기</a>
      <a href="https://map.kakao.com/link/to/${name},${latitude},${longitude}" style="color:#387ADFFF" target="_blank">길찾기</a>
    </p>
  </div>`;
  // 마커 설명 정의
  const markerInfo = new kakao.maps.InfoWindow({
    position: markerInfoPosition,
    content: markerInfoContent
  });

  markerInfo.open(map, marker);
};
