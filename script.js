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

    handleArraySize() {
        let currentSize = this.buckets.length;
        if (this.length / currentSize > 0.75) {
            this.buckets.length = currentSize * 2;
        } else {
            return false;
        }
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
        this.handleArraySize();
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

    // 7
    clear() {
        this.buckets.forEach((item, index) => {
            this.buckets[index] = null; // set array item @ index directly instead of referencing "item"
        })
        return this.buckets;
    }

    // 8
    keys() {
        let keys = [];
        this.buckets.forEach(item => {
            while (item) {
                let itemKey = item.key;
                keys.push(itemKey);
                item = item.next;
            }
        });
        return keys;
    }

    // 9
    values() {
        let values = [];
        this.buckets.forEach(item => {
            while (item) {
                let itemValue = item.value;
                values.push(itemValue);
                item = item.next;
            }
        });
        return values;
    }

    // 10
    entries() {
        let entries = [];
        this.buckets.forEach(item => {
            while (item) {
                let entry = [];
                let itemKey = item.key;
                let itemValue = item.value;
                entry.push(itemKey);
                entry.push(itemValue);
                entries.push(entry);
                item = item.next;
            }
        })
        return entries;
    }
}

const myMap = new HashMap;
console.log(myMap);

myMap.set('Alyssa', 'student');
myMap.set('Gian', 'lawyer');
myMap.set('Yoshi', 'dog');
myMap.set('Rongel', 'consultant')
myMap.set('Joy', 'teacher');
myMap.set('Emmy', 'SE')
myMap.set('Dane', 'consultant');

myMap.set('Joshlyn', 'analyst');
myMap.set('Alyssa', 'developer');
console.log(myMap)

myMap.set('Clover', 'also a dog');
console.log(myMap);

console.log(myMap.get('Alyssa'));
console.log(myMap.get('George'));
console.log(myMap.get('Clover'));
console.log(myMap.get('Dane'));

console.log(myMap.has('Alyssa'))
console.log(myMap.has('Clover'));
console.log(myMap.has('George'));

console.log(myMap.remove('George'));
// console.log(myMap.remove('Emmy'));
// console.log(myMap.remove('Rongel'));
// console.log(myMap.remove('Clover'))
console.log(myMap.length());
console.log(myMap.keys());
console.log(myMap.values());

console.log(myMap)
console.log(myMap.entries());