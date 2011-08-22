package com.generationjava.util;

// SoundEx algorithm. 
public class Soundex {

    static public final char[] US_ENGLISH_MAPPING =
        "01230120022455012623010202".toCharArray();

    static public final Soundex US_ENGLISH = new Soundex();
    
    private char[] soundexMapping;

    public Soundex() {
        this(US_ENGLISH_MAPPING);
    }

    public Soundex(char[] mapping) {
        this.soundexMapping = mapping;
    }

    /**
     * Get the SoundEx value of a string.
     * This implementation is taken from the code-snippers on 
     * http://www.sourceforge.net/
     */
    public String soundex(String str) {
        char out[] = { '0', '0', '0', '0' };
        char last, mapped;
        int incount = 1, count = 1;
        out[0] = Character.toUpperCase( str.charAt(0) );
        last = getMappingCode( str.charAt(0) );
        while( (incount < str.length() ) && 
               (mapped = getMappingCode(str.charAt(incount++))) != 0 &&
               (count < 4) )
        {
            if( (mapped != '0') && (mapped != last) ) {
                out[count++] = mapped;
            }
            last = mapped;
        }
        return new String(out);
    }

    /**
     * Used internally by the SoundEx algorithm.
     */
    private char getMappingCode(char c) {
        if( !Character.isLetter(c) ) {
            return 0;
        } else {
            return soundexMapping[Character.toUpperCase(c) - 'A'];
        }
    }

}
