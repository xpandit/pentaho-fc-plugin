package com.generationjava.lang;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.generationjava.collections.CollectionsW;

/**
 * A set of static utilities for use with Classes.
 *
 * @author bayard@generationjava.com
 * @date   2001-05-19
 */
final public class ClassW {

    /**
     * Create an object from the classname. Must have an empty constructor.
     *
     * @param classname String name of the class
     *
     * @return Object instance of the class or null
     */
    static public Object createObject(String classname) {
        Class tmpClass = null;

        tmpClass = getClass(classname);

        return createObject(tmpClass);
    }

    /**
     * Create an object from a class. 
     *
     * @param clss Class object to instantiate
     *
     * @return Object instance of the class or null
     */
    static public Object createObject(Class clss) {

        try {
            return clss.newInstance();
        } catch (IllegalAccessException  iae) {
            System.err.println("Cant instantiate " + clss.getName() + " because " +
                   iae.getMessage());
        } catch (InstantiationException  ie) {
            System.err.println("Cant instantiate " + clss.getName() + " because " +
                   ie.getMessage());
        }

        return null;
    }

    /**
     * Is this Class in the CLASSPATH
     *
     * @param classname String of the class
     *
     * @return boolean exists or not.
     */
    static public boolean classExists(String classname) {
        Class tmpClass = null;

        /* try and load class */
        try {
//            tmpClass = Class.forName(classname);
            tmpClass = Thread.currentThread().getContextClassLoader().loadClass(classname);
        } catch (ClassNotFoundException cnfe) {
            return false;
        } catch (IllegalArgumentException iae) {
            return false;
        }
     
        return true;   
    }

    /**
     * Get the Class object for a classname.
     *
     * @param classname String of the class
     *
     * @return Class instance for the class.
     */
    static public Class getClass(String classname) {
        Class tmpClass = null;

        /* try an load class */
        try {
//            tmpClass = Class.forName(classname);
            tmpClass = Thread.currentThread().getContextClassLoader().loadClass(classname);
        } catch (ClassNotFoundException cnfe) {
            System.err.println("Can not resolve classname " + classname);
        } catch (IllegalArgumentException iae) {
            System.err.println("Can nott resolve " + tmpClass.getName() + " because " + iae.getMessage());
        }
     
        return tmpClass;   
    }

    /**
     * Is this Class object an instance of the class with this name.
     *
     * @param clss Class instance
     * @param inst String name of potential supertype
     *
     * @return boolean was it an instanceof
     */
    static public boolean classInstanceOf(Class clss, String inst) {
        if(classImplements(clss,inst)) {
            return true;
        } else
        if(classExtends(clss,inst)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Does this Class implement an interface with this name.
     *
     * @param clss Class instance
     * @param exts String name of potential interface
     *
     * @return boolean was it an implementor
     */
    static public boolean classImplements(Class clss, String exts) {

      Class sprcls = clss;
      Class excls  = getClass(exts);

      while(sprcls != null) {
        Class[] interfaces = sprcls.getInterfaces();

        for(int i=0;i<interfaces.length;i++) {
            if(interfaces[i].equals(excls)) {
                return true;
            }
        }

        sprcls = sprcls.getSuperclass();
      }

      return false;
    }

    /**
     * Does this Class extend a superclass with this name.
     *
     * @param clss Class instance
     * @param exts String name of potential superclass
     *
     * @return boolean was it a superclass
     */
    static public boolean classExtends(Class clss, String exts) {
        if(clss == null) {
            return false;
        }
        if(clss.getName().equals(exts)) {
            return true;
        }
        Class sprcls = clss.getSuperclass();
        Class excls = getClass(exts);

//        while(! sprcls.equals(sprcls.getSuperclass()) ) {
        while( sprcls != null ) {
            if(sprcls.equals(excls)) {
                return true;
            }
            sprcls = sprcls.getSuperclass();
        }
        return false;
    }

    static public void callMain(String[] args) {
        callMain(args[0], CollectionsW.getSubArray(args, 1) );
    }
    static public void callMain(String classname, String[] args) {
        callStatic(classname, "main", new Class[] { String[].class }, new Object[] { args } );
    }
// figure out types from object args
   // static public void callStatic(String classname, String method, Object[] args) {
   // }
    /**
     * Runs a static method on a class.
     *
     * @param classname String name of class to invoke on.
     * @param method    String name of method to call.
     * @param args      Object[] arguments to method.
     */
    static public void callStatic(String classname, String methodName, 
                                  Class[] types, Object[] args) 
    {
        Class arg0 = getClass(classname);
        try {
            Method method = arg0.getMethod(methodName, types );
            method.invoke( null, args );
        } catch(NoSuchMethodException nsme) {
        } catch(IllegalAccessException iae) {
        } catch(InvocationTargetException ite) {
        }
    }

}
