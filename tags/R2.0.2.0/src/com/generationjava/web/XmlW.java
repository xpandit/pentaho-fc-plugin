package com.generationjava.web;

import com.generationjava.lang.StringW;

/**
 * XML helping static methods.
 */
final public class XmlW {

    static public String escapeXml(String str) {
        str = StringW.replaceString(str,"&","&amp;");
        str = StringW.replaceString(str,"<","&lt;");
        str = StringW.replaceString(str,">","&gt;");
        str = StringW.replaceString(str,"\"","&quot;");
        str = StringW.replaceString(str,"'","&apos;");
        return str;
    }

    static public String unescapeXml(String str) {
        str = StringW.replaceString(str,"&amp;","&");
        str = StringW.replaceString(str,"&lt;","<");
        str = StringW.replaceString(str,"&gt;",">");
        str = StringW.replaceString(str,"&quot;","\"");
        str = StringW.replaceString(str,"&apos;","'");
        return str;
    }

    /**
     * Remove any xml tags from a String.
     * Same as HtmlW's method.
     */
    static public String removeXml(String str) {
        int sz = str.length();
        StringBuffer buffer = new StringBuffer(sz);
        boolean inString = false;
        boolean inTag = false;
        for(int i=0; i<sz; i++) {
            char ch = str.charAt(i);
            if(ch == '<') {
                inTag = true;
            } else
            if(ch == '>') {
                inTag = false;
                continue;
            }
            if(!inTag) {
                buffer.append(ch);
            }
        }
        return buffer.toString();
    }

    static public String getContent(String tag, String text) {
        int idx = XmlW.getIndexOpeningTag(tag, text);
        if(idx == -1) {
            return "";
        }
        text = text.substring(idx);
        int end = XmlW.getIndexClosingTag(tag, text);
        idx = text.indexOf('>');
        if(idx == -1) {
            return "";
        }
        return text.substring(idx+1, end);
    }

    static public int getIndexOpeningTag(String tag, String text) {
        return getIndexOpeningTag(tag, text, 0);
    }
    static private int getIndexOpeningTag(String tag, String text, int start) {
        // consider whitespace?
        int idx = text.indexOf("<"+tag, start);
        if(idx == -1) {
            return -1;
        }
        char next = text.charAt(idx+1+tag.length());
        if( (next == '>') || Character.isWhitespace(next) ) {
            return idx;
        } else {
            return getIndexOpeningTag(tag, text, idx+1);
        }
    }

    // Pass in "para" and a string that starts with 
    // <para> and it will return the index of the matching </para>
    // It assumes well-formed xml. Or well enough.
    static public int getIndexClosingTag(String tag, String text) {
        return getIndexClosingTag(tag, text, 0);
    }
    static public int getIndexClosingTag(String tag, String text, int start) {
        String open = "<"+tag;
        String close = "</"+tag+">";
//        System.err.println("OPEN: "+open);
//        System.err.println("CLOSE: "+close);
        int closeSz = close.length();
        int nextCloseIdx = text.indexOf(close, start);
//        System.err.println("first close: "+nextCloseIdx);
        if(nextCloseIdx == -1) {
            return -1;
        }
        int count = StringW.countMatches(text.substring(start, nextCloseIdx), open);
//        System.err.println("count: "+count);
        if(count == 0) {
            return -1;  // tag is never opened
        }
        int expected = 1;
        while(count != expected) {
            nextCloseIdx = text.indexOf(close, nextCloseIdx+closeSz);
            if(nextCloseIdx == -1) {
                return -1;
            }
            count = StringW.countMatches(text.substring(start, nextCloseIdx), open);
            expected++;
        }
        return nextCloseIdx;
    }

    static public String getAttribute(String attribute, String text) {
        return getAttribute(attribute, text, 0);
    }
    static public String getAttribute(String attribute, String text, int idx) {
         int close = text.indexOf(">", idx);
         int attrIdx = text.indexOf(attribute+"=\"", idx);
         if(attrIdx == -1) {
             return null;
         }
         if(attrIdx > close) {
             return null;
         }
         int attrStartIdx = attrIdx + attribute.length() + 2;
         int attrCloseIdx = text.indexOf("\"", attrStartIdx);
         if(attrCloseIdx > close) {
             return null;
         }
         return unescapeXml(text.substring(attrStartIdx, attrCloseIdx));
    }

}
