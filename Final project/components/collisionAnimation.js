export class CollisionAnimation{
    constructor(game,x,y){
        this.game = game;
        this.image = document.getElementById('collision');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0 ;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.sound = new Audio();
        this.sound.src = 'assets/sounds/death.wav';

    }

    draw(context){
        this.sound.volume=0.2;
        this.sound.play();
        context.drawImage(this.image , this.spriteWidth * this.frameX , 0 , this.spriteWidth, this.spriteHeight , this.x, this.y, this.width , this.height);
    }

    update(deltatime){
        this.x -= this.game.speed;
        if(this.frameTimer > this,this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        }
        else{
            this.frameTimer += deltatime;
        }


        if(this.frameX > this.maxFrame) 
            this.markedForDeletion = true;
    }
}