// CascadedThrowable.java
package com.generationjava.lang;

import java.io.PrintStream;
import java.io.PrintWriter;

/**
 * An Exception which is being thrown on top of another
 * Throwable. That is, some code has caught an Exception 
 * and wishes to throw a different Exception upwards 
 * as a result. This class allows the original Exception
 * to still be accessible.
 */
public class CascadedException extends Exception {

    private Throwable wrappedThrowable;

    public CascadedException(String s) {
        super(s);
    }

    public CascadedException() {
        super();
    }
    
    public CascadedException(String s, Throwable t) {
        super(s);
        setWrappedThrowable(t);
    }
    public CascadedException(Throwable t) {
        super();
        setWrappedThrowable(t);
    }
    
    /**
     * Access the original exception.
     *
     * @return Throwable that was initially throw
     */
    public Throwable getWrappedThrowable() {
        return wrappedThrowable;
    }
    
    /**
     * Reset the original exception.
     *
     * @param t Throwable to be wrapped
     */
    public void setWrappedThrowable(Throwable t) {
        wrappedThrowable = t;   
    }

    public void printStackTrace() {
        super.printStackTrace();
        if(wrappedThrowable != null) {
            System.err.println("Cascaded Exception: "); // bad
            wrappedThrowable.printStackTrace();
        }
    }

    public void printStackTrace(PrintStream ps) {
        super.printStackTrace(ps);
        if(wrappedThrowable != null) {
            ps.println("Cascaded Exception: ");
            wrappedThrowable.printStackTrace(ps);
        }
    }

    public void printStackTrace(PrintWriter pw) {
        super.printStackTrace(pw);
        if(wrappedThrowable != null) {
            pw.println("Cascaded Exception: ");
            wrappedThrowable.printStackTrace(pw);
        }
    }

}
