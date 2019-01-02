var PIXI = require('pixi.js');
var renderer = PIXI.autoDetectRenderer(800, 560);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var stage2 = new PIXI.Container();
var events = require('events');
var evn = new events();
var Mousetrap = require('mousetrap');

import StateMachine from './stateMachine/StateMachine.js';
import StandingState from './stateMachine/StandingState.js';
import WalkingState from './stateMachine/WalkingState.js';
import JumpingState from './stateMachine/JumpingState.js';
import Command from './stateMachine/Command.js';
import Collision from './Collision.js';

PIXI.loader 
    .add("mario", "images/mario.png")
    .add("background", "images/bgst.jpg")
    .add("land", "images/land.jpg")
    .add("rock", "images/rock.png")
    .add("marioClip", "images/marioClip2.png")
    .load(setup);
eventsList();
var mario, background, land, rock = [], rect;
var jamp = 150, bottom = 450, pos, background2, land2, run = 0, marioMove, scenFlag = 0;
var arrRockXYScen1 = [[300, false],[450, false],[600, 320],[660, 320]];
var arrRockXYScen2 = [[270, false],[410, 320],[470, 320],[660, false]];
var arrRockXYScen3 = [[270, false],[410, false],[470, false],[660, false]];

var arrRockXYScen = [
[[300, false],[450, false],[600, 320],[660, 320]],
[[270, false],[410, 320],[470, 320],[660, false]],
[[270, false],[410, false],[470, false],[660, false]]
];
var stateMachine = new StateMachine();
function setup() { 
    mario = new PIXI.Sprite(
        PIXI.loader.resources["mario"].texture
    );
    background = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["background"].texture, 1024, 1024
    );
    land = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["land"].texture, 1024, 110
    ); 
    
    rect = new PIXI.Rectangle(0, 0, 40, 50);
    var textureMove = PIXI.loader.resources["marioClip"].texture;
    textureMove.frame = rect;
    marioMove = new PIXI.Sprite(textureMove);
    
    land.position = {x: 0,y: bottom}
    background.position = {x: 0,y: -200}
    marioMove.position = {x: 150,y: bottom - marioMove.height / 2}
    marioMove.scale.set(1, 1);//размеры
    marioMove.anchor.set(0.5, 0.5);//середина изображения
    
    rock = createRock(arrRockXYScen1, rock);
    
    var style = {
        font : 'bold italic 36px Arial',
        fill : '#F7EDCA',
        stroke : '#4a1850',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6,
        wordWrap : true,
        wordWrapWidth : 440
    };

    var richText = new PIXI.Text('You win this game!! Cool!!!',style);
    richText.x = 30;
    richText.y = 180;

    stage2.addChild(richText);
    stage.addChild(background);
    stage.addChild(land);
    rock.map(addStage);//arrAdd
    stage.addChild(marioMove);

    stateMachine.add_state("standing", new StandingState("standing", marioMove));
    stateMachine.add_state("walking", new WalkingState("walking", marioMove, null));
    stateMachine.add_state("jumping", new JumpingState("jumping", marioMove, null, "top", 450));
    stateMachine.set_initial_state("standing");
    
    animationLoop();
}

keyboardСontrol(); 

function animationLoop() {//главная функция
    requestAnimationFrame(animationLoop); 
    stateMachine.current_state.enter();    
    if(stateMachine.current_state.name !== "standing"){
       runMario(); 
    }  
    background.tilePosition.x +=1; 
    gravity();
    rock.map(obstruction);
    renderer.render(stage);
    sceneSelection();
}

//События
function keyboardСontrol(){
    Mousetrap.bind('d', hendlerKeyDdown, 'keydown');
    Mousetrap.bind('d', hendlerKeyDup, 'keyup');
    Mousetrap.bind('a', hendlerKeyAdown, 'keydown');
    Mousetrap.bind('a', hendlerKeyAup, 'keyup');
    Mousetrap.bind('w', hendlerKeyW, 'keydown');
}

function hendlerKeyDdown() {
    stateMachine.handle_input(new Command("right", {directionX: "right"}));

}
function hendlerKeyDup() {
    stateMachine.handle_input(new Command("stop", {}));

}
function hendlerKeyAdown() {
   stateMachine.handle_input(new Command("left", {directionX: "left"}));
}
function hendlerKeyAup() {
    stateMachine.handle_input(new Command("stop", {}));
}
function hendlerKeyW() {
   let pos = marioMove.y;
   stateMachine.handle_input(new Command("jump", {directionY: "top", positionY: pos}));
}

function eventsList(){
    evn.on('collisionHeppend', collision);
    evn.on('nextScen', nextScen);
    evn.on('pastScen', pastScen);
    evn.on('thisScen', thisScen);
}
 
/////////Обработка коллизии/////////////
function obstruction(lett){
    collision = new Collision(marioMove, lett);
    if(collision.hitLet()){
        evn.emit('collisionHeppend', { lett: lett });
    }
}

function collision(e){
    if( collision.hitIntersectionLet(marioMove, e.lett) ){ 
        if(stateMachine.current_state.directionX == "right"){          
            stateMachine.handle_input(new Command("stop", {}));
            marioMove.x -=6;
        }
        if(stateMachine.current_state.directionX == "left") {   
            stateMachine.handle_input(new Command("stop", {}));
            marioMove.x +=6;
        }
    }
    if( collision.hitTopLet(marioMove, e.lett) ){
        stateMachine.current_state.directionY = "fall"
    } else {
        stateMachine.current_state.directionY = "down"
    }
}

//смена декораций
function sceneSelection(){
    if(scenFlag == 0){
        if(marioMove.x > 800) evn.emit('nextScen');
        if( (marioMove.x >= 0) && (marioMove.x <= 800) )  evn.emit('thisScen');
    }
    if(scenFlag == 1){
        if(marioMove.x > 800) evn.emit('nextScen');
        if(marioMove.x < 0) evn.emit('pastScen'); 
        if( (marioMove.x >= 0) && (marioMove.x <= 800) )  evn.emit('thisScen');
    }
    if(scenFlag == 2){
        if(marioMove.x > 800) evn.emit('nextScen');
        if(marioMove.x < 0) evn.emit('pastScen'); 
        if( (marioMove.x >= 0) && (marioMove.x <= 800) )  evn.emit('thisScen');
    }
    if(scenFlag == 3) renderer.render(stage2);
}

function nextScen(){
   scenFlag++;
   marioMove.x = 10;
   background.tilePosition.x =0;
}

function pastScen(){
    scenFlag--;
    marioMove.x = 790;
    background.tilePosition.x =0;
}

function thisScen(){
    rock = rockPosition(rock, arrRockXYScen[scenFlag]);
}


//Построение уровня
function createRock(arr, rock){
    rock = createRockSprite(arr.length);
    rock.map(anchorCentr);//arrAdd
   // rock = rockPosition(arr, rock);
    
    return rock;
}

function createRockSprite(col){
    var arr = [];
    for(let i=0; i<col; i++){
        arr[i] = new PIXI.extras.TilingSprite(
            PIXI.loader.resources["rock"].texture, 64, 64
        );
    }
    
    return arr;
}

function rockPosition(rock, arr){
    for(let i=0; i<rock.length; i++){
        if(arr[i]){
            rock[i].position = {
               x: arr[i][0],
               y: arr[i][1] == false ? (bottom - rock[i].height / 2) : arr[i][1]
            } 
        } else {
            rock[i].position = {
               x: -100,
               y: -100
            } 
        }  
    }
    
    return rock;
}


function anchorCentr(obj){
    obj.anchor.set(0.5, 0.5);
}

//Дополнительно
function gravity(){
   if( (stateMachine.current_state.name == "standing") && marioMove.y < (bottom - marioMove.height / 2)){ 
       stateMachine.handle_input(new Command("jump", {directionY: "down", positionY: pos}));
   }  
}

function runMario() {
   run++; 
   if(run == 7){
       run = 0;
       if(rect.x >=45*4) {
           rect.x = 0;
       }
       marioMove.texture.frame = rect;
       rect.x += 45; 
   }
}

function addStage(val){
    stage.addChild(val);
}