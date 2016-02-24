package com.grcms.pfingo.listener;

import java.io.InputStream;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.grcms.common.util.CommonUtility;
import com.grcms.common.util.XMLHelper;
import com.grcms.core.exception.ECUserException;
import com.grcms.core.exception.ECWebsiteException;
import com.grcms.core.util.CMSInit;
import com.grcms.core.util.CMSThemeUtil;
import com.grcms.core.util.ContextUtil;
import com.grcms.management.settings.domain.Website;
import com.grcms.management.settings.service.WebsiteService;
import com.grcms.management.user.domain.User;
import com.grcms.management.user.service.UserService;

public class StartUpListener implements ServletContextListener {
    /**
     * Logger for this class
     */
    private static final Logger logger = Logger
            .getLogger(StartUpListener.class);

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
        // 初始化配置
        // #########################################################
        InputStream in;
        in = this.getClass().getClassLoader().getResourceAsStream("conf/init/cms-init.xml");
//			in = new FileInputStream(new File(sc.getRealPath("/WEB-INF/conf/init/cms-init.xml")));
        XMLHelper xmlHelper = new XMLHelper(in);
        CMSInit.NO_PERMISSION_URI = xmlHelper.findNode("no-permission-uri");
        CMSInit.BACKEND_LOGIN_URI = xmlHelper.findNode("backend-login-uri");
        CMSInit.FRONTEND_LOGIN_URI = xmlHelper.findNode("frontend-login-uri");
        CMSInit.BACKEND_CHECK_PREFIX = xmlHelper.findNode("backend-check-prefix");
        CMSInit.FRONTEND_CHECK_PREFIX = xmlHelper.findNode("frontend-check-prefix");
        CMSInit.RETURN_URI_LIST = xmlHelper.findChildNodes("always-unreturn", "uri");
        CMSInit.ALWAYS_UNCHECK_LIST = xmlHelper.findChildNodes("always-uncheck", "uri");
        List<String> uncheckList = xmlHelper.findChildNodes("login-uncheck", "uri");
        uncheckList.addAll(CMSInit.ALWAYS_UNCHECK_LIST);
        CMSInit.LOGIN_UNCHECK_LIST = uncheckList;

        List<String> pages = xmlHelper.findChildNodes("frontend-index", "page");
        if (pages != null && pages.size() != 0) {
            CMSInit.FRONTEND_INDEX_PAGE = pages.get(0);
        }

        List<String> uris = xmlHelper.findChildNodes("frontend-index", "uri");
        if (uris != null && uris.size() != 0) {
            CMSInit.FRONTEND_INDEX_URI = uris.get(0);
        }

        CMSInit.ALWAYS_UNCHECK_LIST = xmlHelper.findChildNodes("always-uncheck", "uri");


        logger.debug("[NO_PERMISSION_URI] = " + CMSInit.NO_PERMISSION_URI);
        logger.debug("[BACKEND_LOGIN_URI] = " + CMSInit.BACKEND_LOGIN_URI);
        logger.debug("[FRONTEND_LOGIN_URI] = " + CMSInit.FRONTEND_LOGIN_URI);
        logger.debug("[BACKEND_CHECK_PREFIX] = " + CMSInit.BACKEND_CHECK_PREFIX);
        logger.debug("[FRONTEND_CHECK_PREFIX] = " + CMSInit.FRONTEND_CHECK_PREFIX);
        logger.debug("[LOGIN_UNCHECK_LIST] = " + CommonUtility.toJson(CMSInit.LOGIN_UNCHECK_LIST));
        logger.debug("[ALWAYS_UNCHECK_LIST] = " + CommonUtility.toJson(CMSInit.ALWAYS_UNCHECK_LIST));
        logger.debug("[RETURN_URI_LIST] = " + CommonUtility.toJson(CMSInit.RETURN_URI_LIST));
        logger.debug("[FRONTEND_INDEX_PAGE] = " + CommonUtility.toJson(CMSInit.FRONTEND_INDEX_PAGE));
        logger.debug("[FRONTEND_INDEX_URI] = " + CommonUtility.toJson(CMSInit.FRONTEND_INDEX_URI));

        //初始化主题目录,若DB无数据，则从xml中查询
        CMSThemeUtil.DEFAULT_THEME = xmlHelper.findNode("default-theme-dir");

        // 初始化网站信息
        WebsiteService siteService = ac.getBean(WebsiteService.class);
        UserService userService = ac.getBean(UserService.class);

        Website website = new Website();
        try {
            website = siteService.findLocalSite();
            if (website == null) {
                website = new Website();
                website.setSitename("grcms");
                website.setDomain("www.grcms.com");
                website.setKeywords("grcms");
                website.setDescribe("grcms");
                website.setSiteTplName("grcms");
                website.setTplFileType("html");
                website.setUploadMaxSize(8192);
                website.setUploadResDir("/res_lib");
                website.setUploadTplDir("/WEB-INF/view/site_template");
                website.setLocalSite(true);
                website.setRoot("/");
                siteService.add(website);
            }
        } catch (ECWebsiteException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        sc.setAttribute("website", website);

        //初始化管理员
        try {
            List<User> list = userService.findAll();
            if (list == null || list.size() == 0) {
                User user = new User();
                user.setName("admin");
                user.setPassword("admin");
                user.setRegisterTime(new Date());
                user.setRegisterIp("127.0.0.1");
                user.setDefaultAdmin(true);
                userService.add(user);
            }
        } catch (ECUserException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        sc.setAttribute(ContextUtil.LOCAL_WEBSITE, website);
        logger.info("<<<<<<<<<<<<<<<<< Init operation successful <<<<<<<<<<<<<<<<<");

    }

    /**
     * 工程关闭时需要处理的事情
     */
    @Override
    public void contextDestroyed(ServletContextEvent event) {
//		CacheManager.getInstance().
    }

}
