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

<%
    if (session.getAttribute("dto") == null) {
        response.sendRedirect("mainIndex.html");
    }

%>

<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>♡Day Two♡</title>

<script type="text/javascript">
function resultFun(x) { 
	var positionLeft = x.clientX; var positionTop = x.clientY; 
	document.getElementById('result').style.left = positionLeft - 10 + "px"; 
	document.getElementById('result').style.top = positionTop - 10 +"px"; } 
	if (document.addEventListener) { document.addEventListener("mousemove", resultFun); } 
	else if (document.attachEvent) { document.attachEvent("onmousemove", resultFun); 
	//attachEvent는 IE8이하와 오페라에서 사용하는 명령어이다
	};


</script>

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
	background-color: rgb(238, 222, 226);
	vertical-align: middle;
	font-family: Georgia, "Malgun Gothic", serif;
	font-weight: bolder;
	align-items: center;
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
	background: white;
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
	height: 643px;
	position: absolute;
	float: right;
	left: -250px;
	transition: all .35s;
	transform: translateX(-5%);
	z-index: 9999;
}

div#sidebar_all.sidebar{
background-color:  #BCDECB;
	background:  #BCDECB;
	width: 250px;
	height: 643px;
	top:0;
	z-index: 1;
}

#menuicon:checked+label+div {
	left: 0;
}

.menu {
	margin: 0;
	padding: 0;
	width: auto;
	height: auto;
	background-color: rgb(238, 222, 226)s;
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
	padding: 1px;
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
	background: white; 
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
	height: 643px;
	background:  #BCDECB;
	position: absolute;
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

#text{
color: white;
}

#weather {
	margin: 0;
	padding: 2px;
	border: 1px doubled light grey;
	width: 180px;
	height: 30px;
}

#dust {
	margin: 0;
	padding: 2px;
	border: 1px doubled light grey;
	width: 180px;
	height: 30px;
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
	height: 20px;
	font-weight: bolder;
	text-color: white;
	text-align: center;
	align-content: center;
	align-items: center;
	transform: translateY(300%);
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


		A:LINK {
color: white;
text-decoration: underline;
}
		A:HOVER {
color: white;
text-decoration: blink;
}
	
	A:VISITED {
color: white;
text-decoration: underline;
}

	A:ACTIVE {
color: white;
text-decoration: underline;
}

input{
color: grey;
background: white;

}

input:VISITED {
color: white;
text-decoration: inherit;
}

#result{

z-index: 99;
pointer-events: none;
}
</style>

<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=14d98dab324927581b361feaf2706975&libraries=services,clusterer"></script>

<link rel="stylesheet" href="resources/css/style.css">

</head>

<body>

<div id="result" style="position: absolute; background: pink; width: 15px; height: 15px; opacity: 0.4; border-radius: 100%;"> </div>

	<%
		LoginDto dto = (LoginDto) session.getAttribute("dto");
	%>

	<div class="header" onclick="location.href='main.jsp'">
		<div class="tittle">
			<h1 style="text-align: center;">하루 종일, 우리 둘이 데이투 'Day Two'</h1>
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
				<div id="sidebar_all">
					<div class="leftMenu" id="subMenu">
						<h4 style="color: grey;">안녕하세요 <%=dto.getMember_id() %>님!</h4>
					</div>
					<br><br><br>
					<div class="leftMenu" id="subMenu">
						<a href="regist.do?command=logout"> 로그아웃</a>
						<!-- 로그인페이지 -->
					</div>
					<br><br><br><br>
					<div class="leftMenu" id="subMenu">
						<a href="recommend.jsp">추천코스 </a>
						<!-- 추천코스 -->
					</div>
					<br><br><br>
					<div class="leftMenu" id="subMenu">
						<a href="board.do?command=boardlist"> 함께 하는 DayTwo </a>
						<!-- 게시판+후기+커뮤 -->
					</div>
					<br><br><br>
					<div class="leftMenu" id="subMenu">
						<a href=""> 내 캘린더 </a>
					</div>
					<!-- 사용자 로그인시에만 보이게 -->
					<br><br><br>
					<div class="leftMenu" id="subMenu">
						<a href="mypage.jsp"> 내 정보 수정 </a>
						<!-- 정보수정 -->
					</div>
					<br> <br> <br> <br><br><br>
					<div class="leftMenu" id="subMenu" style="bottom:15px;">
						<a href="sponsor.jsp"> ☞ 후원하기 </a>
					</div>
					<br>
					<!-- 결제api연결하기 -->
				</div>
			</div>
</div>


			<div class="Menu" id="right"
				style="z-index: 9999; position: relative;">
				<input type="checkbox" id="menuicon2"> <label
					for="menuicon2"> <span></span> <span></span>
				</label>

				<div class="sidebar2">
					<div class="sidebar2_all" style="background: #BCDECB;">
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
							<div style="align-items: center; padding: 5px;">
							<div><input type="button" value="현위치" onclick="nowhere();"></div>
					
							<div><input type="button" value="경로 설정" onclick="setPoint();"></div>
								
							<div><input type="button" value="교통 안내" onclick="traceRoute();"></div>				
								
							</div>
							<br>


							<div id="rightMenu" style="transform: translateY(20%);" style="text-color: grey;">
								<br><input type="radio" name="pickPlace" value="FD6">식당
								<input type="radio" name="pickPlace" value="AT4">관광지
								<input type="radio" name="pickPlace" value="CE7">카페
								<br><input type="radio" name="pickPlace" value="PK6">주차장
								<input type="radio" name="pickPlace" value="OL7">주유소
								<input type="radio" name="pickPlace" value="AD5">숙박
								<input type="radio" name="pickPlace" value="HP8">병원
								
								<div class="checkNotice" id="small">원하는 장소를 선택하고 위치 보기를 누르세요</div>
								<button onclick="setCategory();" value="위치 보기" style="color: grey; background: white;">위치 보기</button>
							</div>
							

							<div class="finish" id="rightMenu" style="color: grey;">
								<input type="reset" value="재설정" style="color: grey;">
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