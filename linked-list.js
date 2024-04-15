class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    };
}

class LinkedList {
    constructor() {
        this.head = null; // (4)
        this.tail = null; // (5)
        this.length = 0;
    }

    // (1)
    append(value) {
        const endNode = new ListNode(value);
        if (this.length === 0) {
            this.head = endNode;
            this.tail = endNode;
        } else {
            this.tail.next = endNode;
            this.tail = endNode;
        }
        this.length++;
    }

    // (2)
    prepend(value) {
        const startNode = new ListNode(value);
        let currentHead = this.head;
        if (this.length === 0) {
            this.head = startNode;
            this.tail = startNode;
        } else {
            startNode.next = currentHead;
            this.head = startNode;
        }
        this.length++;
    }

    // (3)
    get size() {
        return this.length;
    }

    // (6)
    at(index) {
        if (index < 0 || index > this.length) {
            return null;
        }
        if (index === 0) {
            return this.head;
        }
        let currentNode = this.head;
        let i = 0;
        while (i < index) {
            i++;
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    // (7)
    pop() {
        if (this.length <= 0) {
            return null;
        }
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length--;
        }
        let currentNode = this.head;
        let secondTolastNode;
        for (let i = 0; i < this.length; i++) {
            if (currentNode.next == this.tail) {
                secondTolastNode = currentNode;
                secondTolastNode.next = null;
                this.tail = secondTolastNode;
                this.length--;
            } else {
                currentNode = currentNode.next;
            }
        }
    }

    // (8)
    contains(value) {
        if (this.length <= 0) {
            return null;
        }
        let currentNode = this.head;
        for (let i = 0; i < this.length; i++) {
            if (currentNode.value == value) {
                return true;
            } else {
                currentNode = currentNode.next;
                if (currentNode.next === null) {
                    return false;
            }}}    
    }

    // (9)
    find(value) {
        if (this.length <= 0) {
            return null;
        }
        let currentNode = this.head;
        for (let i = 0; i < this.length; i++) {
            if (currentNode.value == value) {
                let index = i;
                return index;
            } else {
                currentNode = currentNode.next;
                if (currentNode.next === null) {
                    return null;
            }}}
    }

    // (10)
    toString() {
        if (this.length <= 0) {
            return null;
        }
        let currentNode = this.head;
        let listAsString = '';
        for (let i = 0; i < this.length; i++) {
            if (currentNode.next === null) {
                listAsString += `( ${currentNode.value} )`
            } else {
            listAsString += `( ${currentNode.value} ) -> `
            currentNode = currentNode.next;
            }
        }
        return listAsString;
    }

    // (extra credit 1)
    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
        }
        if (index === this.length) {
            this.append(value);
        }
        if (index > this.length + 1) {
            return null;
        }
        let currentNode = this.head;
        for (let i = 0; i < this.length; i++) {
            if (i === index - 1) {
                let previousNode = currentNode;
                let nextNode = currentNode.next;
                const newNode = new ListNode(value);
                previousNode.next = newNode;
                newNode.next = nextNode;
                this.length++;
            }
            currentNode = currentNode.next;
        }
    }

    // (extra credit 2)
    removeAt(index) {
        let currentNode = this.head;
        if (index === 0) {
            this.head = this.head.next;
            this.length--;
        }
        for (let i = 0; i < this.length; i++) {
            if (i === index - 1) {
                let previousNode = currentNode;
                let nodeToDelete = currentNode.next;
                let nextNode = currentNode.next.next;
                previousNode.next = nextNode;
                this.length --;
            } else {
                currentNode = currentNode.next;
            }
        }
    }
}

export { ListNode, LinkedList }