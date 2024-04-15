function outOfRangeError(index, buckets) {
    if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class HashMap {
    constructor() {
        this.buckets = new Array(16);
    }

    dropInBucket(Node) {
        let index = this.hash(Node.key);
        outOfRangeError(index, this.buckets);
        this.buckets[index] = Node;
    }

    // (1)
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }
     
        return hashCode;
      }

    // (2)
    set(key, value) {
        let index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = new Node(key, value);
        } else {
            let currentNode = this.buckets[index];
            while (currentNode) {
                if (currentNode.key == key) {
                    currentNode.value = value;
                    return currentNode;
                }
                if (!currentNode.next) {
                    currentNode.next = new Node(key, value)
                    return currentNode.next;
                }
                currentNode = currentNode.next;
            }
        }
    }

    // (3)
    get(key) {
        let index = this.hash(key)
        if (!this.buckets[index]) {
            return null;
        } else {
            let currentNode = this.buckets[index];
            while (currentNode) {
                if (currentNode.key == key) {
                    return currentNode.value;
                }
                if (!currentNode.next) {
                    return null;
                }
                currentNode = currentNode.next;
            }
        }
    }

    // (4)
    has(key) {
        let index = this.hash(key);
        if (!this.buckets[index]) {
            return false;
        } else {
            let currentNode = this.buckets[index];
            while (currentNode) {
                if (currentNode.key == key) {
                    return true;
                }
                if (!currentNode.next) {
                    return false;
                }
                currentNode = currentNode.next;
            }
        }
    }

    // (5)
    remove(key) {
        let index = this.hash(key);

        // if index is empty (no keys with that hash exists) => false
        if (!this.buckets[index]) {
            return false;

        } else { // if index has value (else)
            let currentNode = this.buckets[index];
            if (currentNode.key == key) { //if key matches
                this.buckets[index] = currentNode.next; // set to either null/undefined or next item in linked list
                return true;
            } else { // if key doesn't match which means further down
                while (currentNode.next) { //iterate through nodes @ linked list
                    if (currentNode.next.key == key) {
                        currentNode.next = currentNode.next.next;
                        return true;
                    }
                    currentNode = currentNode.next
                }
            }
            return false;
        }
    }

    // (6)
    length() {
        let counter = 0;
        this.buckets.forEach(item => {
            if (item) {
                counter++;
            }
            if (item.next) {
                counter++;
            }
        })
        return counter;
    }
}

const myMap = new HashMap;
console.log(myMap);

myMap.set('Alyssa', 'student');
myMap.set('Gian', 'lawyer');
myMap.set('Yoshi', 'dog');
myMap.set('Rongel', 'consultant')
myMap.set('Joy', 'teacher');
myMap.set('Joshlyn', 'analyst');
myMap.set('Alyssa', 'developer');
console.log(myMap)

myMap.set('Clover', 'also a dog');
console.log(myMap);

console.log(myMap.get('Alyssa'));
console.log(myMap.get('George'));
console.log(myMap.get('Clover'));

console.log(myMap.has('Alyssa'))
console.log(myMap.has('Clover'));
console.log(myMap.has('George'));

console.log(myMap.remove('George'));
// console.log(myMap.remove('Rongel'));
// console.log(myMap.remove('Clover'))
console.log(myMap.length());