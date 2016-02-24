package com.grcms.pfingo.management.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import javassist.tools.rmi.RemoteException;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;


/**
 * @author dengjiepeng:
 * @areate Date:2012-3-15
 * 
 */
public class HttpClientHelper {
	private static Logger log = Logger.getLogger(HttpClientHelper.class);
	private static Properties prop = null;
	public static final String HTTPS = "https";
	public static final String HTTP = "http";
	public static final String POST_METHOD = "POST";
	public static final String GET_METHOD = "GET";
	public static final String PUT_METHOD = "PUT";
	public static final String DELETE_METHOD = "DELETE";
	private static final Integer QUERY_PARAMS = 0;
	private static final Integer JSON_PARAMS = 1;
	
	
	static {
		try {
			prop = new Properties();
			log.debug("Start Load HttpClientPath File..");
			InputStream in = WebUtility.class.getClassLoader()
					.getResourceAsStream("httpClientPath.properties");
			prop.load(in);
			log.debug("End Load HttpClientPath File..");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static String getIp() {
		if (prop != null) {
			return prop.getProperty("ip");
		} else {
			return null;
		}
	}
	
	public static String getProviderId(){
		if (prop != null) {
			return prop.getProperty("providerId");
		} else {
			return null;
		}
	}

	public static String getParam(String name) {
		if (prop != null) {
			return prop.getProperty(name);
		} else {
			return null;
		}
	}
	
	public static int getPort() {
		if (prop != null) {
			return Integer.parseInt(prop.getProperty("port"));
		} else {
			return 80;
		}
	}

/*	public static String getBasePath() {
		if (prop != null) {
			String basePath = prop.getProperty("basePath");
			if (basePath.startsWith("/")) {
				return basePath;
			} else {
				return "/" + basePath;
			}
		} else {
			return null;
		}
	}*/

	/*public static String getURLForAPI(HttpServletRequest request, String api) {
		String path = null;
		if (request != null) {
			String url = request.getRequestURL().toString();
			String uri = request.getRequestURI();
			url = url.substring(0, url.indexOf(uri));
			String basePath = request.getContextPath();
			// String api = "/emailactive/active";
			if (prop != null) {
				String prefix = prop.getProperty("prefix");
				if (WebUtility.isVerify(url) && WebUtility.isVerify(prefix)) {
					path = url + basePath + prefix + api;
				}
			}
			
			 * if (prop != null) { String prefixURL =
			 * prop.getProperty("emailActiveURLPrefix"); String prefix =
			 * prop.getProperty("prefix"); String basePath =
			 * request.getContextPath(); if (WebUtility.isVerify(prefixURL) &&
			 * WebUtility.isVerify(prefix)) { path = prefixURL + basePath +
			 * prefix + api; } }
			 
		}
		return path;
	}*/

	public static String getPath(String pathSuffix) {
		if (prop != null) {
			String path = prop.getProperty(pathSuffix);
			if (path.startsWith("/")) {
				return path;
			} else {
				return "/" + path;
			}
		} else {
			return null;
		}
	}
/*	public static String getAllPath(String pathSuffix) {
		if (prop != null) {
			String ip = getIp();
			String base = getBasePath();
			String path = prop.getProperty(pathSuffix);
			if (!path.startsWith("/")) {
				path += "/" + path;
			}
			return ip+base + path;
		} else {
			return null;
		}
	}*/

	/**
	 * remote access
	 * 
	 * @param parramMap
	 * @param basePath
	 * @param path
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public static String remoteAccess(Map<String, String> parramMap, String path)
			throws Exception {
		DefaultHttpClient httpClient = new DefaultHttpClient();
		List<BasicNameValuePair> parrams = getParrams(parramMap);
		// URLEncoder.encode(s, enc)
//		String parram = URLEncodedUtils.format(parrams, "utf-8");
		String parram = createParams(parrams, "utf-8");
		log.debug("parram:" + parram);
//		String remotePath = getBasePath() + path;
		String remotePath = path;
		URI uri;
		String xmlStr = null;
		HttpUriRequest getMethod = null;
		try {
			uri = URIUtils.createURI("http", getIp(), getPort(), remotePath,
					parram, null);
			log.info("URI:" + uri.toString());
			getMethod = new HttpGet(uri);
			// execute connection
			HttpResponse result = httpClient.execute(getMethod);
			log.debug("status:" + result.getStatusLine());
			int statusCode = result.getStatusLine().getStatusCode();
			log.debug("statusCode:" + statusCode);
			if (statusCode == 200) {
				HttpEntity entity = result.getEntity();
				if (entity != null) {
					xmlStr = EntityUtils.toString(entity);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			getMethod.abort();
		}
		return xmlStr;
	}
	
	/**
	 * @param parramMap
	 * @param path
	 * @param ip
	 * @param pork
	 * @param scheme
	 * @param method
	 * @return
	 * @throws Exception
	 */
	/*public static String callRemoteService(String path,String ip,int port,String scheme,String method,Map<String,String> headers )
	throws Exception {
		HttpClient httpClient = new HttpClient();
		URI uri;
		String result = null;
		HttpMethod submitMethod = null;
		String url = scheme + "://";
		if(WebUtility.isVerify(ip)) url += ip + ":" + port;
		if(!WebUtility.isVerify(path)) path = "";
		if(path.startsWith("/")) {
			url += path;
		}else{
			url += "/" + path;
		}
		try {
			uri = new URI(url);
			log.info("[URI]==>" + uri.toString());
			if(GET_METHOD.equals(method)) submitMethod = new GetMethod(uri.toString());
			if(POST_METHOD.equals(method)) submitMethod = new PostMethod(uri.toString());
			//if headers not empty,set headers value;
			if(headers != null && headers.size() != 0) {
				Set<Entry<String, String>> set = headers.entrySet();
				Iterator<Entry<String, String>> iterator = set.iterator();
				while (iterator.hasNext()){
					Entry<String, String> entry = iterator.next();
					submitMethod.getParams().setParameter(entry.getKey(), entry.getValue());
				}
			}
			// execute connection
			Integer statusCode = httpClient.executeMethod(submitMethod);
//			HttpResponse resp = httpClient.executeMethod(submitMethod);
			log.info("status:" + statusCode);
//			int statusCode = resp.getStatusLine().getStatusCode();
//			if (statusCode == 200) {
//				HttpEntity entity = resp.getEntity();
//				if (entity != null) {
//					result = EntityUtils.toString(entity);
//				}
//			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			submitMethod.abort();
		}
		return result;
	}*/
	
	/**
	 * 发起HTTP请求
	 * @param parramMap	查询字符串数组
	 * @param headerMap	请求头字符串数组
	 * @param path	请求的URI
	 * @param ip	域名或者IP地址
	 * @param pork	端口,默认80可不填
	 * @param scheme	协议，http/https
	 */
	public static String callRemoteService(Map<String, String> parramMap, 
			Map<String, String> headerMap,String path,String ip,String pork,String scheme,String method){
		String result = null;
		try {
			result = process(parramMap,headerMap,null,path,ip,pork,scheme,method,QUERY_PARAMS);
			
		} catch (Exception e) {
			throw new RemoteException(e);
		}
		return result;
	}
	/**
	 * 发起HTTP请求
	 * @param parramMap	查询字符串数组
	 * @param path	请求的URI
	 * @param ip	域名或者IP地址
	 * @param pork	端口,默认80可不填
	 * @param scheme	协议，http/https
	 */
	public static String callRemoteService(Map<String, String> parramMap, 
			String path,String ip,String pork,String scheme,String method){
		try {
			return process(parramMap,null,null,path,ip,pork,scheme,method,QUERY_PARAMS);
			
		} catch (Exception e) {
			throw new RemoteException(e);
		}
	}
	
	/**
	 * 支持PUT 和 POST方式
	 * @param jsonParams JSON字符串
	 * @param path	请求的URI 
	 * @param ip	域名或者IP地址
	 * @param pork	端口,默认80可不填
	 * @param scheme	协议，http/https
	 * @param method	请求方式，只支持PUT和POST
	 * @return
	 * @throws Exception
	 */
	public static String callRemoteServiceByJson(String jsonParams, 
			String path,String ip,String pork,String scheme,String method) {
		String result = null;
		try {
			result = process(null,null,jsonParams,path,ip,pork,scheme,method,JSON_PARAMS);
			
		} catch (Exception e) {
			throw new RemoteException(e);
		}
		return result;
	}
	
	/**
	 * @param parramMap
	 * @param jsonParams
	 * @param path
	 * @param ip
	 * @param port
	 * @param scheme
	 * @param method
	 * @param paramType
	 * @return
	 * @throws IOException 
	 * @throws ClientProtocolException 
	 * @throws URISyntaxException 
	 */
	private static String process(Map<String, String> parramMap,Map<String, String> headerMap, String jsonParams,
			String path,String ip,String port,String scheme,String method,Integer paramType) throws ClientProtocolException, IOException, URISyntaxException {
		log.info("------------------ HTTP REQUEST START ----------------------");
		/*HttpClient client = createClient(scheme,Integer.valueOf(port));*/
		HttpClient client = APIUtil.createCerClient();
		String param = null;
		URI uri;
		HttpRequestBase submitMethod = null;
		String xmlStr = null;
		String url = scheme;
		if(!WebUtility.isVerify(path)) path = "";
		if(WebUtility.isVerify(ip)) url += "://" + ip;
		if(WebUtility.isVerify(port)) {
			if(!"80".equals(port)) url += ":" + port;
		}
		if(!path.startsWith("/")) {
			url += "/";
		}
		url+= path;
		// #########################################################
		// 若是查询字符串
		// #########################################################
		if(QUERY_PARAMS == paramType) {
			//准备参数
			List<BasicNameValuePair> params = getParrams(parramMap);
			param = createParams(params, "utf-8");
			log.info("[method] ==> " + method);
			log.info("[URL] ==> " + url.toString());
			log.info("[param] ==> " + param);
			
			// 若是HTTP GET请求,直接拼装查询字符串
			if(GET_METHOD.equals(method)) {
				if(StringUtils.isEmpty(param)){
					uri = new URI(url);
				}else{
					uri = new URI(url + "?" + param);
				}
				HttpGet getMethod = new HttpGet(uri);
				submitMethod = getMethod;
			}
			
			// 若是HTTP DELETE请求,直接拼装查询字符串
			if(DELETE_METHOD.equals(method)) {
				uri = new URI(url + "?" + param);
				
				HttpDelete deleteMethod = new HttpDelete(uri);
				submitMethod = deleteMethod;
			}
			
			// 若是HTTP POST请求,在REQUEST BODY中封装参数
			if(POST_METHOD.equals(method)) {
				uri = new URI(url);
				HttpPost postMethod = new HttpPost(uri.toString());
				
				UrlEncodedFormEntity entity = new UrlEncodedFormEntity(params);
				postMethod.setEntity(entity);
				submitMethod = postMethod;
			}
			
			// 若是HTTP PUT请求,在REQUEST BODY中封装参数
			if(PUT_METHOD.equals(method)) {
				uri = new URI(url);
				HttpPut putMethod = new HttpPut(uri.toString());
				
				UrlEncodedFormEntity entity = new UrlEncodedFormEntity(params);
				putMethod.setEntity(entity);
				submitMethod = putMethod;
			}
		}
		
		// #########################################################
		// 若是JSON参数
		// #########################################################
		if(JSON_PARAMS == paramType) {
			//准备参数
			param = jsonParams;
			log.info("[method] ==> " + method);
			log.info("[URL] ==> " + url.toString());
			log.info("[param] ==> " + param);
			
			StringEntity entity = new StringEntity(param);
			entity.setContentEncoding("UTF-8");
			entity.setContentType("application/json; charset=UTF-8");
			
			// 若是HTTP POST请求,在REQUEST BODY中封装参数
			if(POST_METHOD.equals(method)) {
				uri = new URI(url);
				HttpPost postMethod = new HttpPost(uri.toString());
				
				postMethod.setEntity(entity);
				submitMethod = postMethod;
			}
			
			// 若是HTTP PUT请求,在REQUEST BODY中封装参数
			if(PUT_METHOD.equals(method)) {
				uri = new URI(url);
				HttpPut putMethod = new HttpPut(uri.toString());
				
				putMethod.setEntity(entity);
				submitMethod = putMethod;
			}
			
			submitMethod.addHeader("Content-Type", "application/json; charset=UTF-8");
			submitMethod.addHeader("Accept", "application/json, text/javascript");
		}
		
		
		// #########################################################
		// 设置请求头
		// #########################################################
		if(headerMap != null && headerMap.size() > 0) {
			Iterator<Entry<String, String>> iter = headerMap.entrySet().iterator();
			while(iter.hasNext()) {
				Entry<String, String> entry = iter.next();
				submitMethod.addHeader(entry.getKey(), entry.getValue());
			}
		}
		// #########################################################
		// 发起请求
		// #########################################################
		
		HttpResponse resp = client.execute(submitMethod);
		StatusLine line = resp.getStatusLine();
		log.info("[http status line] ==> " + line.toString());
		
		if (line.getStatusCode() == 200) {
			xmlStr = EntityUtils.toString(resp.getEntity());
		}else{
			throw new RemoteException(line.toString());
		}
		
		EntityUtils.consume(resp.getEntity());
		submitMethod.releaseConnection();
		client.getConnectionManager().shutdown();
		
		log.info("------------------ HTTP REQUEST END ----------------------");
		return xmlStr;
	}
	
	private static HttpClient getHttpClient() {
		return new DefaultHttpClient();
	}
	
	private static HttpClient getHttpsClient(int port){
		HttpClient client = new DefaultHttpClient();
		SSLContext sslContext;
		try {
			sslContext = SSLContext.getInstance("SSL");
			// set up a TrustManager that trusts everything
			try {
				sslContext.init(null,
						new TrustManager[] { new X509TrustManager() {
							
							@Override
							public java.security.cert.X509Certificate[] getAcceptedIssuers() {
								// TODO Auto-generated method stub
								return null;
							}
							
							@Override
							public void checkServerTrusted(java.security.cert.X509Certificate[] chain,
									String authType) throws CertificateException {
								// TODO Auto-generated method stub
								
							}
							
							@Override
							public void checkClientTrusted(java.security.cert.X509Certificate[] chain,
									String authType) throws CertificateException {
								// TODO Auto-generated method stub
								
							}
						}
				}, new SecureRandom());
			} catch (KeyManagementException e) {
			}
			
			SSLSocketFactory ssf = new SSLSocketFactory(sslContext,SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
			ClientConnectionManager ccm = client.getConnectionManager();
			SchemeRegistry sr = ccm.getSchemeRegistry();
			sr.register(new Scheme("https", port, ssf));            
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return client;
	}
	
	
	private static HttpClient createClient(String scheme,int port) {
		return HTTP.equals(scheme)?getHttpClient():getHttpsClient(port);
	}
	
	
	/**
	 * put key and value in url parrams.
	 * 
	 * @param parramMap
	 * @return
	 */
	private static List<BasicNameValuePair> getParrams(
			Map<String, String> parramMap) {
		List<BasicNameValuePair> parrams = new ArrayList<BasicNameValuePair>();
		if (parramMap != null && !parramMap.isEmpty()) {
			Set<Entry<String, String>> entrySet = parramMap.entrySet();
			Iterator<Entry<String, String>> iter = entrySet.iterator();
			while (iter.hasNext()) {
				Entry<String, String> entry = iter.next();
				String key = entry.getKey();
				String value = entry.getValue();
				
				//如果是","分割
				if(WebUtility.isVerify(value)) {
					
					String[] values = value.split(",");
					if(values.length > 1) {
						for(String val : values) {
							parrams.add(new BasicNameValuePair(key, val));
						}
					}else{
						parrams.add(new BasicNameValuePair(key, value));
					}
				}
			}
		}
		return parrams;
	}
	public static void setRequestHeader(String key,String value){
	}
	private static String createParams(List<BasicNameValuePair> parrams,String encode) {
		StringBuffer sb = new StringBuffer();
		try {
			for (BasicNameValuePair vp : parrams) {
				String key = vp.getName();
				String value = vp.getValue();
				String entry;
				if(WebUtility.isVerify(value)) {
					entry = key + "="
					+ URLEncoder.encode(value, encode).toString();
				}else{
					entry = key + "=";
				}
				sb.append(entry + "&");
			}
			if(sb.length() > 0) {
				sb.deleteCharAt(sb.length() -1);
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return sb.toString();
	}
	/**
	 * 
	 * @param scheme 协议类型：http或https
	 * @param port 服务端口号
	 * @param ip ip地址
	 * @param path 调用服务器端api接口
	 * @param parts 请求参数
	 * @return xml格式的处理结果
	 * @throws Exception 当访问服务器过程中产生错误时会抛出该异常
	 */
	public static String callRemoteService(String scheme,String port,String ip,String path,Part[] parts) throws Exception{
		//获取浏览器
		org.apache.commons.httpclient.HttpClient httpClient = 
				new org.apache.commons.httpclient.HttpClient();
		//构建请求post请求方式
		String url = null==scheme?scheme:"http";
		  if(WebUtility.isVerify(ip)) url += "://" + ip;
			if(WebUtility.isVerify(port)) {
				if(!"80".equals(port)) url += ":" + port;
			}
			if(!path.startsWith("/")) {
				url += "/";
			}
			url+= path;
		  PostMethod postMethod = new PostMethod(url);
		  log.info("request url==>"+url);
		//构建实体
		  MultipartRequestEntity entity = new MultipartRequestEntity(parts, postMethod.getParams());
		  postMethod.setRequestEntity(entity);
		//执行请求
		  int responseCode = httpClient.executeMethod(postMethod);
		  log.info("response code==>"+responseCode);
		  String xmlStr = null;
		  if(200==responseCode) {
			  xmlStr = postMethod.getResponseBodyAsString();
		  }
		return xmlStr;
	}
}
