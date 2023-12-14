const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const dropdown = document.getElementById("animations");
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImg = new Image();
playerImg.src = "shadow_dog.png";
const spriteWidth = 575;// (5230/no of column)
const spriteHeight = 523; // (5230/ no of rows)
let gameFrame = 0
const staggerFrame = 4;
let playerState = 'idle';

const sprintAnimations = [];
const animationsStates = [
    {name : 'idle' , frame : 7},
    {name : 'jump' , frame : 7},
    {name : 'fall' , frame : 7},
    {name : 'run' , frame : 9},
    {name : 'dizzy' , frame : 11},
    {name : 'sit' , frame : 5},
    {name : 'roll' , frame : 7},
    {name : 'bite' , frame : 7},
    {name : 'ko' , frame : 12},
    {name : 'getHit' , frame : 4},
];



animationsStates.forEach( (state, index)=> {
    let frames = {
        loc : [],
    }

    for(let j = 0 ; j< state.frame ; j++){
        let positionX = j*spriteWidth;
        let positionY = index*spriteHeight;
        frames.loc.push({x : positionX, y : positionY});
    }

    sprintAnimations[state.name] = frames;
} )

console.log(sprintAnimations)

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrame)% sprintAnimations[playerState].loc.length;
    let frameX = spriteWidth*position;
    let frameY = sprintAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImg , frameX, frameY , spriteWidth, spriteHeight,   0 , 0, spriteWidth , spriteHeight);


    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

