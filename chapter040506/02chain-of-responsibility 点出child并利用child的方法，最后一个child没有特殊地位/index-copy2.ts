import * as FS from "fs"
namespace jj{
    interface Request{
        type:"help" | "feedback"
    }
    type EventType = "help" | "feedback"

    interface IEvent{
        listeners:Function[],
        push(listener:Function):void,
        handle(reuest:Request):void,
        context:any,
    }

    interface IEventEmitter{
        events:{[type:string]:IEvent},
        on(type:EventType,listener:Function):void,
        emit(request:Request):void,
    }

    //------------------------------------------------//
    class Event implements IEvent{
        public listeners:Function[] = []
        constructor(
            public context:any//
        ){}

        push(listener:Function){
            this.listeners.push(listener)
        }

        handle(request:Request):void{
            this.listeners.forEach(listener=>{
                listener(request)
            })

            let successor = this.context.parent
            //点出同类并利用同类的方法，类似decorator-pattern
            if(successor){
                successor.emit(request)
            }
        }

    }
    class HelpEvent extends Event{}
    class FeedbackEvent extends Event{}

    class EventEmitter implements IEventEmitter{
        events:{
            [type:string]:Event
        } = {}

        private _getEventObject(type:string):Event{
            let eventClasses:{[type:string]:{new(context:any):Event}} = {
                "help":HelpEvent,
                "feedback":FeedbackEvent,
            }
            let event:Event;

            if(this.events[type]){
                event = this.events[type]
            }else{
                event = new eventClasses[type](this) 
                this.events[type] = event
            }

            return event
        }

        on(type:EventType,listener:Function):void{
            let event = this._getEventObject(type)

            event.push(listener)
        }

        emit(request:Request):void{
            let event = this._getEventObject(request.type)

            event.handle(request)
        }
    }
    class FileSystem extends EventEmitter{
        constructor(
            public path:string,
            public parent?:FileSystem,
        ){
            super()
            console.log(this.path)
        }
    }
    class Folder extends FileSystem{
        items : FileSystem[] 
        constructor(
            path:string,
            parent?:FileSystem
        ){
            super(path,parent)

            this.items = FS
            .readdirSync(this.path)
            .map((basename:string) =>{
                let path = this.path +basename
                let stats = FS.statSync(path);

                if(stats.isFile()){
                    return new File(path,this);
                }else{
                    return new Folder(path + "/",this)
                }
            })

        }
    }
    class File extends FileSystem{
        readAll():void{
            console.log('read:'+this.path)
            console.log(FS.readFileSync(this.path))
        }
    }

    let root = new Folder("C:/git/typescript-design-pattern(spring-2019-3)/chapter03 creational/")
    let folder= root.items[0] as Folder
    folder.items[0].on("help",()=>{
        console.log("File")
    })
    root.items[0].on("help",()=>{
        console.log("Folder")
    })
    folder.items[0].emit({type:"help"})
}