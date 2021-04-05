<%@page import="com.daytwo.dto.LoginDto"%>
<%
	response.setHeader("Pragma", "no-cache");
response.setHeader("Cache-control", "no-store");
response.setHeader("Expires", "0");

/*
	뒤로가기 했을 때, 이전화면이 보이는 이유
	-> 서버에서 문서를 받아오는 것이 아니라, 캐시에 저장된 값을 화면에 뿌려줌
	
	브라우저가 캐시에 응답결과(response)를 저장하지 않도록 설정
	response.setHeader("Pragma", "no-cache");				//http 1.0
	response.setHeader("Cache-control", "no-store");		//http 1.1
	response.setHeader("Expires", "0");						//proxy server
	
	우리는 http 1.1
*/
%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<title>♡ DayTwo - 오늘부터 1일? 우린 오늘부터 '데이투'! ♡</title>

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>♡Day Two♡</title>

<style type="text/css">
* {
	margin: 0px;
	padding: 1px; <!--
	border: 1px dashed blue;
	-->
}

body {
	width: 100%;
	height: 100%;
	max-width: 100vw;
}

.header {
	margin-top: 10px;
	margin-bottom: 3px;
	margin-left: 5%;
	margin-right: 5%;
	width: 90%;
}

.tittle {
	width: 100%;
	background-color: rgb(197, 197, 197);
	vertical-align: middle;
	font-family: Georgia, "Malgun Gothic", serif;
	font-weight: bolder;
	vertical-align: middle;
	color: white;
}

.content {
	width: 90%;
	height: 80%;
	background-color: none;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

#menuicon {
	display: none;
}

#menuicon+label {
	top: 2px;
	display: block;
	margin: 3px;
	padding: 1px;
	width: 30px;
	height: 20px;
	position: relative;
	cursor: pointer;
}

#menuicon+label span {
	display: block;
	position: absolute;
	width: 100%;
	height: 5px;
	border-radius: 30px;
	background: rgb(92, 86, 86);
	transition: all .35s;
}

#menuicon+label span:nth-child(1) {
	top: 0%;
}

#menuicon+label span:nth-child(2) {
	top: 50%;
	transform: translateY(-50%);
}

#menuicon+label span:nth-child(3) {
	bottom: 0%;
}

#menuicon:checked+label {
	z-index: 2;
}

#menuicon:checked+label span:nth-child(1) {
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
}

#menuicon:checked+label span:nth-child(2) {
	opacity: 0;
}

#menuicon:checked+label span:nth-child(3) {
	bottom: 50%;
	transform: translateY(50%) rotate(-45deg);
}

.sidebar {
	margin-top: 2px;
	width: 250px;
	height: 100%;
	background-color: #eeebd5;
	position: absolute;
	float: right;
	top: "";
	left: -250px;
	transition: all .35s;
	transform: translateX(-5%);
	z-index: 9999;
}

#menuicon:checked+label+div {
	left: 0;
}

.menu {
	margin: 0;
	padding: 0;
	width: auto;
	height: auto;
	background-color: #eeebd5;
	font-weight: bolder;
	font-color: white;
	font-size: 17px;
	position: fixed;
	left: -250px;
	z-index: 1;
	transition: all .35s;
}

#subMenu {
	margin-top: 15px;
	margin-bottom: 15px;
	background-color: none;
	position: relative;
	float: right;
	text-align: right;
	font-color: white;
	font-size: 20px;
	font-style: italic;
	text-decoration: underline;
}

#map {
	margin: 0;
	padding: 0;
	border-right: 1px;
	width: 100%;
	height: 100%;
	border-radius: 10px;
}

#menuicon2 {
	display: none;
}

#menuicon2+label {
	margin: 2px;
	border: 5px;
	padding: 1px; <!--
	border-style: solid; --> <!--
	border-color: rgb(255, 235, 181); -->
	background-color: none;
	display: block;
	margin: 5px;
	width: 25px;
	height: 25px;
	position: relative;
	cursor: pointer;
	float: right;
	border-radius: 100%;
	transform: translateX(-10%);
}

#menuicon2+label span {
	display: block;
	background-color: none;
	position: absolute;
	width: 70%;
	height: 5px;
	border-radius: 30%;
	background: rgb(255, 235, 181); <!--
	background: rgb(194, 194, 194); -->
	transition: all .35s;
}

#menuicon2+label span:nth-child(1) {
	top: 60%;
	right: 5%;
	transform: translateY(0%) rotate(-45deg);
}

#menuicon2+label span:nth-child(2) {
	bottom: 60%;
	right: 5%;
	transform: translateY(0%) rotate(45deg);
}

#menuicon2:checked+label {
	z-index: 2;
	right: 250px;
}

#menuicon2:checked+label span:nth-child(1) {
	top: 60%;
	right: 5%;
	transform: translateY(0%) rotate(45deg);
}

#menuicon2:checked+label span:nth-child(2) {
	bottom: 60%;
	right: 5%;
	transform: translateY(0%) rotate(-45deg);
}

div.sidebar2 {
	padding: 1px;
	width: 250px;
	height: 100%;
	background-color: #eeebd5;
	position: absolute;
	top: "";
	right: -250px;
	transition: all .35s;
	float: right;
	z-index: 9999;
}

#menuicon2:checked+label+div.sidebar2 {
	right: 0;
}

#small {
	color: white;
	font-style: italic;
	font-size: 13px;
}

#subTittle {
	text-align: center;
	align-content: center;
	color: #9c9c97;
	font-size: 20px;
	font-style: italic;
	font-weight: bolder;
	text-shadow: light grey;
	font-color: #9c9c97;
}

#rightMenu {
	text-align: center;
	align-content: center;
	font-size: 16px;
	color: light grey;
	font-color: light grey;
}

#weather {
	margin: 0;
	padding: 2px;
	border: 1px doubled light grey;
	width: 180px;
	height: 40px;
}

#dust {
	margin: 0;
	padding: 2px;
	border: 1px doubled light grey;
	width: 180px;
	height: 40px;
}

.checkNotice {
	font-size: 16px;
	font-stretch: wider;
	text-color: white;
	text-align: center;
	align-content: center;
	border: 1px dotted light grey;
}

.finish {
	width: 100px;
	height: 20px;
	font-weight: bolder;
	text-color: white;
	text-align: center;
	align-content: center;
	align-items: center;
}

.footer {
	margin-top: 1px;
	bottom: 0px;
	width: 100%;
	height: 40px;
	background-color: none;
	text-align: left;
	font-size: 9px;
	color: light grey;
}

input {
	color: light grey;
}

A:VISITED {
	color: rgb(197, 197, 197);
	text-decoration: none;
}
</style>

<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=14d98dab324927581b361feaf2706975&libraries=services,clusterer"></script>

<link rel="stylesheet" href="resources/css/style.css">

</head>

<body>

	<%
		LoginDto dto = (LoginDto) session.getAttribute("dto");
	%>

	<div class="header" onclick="location.href='main.jsp'">
		<div class="tittle">
			<h1>하루 종일, 우리 둘이 데이투 'Day Two'</h1>
		</div>
	</div>


	<!-- 메인로고 -->

	<br>


	<div class="content">
		<!-- 전체틀 -->
		<div id="map">
			<!-- 지도 -->
			<div class="Menu" id="left"
				style="z-index: 9999; position: absolute;">
				<input type="checkbox" id="menuicon"> <label for="menuicon">
					<span></span> <span></span><span></span>
				</label>
				<div class="sidebar" id="sidebar_all">
					<div class="leftMenu" id="subMenu">
						<h1>안녕하세요 #님</h1>
					</div>
					<br>
					<div class="leftMenu" id="subMenu">
						<a href="regist.do?command=logout"> 로그아웃</a>
						<!-- 로그인페이지 -->
					</div>
					<br> <br>
					<div class="leftMenu" id="subMenu">
						<a href="recommend.jsp"> 추천코스 </a>
						<!-- 추천코스 -->
					</div>
					<br> <br>
					<div class="leftMenu" id="subMenu">
						<a href="board.jsp"> 함께 하는 DayTwo </a>
						<!-- 게시판+후기+커뮤 -->
					</div>
					<br> <br>
					<div class="leftMenu" id="subMenu">
						<a href=""> 내 캘린더 </a>
					</div>
					<!-- 사용자 로그인시에만 보이게 -->
					<br> <br>
					<div class="leftMenu" id="subMenu">
						<a href="mypage.jsp"> 내 정보 수정 </a>
						<!-- 정보수정 -->
					</div>
					<br> <br> <br> <br>
					<div class="leftMenu" id="subMenu">
						<a href="sponsor.jsp"> ☞ 후원하기 </a>
					</div>
					<br>
					<!-- 결제api연결하기 -->
				</div>
			</div>



			<div class="Menu" id="right"
				style="z-index: 9999; position: relative;">
				<input type="checkbox" id="menuicon2"> <label
					for="menuicon2"> <span></span> <span></span>
				</label>

				<div class="sidebar2">
					<div class="sidebar2_all" style="background-color: #eeebd5;">
						<div id="subTittle">새로운 일정 만들기</div>
						<br>
						<form action="">
							<div id="rightMenu">
								<div id="small">일자 선택</div>
								<input type="date" name="date"> <br>

								<div id="weather">sysdate...</div>
							</div>
							<div id="rightMenu">
								<div class="dust">오늘의 미세먼지 농도는 ... 입니다.</div>
								<br>
								<!-- 미세먼지api연결하기 -->
							</div>
							<!-- 지도api연결하기 -->
							<div>
								<input type="button" value="출발" onclick=""> <input
									type="text" placeholder="지도에서 클릭해주세요.">
							</div>
							<br>
							<div>
								<input type="button" value="도착" onclick=""> <input
									type="text" placeholder="지도에서 클릭해주세요.">
							</div>
							<br>


							<div id="rightMenu">
								<div id="subTittle">경로지정</div>
								<br> 카페 <input type="checkbox"> 식당 <input
									type="checkbox"> <br> 문화시설 <input type="checkbox">
								<br> 실내 <input type="checkbox"> 실외 <input
									type="checkbox"> <br> <br> <br>
								<div class="checkNotice" id="small">체크 후 클릭해주세요</div>
							</div>
							<br>

							<div class="finish" id="rightMenu">
								<input type="submit" value="완료">/<input type="reset"
									value="재설정">
							</div>
						</form>
					</div>
				</div>



			</div>

		</div>



		<div class="footer">

			<a class="sc" href="#" title="Popular searches">Popular searches</a>
			<a class="sc" href="#" title="People directory">Directory</a> <a
				class="sc" href="#" title="About us">About us</a> <a class="sc"
				href="#" title="Creator Resources">Creator Resources</a> <a
				class="sc" href="#" title="blog">Blog</a> <a class="sc" href="#"
				title="Jobs at Company">Jobs</a> <a class="sc" href="#"
				title="Company for developers">Developers</a> <a class="sc" href="#"
				title="For help">Help</a> <a class="sc" href="#"
				title="Terms of use">Legal</a> <a class="sc" href="#"
				title="Privacy policy">Privacy</a> <a class="sc" href="#"
				title="Cookies policy">Cookies</a> <a class="sc" href="#"
				title="Company information">Imprint</a> <a class="sc" href="#"
				title="Charts">Charts</a>

			<div class="footer__localeSelector">
				<a type="button"> Language: <span class="sc">Korean (KR)</span></a>
				<address>copyright &copy; all rights reserved qclass....</address>
			</div>

		</div>


	</div>

	<script src="resources/js/map.js"></script>

</body>
</html>
