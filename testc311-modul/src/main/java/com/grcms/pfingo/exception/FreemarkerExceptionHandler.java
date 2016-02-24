package com.grcms.pfingo.exception;

import freemarker.core.Environment;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.io.Writer;

@Controller
public class FreemarkerExceptionHandler implements TemplateExceptionHandler  {

	@Override
	public void handleTemplateException(TemplateException te,
			Environment env, Writer out) throws TemplateException {
		 try {
	            out.write("[ERROR: " + te.getMessage() + "]");
	        } catch (IOException e) {
	            throw new TemplateException(
	                "Failed to print error message. Cause: " + e, env);
	        }
		
	}
}
