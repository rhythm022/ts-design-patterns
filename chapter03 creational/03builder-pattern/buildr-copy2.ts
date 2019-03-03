namespace j {
    interface Rocket {
        payload: Payload;
    }

    interface Payload {
        weight: number;
    }

    interface Stage {
        engines: Engine[]
    }

    class Engine {
        constructor(
            public thrust: number,
        ) { }
    }



    //-----------------------------------------------//



    abstract class RocketBuilder {
        createRocket(): void { }

        addPayload(payload: Payload): void { }

        addStages(): void { }

        refuelRocket(): void { }

        get rocket(): Rocket {
            throw new Error("not implemented")
        }
    }

    class Director {
        //builder是一个visitor
        prepareRocket(builder: RocketBuilder, payload: Payload): Rocket {
            builder.createRocket();
            builder.addPayload(payload)
            builder.addStages()
            builder.refuelRocket();
            return builder.rocket;
        }
    }


    //-----------------------------------------//

    //对象类，即带属性或接口
    class PlainRocket implements Rocket {
        payload: Probe;
        engine: SolidEngine;
    }

    class Probe implements Payload {
        constructor(
            public weight: number
        ) { }
    }

    class SolidEngine extends Engine { }

    //方法类，strategy，toolkit，state其一
    class PlainRocketBuilder extends RocketBuilder {
        private buildingRocket: PlainRocket

        createRocket(): void {
            this.buildingRocket = new PlainRocket()
        }

        addPayload(probe: Probe): void {
            this.buildingRocket.payload = probe
        }

        addStages(): void {
            let payload = this.buildingRocket.payload;

            this.buildingRocket.engine = new SolidEngine(payload.weight)
        }

        get rocket(): PlainRocket {
            return this.buildingRocket
        }
    }

    let director = new Director()//对象类(creational)
    let plainRocketBuilder = new PlainRocketBuilder()//方法类
    director.prepareRocket(plainRocketBuilder, new Probe(100))//

    plainRocketBuilder.rocket



    //--------------------------------------------//
    class LiquidRocket implements Rocket {
        payload: Satellite;
        stages:LiquidRocketStages = [] as LiquidRocketStages;
    }
    type LiquidRocketStages = [FirstLiquidStage, SecondLiquidStage]

    abstract class LiquidStage implements Stage {
        engines: LiquidEngine[] = []
        //refuel
        refuel(level = 100): void {
            for (let engine of this.engines) {
                engine.refuel(level)
            }
        }
    }

    class FirstLiquidStage extends LiquidStage {
        constructor(totalThrust: number) {
            super()

            let enginesNumber = 4;
            let singleEngineThrust = totalThrust / enginesNumber;

            for (let i = 0; i < enginesNumber; i++) {
                this.engines.push(new LiquidEngine(singleEngineThrust))
            }
        }
    }

    class SecondLiquidStage extends LiquidStage {
        constructor(thrust) {
            super();
            this.engines.push(new LiquidEngine(thrust))
        }
    }

    class Satellite implements Payload {
        constructor(
            public weight: number,
            public id: number,
        ) { }
    }

    class LiquidEngine extends Engine {
        fuelLevel = 0;
        //refuel
        refuel(level: number): void {
            this.fuelLevel = level
        }
    }





    class LiquidRocketBuilder extends RocketBuilder {//方法类
        private buildingRocket: LiquidRocket;

        createRocket(): void {
            this.buildingRocket = new LiquidRocket();//对象类
        }
        //☆☆☆☆☆火箭的接口就定义了payload和stages，所以builder只负责这俩
        addPayload(satellite: Satellite): void {
            this.buildingRocket.payload = satellite;
        }
        addStages(): void {
            let rocket = this.buildingRocket;
            let payload = rocket.payload;
            let stages = rocket.stages;

            stages[0] = new FirstLiquidStage(payload.weight)

            if (payload.weight >= LiquidRocketBuilder.oneStageMax) {
                stages[1] = new SecondLiquidStage(payload.weight)
            }
        }
        //refuel
        refuelRocket(): void {
            let rocket = this.buildingRocket;
            let payload = rocket.payload;
            let stages = rocket.stages;

            let oneMax = LiquidRocketBuilder.oneStageMax
            let twoMax = LiquidRocketBuilder.twoStageMax
            //refuel
            stages[0].refuel(Math.min(payload.weight, oneMax) / oneMax * 100)

            if (payload.weight >= LiquidRocketBuilder.oneStageMax) {
                stages[1].refuel((payload.weight - oneMax) / (twoMax - oneMax) * 100)
            }
        }

        get rocket(): LiquidRocket {
            return this.buildingRocket
        }

        static oneStageMax = 1000;
        static twoStageMax = 1000;

    }





    //-----------------------------------------------//
    let liquidRocketBuilder = new LiquidRocketBuilder()//方法类
    director.prepareRocket(liquidRocketBuilder, new Satellite(100, 1))//对象类
    liquidRocketBuilder.rocket

}
