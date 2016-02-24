package com.grcms.pfingo.management.service;

import java.util.List;

import com.grcms.core.util.Page;
import com.grcms.pfingo.management.domain.News;

public interface NewsService {

	List<News> findPage(News news, Page<News> pager);

	List<News> findAll(News news);

	News addNews(News form);

	void batchDelete(List<String> idList);

	News findOne(String newsId);

	void editNews(News form);

}
