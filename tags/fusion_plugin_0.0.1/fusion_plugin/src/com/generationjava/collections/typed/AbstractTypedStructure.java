package com.generationjava.collections.typed;

import java.util.Collection;
import java.util.Iterator;

/**
 * A structure that has a type. Provides methods to check the type.
 */
public class AbstractTypedStructure implements TypedStructure {

    private Class type = null;

    public void setType(Class type) {
        this.type = type;
    }
    
    public Class getType() {
        return this.type;
    }

    public void checkType(Object obj) throws IllegalTypeException {
        checkType(this.type, obj);
    }
    public void checkType(Class type, Object obj) throws IllegalTypeException {
        if(obj == null) {
            return;  // null is all types
        }
        
        if(!type.isInstance(obj)) {
            throw new IllegalTypeException(type, obj, "Object: "+obj+
                       " is of type "+obj.getClass()+" and not "+type+".");
        }
    }

    public void checkType(Collection coll) throws IllegalTypeException {
        checkType(this.type, coll);
    }
    public void checkType(Class type, Collection coll) throws IllegalTypeException {
        if(coll != null) {
            Iterator iterator = coll.iterator();
            while(iterator.hasNext()) {
                Object obj = iterator.next();
                if(obj != null) {
                    if(!type.isInstance(obj)) {
                        throw new IllegalTypeException(type, obj, "Collection: "+coll+
                               " contains an object, "+obj+" which is of type "+
                               obj.getClass()+" and not "+type+".");
                    }
                }                    
            }
        }
    }

}
