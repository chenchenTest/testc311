package com.grcms.pfingo.management.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.security.KeyStore;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import sun.misc.BASE64Encoder;

import com.alibaba.fastjson.JSONObject;

@SuppressWarnings("restriction")
public class APIUtil {
	
	private static final BASE64Encoder ENCODER = new BASE64Encoder();
	
	public static HttpClient createCerClient(){
		HttpClient client = new DefaultHttpClient();
		//本机
		File file = new File("E:\\zhengshu.cer");
		//linux 服务器
		/*File file = new File("\\usr\\local\\tomcat\\zhengshu.cer");*/
		try{
			InputStream inStream = new FileInputStream(file);
			CertificateFactory cerFactory = CertificateFactory.getInstance("X.509");
			X509Certificate cer = (X509Certificate) cerFactory.generateCertificate(inStream);
			String info = cer.getSubjectDN().getName();
			KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
			keyStore.load(null, null);
			keyStore.setCertificateEntry("trust", cer);
			SSLSocketFactory socketFactory = new SSLSocketFactory(keyStore);
			Scheme sch = new Scheme("https", socketFactory, 8243);
			client.getConnectionManager().getSchemeRegistry().register(sch);
		}catch(Exception e){
			e.printStackTrace();
		}
		return client;
	}
	
	@SuppressWarnings("unused")
	public static String getToken() throws UnsupportedEncodingException{
		String url = "https://devais.pfingo.com:8243/token?grant_type=password&username=ais_voip&password=ais@123456";
		String kvIOS = ENCODER
				.encode("PYCJqf97nBFRF1c4ZZ1k_XxAQ1Ma:2zA7TOpyKT3pn6m5prFUiHEDCyca"
						.getBytes("UTF-8"));
		String kvAndriod = ENCODER
				.encode("pZ9XRYvpZmuLDO2hWHKzfHkPI6sa:8169i1UTBMESTYS_ZbLhS3WuOLoa"
						.getBytes("UTF-8"));
		String kvVoip = ENCODER
				.encode("KCMvyCSjghXGpoqzfBUmsXXLgy0a:Qh_xZTFkNSRLRnfDJqBQp6_jSkEa"
						.getBytes("UTF-8"));
		System.out.println(kvIOS);
		String header = "Basic " + kvVoip;
		Map<String, String> headerMap = new HashMap<String, String>();
		headerMap.put("Authorization", header);
		String json = getAccessToken(url, headerMap);
		JSONObject data = JSONObject.parseObject(json);
		String token = data.getString("access_token");
		return token;
	}
	
	public static String getAccessToken(String url,
			Map<String, String> headerMap) {
		String xmlStr = "";
		try {
			HttpPost postMethod = new HttpPost(url);

			postMethod.addHeader("Content-Type",
					"application/x-www-form-urlencoded");

			if (headerMap != null && headerMap.size() > 0) {
				Iterator<Entry<String, String>> iter = headerMap.entrySet()
						.iterator();
				while (iter.hasNext()) {
					Entry<String, String> entry = iter.next();
					postMethod.addHeader(entry.getKey(), entry.getValue());
				}
			}

			HttpClient client = APIUtil.createCerClient();
			HttpResponse resp;

			resp = client.execute(postMethod);
			HttpEntity en = resp.getEntity();
			StatusLine line = resp.getStatusLine();
			if (line.getStatusCode() == 200) {
				xmlStr = EntityUtils.toString(en);
				System.out.println(xmlStr);
			} else {
				xmlStr = EntityUtils.toString(en);
				System.out.println(xmlStr);
				System.out.println("---cy error code is "
						+ line.getStatusCode());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return xmlStr;
	}
	
	public static void main(String[] args) {
		
		String url = "CoreApi/v1/consumption?login_id=8618382311870&provider_id=AIS";
		Map<String, String> headMap = new HashMap<String, String>();
		String token = null;
		try {
			token = APIUtil.getToken();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		headMap.put("Authorization", "Bearer "+token);
		headMap.put("Content-Type", "application/json");
		String xmlStr = HttpClientHelper.callRemoteService(null,headMap, url, "devais.pfingo.com", "8243",
				HttpClientHelper.HTTPS, HttpClientHelper.GET_METHOD);
		System.out.println("result:=="+xmlStr);
	}

}
