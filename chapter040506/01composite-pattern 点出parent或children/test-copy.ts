import * as PATH from 'path'
import * as FS from 'fs'
//能this.点出来的叫做接口,常常要求this中拥有某些接口

//某对象能点出同类，或被同类点出，即composite-pattern
//例如this.items,this.parent。

//动手设计混合模式：
//①定义component接口，component接口负责定义共享的方法和属性。实现component接口的类，应是抽象的。
//②定义composite接口，composite接口继承component接口，二:拥有属性能点出同类、子节点。
//③定义primitive接口，primitive接口继承component接口。

//共享的方法和属性
interface IFileOrFolder {
    path: string,
    basename: string,
}

//能点出同类的属性
interface IFolder extends IFileOrFolder {
    items: IFileOrFolder[],//②
}

//没有能点出同类的属性
interface IFile extends IFileOrFolder {
    // readAll(): Buffer,
}

//----------------------------------------------//
abstract class FileOrFolder implements IFileOrFolder {
    constructor(
        public path: string,
    ) { }

    get basename(): string {
        return PATH.basename(this.path);
    }

}

class Folder extends FileOrFolder implements IFolder {

    items: IFileOrFolder[]

    constructor(
        path: string,
    ) {
        super(path)

        this.items = FS
            .readdirSync(this.path)
            .map(basename => {
                let path = this.path + basename
                return new Folder(path)//recursion：嵌套调用自身
            })
    }

}

class File extends FileOrFolder implements IFile {
    readAll(): Buffer {
        return FS.readFileSync(this.path)
    }
}

let a = new Folder("C:/git/typescript-design-pattern(spring-2019-3)/chapter04/")
