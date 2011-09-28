/*
 * Fusion Charts Project
 *
 * Copyright (C) 2011 Xpand IT.
 *
 * This software is proprietary.
 */

package com.fusioncharts;

/**
 * @author dgpd
 *
 */
public class Entity {
	private String id;
	private Double value;
	private String event;
	private String color;
	
	/**
	 * @return the color
	 */
	public String getColor() {
		return color;
	}
	/**
	 * @param color the color to set
	 */
	public void setColor(String color) {
		this.color = color;
	}
	/**
	 * @return the iD
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param iD the iD to set
	 */
	public void setID(String id) {
		this.id = id;
	}
	/**
	 * @return the value
	 */
	public Double getValue() {
		return this.value;
	}
	/**
	 * @param d the value to set
	 */
	public void setValue(double d) {
		value = d;
	}
	/**
	 * @return the link
	 */
	public String getEvent() {
		return event;
	}
	/**
	 * @param link the link to set
	 */
	public void setEvent(String event) {
		this.event = event;
	}

}
