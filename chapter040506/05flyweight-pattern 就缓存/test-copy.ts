namespace jwjw {
    function getRandomInteger(max: number): number {
        return Math.floor(Math.random() * max)
    }
    class Image {//占内存的对象
        constructor(
            public url: string,
        ) { }
    }
    //有一些对象，又占内存又stateless
    //让这种对象处在flyweight的模式中被使用，可以避免重复生成相同特征的不同对象。
    class Snowflake {
        image: Image;
        constructor(
            public style: string,
        ) {
            this.image = new Image(style + ".png")
        }
        render(x: number, y: number, angle: number): void { }//
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;

    //flyweight-pattern的core
    class FlyweightFactory {
        cache: { [style: string]: any } = {}
        constructor(
            public Flyweight:any
        ){}
        
        get(style: string): any {
            let cache = this.cache
            if(hasOwnProperty.call(cache, style)){
                return cache[style]
            }

            cache[style] = new this.Flyweight(style)
            return cache[style]
        }
    }


    class Sky{
        constructor(
            public width:number,
            public height:number,
            public factory = new FlyweightFactory(Snowflake),
        ){}
       
        //从new Sky(20,20,) ,new SnowflakeFactory().get(~)到new Snowflake(~) ,new Image(~)
        snow(SNOW_STYLES,count:number){
            let sytleCounts = SNOW_STYLES.length

            for(let i=0;i<count;i++){
                let style = SNOW_STYLES[getRandomInteger(sytleCounts)]
                let snowflake = this.factory.get(style);//

                let x = getRandomInteger(this.width)
                let y = getRandomInteger(this.height)
                let angle = getRandomInteger(60)

                snowflake.render(x,y,angle)//
            }
        }
    }
    let sky = new Sky(5,5)
    sky.snow( ["A","B","C"],1000)
}