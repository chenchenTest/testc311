package com.grcms.pfingo.exception;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.grcms.common.util.CommonUtility;
import com.grcms.pfingo.management.util.WebUtility;

@Controller
public class GlobalExceptionController implements HandlerExceptionResolver  {

	private static Logger logger = Logger.getLogger(GlobalExceptionController.class);
	
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
        Map<String, Object> msg = new HashMap<String, Object>();
        if (ex instanceof IllegalArgumentException) {
            msg.put("error", "parameter error");
        }
        if (request.getHeader("X-Requested-With") != null) {
            WebUtility.writeToClient(response, CommonUtility.toJson(msg));
            return null;
        }
       return null;
    }


}
