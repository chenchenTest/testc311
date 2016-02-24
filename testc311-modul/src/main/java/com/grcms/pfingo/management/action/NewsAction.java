package com.grcms.pfingo.management.action;

import java.lang.reflect.Array;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.grcms.common.util.CommonUtility;
import com.grcms.core.response.JsonResponse;
import com.grcms.core.util.ForwardUtility;
import com.grcms.core.util.HttpUtility;
import com.grcms.pfingo.management.domain.News;
import com.grcms.pfingo.management.service.NewsService;
import com.grcms.pfingo.management.util.WebUtility;

/**
 * 
 * @author Chen.f 
 * @createTime：Feb 21, 2016 4:13:26 PM 
 *
 */
@RequestMapping("/management/news")
@Controller
public class NewsAction {
	
	@Autowired
	private NewsService newsService;
	
	@RequestMapping("")
	public String view(HttpServletRequest request,HttpServletResponse response){
		return ForwardUtility.forwardAdminView("/news/list_news");
	}
	
	
	@RequestMapping(value="",method = RequestMethod.POST)
	public String getNews(HttpServletRequest request,HttpServletResponse response,@ModelAttribute("form") News form){
		return ForwardUtility.forwardAdminView("/news/data/data_json_news");
	}
	
	
	@RequestMapping("/add")
	public String addView(HttpServletRequest request,HttpServletResponse response){
		return ForwardUtility.forwardAdminView("/news/add_news");
	}
	
	
	@RequestMapping(value="/add",method = RequestMethod.POST)
	public String addNews(HttpServletRequest request,HttpServletResponse response,
			@ModelAttribute("form") News form){
		String id = WebUtility.getRandCNString(7);
		form.setId(id);
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateStr = sdf.format(date);
		form.setCreateTime(dateStr);
		form.setUpdateTime(dateStr);
		News news = newsService.addNews(form);
		return ForwardUtility.forwardAdminView("/news/add_news");
	}
	
	
	
	
	@RequestMapping("/delete")
	public void batchDelete(HttpServletRequest request,HttpServletResponse response,@ModelAttribute("form") News form){
		String ids = form.getId();
		List<String> idList = new ArrayList<String>();
		if(!StringUtils.isEmpty(ids)){
			String[] idArray = ids.split(",");
			idList = Arrays.asList(idArray);
		}
		newsService.batchDelete(idList);
		JsonResponse res = new JsonResponse();
		res.setCode("1000");
		HttpUtility.writeToClient(response,CommonUtility.toJson(res));
	}
	
	
	
	@RequestMapping("/edit")
	public String editView(HttpServletRequest request,HttpServletResponse response,@ModelAttribute("form") News form){
		String newsId = request.getParameter("id");
		News news = newsService.findOne(newsId);
		request.setAttribute("news", news);
		return ForwardUtility.forwardAdminView("/news/edit_news");
	}
	
	
	
	@RequestMapping(value="/edit",method=RequestMethod.POST)
	public void editNews(HttpServletRequest request,HttpServletResponse response,@ModelAttribute("form") News form){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateStr = sdf.format(date);
		form.setUpdateTime(dateStr);
		newsService.editNews(form);
	}
	
	
	@RequestMapping("/findOne")
	public String oneView(HttpServletRequest request,HttpServletResponse response,@ModelAttribute("form") News form){
		String newsId = request.getParameter("id");
		News news = newsService.findOne(newsId);
		request.setAttribute("news", news);
		return ForwardUtility.forwardAdminView("/news/view_news");
	}
	
}
