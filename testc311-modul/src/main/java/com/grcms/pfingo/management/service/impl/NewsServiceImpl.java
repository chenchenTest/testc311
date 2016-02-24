package com.grcms.pfingo.management.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grcms.core.util.Page;
import com.grcms.pfingo.management.dao.NewsDao;
import com.grcms.pfingo.management.domain.News;
import com.grcms.pfingo.management.service.NewsService;

@Service("newsService")
public class NewsServiceImpl implements NewsService{
	
	
	@Autowired
	private NewsDao newsDao;
	
	@Override
	public List<News> findPage(News news, Page<News> pager) {
		
		return newsDao.findPage();
	}

	@Override
	public List<News> findAll(News news) {
		// TODO Auto-generated method stub
		return newsDao.findAllNews(news);
	}

	@Override
	public News addNews(News form) {
		return newsDao.save(form);
		
	}

	@Override
	public void batchDelete(List<String> idList) {
		int length = idList.size();
		for (int i = 0; i < length; i++) {
			newsDao.deleteByIdStr(idList.get(i));
		}
		
	}

	@Override
	public News findOne(String newsId) {
		
		return newsDao.findById(newsId);
	}

	@Override
	public void editNews(News form) {
		newsDao.save(form);
	}

}
