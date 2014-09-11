package com.generationjava.io.xml;

import com.generationjava.io.WritingException;

public class XmlWritingException extends WritingException {

    private static final long serialVersionUID = 1L;

    public XmlWritingException() {
        super();
    }

    public XmlWritingException(String message) {
        super(message);
    }

    public XmlWritingException(Throwable t) {
        super(t);
    }

    public XmlWritingException(String message, Throwable t) {
        super(message, t);
    }
}
