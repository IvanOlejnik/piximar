import State from './State.js';
export default class WalkingState extends State{
    constructor(name, mario, directionX) {
        super(name, mario); 
        this.directionX = directionX;
        this.speed = 6;
    }
   
    enter(){
        //this.walking_animation.play();
        if(this.directionX == "left") this.mario.x -= this.speed;
        if(this.directionX == "right") this.mario.x += this.speed;
    };
    
    exit() {
        //this.walking_animation.stop();
        this.mario.x += 0;
    };
    
    handle_input(command){     
        this.directionX = command.directionX;     
        if(command.name == "stop"){
            return "standing";
        }
        if(command.name == "jump"){
            return "jumping";
        }    
    };
}
