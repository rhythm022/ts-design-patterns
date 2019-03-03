var j;
(function (j) {
    class ArrayPainIterator {
        constructor(
        //原来array只有数据，没有方法
        //Iterator就是数据结构的按目的分类的方法集合。
        // 每种数据结构都有各种目的的方法集合，也就有各种Iterator
        array) {
            this.array = array;
            this.index = 0;
        }
        first() {
            this.index = 0;
        }
        next() {
            this.index++;
        }
        get end() {
            return this.index >= this.array.length;
        }
        get item() {
            return this.array[this.index];
        }
    }
    Object.defineProperty(Array.prototype, "plainIterator", {
        get() {
            return new ArrayPainIterator(this);
        }
    });
    let test = [14, 13, 12, 11, 10];
    let arrayPlainIterator = test.plainIterator;
    for (let i = 0; i < test.length; i++) {
        console.log(arrayPlainIterator.item);
        arrayPlainIterator.next();
    }
})(j || (j = {}));
var jj;
(function (jj) {
    class ReverseIterator {
        constructor(array) {
            this.array = array;
            this.index = array.length - 1;
        }
        next() {
            if (this.index < 0) {
                return {
                    value: undefined,
                    done: true,
                };
            }
            else {
                return {
                    value: this.array[this.index--],
                    done: false,
                };
            }
        }
    }
    Array.prototype[Symbol.iterator] = function () {
        return new ReverseIterator(this);
    };
    let test = [1, 999];
    for (let i of test) {
        console.log(i);
    }
    // class CustomArray<T>{
    //     // array:T[];
    //     constructor(
    //         public array: T[]
    //     ) { }
    //     [Symbol.iterator]() {
    //         return new ReverseIterator<T>(this.array)
    //     }
    // }
    // let customArray = new CustomArray([1, 2, 3, 4, 5])
    // for (let result of customArray) {
    //     console.log(result)
    // }
})(jj || (jj = {}));
