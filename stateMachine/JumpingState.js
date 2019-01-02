import State from './State.js';
import Command from './Command.js';
import StateMachine from './StateMachine.js';
export default class JumpingState extends State{
    constructor(name, mario, directionX, directionY, posiotionY) {
        super(name, mario); 
        this.directionX = directionX;
        this.directionY = directionY;
        this.posiotionY = posiotionY;
        this.height = 150;
        this.speed = 6;
        this.bottom = 450;
    }
   
    enter(){
        //this.walking_animation.play();
        if(this.directionY == "top" ){
            this.mario.y -= this.speed;
            if(this.directionX == "left") this.mario.x -= this.speed;
            if(this.directionX == "right") this.mario.x += this.speed; 
            
            if( (this.posiotionY - this.height) >= this.mario.y ){
                this.directionY = "down" 
            }
        }
        if(this.directionY == "down"){
            this.mario.y += this.speed;
            if(this.directionX == "left") this.mario.x -= this.speed;
            if(this.directionX == "right") this.mario.x += this.speed;
            
            if(this.mario.y >= (this.bottom - this.mario.height / 2)){
                this.directionY = "fall";    
            }    
        }
    };
    
    exit() {
      //this.walking_animation.stop();
    };
    
    handle_input(command){
        this.directionX = command.directionX;
        this.directionY = command.directionY;
        this.posiotionY = command.posiotionY;
        if(command.name == "fall"){
            return "standing";
        }
    };
}
