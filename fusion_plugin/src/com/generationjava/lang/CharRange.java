package com.generationjava.lang;


/**
 * A range of characters. Able to understand the idea of a contiguous 
 * sublist of an alphbet, a negated concept, and a set of characters.
 * Used by StringW to handle sets of characters.
 *
 * State: Prototype-20010622
 */
public class CharRange {

    /**
     * Used internally to represent null in a char.
     */
    static private char UNSET;

    private char start;
    private char close;
    private boolean negated;

    /**
     * Construct a CharRange over a single character.
     *
     * @param start char over which this range is placed
     */
    public CharRange(char start) {
        this.start = start;
    }

    /**
     * Construct a CharRannge over a set of characters.
     *
     * @param start char start character in this range. inclusive
     * @param close char close character in this range. inclusive
     */
    public CharRange(char start, char close) {
        this.start = start;
        this.close = close;
    }

    /**
     * Construct a CharRannge over a set of characters.
     *
     * @param start String start first character is in this range. inclusive
     * @param close String first character is close character in this range. inclusive
     */
    public CharRange(String start, String close) {
        this.start = start.charAt(0);
        this.close = close.charAt(0);
    }

    public char getStart() {
        return this.start;
    }

    public char getEnd() {
        return this.close;
    }

    public void setStart(char ch) {
        this.start = ch;
    }

    public void setEnd(char ch) {
        this.close = ch;
    }

    /**
     * Is this CharRange over many characters
     *
     * @return boolean true is many characters
     */
    public boolean isRange() {
        return this.close != UNSET;
    }

    /**
     * Is the passed in character inside this range
     *
     * @return boolean true is in range
     */
    public boolean inRange(char ch) {
        if(isRange()) {
            return ((ch >= start) && (ch <= close) );
        } else {
            return start == ch;
        }
    }

    /**
     * Is this CharRange negated
     *
     * @return boolean true is negated
     */
    public boolean isNegated() {
        return negated;
    }

    /**
     * Make this character range be negated. 
     * This implies that this CharRange is over all characters except 
     * the ones in this range.
     */
    public void setNegated(boolean b) {
        this.negated = b;
    }

    public String toString() {
        String str = "";
        if(isNegated()) {
            str += "^";
        }
        str += start;
        if(isRange()) {
            str += "-";
            str += close;
        }
        return str;
    }
}
