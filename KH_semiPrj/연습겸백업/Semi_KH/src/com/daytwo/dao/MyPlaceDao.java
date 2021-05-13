package com.daytwo.dao;

import org.apache.ibatis.session.SqlSession;

import com.daytwo.db.SqlConfig;
import com.daytwo.dto.MyPlaceDto;

public class MyPlaceDao extends SqlConfig{
	
	public int insert(MyPlaceDto dto){
		
		int res = 0;
		
		try (SqlSession session = getSqlSessionFactory().openSession(true);){
			res = session.insert("placemapper.insert", dto);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return res;
	}

}
