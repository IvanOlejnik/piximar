export default class Command {
    constructor(name, properties) {
        var property;
        this.name = name;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                this[property] = properties[property];
            }
        }   
    }
};
