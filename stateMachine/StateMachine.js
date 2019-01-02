import Command from './Command.js';
export default class StateMachine {
    constructor() {
        this.states = {};
    }
   
    add_state(state_name, state) {
        this.states[state_name] = state;
    };
    
    set_initial_state(state_name) {
        this.current_state = this.states[state_name];
        this.current_state.enter();
    };
    
    handle_input(command){
        
         /** 
        var next_state;
        next_state = this.current_state.handle_input(command);
      
       if (next_state && next_state !== this.current_state.name) {
           this.current_state.exit();
           this.current_state = this.states[next_state];
           this.current_state.enter();
       }
          **/
        if(this.current_state.name == "jumping"){  
            if(command.name == "left"){
                this.current_state = this.states["jumping"];
                this.current_state.directionX = "left";
            }
            if(command.name == "right"){
                this.current_state = this.states["jumping"];
                this.current_state.directionX = "right";
            } 
            if(command.name == "stop"){
                this.current_state.directionX = "fall";
            } 
            if( this.current_state.directionY == "fall"){
                this.current_state = this.states["standing"];
            }
        }
        
        if(this.current_state.name == "walking"){        
            if(command.name == "left"){
                this.current_state = this.states["walking"];
                this.current_state.directionX = "left";
            }
            if(command.name == "right"){
                this.current_state = this.states["walking"];
                this.current_state.directionX = "right";
            } 
            if(command.name == "jump"){
                this.current_state = this.states["jumping"];
                this.current_state.directionY = command.directionY;
                this.current_state.directionX = "fall";
                this.current_state.posiotionY = command.positionY;
            }
            if(command.name == "stop"){
               this.current_state = this.states["standing"];
            }
        }
        
        if(this.current_state.name == "standing"){ 
            if(command.name == "left"){
                this.current_state = this.states["walking"];
                this.current_state.directionX = "left";
            }
            if(command.name == "right"){
                this.current_state = this.states["walking"];
                this.current_state.directionX = "right";
            } 
            if(command.name == "jump"){
                this.current_state = this.states["jumping"];
                this.current_state.directionY = command.directionY;
                this.current_state.directionX = "fall";
                this.current_state.posiotionY = command.positionY;
            }
        }
    };
}
