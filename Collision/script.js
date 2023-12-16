const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas_width = 700;
canvas_height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();


class Explosion{
    constructor(x,y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth *0.3;
        this.height = this.spriteHeight* 0.3;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timmer = 0;
        this.angle = Math.random()*6.2; // 360 degree 6.2 rad
        this.sound = new Audio();
        this.sound.src = 'pop_.mp3';
    }

    update(){
        if(this.frame == 0) this.sound.play();
        this.timmer++;
        if(this.timmer%10 == 0){
            this.frame++;
        }
    }

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, this.spriteWidth*this.frame, 0, this.spriteWidth, this.spriteHeight, 0-this.width/2, 0-this.height/2, this.width, this.height);
        ctx.restore();
    }
}

window.addEventListener('click', function(e){
   let posX = e.x - canvasPosition.left;
   let posY = e.y - canvasPosition.top;
   explosions.push(new Explosion(posX, posY));
});

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
  for(let i=0; i < explosions.length; i++){
    explosions[i].update();
    explosions[i].draw();
    if(explosions[i].frame > 5){
        explosions.splice(i,1);
        i--;
    }
  }  
  requestAnimationFrame(animate);
}
animate();