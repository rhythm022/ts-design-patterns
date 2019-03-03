namespace Visi {
    interface Element {
        render(visitor: Visitor): void
    }

    interface Visitor {
        output: String;
        drawText(text: TextElement): void;
        drawBold(text: BoldTextElement): void;
        drawUnorderedList(text: UnorderedListElement): void;
        drawListItem(text: ListItemElement): void;
    }

//---------------------------------------------------------------------//


    //visitor类似于toolkit
    class HTMLVisitor implements Visitor {
        output = '';//小升级this.output

        drawText(text: TextElement) {
            this.output += text.content
        }

        drawBold(text: BoldTextElement) {
            this.output += `<b>${text.content}</b>`
        }

        drawUnorderedList(list: UnorderedListElement) {
            this.output += "<ul>"

            for (let item of list.items) {
                item.render(this)
            }

            this.output += "</ul>"
        }

        drawListItem(item: ListItemElement) {
            this.output += `<li>${item.content}</li>`
        }
    }

    class TextElement implements Element {
        constructor(
            public content: string
        ) { }

        render(visitor: Visitor): void {
            visitor.drawText(this)
        }
    }

    class BoldTextElement implements Element {
        constructor(
            public content: string,
        ) { }

        render(visitor: Visitor): void {
            visitor.drawBold(this)
        }
    }

    class UnorderedListElement implements Element {
        constructor(
            public items: ListItemElement[]
        ) { }

        render(visitor: Visitor): void {
            visitor.drawUnorderedList(this)
        }
    }

    class ListItemElement implements Element {
        constructor(
            public content: string
        ) { }
        render(visitor: Visitor): void {
            visitor.drawListItem(this)
        }
    }
    
    let htmlVisitor = new HTMLVisitor()

    let elements = [
        new TextElement("Hi "),
        new BoldTextElement("Hi "),
        new UnorderedListElement([
            new ListItemElement("W"),
            new ListItemElement("c"),
            new ListItemElement("y"),
        ]),
    ]

    for (let element of elements) {
        element.render(htmlVisitor)
    }

    console.log(htmlVisitor.output)
}