package com.generationjava.io;

import com.generationjava.lang.CascadedException;

public class WritingException extends CascadedException {

    public WritingException() {
        super();
    }

    public WritingException(String message) {
        super(message);
    }

    public WritingException(Throwable t) {
        super(t);
    }

    public WritingException(String message, Throwable t) {
        super(message, t);
    }
}
