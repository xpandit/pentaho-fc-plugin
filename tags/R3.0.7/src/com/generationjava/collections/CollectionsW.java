
package com.generationjava.collections;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.generationjava.lang.ClassW;

/**
 * A wrapper around the Collections. Provides functionality above and 
 * beyond the duty of java.util's Collection API.
 */
final public class CollectionsW {

    /**
     * Given an Object, and an index, it will get the nth value in the
     * object.
     */
    static public Object index(Object obj, int idx) {
        return index(obj, new Integer(idx));
    }
    static public Object index(Object obj, Object index) {
        if(obj instanceof Map) {
            Map map = (Map)obj;
            if(map.containsKey(index)) {
                return map.get(index);
            }
        }
        int idx = -1;
        if(index instanceof Integer) {
            idx = ((Integer)index).intValue();
        }
        if(idx < 0) {
            return obj;
        } else
        if(obj instanceof Map) {
            Map map = (Map)obj;
            Iterator iterator = map.keySet().iterator();
            while(iterator.hasNext()) {
                idx--;
                if(idx == -1) {
                    return iterator.next();
                } else {
                    iterator.next();
                }
            }
        } else
        if(obj instanceof List) {
            return ((List)obj).get(idx);
        } else
        if(obj instanceof Object[]) {
            return ((Object[])obj)[idx];
        } else
        if(obj instanceof Enumeration) {
            Enumeration enume = (Enumeration)obj;
            while(enume.hasMoreElements()) {
                idx--;
                if(idx == -1) {
                    return enume.nextElement();
                } else {
                    enume.nextElement();
                }
            }
        } else
        if(obj instanceof Iterator) {
            Iterator iterator = (Iterator)obj;
            while(iterator.hasNext()) {
                idx--;
                if(idx == -1) {
                    return iterator.next();
                } else {
                    iterator.next();
                }
            }
        }
        return obj;
    }

    static public Iterator getIterator(Object obj) {
        if(obj instanceof Iterator) {
            return (Iterator)obj;
        } else
        if(obj instanceof Collection) {
            return ((Collection)obj).iterator();
        } else
        if(obj instanceof Object[]) {
            return Arrays.asList( (Object[])obj ).iterator();
        } else
        if(obj instanceof Enumeration) {
            return new EnumerationIterator( (Enumeration)obj );
        } else
        if(obj instanceof Map) {
            return ((Map)obj).values().iterator();
        } else {
            return null;
        }
    }

    static public Collection slice(Collection coll, int start, int end) {
        if(coll == null) {
            return null;
        }
        Iterator iterator = coll.iterator();
        Collection sub = cloneNewEmptyCollection(coll);
        end -= start;
        while(iterator.hasNext()) {
            if(start == 0) {
                if(end == 0) {
                    break;
                } else {
                    sub.add(iterator.next());
                    end--;
                }
            } else {
                iterator.next();   // ignore
                start--;
            }
        }
        return sub;
    }

    // unimplemented 
    static public Collection cloneNewEmptyCollection(Collection coll) {
        return (Collection)ClassW.createObject(coll.getClass());
    }

    static public Map cloneNewEmptyMap(Map map) {
        return (Map)ClassW.createObject(map.getClass());
    }

    static public void reverseArray(Object[] array) {
        int i = 0;
        int j = array.length - 1;
        Object tmp;
        
        while(j>i) {
            tmp = array[j];
            array[j] = array[i];
            array[i] = tmp;
            j--;
            i++;
        }
    }

    /// TODO: Improve this, so it takes start and end and is a slice()
    static public String[] getSubArray(String[] ob, int idx) {
        if (idx > ob.length) {
            return new String[0];
        }
        String[] ob2 = new String[ob.length - idx];
        for (int i = idx; i < ob.length; i++) {
            ob2[i - idx] = ob[i];
        }
        return ob2;
    }

    static public Object[] iteratorToArray(Iterator iterator) {
        return iteratorToArray(iterator, new Object[0]);
    }

    static public Object[] iteratorToArray(Iterator iterator, Object[] type) {
        ArrayList list = new ArrayList();
        
        while(iterator.hasNext()) {
            list.add(iterator.next());
        }
        return list.toArray(type);
    }

}
