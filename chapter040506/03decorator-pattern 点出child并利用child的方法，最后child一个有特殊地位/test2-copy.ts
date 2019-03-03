namespace jjj {
    //能点出同类并利用同类的方法拓展自己的方法，即decorator-pattern
    interface ITextComponent {
        texts: Text[],
        draw(): void,
    }
    interface ITextComponentDecorator extends ITextComponent {
        previous: ITextComponent | ITextComponentDecorator,
    }
    //---------------------------------------------//
    class Text {
        constructor(
            public content: string
        ) { }
        setColor(color: string): void { }
        setFont(font: string): void { }

        draw(): void { }
    }

    class TextComponent implements ITextComponent {
        constructor(
            public texts: Text[]
        ) { }

        draw(): void {
            for (let text of this.texts) {
                text.draw()
            }
        }
    }



    //①被装饰的原接口应早已定义。
    //②定义装饰器接口，装饰器接口继承被装饰的原接口，二:拥有属性能点出同类、子节点。
    //实现装饰器接口的抽象类，实现如下：
    abstract class TextComponentDecorator implements ITextComponentDecorator {
        constructor(
            public previous: ITextComponent | ITextComponentDecorator
        ) { }
        get texts(): Text[] {
            return this.previous.texts
        }
        abstract draw():void
    }

    class ColorDecorator extends TextComponentDecorator {
        constructor(
            previous: ITextComponent | ITextComponentDecorator,

            public color: string,
        ) {
            super(previous)
        }
        draw(): void {
            for (let text of this.texts) {
                text.setColor(this.color)
            }

            this.previous.draw()
        }
    }

    class FontDecorator extends TextComponentDecorator {
        constructor(
            previous: ITextComponent | ITextComponentDecorator,

            public font: string,
        ) {
            super(previous)
        }

        draw(): void {
            for (let text of this.texts) {
                text.setFont(this.font)
            }

            this.previous.draw()
        }
    }

    let decoratedComponent = new FontDecorator(
        new ColorDecorator(
            new TextComponent([
                new Text("1")
            ]),
            "red",
        ),
        "sans-serif"
    )












}