package com.generationjava.lang;

import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

import com.generationjava.collections.typed.TypedList;

/**
 * A set of characters. You can iterate over the characeters in the 
 * set.
 */
public class CharSet {

    private TypedList set = new TypedList(com.generationjava.lang.CharRange.class);

    public CharSet(String[] set) {
        int sz = set.length;
        for(int i=0; i<sz; i++) {
            add(set[i]);
        }
    }

    public boolean contains(char ch) {
        Iterator iterator = set.iterator();
        boolean bool = false;
        while(iterator.hasNext()) {
            CharRange range = (CharRange)iterator.next();
            if(range.isNegated()) {
                if(!range.inRange(ch)) {
                    bool = true;
                }
            } else {
                if(range.inRange(ch)) {
                    bool = true;
                }
            }
        }
        return bool;
    }

    public void add(String str) {
        int sz = str.length();
        CharRange range = null;
        boolean end = false;
        boolean negated = false;
        for(int i=0; i<sz; i++) {
            char ch = str.charAt(i);
            if(ch == '-') {
                end = true;
                continue;
            }
            if(end) {
                range.setEnd(ch);
                continue;
            }
            if(ch == '^') {
                negated = true;
                continue;
            }
            range = new CharRange(ch);
            range.setNegated(negated);
            set.add(range);
        }
//        merge(list);
    }

/*    public void merge(TypedList list) {
        // wtf to do here.
        // need to go through each list, somehow figure it out.

        // iterate over list, get range, apply each range to existing 
        // list. apply to each member of the list? If it 'merges' with 
        // one of these, then cancel out.
        // if apply ^e to aeiou, then change aeiou to aiou. Keep the ^e?
        // I guess so. a-m and j-p becomes a-p. So there are 4x4 possibilities:

        // step 1: move so that single is first, range second. limits options.
        // step 2: 3 way switch. single-range, single-single, rannge-range.
        // Inside each option, consider the effect of each being negated.
        // So a 4 way switch.  UGLY.

    }

    public char nextChar() {
        return ' ';
    }

    public boolean hasNextChar() {
        return false;
    }
    */

    public String toString() {
        return set.toString();
    }

}
