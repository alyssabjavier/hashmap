function outOfRangeError(index, buckets) {
    if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
}

class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class HashMap {
    constructor() {
        this.buckets = new Array(16);
    }

    dropInBucket(Pair) {
        let index = this.hash(Pair.key);
        outOfRangeError(index, this.buckets);
        this.buckets[index] = Pair;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }
     
        return hashCode;
      }      
}

const myMap = new HashMap;
console.log(myMap);

const me = new Pair('Alyssa', 'student');
console.log(myMap.hash('Alyssa'));
const gian = new Pair('Gian', 'lawyer');
console.log(myMap.hash('Gian'));
const yoshi = new Pair('Yoshi', 'dog');
console.log(myMap.hash('Yoshi'));
const rongel = new Pair('Rongel', 'consultant')
const joy = new Pair('Joy', 'teacher');
// const clover = new Pair('Clover', 'also a dog');

myMap.dropInBucket(me);
myMap.dropInBucket(gian);
myMap.dropInBucket(yoshi);
myMap.dropInBucket(rongel);
myMap.dropInBucket(joy);
// myMap.dropInBucket(clover);
console.log(myMap);