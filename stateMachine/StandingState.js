import State from './State.js';
export default class StandingState extends State{
   constructor(name, mario) {
       super(name, mario);
    }
   
    enter(){};
    
    exit() {};
    
    handle_input(command){ 
        if(command.name == "left" || command.name == "right"){
            return "walking";
        }
        if(command.name == "jump"){
            return "jumping";
        }
      
    };
}
