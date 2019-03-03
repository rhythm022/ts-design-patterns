interface Array<T> {
    iterator: j.Iterator<T>
}
namespace j {
    export interface Iterator<T> {
        first(): void;
        next(): void;
        end: boolean;
        item: T;
        index: number;
    }

    class ArrayIterator<T> implements Iterator<T>{
        index = 0;
        constructor(
            public array: T[]
        ) { }

        first(): void {
            this.index = 0
        }

        next(): void {
            this.index++
        }

        get end(): boolean {
            return this.index >= this.array.length;
        }

        get item(): T {
            return this.array[this.index]
        }
    }

    Object.defineProperty(Array.prototype, "iterator", {
        get() {
            return new ArrayIterator(this);
        }
    })
}

//------------------------------------//
namespace jj {
    interface IteratorResult<T> {
        done: boolean;
        value: T;
    }

    interface Iterator<T> {
        next(value?: any): IteratorResult<T>;
        return?(value?: any): IteratorResult<T>;
        throw?(e?: any): IteratorResult<T>;
    }

    interface Iterable<T> {
        [Symbol.iterator](): Iterator<T>;
    }

    class SomeData<T>{
        array: T[]
        [Symbol.iterator](){
            return new SomeIterator<T>(this.array)
        }
    }

    class SomeIterator<T> implements Iterator<T>{
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
                    value:this.array[this.index--],
                    done:false,
                }
            }
        }
    }
   
}