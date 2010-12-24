package com.generationjava.io.xml;

import com.generationjava.io.WritingException;

public class XmlWritingException extends WritingException {

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
