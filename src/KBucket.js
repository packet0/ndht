"use strict";

class KBucket {
    constructor() {
        this._numNodes = 0;
        this._tailNode = null;
    }

    get length() {
        return this._numNodes;
    }

    /**
     *
     */
    *[Symbol.iterator]() {
        var current = this._tailNode;
        while(current !== null) {
            yield current.item;
            current = current.prev;
        }
    }

    /**
     * Add item to tail
     */
    push(item) {
        var newTail = new KBucketNode(item, this._tailNode);
        this._tailNode = newTail;
        this._numNodes += 1;
    }

    /**
     * Remove and return tail item
     */
    pop() {
        if(this._numNodes > 0) {
            var tail = this._tailNode;
            this._tailNode = tail.prev;
            this._numNodes -= 1;
            return tail.item;
        }
        return null;
    }

    /**
     * Returns tail item, without deleting
     */
    peek() {
        if(this._numNodes > 0) {
            return this._tailNode.item;
        }
        return null;
    }

    /**
     * Replaces tail item. Pushes item if length is 0.
     */
    replace(item) {
        if(this._numNodes > 0) {
            this._tailNode._item = item;
        } else {
            this.push(item);
        }
    }

    /**
     * Searches for item with compFunc and moves the node to tail and returns true if found.
     * compFunc: func that takes two args and returns true if two are equal
     */
    surface(item, compFunc) {
        if(this._numNodes > 0) {
            var current = this._tailNode;
            if(compFunc(item, current.item)) {
                return true;
            } else {
                while(current.prev !== null) {
                    if(compFunc(item, current.prev.item)) {
                        var foundNode = current.prev; //take found node
                        current._prev = foundNode.prev; //replace prev to skip the found node
                        foundNode._prev = this._tailNode; //set prev of found node to current tail
                        this._tailNode = foundNode; //place found node in tail;
                        return true;
                    }
                    current = current.prev;
                }
            }
        }
        return false;
    }
}

class KBucketNode {
    constructor(item, prev) {
        this._item = item;
        this._prev = prev;
    }

    get prev() {
        return this._prev;
    }

    get item() {
        return this._item;
    }
}
