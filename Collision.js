export default class Collision {
   constructor(r1, r2, cntr = false) {
        this.r1 = r1;
        this.r2 = r2;
        this.cntr = cntr;
    }
    
    centerFigures(){
        if(this.cntr){
            this.r1.centerX = this.r1.x + this.r1.width / 2;
            this.r1.centerY = this.r1.y + this.r1.height / 2;
            this.r2.centerX = this.r2.x + this.r2.width / 2;
            this.r2.centerY = this.r2.y + this.r2.height / 2;
        } else {
            this.r1.centerX = this.r1.x;
            this.r1.centerY = this.r1.y;
            this.r2.centerX = this.r2.x;
            this.r2.centerY = this.r2.y;
        }   
    }
    
    calculationParameter(){
        this.r1.halfWidth = this.r1.width / 2;
        this.r1.halfHeight = this.r1.height / 2;
        this.r2.halfWidth = this.r2.width / 2;
        this.r2.halfHeight = this.r2.height / 2;

        this.vx = this.r1.centerX - this.r2.centerX;
        this.vy = this.r1.centerY - this.r2.centerY;

        this.combinedHalfWidths = this.r1.halfWidth + this.r2.halfWidth;
        this.combinedHalfHeights = this.r1.halfHeight + this.r2.halfHeight;
    }
    
    hitLet() {
        this.centerFigures();
        this.calculationParameter();

        if (Math.abs(this.vx) <= this.combinedHalfWidths) {
            if (Math.abs(this.vy) <= this.combinedHalfHeights) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    
    hitTopLet(){
        this.centerFigures();
        this.calculationParameter();
        
        if(this.vy < 0) {
            return true;
        } else {
            return false;
        }
    };

    hitIntersectionLet(){
        this.centerFigures();
        this.calculationParameter();

        this.combinedHalfHeights = this.combinedHalfHeights * 0.9;

        if (Math.abs(this.vy) <= this.combinedHalfHeights) { 
            return true;
        }    
    };
}