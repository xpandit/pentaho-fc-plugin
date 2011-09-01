package com.xpandit.fusionplugin.exception;

/**
 * 
 * This Exception is thrown when one parameter is invalid 
 * 
 * @author dduque
 *
 */
public class InvalidParameterException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final String ERROR_001 = "Parameter Chart Type Required: ";
	public static final String ERROR_002 = "Invalid Parameter Chart Type: ";
	public static final String ERROR_003 = "Parameter Required: ";
	public static final String ERROR_004 = "Factory cant load this chart type: ";
	public static final String ERROR_005 = "Invalid Parameter: ";
	public static final String ERROR_006 = "Parameter Required: ";

	/**
	 * 
	 * Invalid Parameter Exception constructor
	 * 
	 * @param message Message of the exception
	 */
	public InvalidParameterException(String message) {
		super(message);
	}
}
