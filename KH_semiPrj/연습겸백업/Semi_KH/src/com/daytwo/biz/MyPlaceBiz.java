package com.daytwo.biz;

import com.daytwo.dao.MyPlaceDao;
import com.daytwo.dto.MyPlaceDto;

public class MyPlaceBiz {
	
	MyPlaceDao dao = new MyPlaceDao();
	
	public int insert(MyPlaceDto dto) {
		return dao.insert(dto);
	}

}
