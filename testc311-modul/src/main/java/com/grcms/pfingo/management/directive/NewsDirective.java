package com.grcms.pfingo.management.directive;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.grcms.basic.BaseDirective;
import com.grcms.common.util.CommonUtility;
import com.grcms.core.util.Page;
import com.grcms.pfingo.management.domain.News;
import com.grcms.pfingo.management.service.NewsService;

/**
 * 
 * @author Chen.f 
 * @createTime：2016年1月19日 下午5:48:19 
 *
 */
@Component
public class NewsDirective extends BaseDirective<News>{
	
	
	private static Logger logger = Logger.getLogger(NewsDirective.class);
	
	
	@Autowired
	private NewsService newsService;
	
	

	@Override
	protected Integer count(Map arg0, Map<String, Object> arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected News field(Map arg0, Map<String, Object> arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected List<News> list(Map map, String order, String filter,
			String sort, boolean flag, Page<News> pager,
			Map<String, Object> map1) {
		News news = null;
		String search = map.get("search").toString();
		/*String searchLoginId = map.get("searchLoginId").toString();*/
		String searchStartDate = map.get("search0").toString();
		/*if(CommonUtility.isNonEmpty(filter)) {
			callHistory = CommonUtility.toObject(CallHistory.class, filter,"yyyy-MM-dd");
		}else{*/
			news = new News();
		/*}*/
		if (CommonUtility.isNonEmpty(order)) {
			news.setOrder(order);
		}

		if (CommonUtility.isNonEmpty(sort)) {
			news.setSort(sort);
		}
		if(CommonUtility.isNonEmpty(search)){
		}
		/*if(CommonUtility.isNonEmpty(searchLoginId)){
			callHistory.setLoginId(searchLoginId);
		}*/
		if(CommonUtility.isNonEmpty(searchStartDate)){
		}
		try {
			if (pageable) {
				List<News> newsList = newsService.findPage(news, pager);
				return newsList;
			} else {
				List<News> datas = newsService.findAll(news);
				logger.debug("==> datas length [" + datas.size() + "]");
				return datas;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	protected List<News> tree(Map arg0, Map<String, Object> arg1) {
		// TODO Auto-generated method stub
		return null;
	}

}
