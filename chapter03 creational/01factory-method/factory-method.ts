namespace AbstractFactory {
    class Engine {
        constructor(
            public thrust: number
        ) { }
    }

    interface Payload {
        weight: number;
    }
    
    interface Stage {
        engines: Engine[];
    }

    interface Rocket {
        payload: Payload;
        stages: Stage[];
    }
    //interface中的TRocket extends Rocket意味着由由实现该interface的class决定TRocket
    interface RocketFactory<TRocket extends Rocket> {
        createRocket(): TRocket;
        createPayload(): Payload;
        createStages(): Stage[];
    }
    
    class Client {
        //class中的TRocket extends Rocket意味着由argus决定TRocket
        buildRocket<TRocket extends Rocket>(factory: RocketFactory<TRocket>): TRocket {
            let rocket = factory.createRocket();
            
            rocket.payload = factory.createPayload();
            rocket.stages = factory.createStages();
            
            return rocket;
        }
    }
    
    // EXPERIMENTAL ROCKET FAMILY
    
    class ExperimentalPayload implements Payload {
        weight: number;
    }
    
    class ExperimentalRocketStage implements Stage {
        engines: Engine[];
    }
    
    class ExperimentalRocket implements Rocket {
        payload: ExperimentalPayload;
        stages: [ExperimentalRocketStage];
    }
    //
    // class ExperimentalRocketFactory implements RocketFactory<ExperimentalRocket> {
    class ExperimentalRocketFactory {
        createRocket(): ExperimentalRocket {
            return new ExperimentalRocket();
        }
        
        createPayload(): ExperimentalPayload {
            return new ExperimentalPayload();
        }
        
        createStages(): [ExperimentalRocketStage] {
            return [new ExperimentalRocketStage()];
        }
    }

    let client = new Client()
    client.buildRocket(new ExperimentalRocketFactory())
    
    // FREIGHT ROCKET FAMILY----------------------------------------------------//
    
    class Satellite implements Payload {
        constructor(
            public id: number,
            public weight: number
        ) { }
    }
    
    class FreightRocketFirstStage implements Stage {
        engines: Engine[];
    }
    
    class FreightRocketSecondStage implements Stage {
        engines: Engine[];
    }
    
    type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage];
    
    class FreightRocket implements Rocket {
        payload: Satellite;
        stages: FreightRocketStages;
    }
    
    class FreightRocketFactory implements RocketFactory<FreightRocket> {
        nextSatelliteId = 0;
        
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
}
