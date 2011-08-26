package com.xpandit.fusionplugin.exception;

/**
 * 
 * @author dduque
 * 
 * This exception is used when a result set is considered invalid
 *
 */
public class InvalidDataResultSetException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * All Error Codes For this Exception
	 */
	public static String ERROR_001="INVALID DATA - MetaData Verification Size";
	
	private String extendedMessage;



	public InvalidDataResultSetException(String message,String extended) {
		super(message);
		setExtendedMessage(extended);
	}

	public String getExtendedMessage() {
		return extendedMessage;
	}
	
	public void setExtendedMessage(String extended_Message) {
		this.extendedMessage = extended_Message;
	}
	
	@Override
	public String toString() {
		return extendedMessage+"-->"+ super.toString();
	}

}
