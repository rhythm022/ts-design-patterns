namespace wcy {
    //方法类如command,strategy,toolkit,与数据地位一样。
    //方法类与数据互为对方的context
    
    //本例中，一个toolkit中的一组tool映射成一组拥有相同接口render的类。
    //tool即command
    interface Renderkit {
        drawBorder(): void;//可以没context
        drawImage(src: string): void;
        drawText(text: string): void;
    }
    
    abstract class UIElement {
        constructor(
            public toolkit: Renderkit
        ) { }
        abstract render(): void;
    }
    //----------------------------------------------------------------//
    class TextElement extends UIElement {
        constructor(
            toolkit: Renderkit,
            public text: string
        ) {
            super(toolkit)
        }

        render(): void {
            this.toolkit.drawText(this.text)
        }
    }

    class ImageElement extends UIElement{
        constructor(
            toolkit:Renderkit,
            public src:string,
        ){
            super(toolkit)
        }

        render():void{
            this.toolkit.drawImage(this.src)
        }
    }

    let rendertoolkit:Renderkit;
    //纯abstraction类，自身只带接口，需要传入数据和方法
    //纯abstraction类==桥。
    let imageElement = new ImageElement(rendertoolkit,"foo.jpg")
    let textElement = new TextElement(rendertoolkit,"love")
    let elements = [
        imageElement,
        textElement,
    ]
    for (let element of elements) {
        element.render()
    }
}