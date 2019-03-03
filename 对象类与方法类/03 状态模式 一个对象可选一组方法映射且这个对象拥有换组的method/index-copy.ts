interface State{
    render(hover:boolean):void;
    click():void
}

class Enabled implements State{
    constructor(
        public context:Context
    ){}

    render(hover:boolean):void{
        this
            .context
            .$element
            .removeClass("disabled")
            .toggleClass("hover",hover)
    }

    click():void{
        this.context.onclick()
    }
}

class Disabled implements State{
    constructor(
        public context:Context
    ){}

    render():void{
        this
            .context
            .$element
            .addClass("disabled")
            .removeClass("hover")
    }

    click():void{
        //Do nothing
    }
}

class Context{
    $element = $(document.createElement("DIV")).addClass("button")

    private enabled = new Enabled(this)
    private disabled = new Disabled(this)

    state:State = this.enabled;

    constructor(){
        this
            .$element
            .hover(
                ()=>this.render(true),
                ()=>this.render(false)
            )
            .click(
                ()=>this.click()
            )
        this.render(false)
    }
    onclick():void{
        console.log("I am clicked")
    }

    private render(hover:boolean):void{
        this.state.render(hover)
    }

    private click():void{
        this.state.click()
    }


}