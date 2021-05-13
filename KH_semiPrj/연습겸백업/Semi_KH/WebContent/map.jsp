<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html; charset=UTF-8");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>

<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=14d98dab324927581b361feaf2706975&libraries=services,clusterer"></script>

<link rel="stylesheet" href="resources/css/style.css">

</head>
<body>


	<div id="map" style="width: 100%; height: 350px;"></div>

	<div>
		<button onclick="nowhere();">현위치</button>
		<button onclick="setPoint();">출발,도착 찍기</button>
		<button onclick="traceRoute();">교통 찾기</button>
		<button onclick="traceRange();">범위</button>
		<button onclick="nearSearch();">주변 매장</button>
	</div>

	<script src="resources/js/map.js"></script>


</body>
</html>