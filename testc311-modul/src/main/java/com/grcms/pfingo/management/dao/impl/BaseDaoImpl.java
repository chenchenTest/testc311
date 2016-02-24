package com.grcms.pfingo.management.dao.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.grcms.pfingo.management.util.HttpClientHelper;
import com.grcms.pfingo.management.util.WebUtility;

/**
 * @author dengjiepeng:
 * @areate Date:2012-3-23
 * 
 */
@Service
public class BaseDaoImpl {
	protected static final String DEFAULT = "DEFAULT";
	protected static final String ALL = "ALL";
	protected static final String rateId = WebUtility.getProperty("rateId");
	protected static final String apiUserName = WebUtility.getProperty("apiUserName");
	protected static final String transId = WebUtility.getProperty("transId");
	protected static final String initiAppType = WebUtility.getProperty("initiAppType");
	protected static final String initiAppId = WebUtility.getProperty("initiAppId");
	protected static final String providerId = WebUtility.getProperty("providerId");
	protected static final String port = WebUtility.getProperty("port");
	protected static final String ip = WebUtility.getProperty("ip");
	protected static final String apiKey = WebUtility.getProperty("apiKey");
	protected static final String version = WebUtility.getProperty("version");
	protected static final String signature = WebUtility.getProperty("signature");
	
	protected static final String TRANS_ID = String.valueOf(System.currentTimeMillis());
	protected static final String privacyKey = HttpClientHelper.getParam("privacyKey");
	protected static final String signingKey = HttpClientHelper.getParam("signingKey");
	protected static final String signature1 = WebUtility.MD5Digest(
			  "gnumsocial:"+privacyKey+":"+transId+":"+signingKey);
	protected static final Map<String,String> defaultMap = new HashMap<String,String>();
	static {
		defaultMap.put("apiUserName", apiUserName);
		defaultMap.put("transId", transId);
		defaultMap.put("initiAppType", initiAppType);
		defaultMap.put("initiAppId", initiAppId);
		defaultMap.put("providerId", providerId);
	}
	
	protected Map<String,String> authHeadrs(){
		Map<String, String> headMap = new HashMap<String, String>();
		headMap.put("Authorization", "api_key='9G6i814RLVsc18A72atPAmJy', ts='2015-09-02 16:24:88', nonce='123456', X-Security-Sign=");
		headMap.put("accept", "application/json");
		return headMap;
	}
}
