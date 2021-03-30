



var markers = [];
var startCoord = null;
var endCoord = null;

var polyline;
var polylineArr = [];

var circleArr = [];
var circleCenter;
var circleRadius;

var infowindow;

// 탐색 범위 on/off
var rangeActivate = false;

var distanceOverlay;
var placeOverlay;

// 마커 초기화
function delMarker() {
    for (var i in markers) {
        markers[i].setMap(null);
    }
    markers = [];
}
// 라인 초기화
function delPoly() {
    for (var i in polylineArr) {
        polylineArr[i].setMap(null);
    }
    polylineArr = [];
}
// 원 초기화
function delCircle() {
    for (var i in circleArr) {
        circleArr[i].setMap(null);
    }
    circleArr = [];
    circleCenter = null;
    circleRadius = null;
    rangeActivate = false;
}
// infowindo 초기화
function delInfo() {
    if (infowindow) {
        infowindow.setMap(null);
    }
    if (placeOverlay) {
        placeOverlay.setMap(null);
    }
}


// 로딩
var mapContainer = document.getElementById('map'), // 지도 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.51138291837466, 127.09807488796521), // 지도 중심
        level: 5 // 확대 레벨
    };

// div, 지도 옵션 > 지도 생성
var map = new kakao.maps.Map(mapContainer, mapOption);

// 현위치
function nowhere() {

    if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
    }

    delMarker();
    delPoly();
    delCircle();
    delInfo();

    // HTML5의 geolocation 사용할 수 있는지 확인 
    if (navigator.geolocation) {
        // GeoLocation, 접속위치 get
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시 위치 > geolocation 좌표로
            // 마커, 인포윈도우 표시
            displayMarker(locPosition);
        });
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치
        var locPosition = new kakao.maps.LatLng(37.56642857824065, 126.95110193435923);
        displayMarker(locPosition);
    }

    // 지도에 마커, 인포윈도우
    function displayMarker(locPosition) {
        // 중첩마커 삭제
        delMarker();
        // 마커 생성
        var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
        });
        markers.push(marker);
        map.setCenter(locPosition);
    }

}

// 출발 도착 찍
function setPoint() {

    if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
    }
    if (startCoord && endCoord) {
        startCoord = null;
        endCoord = null;
    }

    delMarker();
    delPoly();
    delCircle();
    delInfo();

    alert("깃발을 움직여 경로를 설정해주세요");
    alert("설정이 끝났다면 우클릭으로 설정을 종료하세요")
    var latlng = map.getCenter();

    var startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png',
        startSize = new kakao.maps.Size(50, 45),
        startOption = {
            offset: new kakao.maps.Point(15, 43) // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
        };

    // 출발 마커 이미지 생성
    var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);

    var startDragSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png',
        startDragSize = new kakao.maps.Size(50, 64),
        startDragOption = {
            offset: new kakao.maps.Point(15, 54) // 출발 마커의 드래그 이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
        };

    var startDragImage = new kakao.maps.MarkerImage(startDragSrc, startDragSize, startDragOption);
    var startPosition = new kakao.maps.LatLng(latlng.Ma - 0.0005, latlng.La - 0.0005);

    // 출발 마커를 생성합니다
    var startMarker = new kakao.maps.Marker({
        map: map,
        position: startPosition,
        draggable: true,
        image: startImage
    });
    markers.push(startMarker);

    // 출발 마커에 dragstart 이벤트를 등록합니다
    kakao.maps.event.addListener(startMarker, 'dragstart', function () {
        // 출발 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
        startMarker.setImage(startDragImage);
    });

    // 출발 마커에 dragend 이벤트를 등록합니다
    kakao.maps.event.addListener(startMarker, 'dragend', function () {
        // 출발 마커의 드래그가 종료될 때 마커 이미지를 원래 이미지로 변경합니다
        startMarker.setImage(startImage);
    });

    var arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png',
        arriveSize = new kakao.maps.Size(50, 45),
        arriveOption = {
            offset: new kakao.maps.Point(15, 43) // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
        };

    // 도착 마커 이미지 생성
    var arriveImage = new kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption);

    var arriveDragSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png',
        arriveDragSize = new kakao.maps.Size(50, 64),
        arriveDragOption = {
            offset: new kakao.maps.Point(15, 54) // 도착 마커의 드래그 이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
        };

    var arriveDragImage = new kakao.maps.MarkerImage(arriveDragSrc, arriveDragSize, arriveDragOption);
    var arrivePosition = new kakao.maps.LatLng(latlng.Ma + 0.0005, latlng.La + 0.0005);

    // 도착 마커 생성 
    var arriveMarker = new kakao.maps.Marker({
        map: map,
        position: arrivePosition,
        draggable: true,
        image: arriveImage
    });
    markers.push(arriveMarker);

    // 도착 마커에 dragstart 이벤트를 등록합니다
    kakao.maps.event.addListener(arriveMarker, 'dragstart', function () {
        // 도착 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
        arriveMarker.setImage(arriveDragImage);
    });

    // 도착 마커에 dragend 이벤트를 등록합니다
    kakao.maps.event.addListener(arriveMarker, 'dragend', function () {
        // 도착 마커의 드래그가 종료될 때 마커 이미지를 원래 이미지로 변경합니다
        arriveMarker.setImage(arriveImage);
    });

    // 마우스 우클릭 > 선 그리기 종료시 호출, HTML Content 리턴
    function getTimeHTML(distance) {
        // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
        var walkkTime = distance / 67 | 0;
        var walkHour = '', walkMin = '';
        // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
        if (walkkTime > 60) {
            walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
        }
        walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'
        // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
        var bycicleTime = distance / 227 | 0;
        var bycicleHour = '', bycicleMin = '';
        // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
        if (bycicleTime > 60) {
            bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
        }
        bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'

        var content = '<ul class="dotOverlay distanceInfo">';
        content += '    <li>';
        content += '        <span class="label">총거리</span><span class="number">' + distance + '</span>m';
        content += '    </li>';
        content += '    <li>';
        content += '        <span class="label">도보</span>' + walkHour + walkMin;
        content += '    </li>';
        content += '    <li>';
        content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
        content += '    </li>';
        content += '</ul>'

        return content;
    }



    function showDistance(content, position) {
        if (distanceOverlay) { // 커스텀오버레이가 생성된 상태

            // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
            distanceOverlay.setPosition(position);
            distanceOverlay.setContent(content);

        } else { // 커스텀 오버레이가 생성되지 않은 상태

            // 커스텀 오버레이를 생성하고 지도에 표시합니다
            distanceOverlay = new kakao.maps.CustomOverlay({
                map: map, // 커스텀오버레이를 표시할 지도입니다
                content: content,  // 커스텀오버레이에 표시할 내용입니다
                position: position, // 커스텀오버레이를 표시할 위치입니다.
                xAnchor: 0,
                yAnchor: 0,
                zIndex: 3
            });
        }
    }



    var rClickEvent = function (mouseEvent) {

        kakao.maps.event.removeListener(map, 'rightclick', rClickEvent);

        startMarker.setDraggable(false);
        arriveMarker.setDraggable(false);
        startCoord = markers[0].getPosition();
        endCoord = markers[1].getPosition();

        var linePath = [
            new kakao.maps.LatLng(startCoord.getLat(), startCoord.getLng()),
            new kakao.maps.LatLng(endCoord.getLat(), endCoord.getLng())
        ];


        polyline = new kakao.maps.Polyline({
            path: linePath, // 선 구성 좌표배열
            strokeWeight: 3,
            strokeColor: '#db4040',
            strokeOpacity: 0.6,
            strokeStyle: 'solid'
        });
        polyline.setMap(map);
        polylineArr.push(polyline);

        var distance = Math.round(polyline.getLength()), // 선의 총 거리를 계산합니다
            content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

        showDistance(content, endCoord);

    };

    kakao.maps.event.addListener(map, 'rightclick', rClickEvent);

}


// 교통 찾기
function traceRoute() {
    // 카카오는 api 없대고 url scheme도 반쪽밖에 안돼서 naver씀
    if (startCoord === null && endCoord === null) {
        alert("출발, 도착 지점을 먼저 설정하세요");

    } else {
        window.open("http://map.naver.com/index.nhn" + "?slng=" + startCoord.getLng() + "&slat=" + startCoord.getLat() + "&stext=출발" + "&elng=" + endCoord.getLng() + "&elat=" + endCoord.getLat() + "&etext=도착" + "&menu=route&pathType=1", "", "width=700px, height=700px");
    }

}


// 범위 탐색
function traceRange() {

    if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
    }

    delCircle();
    delInfo();

    if (startCoord === null && endCoord === null) {
        alert("출발, 도착 지점을 먼저 설정하세요.\n만약 설정을 마무리하지 않았다면 우클릭으로 설정을 완료하세요");

    } else {
        var Lat = (startCoord.getLat() + endCoord.getLat()) / 2;
        var Lng = (startCoord.getLng() + endCoord.getLng()) / 2;
        var circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(Lat, Lng),
            radius: polyline.getLength() / 2,
            strokeWeight: 1,
            strokeColor: '#00a0e9',
            strokeOpacity: 0.1,
            strokeStyle: 'solid',
            fillColor: '#00a0e9',
            fillOpacity: 0.2
        });
        circle.setMap(map);
        circleArr.push(circle);

        circleCenter = circle.getPosition();
        circleRadius = circle.getRadius();

        rangeActivate = true;
    }
}


// 뭘 찾는지 고르는거
/*
    PK6 : 주차장
    OL7 : 주유,충전소
    AT4 : 관광명소
    AD5 : 숙박
    FD6 : 음식점
    CE7 : 카페
*/
function setCategory() {
    // 아니 그냥 select로 가져올 수 있는거잖아
}



// 지점정보 확인
function nearSearch() {

    delMarker();
    delInfo();

    if (rangeActivate) {

        infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
            contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
            currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다

        // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
        contentNode.className = 'placeinfo_wrap';

        // 커스텀 오버레이 컨텐츠 노드에 mousedown, touchstart 이벤트 발생시
        // 지도 객체 이벤트 전달 방지 이벤트 핸들러
        addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
        addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

        // 커스텀 오버레이 컨텐츠를 설정합니다
        placeOverlay.setContent(contentNode);
        // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
        function addEventHandle(target, type, callback) {
            if (target.addEventListener) {
                target.addEventListener(type, callback);
            } else {
                target.attachEvent('on' + type, callback);
            }
        }

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(map);

        // 카테고리로 검색합니다
        ps.categorySearch('CE7', placesSearchCB, { location: circleCenter, radius: circleRadius, page: 1 });

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {

            if (status === kakao.maps.services.Status.OK) {

                for (var i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                }
                pagination.nextPage();
            }

        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {

            marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });
            markers.push(marker);

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                displayPlaceInfo(place);
            });
        }

        // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
        function displayPlaceInfo(place) {
            var content = '<div class="placeinfo">' +
                '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">'
                + place.place_name + '</a>' + '<span onclick="delInfo();" title="닫기">---------이 곳을 클릭하면 창을 닫습니다---------</span>';

            if (place.road_address_name) {
                content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                    '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
            } else {
                content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
            }

            content += '    <span class="tel">' + place.phone + '</span>' +
                '</div>' +
                '<div class="after"></div>';

            contentNode.innerHTML = content;
            placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
            placeOverlay.setMap(map);
        }
    } else {
        alert("탐색 범위를 먼저 설정해 주세요");
    }
}




// 인증 맛집은 보류야~
/*

function toCoordinate() {

    if (rangeActivate) {

        alert("설정 범위 주변 맛집을 탐색합니다");

        if (distanceOverlay) {
            distanceOverlay.setMap(null);
            distanceOverlay = null;
        }

        delMarker();
        delInfo();

        var geocoder = new kakao.maps.services.Geocoder();
        infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        $.getJSON('맛있는녀석들.json', function (data) {

            for (i in data) {
                // console.log("이름 :" + data[i].식당명 + " , 주소 :" + data[i].주소);
                geocoder.addressSearch(data[i].주소, function (result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        if (circleBound.contain(coords)) {

                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords,
                                title: data[i].식당명
                            });
                            markers.push(marker);

                            // kakao.maps.event.addListener(marker, 'click', function () {
                            //     // 마커 클릭시 인포윈도우 표출
                            //     infowindow.setContent('<div style="padding:5px;font-size:10px;">' + data[i].식당명 + '</div>');
                            //     infowindow.open(map, marker);
                            // });


                        }
                    }
                });

            };

        });

    } else {
        alert("범위를 설정하세요");
    }
    // return (markers.length === 0) ? alert("주변에 등록된 맛집이 없습니다") : "";
}

// 콜백으로 리턴이 나와야하는데

*/







































/* memo

    교통안내 url scheme https://map.kakao.com/link/to/카카오판교오피스,37.402056,127.108212
    클릭 위도경도 var latlng = mouseEvent.latLng;
    콜백함수

*/



