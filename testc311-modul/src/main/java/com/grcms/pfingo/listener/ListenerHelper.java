package com.grcms.pfingo.listener;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class ListenerHelper {
	
	private static ListenerHelper instance = null;
	
	private ListenerHelper() {}
	
	public static ListenerHelper getInstance() {
		return instance == null?new ListenerHelper():instance;
	}
	
	public List<InputStream> scanMenuXML(String xmlName) {
		List<InputStream> ins = new ArrayList<InputStream>();
		Enumeration<URL> en;
		try {
			try {
				en = this.getClass().getClassLoader()
						.getResources(xmlName);
				while (en.hasMoreElements()) {
					URL url = (URL) en.nextElement();
					InputStream in = url.openStream();
					// InputStream in =
					// this.getClass().getClassLoader().getResourceAsStream(url.getFile());
					ins.add(in);
				}
				return ins;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
}
