package com.daytwo.db;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SqlConfig {
	
	private SqlSessionFactory sqlSessionFactory;
	
	public SqlSessionFactory getSqlSessionFactory() {
		
		String resource = "com/daytwo/db/myplace-config.xml";
		
		try {
			InputStream inputStream = Resources.getResourceAsStream(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
			
			inputStream.close();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return sqlSessionFactory;
	}

}
