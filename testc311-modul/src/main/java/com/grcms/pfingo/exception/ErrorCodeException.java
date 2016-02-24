package com.grcms.pfingo.exception;

/**
 * 
 * @author Chen.f 
 * @createTime：Feb 24, 2016 11:38:04 AM 
 *
 */
public class ErrorCodeException extends RuntimeException {
	private String errorCode;
	private String apiName;
	private String message;

	public ErrorCodeException() {
		super();
	}

	/**
	 * 
	 * @param errorCode
	 *            调用api时返回的error code
	 * @param apiName
	 *            调用用的api名称
	 * @param message
	 *            调用api时返回的错误信息
	 */
	public ErrorCodeException(String errorCode, String apiName, String message) {
		super(message);
		this.errorCode = errorCode;
		this.apiName = apiName;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getApiName() {
		return apiName;
	}

	public void setApiName(String apiName) {
		this.apiName = apiName;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
