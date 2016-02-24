package com.grcms.pfingo.management.exception.util;

import com.grcms.pfingo.exception.ErrorCodeException;

public class Assert {
	private static final String SUCCESS = "1000";
	private static final String UNKOWN_ERROR = "-1010";

	/**
	 * 如果调用api返回值得code不为1000时抛出ErrorCodeException
	 * 
	 * @param errorCode
	 * @param apiName
	 * @param message
	 */
	public static void validAPIResult(String errorCode, String apiName,
			String message) {
		if (UNKOWN_ERROR.equals(errorCode)) {
			throw new ErrorCodeException(errorCode, apiName, message);
		}
	}

	public static void notNull(Object object, String message) {
		if (object == null) {
			throw new IllegalArgumentException(message);
		}
	}

	public static void notNull(Object object) {
		notNull(object,
				"[Assertion failed] - this argument is required; it must not be null");
	}
}
