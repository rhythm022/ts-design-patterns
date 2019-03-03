namespace jjj {
    interface Something { }

    interface IStating{
        object:Something,
        current:State,
    }
    
    interface IState{
        restore(object:Something):void,
    }
    interface IStore{
        states:State[],
        refresh():void;
        restore():void;
    }

    //------------------------------------------------//
    class State implements IState{
        private _state: Something;//☆☆☆
        constructor(input: Something) {
            this._state = Object.assign({} as Something, input)
        }

        //类似于handle
        restore(object: Something): void {
            Object.assign(object, this._state)
        }
    }

    //将指定对象的mutation转变成state的变化
    //为指定对象生成、使用state
    //这个类把Something隐藏了，把这Something Stating了
    class Stating implements IStating{
        constructor(
            public object: Something//☆☆☆
        ) { }

        get current(): State {
            return new State(this.object);
        }
        set current(state: State) {
            state.restore(this.object)
        }

    }

    class Store implements IStore{
        statingObj:Stating;
        // object:Something
        states: State[] = [];
        constructor(object: Something) {
            this.statingObj = new Stating(object)
            // this.object = object
        }

        refresh(): void {
            this.states.push(this.statingObj.current);
            // this.states.push(new State(this.object))
        }

        restore(): void {
            this.statingObj.current = this.states.pop()
            // this.states.pop().restore(this.object)
        }
    }

}