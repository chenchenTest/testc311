package com.grcms.pfingo.exception;

public class RemoteException extends RuntimeException {

	private static final long serialVersionUID = 3474386487123936309L;

	public RemoteException() {
		super();
	}

	public RemoteException(Throwable cause) {
		super(cause);
	}

	public RemoteException(String message) {
		super(message);
	}

}
