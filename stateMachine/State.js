export default class State {
    constructor(name, mario) {
        this.name = name;
        this.mario = mario;
    }
   
    enter(){};
    exit(){};
    handle_input(){
         return this.name;
    };
}
