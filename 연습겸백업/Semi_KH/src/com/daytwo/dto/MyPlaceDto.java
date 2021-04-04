package com.daytwo.dto;

import java.util.Date;

public class MyPlaceDto {
	
	private String myid;
	private String placename;
	private String placeaddr;
	private Date placedate;
	private int thumbs;
	
	public MyPlaceDto() {
		
	}
	public MyPlaceDto(String myid, String placename, String placeaddr, Date placedate, int thumbs) {
		this.myid = myid;
		this.placename = placename;
		this.placeaddr = placeaddr;
		this.placedate = placedate;
		this.thumbs = thumbs;
	}
	public String getMyid() {
		return myid;
	}
	public void setMyid(String myid) {
		this.myid = myid;
	}
	public String getPlacename() {
		return placename;
	}
	public void setPlacename(String placename) {
		this.placename = placename;
	}
	public String getPlaceaddr() {
		return placeaddr;
	}
	public void setPlaceaddr(String placeaddr) {
		this.placeaddr = placeaddr;
	}
	public Date getPlacedate() {
		return placedate;
	}
	public void setPlacedate(Date placedate) {
		this.placedate = placedate;
	}
	public int getThumbs() {
		return thumbs;
	}
	public void setThumbs(int thumbs) {
		this.thumbs = thumbs;
	}
	
}
