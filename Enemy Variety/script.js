document.addEventListener('load', runIt())

function runIt(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas_width = 1200;
    canvas_height = 700;

    class Game {
        constructor(ctx, width , height) {
            this.enemies = [];
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
            this.enemyTypes = ['worm', 'ghost', 'spider']
        }

        update(deltaTime) {
            this.enemies = this.enemies.filter(object => !object.markedForDeletion)
            if(this.enemyTimer > this.enemyInterval){
                this.#addNewEnemy();
                this.enemyTimer = 0;
                console.log(this.enemies);
            }
            else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(object => object.update(deltaTime));
        }

        draw() {
            this.enemies.forEach(object => object.draw(this.ctx));
        }
        //private class method - cant acces from other than game class
        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if(randomEnemy == 'worm')
             this.enemies.push(new Worm(this));
            else if(randomEnemy == 'ghost')
             this.enemies.push(new Ghost(this));
            else
             this.enemies.push(new Spider(this));

            // this.enemies.sort(function(a,b){ return a.y- b.y})
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            // console.log(this.game);
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = 25;
            this.height = 25;
            this.markedForDeletion = false;
            this.frameX = 0;
            this.maxFrame = 5;
            this.frameIntervel = 100;
            this.frameTimer = 0;
        }

        update(deltaTime) {
            this.x -= this.vx * deltaTime;
            if(this.x < 0 - this.width) this.markedForDeletion = true;
            if(this.frameTimer > this.frameIntervel){
                if(this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;
                this.frameTimer = 0;
            }
            else{
                this.frameTimer += deltaTime;
            }
        }

        draw(ctx) {
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.spriteWidth * this.frameX,0 , this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy{
        constructor(game){
            super(game);// run constructor on parent
            this.image = worm;
            this.x = this.game.width;
            this.y = this.game.height - this.height;
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth/6;
            this.height = this.spriteHeight/6;
            this.vx = Math.random()* 0.1 + 0.1;
        }
    }

    class Ghost extends Enemy{
        constructor(game){
            super(game);// run constructor on parent
            this.image = ghost;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.4;
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth/7;
            this.height = this.spriteHeight/7;
            this.vx = Math.random()* 0.2 + 0.1;
            this.angle = 0;
            this.curve = Math.random() * 3;  
        }
        update(deltaTime){
           super.update(deltaTime);
           this.y += Math.sin(this.angle) * this.curve;
           this.angle += 0.02 ;
           if(this.y < 0 || this.y > this.game.height - this.height )
           this.y *= -1;
            
        }
        draw(ctx){
            ctx.globalAlpha = 0.9;
            super.draw(ctx); 
            ctx.globalAlpha = 1;

        }
    }

    class Spider extends Enemy{
        constructor(game){
            super(game);// run constructor on parent
            this.image = spider;
            this.x = Math.random() * (this.game.width - this.width);
            this.y = 0  - this.height;
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.width = this.spriteWidth/8;
            this.height = this.spriteHeight/8;
            this.vx = 0;
            this.vy = Math.random() * 0.09 + 0.02;
            this.maxLength = Math.random() * 30 + 30;
        }
        update(deltaTime){
            super.update(deltaTime);
            if(this.y < 0 - this.height * 2) this.markedForDeletion = true;
            this.y += this.vy * deltaTime;
            if(this.y > this.maxLength) this.vy *= -1
        }
        draw(ctx){
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2,0);
            ctx.lineTo(this.x + this.width/2, this.y);
            ctx.stroke();
            super.draw(ctx);

        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    
    let lastTime = 1;
    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    };
    animate(0);
}