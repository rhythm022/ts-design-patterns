import { EventEmitter } from "events"//es2015

namespace j {
    class Observer extends EventEmitter {
        constructor(
            private context: any
        ) {
            super()
        }

        get(path: string): any {
            let identifiers = path.split('.')
            return this._get(identifiers)
        }
        _get(identifiers: string[]): any {
            let element = this.context

            for (let identifier of identifiers) {
                element = element[identifier]
            }

            return element
        }

        set(path: string, value: any): void {
            let identifiers = path.split('.')
            let lastIndex = identifiers.length - 1

            let element = this._get(identifiers.slice(0, lastIndex))

            element[identifiers[lastIndex]] = value;
            //Observer-pattern的core
            for (let i = identifiers.length; i > 0; i--) {
                let path = identifiers.slice(0, i).join('.')
                this.emit(path)
            }
        }

    }
    let test: any = {
        connected: false,
        loaded: false,
        foo: "abc",
        bar: { biu: {biuu:123} }
    }
    let testObserver = new Observer(test)
    testObserver.set('bar.biu', 456)

    testObserver.on("bar.biu", () => {
        // console.log("bar.biu被改了")
    })

    console.log(testObserver.get('bar.biu'))

    // let a = ''
    // var handler = {
    //     get:  (obj: any, prop: any):any =>{
    //         a += prop+'.'
    //         return typeof obj[prop] == 'number'|| 'string' ? obj[prop] :new Proxy(obj[prop],handler) 
    //     },

    // }
    // test = new Proxy(test, handler)

    // // console.log(test.bar.biu.biuu)
    // // console.log(a)
    // // console.log(Proxy instanceof test )
    // // console.log(Proxy instanceof test.bar)

}

