abstract class TextReader{
    async readAllText():Promise<string>{
        let bytes = await this.readAllBytes();
        let text = this.decodeBytes(bytes);

        return text

    }
    abstract async readAllBytes():Promise<Buffer>;

    abstract decodeBytes(bytes:Buffer):string;
}

abstract class AsciiTextReader extends TextReader{
    decodeBytes(bytes:Buffer):string{
        return bytes.toString("ascii")
    }
}

import * as FS from "fs";

class FileAsciiTextReader extends AsciiTextReader{
    constructor(
        public path:string
    ){
        super()
    }

    async readAllBytes():Promise<Buffer>{
        return new Promise<Buffer>((res,rej)=>{
            FS.readFile(this.path,(error,bytes)=>{
                if(error){
                    rej(error)
                }else{
                    res(bytes)
                }
            })
        })
    }
}

import * as request from "request"

class HttpAsciiTextReader extends AsciiTextReader{
    constructor(
        public url:string
    ){
        super()
    }

    async readAllBytes():Promise<Buffer>{
        return new Promise<Buffer>((res,rej)=>{
            request(this.url,{encoding:null},(error,bytes,body)=>{
                if(error){
                    rej(error)
                }else{
                    res(body)
                }
            })
        })
    }
}