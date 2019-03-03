namespace jj {


    class Engine {
        constructor(
            public thrust: number
        ) { }
    }

    interface Payload {
        weight: number
    }

    interface Stage {
        engines: Engine[]
    }

    //所有工厂的产品都有payload，stages，payload下有weight，
    //但不同工厂的产品的stages下是什么是不一定的//连个数都没有明确
    //但FreightRocketFactory的产品的payload下还有id//即只能规定至少有几个属性，不能规定完全所有的属性
    
    //虽然所有工厂有一模一样的工艺步骤client
    //工艺步骤是由不同产品中相同的节点属性决定的
    interface Rocket {
        payload: Payload;
        stages: Stage[]
    }

    //提供类似createRocket，createPayload方法的被称为工厂
    interface RocketFactory<TRocket extends Rocket> {
        createRocket(): TRocket;
        createPayload(): Payload;
        createStages(): Stage[]
    }

    //安排并调用这些createRocket，createPayload方法的被称为Client
    class Client {
        buildRocket<TRocket extends Rocket>(factory: RocketFactory<TRocket>): TRocket {
            let rocket = factory.createRocket();

            rocket.payload = factory.createPayload();
            rocket.stages = factory.createStages();

            return rocket
        }
    }

    class DefaultPayload implements Payload {
        weight: number;
    }

    class DefaultStage implements Stage {
        engines: Engine[]
    }

    class DefaultRocket implements Rocket {
        payload: DefaultPayload;
        stages: [DefaultStage]
    }

    class DefaultRocketFactory implements RocketFactory<DefaultRocket>{
        createRocket(): DefaultRocket {
            return new DefaultRocket()
        }

        createPayload(): DefaultPayload {
            return new DefaultPayload()
        }

        createStages(): [DefaultStage] {
            return [new DefaultStage()]
        }
    }
    //------------------------------------------//
    class Satellite implements Payload {
        constructor(
            public id: number,
            public weight: number,
        ) { }
    }

    class FreightRocketFirstStage implements Stage {
        engines: Engine[]
    }

    class FreightRocketSecondStage implements Stage {
        engines: Engine[]
    }

    type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage]

    class FreightRocket implements Rocket {
        payload: Satellite;
        stages: FreightRocketStages
    }

    class FreightRocketFactory implements RocketFactory<FreightRocket>{
        nextSatelliteId = 0
        createRocket(): FreightRocket {
            return new FreightRocket();
        }

        createPayload(): Satellite {
            return new Satellite(this.nextSatelliteId++, 100);
        }

        createStages(): FreightRocketStages {
            return [
                new FreightRocketFirstStage(),
                new FreightRocketSecondStage()
            ];
        }
    }
    let client = new Client()
    let rocket = client.buildRocket(new FreightRocketFactory())






















}