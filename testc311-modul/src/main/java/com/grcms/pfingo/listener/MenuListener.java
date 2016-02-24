package com.grcms.pfingo.listener;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.grcms.core.exception.ECMenuException;
import com.grcms.core.exception.ECPrivilegeException;
import com.grcms.core.util.PrivilegeUtil;
import com.grcms.management.user.domain.Menu;
import com.grcms.management.user.domain.Privilege;
import com.grcms.management.user.service.MenuService;
import com.grcms.management.user.service.PrivilegeService;

public class MenuListener implements ServletContextListener {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger
			.getLogger(MenuListener.class);

	/**
	 * 工程启动时需要处理的事情
	 */
	@Override
	@Transactional
	public void contextInitialized(ServletContextEvent event) {
		ServletContext sc = event.getServletContext();
		ApplicationContext ac = WebApplicationContextUtils
				.getWebApplicationContext(sc);
		
		// #########################################################
		// 初始化权限
		// #########################################################
		PrivilegeService privilegeService = ac.getBean(PrivilegeService.class);
		try {
			List<InputStream> inList = ListenerHelper.getInstance().scanMenuXML("grcms-privilege.xml");
			if(inList != null && inList.size() > 0) {
				List<Privilege> menuList = new ArrayList<Privilege>();
				for(InputStream in : inList) {
					List<Privilege> list = PrivilegeUtil.getPrivilegesFromConf(in);
					menuList.addAll(list);
				}
				privilegeService.addIfNotExist(menuList);
			}
		} catch (BeansException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ECPrivilegeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// #########################################################
		// 初始化菜单
		// #########################################################
		try {
			MenuService menuService = ac.getBean(MenuService.class);
			List<Menu> menus = menuService.findAll();
			if(menus == null || menus.size() == 0) {
				Privilege condition = new Privilege();
				condition.setUri("/management/menu");
				List<Privilege> privileges = privilegeService.findAll(condition);
				for(Privilege p : privileges) {
					Menu menu = new Menu();
					menu.setName(p.getName());
					menu.setPrivilege(p);
					
					menuService.save(menu);
				}
			}
		} catch (BeansException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ECMenuException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ECPrivilegeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		logger.info("<<<<<<<<<<<<<<<<< setting menus successful <<<<<<<<<<<<<<<<<");

	}

	/**
	 * 工程关闭时需要处理的事情
	 */
	@Override
	public void contextDestroyed(ServletContextEvent event) {
//		CacheManager.getInstance().
	}

}
