package com.grcms.pfingo.management.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.grcms.basic.BasicDao;
import com.grcms.core.util.Page;
import com.grcms.pfingo.management.domain.News;

@Transactional(propagation=Propagation.REQUIRED)
public interface NewsDao extends BasicDao<News>,Repository<News,Integer>{
	
	
	
	@Query("FROM News")
	List<News> findAllNews(News news);
	
	@Query("FROM News")
	List<News> findPage();
	
	
	@Modifying
	@Query("DELETE FROM News n WHERE n.id =?1")
	void deleteByIdStr(String id);

}
