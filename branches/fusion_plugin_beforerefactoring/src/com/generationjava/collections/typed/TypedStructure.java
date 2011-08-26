package com.generationjava.collections.typed;

import java.util.Collection;

/**
 * A structure which only allows contents of a particular type.
 */
public interface TypedStructure {

    public void checkType(Object obj) throws IllegalTypeException;
    public void checkType(Collection coll) throws IllegalTypeException;

    public void setType(Class type);
    public Class getType();

}
