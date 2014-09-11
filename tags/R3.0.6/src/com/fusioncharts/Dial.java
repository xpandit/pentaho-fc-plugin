package com.fusioncharts;


/**
 * 
 * The Dial class provides a dial object that is used by the Angular Gauge class
 * 
 * 
 * @author dduque
 *
 */

public class Dial {

    private Double value;
    private String label;
    private String link;

    /**
     * @return the xValue
     */
    public Double getValue() {
        return value;
    }
    /**
     * @param xValue the xValue to set
     */
    public void setValue(Double value) {
        this.value = value;
    }
    /**
     * @return the label
     */
    public String getLabel() {
        return label;
    }
    /**
     * @param lable the label to set
     */
    public void setLable(String label) {
        this.label = label;
    }
    /**
     * @return the link
     */
    public String getLink() {
        return link;
    }
    /**
     * @param link the link to set
     */
    public void setLink(String link) {
        this.link = link;
    }

}
