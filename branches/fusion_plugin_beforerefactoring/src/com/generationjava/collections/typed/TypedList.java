// TypedList.java
package com.generationjava.collections.typed;

import java.util.List;
import java.util.LinkedList;
import java.util.Collection;
import java.util.Iterator;
import java.util.ListIterator;

/**
 * An implementation of Set that checks the entries are of the correct type.
 */
public class TypedList extends AbstractTypedStructure implements List {

    private List list = null;

    public TypedList(Class type) {
        setType(type);
        this.list = new LinkedList();
    }

    public TypedList(Class type, List list) {
        this(type);
        this.list = list;
    }
    
    public void add(int index, Object element) {
        checkType(element);
        list.add(index, element);
    }
    public boolean add(Object o) {
        checkType(o);
        return list.add(o);
    }
    public boolean addAll(Collection c) {
        checkType(c);
        return list.addAll(c);
    }
    public boolean addAll(int index, Collection c) {
        checkType(c);
        return list.addAll(index, c);
    }
    public void clear() {
        list.clear();
    }
    public boolean contains(Object o) {
        checkType(o);
        return list.contains(o);
    }
    public boolean containsAll(Collection c) {
        checkType(c);
        return list.containsAll(c);
    }
    public boolean equals(Object o) {
        return list.equals(o);
    }
    public Object get(int index) {
        return list.get(index);
    }
    public int hashCode() {
        return list.hashCode();
    }
    public int indexOf(Object o) {
        checkType(o);
        return list.indexOf(o);
    }
    public boolean isEmpty() {
        return list.isEmpty();
    }
    public Iterator iterator() {
        return list.iterator();
    }
    public int lastIndexOf(Object o) {
        checkType(o);
        return list.lastIndexOf(o);
    }
    public ListIterator listIterator() {
        return list.listIterator();
    }
    public ListIterator listIterator(int index) {
        return list.listIterator(index);
    }
    public Object remove(int index) {
        return list.remove(index);
    }
    public boolean remove(Object o) {
        checkType(o);
        return list.remove(o);
    }
    public boolean removeAll(Collection c) {
        checkType(c);
        return list.removeAll(c);
    }
    public boolean retainAll(Collection c) {
        checkType(c);
        return list.retainAll(c);
    }
    public Object set(int index, Object element) {
        checkType(element);
        return list.set(index, element);
    }
    public int size() {
        return list.size();
    }
    public List subList(int fromIndex, int toIndex) {
        return list.subList(fromIndex, toIndex);
    }
    public Object[] toArray() {
        return list.toArray();
    }
    public Object[] toArray(Object[] a) {
        return list.toArray(a);
    }
}
