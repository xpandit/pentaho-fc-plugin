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
        while (auxI > 1000 && indexDivision < NUMBER_SCALE.length - 1) {
            auxI /= 1000;
            ++indexDivision;
        }
        return Double.valueOf(auxI).longValue() + NUMBER_SCALE[indexDivision];
    }
}
