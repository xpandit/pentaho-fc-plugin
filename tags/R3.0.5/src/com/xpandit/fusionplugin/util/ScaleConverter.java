package com.xpandit.fusionplugin.util;

/**
 * 
 * Class that reduces a number size by dividing by 1000 and appending a letter
 * 100000 becomes 100M.
 * 
 * @author rplp
 * @version $Revision: 666 $
 * 
 */
public class ScaleConverter {

    /*
     * Used to create scale
     */
    protected static final String[] NUMBER_SCALE = { "", "K", "M", "B" };

    /**
     * Reduce the number size by dividing by 1000 and adding a letter.
     * @param number The number to convert.
     * @return String with the number divided and the letter appended.
     */
    public static String scaleNumber(double number) {
        int indexDivision = 0;
        double auxI = number;
        boolean negative=false;
        if(number<0)
        {
        	negative=true;
        	auxI*=-1;
        	
        }
        while (auxI > 1000 && indexDivision < NUMBER_SCALE.length - 1) {
            auxI /= 1000;
            ++indexDivision;
        }
        if(negative)
        	auxI*=-1;
        return Double.valueOf(auxI).longValue() + NUMBER_SCALE[indexDivision];
    }
    
    /**
     * Reduce the number size by dividing by 1000 and round the number .
     * @param number The number to convert.
     * @return String with the number divided and the with letter appended.
     */
    public static String scaleNumberWithRound(double number) {
        int indexDivision = 0;
        double auxI = number;
        boolean negative=false;
        if(number<0)
        {
        	negative=true;
        	auxI*=-1;
        	
        }
        while (auxI > 1000 && indexDivision < NUMBER_SCALE.length - 1) {
            auxI /= 1000; 
            ++indexDivision;
        }
        long auxValue=Double.valueOf(auxI).longValue();
        if(auxValue>1000)
        {
        	auxValue/=10;
        	auxValue*=10;
        }
        if(negative)
        	auxI*=-1;
        return auxValue + NUMBER_SCALE[indexDivision];
    }
}
