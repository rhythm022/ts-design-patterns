import { EventEmitter } from "events";

//类似于一个包
//类似于MVC中Model层，隐藏Data而暴露操作Data的方法
interface ILeg{
    thigh:Thigh,
    shank:Shank,
    foot:Foot,

    motionController:MotionController,
    feedbackController:FeedbackController,
}
//client
interface IRobot{
    leftLegMotion:IMotionController,
    rightLegMotion:IMotionController,
    leftFootFeedback:IFeedbackController,
    rightFootFeedback:IFeedbackController,

    walk(steps:number):void,
    jump(strengh:number):void,
}
//操作Data的方法
interface IMotionController{
    leg:ILeg,
    setAngle(angle:number):void,
}
interface IFeedbackController{
    foot:Foot,
    //some ControlMethod
}




//---------------------------------------//

class Thigh{}
class Shank{}
class Foot{}

class MotionController implements IMotionController{
    constructor(
        public leg:Leg,
    ){}

    setAngle(angle:number):void{
        let {
            thigh,
            shank,
            foot
        } = this.leg

        //...
    }
}

class FeedbackController extends EventEmitter implements IFeedbackController{
    constructor(
        public foot:Foot,
    ){
        super();
    }
}

class Leg implements ILeg{
    thigh = new Thigh();
    shank = new Shank();
    foot = new Foot();
    motionController = new MotionController(this);
    feedbackController = new FeedbackController(this.foot);

    constructor(){
        this.feedbackController.on("touch",()=>{})
    }
}
//facade-pattern,隐藏leg的同时暴露控制腿的方法。
class Robot implements IRobot{
    leftLegMotion:MotionController;
    rightLegMotion:MotionController;
    
    leftFootFeedback:FeedbackController;
    rightFootFeedback:FeedbackController;
    constructor(){
        this.leftLegMotion = new Leg().motionController;
        this.leftFootFeedback = new Leg().feedbackController;

        this.rightLegMotion = new Leg().motionController;
        this.rightFootFeedback = new Leg().feedbackController;
        
    }
    walk(steps:number):void{}
    jump(strengh:number):void{}
}