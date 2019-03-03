interface Array<T> {
    plainIterator: j.PlainIterator<T>
}
namespace j {
    // 普通Iterator
    export interface PlainIterator<T> {
        first(): void;
        next(): void;
        end: boolean;
        index: Number;
        item: T;
    }

    class ArrayPainIterator<T> implements PlainIterator<T>{
        index = 0;
        constructor(
            //原来array只有数据，没有方法
            //Iterator就是数据结构的按目的分类的方法集合。
            // 每种数据结构都有各种目的的方法集合，也就有各种Iterator
            public array: T[]
        ) { }

        first(): void {
            this.index = 0
        }

        next(): void {
            this.index++;
        }

        get end(): boolean {
            return this.index >= this.array.length
        }

        get item(): T {
            return this.array[this.index]
        }
    }

    Object.defineProperty(Array.prototype, "plainIterator", {
        get() {
            return new ArrayPainIterator(this)
        }
    })

    let test = [14, 13, 12, 11, 10]
    let arrayPlainIterator = test.plainIterator
    for(let i=0 ;i<test.length;i++){
        console.log(arrayPlainIterator.item)
        arrayPlainIterator.next()
    }
}

namespace jj {
    interface IteratorResult<T> {
        done: boolean;
        value: T
    }

    interface Iterator<T> {
        next(value?: any): IteratorResult<T>;
    }

    interface Iterable<T> {
        [Symbol.iterator](): Iterator<T>;
    }

    class ReverseIterator<T> implements Iterator<T>{
        index: number;
        constructor(
            public array: T[]
        ) {
            this.index = array.length - 1
        }

        next(): IteratorResult<T> {
            if (this.index < 0) {
                return {
                    value: undefined,
                    done: true,
                }
            } else {
                return {
                    value: this.array[this.index--],
                    done: false,
                }
            }
        }
    }
    //-----------------------------//
    // Array.prototype[Symbol.iterator] = function (){
    //     return new ReverseIterator(this) as any
    // }
    // let test = [1,999]
    // for(let i of test){
    //     console.log(i)
    // }
    //-------------------------------------//
    class CustomArray<T>{
        // array:T[];
        constructor(
            public array: T[]
        ) { }

        [Symbol.iterator]() {
            return new ReverseIterator<T>(this.array)
        }
    }
    let customArray = new CustomArray([1, 2, 3, 4, 5])
    for (let result of customArray) {
        console.log(result)
    }

}







