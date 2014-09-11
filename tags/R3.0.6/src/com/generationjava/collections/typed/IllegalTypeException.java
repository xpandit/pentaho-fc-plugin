package com.generationjava.collections.typed;

/**
 * A runtime exception. It declares that code has been found 
 * that is trying to pass an illegal type into a TypedStructure.
 */
public class IllegalTypeException extends RuntimeException {

    private Class type = null;
    private Object instance = null;

    public IllegalTypeException(Class type, Object instance) {
        super();
        this.type = type;
        this.instance = instance;
    }
    public IllegalTypeException(Class type, Object instance, String msg) {
        super(msg);
        this.type = type;
        this.instance = instance;
    }
    
    /**
     * The Type that was illegal.
     */
    public Class getType() {
        return this.type;
    }

}
