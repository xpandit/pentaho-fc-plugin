package com.generationjava.lang;

import java.math.BigInteger;
import java.math.BigDecimal;

/**
 * Provides extra functionality for java Number classes.
 */
final public class NumberW {

    static public int stringToInt(String str) {
        return stringToInt(str,0);
    }
    static public int stringToInt(String str, int def) {
        try {
            return Integer.parseInt(str);
        } catch(NumberFormatException nfe) {
            return def;
        }
    }

    // must handle Long, Float, Integer, Float, Short,
    //                  BigDecimal, BigInteger and Byte
    // useful methods:
    // Byte.decode(String)
    // Byte.valueOf(String,int radix)
    // Byte.valueOf(String)
    // Double.valueOf(String)
    // Float.valueOf(String)
    // new Float(String)
    // Integer.valueOf(String,int radix)
    // Integer.valueOf(String)
    // Integer.decode(String)
    // Integer.getInteger(String)
    // Integer.getInteger(String,int val)
    // Integer.getInteger(String,Integer val)
    // new Integer(String)
    // new Double(String)
    // new Byte(String)
    // new Long(String)
    // Long.getLong(String)
    // Long.getLong(String,int)
    // Long.getLong(String,Integer)
    // Long.valueOf(String,int)
    // Long.valueOf(String)
    // new Short(String)
    // Short.decode(String)
    // Short.valueOf(String,int)
    // Short.valueOf(String)
    // new BigDecimal(String)
    // new BigInteger(String)
    // new BigInteger(String,int radix)
    // Possible inputs:
    // 45 45.5 45E7 4.5E7 Hex Oct Binary xxxF xxxD xxxf xxxd
    // plus minus everything. Prolly more. A lot are not separable.

    /**
     * Turns a string value into a java.lang.Number.
     * Strategy is to look for a decimal point. If that is seen then
     * try first float and then try double.
     * If this fails, then try int and then long.
     * Assuming 50f fails and isn't 50, then try hexadecimal.
     *
     * @param val String containing a number
     *
     * @return Number created from the string
     */
    static public Number createNumber(String val) 
            throws NumberFormatException 
    {
        if (val == null) {
            return null;
        }

        int idx = val.indexOf('.');                
        if ( (idx != -1) && (idx != val.length()-1) )  {
            try {
                return createFloat(val);
            } catch (NumberFormatException nfe) {
            }
            try {
                return createDouble(val);
            } catch (NumberFormatException nfe) {
            }

            // look for all digits or '.' with f or F on end.
            if( val.endsWith("f") || val.endsWith("F") ) {
                String mant = val.substring(0,idx);
                String dec = val.substring(idx+1,val.length()-1);
                if(containsDigits(mant) && containsDigits(dec) ) {
                    try {
                        return createFloat(val.substring(0,val.length()-1));
                    } catch (NumberFormatException nfe) {
                    }
                }
            }

            // look for all digits or '.' with d or D on end.
            if( val.endsWith("d") || val.endsWith("D") ) {
                String mant = val.substring(0,idx);
                String dec = val.substring(idx+1,val.length()-1);
                if(containsDigits(mant) && containsDigits(dec) ) {
                    try {
                        return createDouble(val.substring(0,val.length()-1));
                    } catch (NumberFormatException nfe) {
                    }
                }
            }

            try {
                return createBigDecimal(val);
            } catch (NumberFormatException nfe) {
            }

            throw new NumberFormatException("Unable to convert: "+val);
        }

        try {
            return createInteger(val);
        } catch (NumberFormatException nfe) {
        }
        try {
            return createLong(val);
        } catch (NumberFormatException nfe) {
        }


        // look for all digits with l or L on the end.
        if( val.endsWith("l") || val.endsWith("L") ) {
            if(containsDigits(val.substring(0,val.length()-1))) {
                try {
                    return createLong(val.substring(0,val.length()-1));
                } catch (NumberFormatException nfe) {
                }
            }
        }


        try {
            return createBigInteger(val);
        } catch (NumberFormatException nfe) {
        }

        // try Hex.
        try {
            return Integer.valueOf(val,16);
        } catch (NumberFormatException nfe) {
        }

        throw new NumberFormatException("Unable to convert: "+val);
    }

    /**
     * Return true if the string contains only digit characters.
     *
     * @param val String to check is only digits
     *
     * @return boolean contains only unicode numeric
     */
    static public boolean containsDigits(String val) {
        if(val == null) {
            return false; // ???
        }
        for(int i=0;i<val.length();i++) {
            if(!Character.isDigit(val.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    static public Float createFloat(String val) {
        return Float.valueOf(val);
    }

    static public Double createDouble(String val) {
        return Double.valueOf(val);
    }

    // handles 0xAABD and 0777 (hex and octal) as well.
    static public Integer createInteger(String val) {
        // return Integer.valueOf(val);
        return Integer.decode(val);
    }

    static public Long createLong(String val) {
        return Long.valueOf(val);
    }

    static public BigInteger createBigInteger(String val) {
        BigInteger bi = new BigInteger(val);
        return bi;
    }

    static public BigDecimal createBigDecimal(String val) {
        BigDecimal bd = new BigDecimal(val);
        return bd;
    }

    /**
     * Get the minimum of three values.
     */
    static public int minimum(int a, int b, int c) {
        if(b < a) {
            a = b;
        }
        if(c < a) {
            a = c;
        }
        return a;
    }

    /**
     * Is a String a valid Java number.
     * Doesn't allow scientific notation.
     */
    static public boolean isNumber(String str) {
        char[] chrs = str.toCharArray();
        int sz = chrs.length;
        boolean decimal = false;
        for(int i=0; i<sz; i++) {
            // possibly faster as a continuous switch
            if( (chrs[i] >= '0') && (chrs[i] <= '9') ) {
                continue;
            }
            if(i==0) {
                if(chrs[i] == '-') {
                    continue;
                }
            }
            if(chrs[i] == '.') {
                if(!decimal) {
                    decimal = true;
                    continue;
                }
            }
            return false;
        }
        return true;
    }

}
