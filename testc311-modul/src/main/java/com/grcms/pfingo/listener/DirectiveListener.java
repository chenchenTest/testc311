package com.grcms.pfingo.listener;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.dom4j.Attribute;
import org.dom4j.Element;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.grcms.common.util.XMLHelper;

import freemarker.template.TemplateModelException;

public class DirectiveListener implements ServletContextListener {
    /**
     * Logger for this class
     */
    private static final Logger logger = Logger
            .getLogger(DirectiveListener.class);

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
        // 加载freemarker标签
        // #########################################################
        FreeMarkerConfigurer fconf = (FreeMarkerConfigurer) ac
                .getBean("freemarkerConfig");
        Map<String, Object> variables = new HashMap<String, Object>();

//		String directXML = sc
//				.getRealPath("/WEB-INF/conf/directive/directive.xml");
//		logger.debug("==> Load direct xml " + directXML);
//		ApplicationContext dac = new FileSystemXmlApplicationContext("/"
//				+ directXML);
//		String[] names = dac.getBeanDefinitionNames();

        List<DirectiveConf> dcs = getDirectives();
        registerBean(ac, dcs);
        for (DirectiveConf dc : dcs) {
            logger.debug("==> Load [" + dc.getId() + " - " + dc.getClassName() + "] directive.");
            try {
                fconf.getConfiguration().setSharedVariable(dc.getId(), ac.getBean(dc.getId()));
            } catch (BeansException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (TemplateModelException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        fconf.setFreemarkerVariables(variables);
        logger.info("<<<<<<<<<<<<<<<<< loadding directive successful <<<<<<<<<<<<<<<<<");

    }

    /**
     * 工程关闭时需要处理的事情
     */
    @Override
    public void contextDestroyed(ServletContextEvent event) {
        // CacheManager.getInstance().
    }

    private List<DirectiveConf> getDirectives() {
        try {
            List<InputStream> inList = ListenerHelper.getInstance()
                    .scanMenuXML("pfingo-directive.xml");
            List<DirectiveConf> allDirectives = new ArrayList<DirectiveConf>();
            if (inList != null && inList.size() > 0) {
                for (InputStream in : inList) {
                    List<DirectiveConf> list = parseInputStream(in);
                    allDirectives.addAll(list);
                }
            }
            return allDirectives;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private List<DirectiveConf> parseInputStream(InputStream in)
            throws IOException {
        List<DirectiveConf> list;
        XMLHelper xmlHelper = new XMLHelper(in);
        Element rootElement = xmlHelper.getRootElement();
        List<Element> beans = rootElement.elements("bean");
        list = new ArrayList<DirectiveConf>();
        if (beans != null) {
            for (Element e : beans) {
                DirectiveConf conf = new DirectiveConf();
                Attribute attrId = e.attribute("id");
                if (attrId != null) {
                    String idValue = attrId.getValue();
                    conf.setId(idValue);
                }

                Attribute attrClz = e.attribute("class");
                if (attrClz != null) {
                    String clzValue = attrClz.getValue();
                    conf.setClassName(clzValue);
                }

                list.add(conf);
            }
        }
        in.close();
        return list;
    }

    private void registerBean(ApplicationContext ac, List<DirectiveConf> dcs) {
        ConfigurableApplicationContext cac = (ConfigurableApplicationContext) ac;
        DefaultListableBeanFactory beanRegister = (DefaultListableBeanFactory) cac.getBeanFactory();

        for (DirectiveConf conf : dcs) {
            BeanDefinitionBuilder beanBuilder = BeanDefinitionBuilder
                    .genericBeanDefinition(conf.getClassName());
            beanRegister.registerBeanDefinition(conf.getId(),
                    beanBuilder.getBeanDefinition());
        }
//		cac.close();
    }
}
