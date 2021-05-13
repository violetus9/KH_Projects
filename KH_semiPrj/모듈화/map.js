


// 지도상 마커들 담는 배열
let markers = [];
// 출발, 도착지점 설정 좌표
let startCoord = null;
let endCoord = null;

let polyline;
let polylineArr = [];

let circleArr = [];
let circleCenter;
let circleRadius;

let infowindow;

// 탐색 범위 on/off
let rangeActivate = false;

let distanceOverlay;
let placeOverlay;

let clusterer = null;
let clusterMap = new Map();

let mouseRCoord;

let currCategory;

// 마커 초기화
function delMarker() {
    for (let i in markers) {
        markers[i].setMap(null);
    }
    markers = [];
    if (clusterer) {
        clusterer.clear();
        clusterer = null;
    }
}
// 라인 초기화
function delPoly() {
    for (let i in polylineArr) {
        polylineArr[i].setMap(null);
    }
    polylineArr = [];
}
// 원 초기화
function delCircle() {
    for (let i in circleArr) {
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
let mapContainer = document.getElementById('map'), // 지도 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.51138291837466, 127.09807488796521), // 지도 중심
        level: 5 // 확대 레벨
    };

// div, 지도 옵션 > 지도 생성
let map = new kakao.maps.Map(mapContainer, mapOption);


// 줌 변화시
kakao.maps.event.addListener(map, 'zoom_changed', function () {
    // 불필요 오버레이 삭제
    if (placeOverlay) {
        placeOverlay.setMap(null);
    }
});


// 현위치
function nowhere() {

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

    // HTML5의 geolocation 사용할 수 있는지 확인 
    if (navigator.geolocation) {
        // GeoLocation, 접속위치 get
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시 위치 > geolocation 좌표로
            // 마커, 인포윈도우 표시
            displayMarker(locPosition);
        });
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치
        let locPosition = new kakao.maps.LatLng(37.56642857824065, 126.95110193435923);
        displayMarker(locPosition);
    }

    // 지도에 마커, 인포윈도우
    function displayMarker(locPosition) {
        // 중첩마커 삭제
        delMarker();
        // 마커 생성
        let marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
        });
        markers.push(marker);
        map.panTo(locPosition);
    }

}

// 출발 도착 찍기
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
    alert("설정이 끝났다면 우클릭으로 설정을 종료합니다")
    let latlng = map.getCenter();

    let startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png',
        startSize = new kakao.maps.Size(50, 45),
        startOption = {
            offset: new kakao.maps.Point(15, 43) // 출발 마커이미지서 마커 좌표에 일치시킬 좌표 설정 (기본값은 이미지의 가운데 아래)
        };

    // 출발 마커 이미지 생성
    let startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);

    let startDragSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png',
        startDragSize = new kakao.maps.Size(50, 64),
        startDragOption = {
            offset: new kakao.maps.Point(15, 54) // 출발 마커 드래그 이미지서 마커 좌표에 일치시킬 좌표 설정 (기본값은 이미지의 가운데 아래)
        };

    let startDragImage = new kakao.maps.MarkerImage(startDragSrc, startDragSize, startDragOption);
    let startPosition = new kakao.maps.LatLng(latlng.Ma - 0.0005, latlng.La - 0.0005);

    // 출발 마커 생성
    let startMarker = new kakao.maps.Marker({
        map: map,
        position: startPosition,
        draggable: true,
        image: startImage
    });
    markers.push(startMarker);

    // 출발 마커 dragstart 이벤트 등록
    kakao.maps.event.addListener(startMarker, 'dragstart', function () {
        // 출발 마커 드래그 시작시 마커 이미지
        startMarker.setImage(startDragImage);
    });

    // 출발 마커에 dragend 이벤트를 등록합니다
    kakao.maps.event.addListener(startMarker, 'dragend', function () {
        // 출발 마커 드래그 종료시 마커 이미지 > 원래 이미지
        startMarker.setImage(startImage);
    });

    let arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png',
        arriveSize = new kakao.maps.Size(50, 45),
        arriveOption = {
            offset: new kakao.maps.Point(15, 43) // 도착 마커이미지서 마커 좌표에 일치시킬 좌표 설정 (기본값은 이미지의 가운데 아래)
        };

    // 도착 마커 이미지 생성
    let arriveImage = new kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption);

    let arriveDragSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png',
        arriveDragSize = new kakao.maps.Size(50, 64),
        arriveDragOption = {
            offset: new kakao.maps.Point(15, 54) // 도착 마커 드래그 이미지서 마커 좌표에 일치시킬 좌표 설정 (기본값은 이미지의 가운데 아래)
        };

    let arriveDragImage = new kakao.maps.MarkerImage(arriveDragSrc, arriveDragSize, arriveDragOption);
    let arrivePosition = new kakao.maps.LatLng(latlng.Ma + 0.0005, latlng.La + 0.0005);

    // 도착 마커 생성 
    let arriveMarker = new kakao.maps.Marker({
        map: map,
        position: arrivePosition,
        draggable: true,
        image: arriveImage
    });
    markers.push(arriveMarker);

    // 도착 마커 dragstart 이벤트 등록
    kakao.maps.event.addListener(arriveMarker, 'dragstart', function () {
        // 도착 마커 드래그 시작시 마커 이미지
        arriveMarker.setImage(arriveDragImage);
    });

    // 도착 마커에 dragend 이벤트를 등록합니다
    kakao.maps.event.addListener(arriveMarker, 'dragend', function () {
        // 도착 마커 드래그 종료시 마커 이미지 > 원래 이미지
        arriveMarker.setImage(arriveImage);
    });

    // 마우스 우클릭 > 선 그리기 종료시 호출, HTML Content 리턴
    function getTimeHTML(distance) {
        // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
        let walkkTime = distance / 67 | 0;
        let walkHour = '', walkMin = '';
        // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
        if (walkkTime > 60) {
            walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
        }
        walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'
        // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
        let bycicleTime = distance / 227 | 0;
        let bycicleHour = '', bycicleMin = '';
        // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
        if (bycicleTime > 60) {
            bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
        }
        bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'

        let content = '<ul class="dotOverlay distanceInfo">';
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
        if (distanceOverlay) { // 커스텀오버레이 생성된 상태

            // 위치, 표시 내용 설정
            distanceOverlay.setPosition(position);
            distanceOverlay.setContent(content);

        } else { // 커스텀 오버레이 생성되지 않은 상태

            // 커스텀 오버레이
            distanceOverlay = new kakao.maps.CustomOverlay({
                map: map,
                content: content,
                position: position,
                xAnchor: 0,
                yAnchor: 0,
                zIndex: 3
            });
        }
    }



    let rClickEvent = function (mouseEvent) {

        kakao.maps.event.removeListener(map, 'rightclick', rClickEvent);

        startMarker.setDraggable(false);
        arriveMarker.setDraggable(false);
        startCoord = markers[0].getPosition();
        endCoord = markers[1].getPosition();

        let linePath = [
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

        let distance = Math.round(polyline.getLength()), // 선의 총 거리
            content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용

        showDistance(content, endCoord);

        // 요거 해제하면 우클릭시 범위 설정(원표시)도 같이 적용돼요
        // traceRange();

    };

    kakao.maps.event.addListener(map, 'rightclick', rClickEvent);

}


// 교통 찾기
function traceRoute() {
    // 카카오는 api 없대고 url scheme도 반쪽밖에 안돼서 naver씀
    if (startCoord === null || endCoord === null) {
        alert("출발, 도착 지점을 먼저 설정하세요");

    } else {
        window.open("http://map.naver.com/index.nhn" + "?slng=" + startCoord.getLng() + "&slat=" + startCoord.getLat()
            + "&stext=출발" + "&elng=" + endCoord.getLng() + "&elat=" + endCoord.getLat()
            + "&etext=도착" + "&menu=route&pathType=1", "", "width=700px, height=700px");
    }

}


// 범위 탐색
function traceRange() {

    // if (distanceOverlay) {
    //     distanceOverlay.setMap(null);
    //     distanceOverlay = null;
    // }

    delCircle();
    delInfo();

    if (startCoord === null && endCoord === null) {
        alert("출발, 도착 지점을 먼저 설정하세요.\n만약 설정을 마무리하지 않았다면 우클릭으로 설정을 완료하세요");

    } else {
        let Lat = (startCoord.getLat() + endCoord.getLat()) / 2;
        let Lng = (startCoord.getLng() + endCoord.getLng()) / 2;
        let circle = new kakao.maps.Circle({
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
    HP8 : 병원
*/
function setCategory() {

    event.preventDefault();
    traceRange();
    /*	
        let nodeList = document.getElementsByName('pickPlace');
    	
        nodeList.forEach((node) => {
            if(node.checked){
                currCategory = node.value;
            	
                console.log(currCategory);
            }
        })
    */
    currCategory = document.querySelector('input[name="pickPlace"]:checked').value;
    // console.log(currCategory);

    nearSearch();

}


// 지점정보 확인
function nearSearch() {

    if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
    }

    delMarker();
    delInfo();

    if (rangeActivate) {

        infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
            contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 

            // 커스텀 오버레이 컨텐츠 노드에 css class 추가
            contentNode.className = 'placeinfo_wrap';

        // 커스텀 오버레이 컨텐츠 노드에 mousedown, touchstart 이벤트 발생시
        // 지도 객체 이벤트 전달 방지 이벤트 핸들러
        addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
        addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

        // 커스텀 오버레이 컨텐츠 설정
        placeOverlay.setContent(contentNode);
        // 엘리먼트에 이벤트 핸들러 등록
        function addEventHandle(target, type, callback) {
            if (target.addEventListener) {
                target.addEventListener(type, callback);
            } else {
                target.attachEvent('on' + type, callback);
            }
        }

        // 장소 검색
        let ps = new kakao.maps.services.Places(map);

        // 카테고리로 검색합니다
        ps.categorySearch(currCategory, placesSearchCB, { location: circleCenter, radius: circleRadius, page: 1 });

        // 키워드 검색의 콜백
        function placesSearchCB(data, status, pagination) {

            if (status === kakao.maps.services.Status.OK) {

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    // console.log(data[i].id);
                }
                pagination.nextPage();
            }

        }

        // 클러스터링
        clusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true, // 클러스터 마커 위치 
            minLevel: 1,
            gridsize: 10,
            disableClickZoom: true
        });

        // 마커 표시
        function displayMarker(place) {

            marker = new kakao.maps.Marker({
                // map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });
            markers.push(marker);
            clusterer.addMarkers(markers);
            clusterMap.set(marker, place);

            // 마커 클릭시
            kakao.maps.event.addListener(marker, 'click', function () {
                // 장소명 인포윈도우
                displayPlaceInfo(place);
            });


        }

        // 클러스터 클릭 이벤트
        kakao.maps.event.addListener(clusterer, 'clusterrightclick', function (cluster) {

            mouseRCoord = cluster.getCenter();
            let tempArray = [];
            for (i in cluster.getMarkers()) {
                tempArray.push(clusterMap.get(cluster._markers[i]));
                // console.log(cluster._markers[i])
            }
            // clusterMap.forEach(x => tempArray.push(x))
            // console.log(tempArray[0].address_name)

            clusterInfo(tempArray);

        });

        // 클릭한 마커 오버레이
        function displayPlaceInfo(place) {
            let content = '<div class="placeinfo">' +
                '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">'
                + place.place_name + '</a>' + '<div id="closeinfo" onclick="delInfo();" title="닫기" >닫기</div>'
                + '<div id="saveinfo" title="찜하기">찜하기</div></form>';

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


        // 클러스터 오버레이
        function clusterInfo(places) {
            // 객체 내부 마커 수만큼(오버레이)
            let contentList = '';
            let cnt = 0;
            while (cnt !== places.length) {
                contentList += '<div class="placeinfolist">' +
                    '   <a class="title" href="' + places[cnt].place_url + '" target="_blank" title="' + places[cnt].place_name + '">'
                    + places[cnt].place_name + '</a></div>';
                cnt += 1;
            }
            contentList += '</div>' + '<div class="after"></div>';
            contentNode.innerHTML = contentList;
            placeOverlay.setPosition(mouseRCoord);
            placeOverlay.setMap(map);

        }

    } else {
        alert("탐색 범위를 먼저 설정해 주세요");
    }

}











