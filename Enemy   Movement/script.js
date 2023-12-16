/** @type {HTMLCanvasElement} */

function animateCanvas1() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    CANVAS_WIDTH = canvas.width = 300;
    CANVAS_HEIGHT = canvas.height = 700;
    const noOdEnemies = 5;
    const enemiesArray = [];
    let gameframe = 0;

    class Enemy {
        constructor() {
            this.image = new Image();
            this.image.src = 'enemies/enemy1.png';
            // this.speed = Math.random() * 4-2;
            this.spriteWidth = 293;
            this.spriteHeight = 155;
            this.height = this.spriteHeight / 2.5;
            this.width = this.spriteWidth / 2.5;
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            this.frame = 0;
            this.flapSpeed = Math.floor(Math.random() * 3 + 1);// between 1 and 4
        }
        update() {
            this.x += Math.random() * 10 - 5;
            this.y += Math.random() * 10 - 5;
            if (gameframe % this.flapSpeed == 0)
                this.frame > 4 ? this.frame = 0 : this.frame++;
        }
        draw() {
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    };

    for (let i = 0; i < noOdEnemies; i++) {
        enemiesArray.push(new Enemy());
    }

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        enemiesArray.map((enemy) => {
            enemy.draw();
            enemy.update();
        })
        gameframe++;
        requestAnimationFrame(animate);
    }
    animate();
}


function animateCanvas2() {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext("2d");
    CANVAS_WIDTH = canvas.width = 300;
    CANVAS_HEIGHT = canvas.height = 700;
    const noOdEnemies = 5;
    const enemiesArray = [];
    let gameframe = 0;

    class Enemy {
        constructor() {
            this.image = new Image();
            this.image.src = 'enemies/enemy2.png';
            this.speed = Math.random() * 4+1;
            this.spriteWidth = 266;
            this.spriteHeight = 188;
            this.height = this.spriteHeight / 2;
            this.width = this.spriteWidth / 2;
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            this.frame = 0;
            this.flapSpeed = Math.floor(Math.random() * 3 + 1);// between 1 and 4
            this.angle = Math.random()*2;
            this.angleSpeed = Math.random() * 0.2;
            this.curve = Math.random()*7;
        }
        update() {
            this.x -= this.speed;
            this.y += this.curve *Math.sin(this.angle);
            this.angle += this.angleSpeed;
            if(this.x + this.width < 0) this.x = canvas.width;
            if (gameframe % this.flapSpeed == 0)
                this.frame > 4 ? this.frame = 0 : this.frame++;
        }
        draw() {
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    };

    for (let i = 0; i < noOdEnemies; i++) {
        enemiesArray.push(new Enemy());
    }

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        enemiesArray.map((enemy) => {
            enemy.draw();
            enemy.update();
        })
        gameframe++;
        requestAnimationFrame(animate);
    }
    animate();
}


function animateCanvas3() {
    const canvas = document.getElementById("canvas3");
    const ctx = canvas.getContext("2d");
    CANVAS_WIDTH = canvas.width = 300;
    CANVAS_HEIGHT = canvas.height = 700;
    const noOdEnemies = 5;
    const enemiesArray = [];
    let gameframe = 0;

    class Enemy {
        constructor() {
            this.image = new Image();
            this.image.src = 'enemies/enemy3.png';
            this.speed = Math.random() * 4+1;
            this.spriteWidth = 218;
            this.spriteHeight = 177;
            this.height = this.spriteHeight / 2;
            this.width = this.spriteWidth / 2;
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            this.frame = 0;
            this.flapSpeed = Math.floor(Math.random() * 3 + 1);// between 1 and 4
            this.angle = Math.random()*2;
            this.angleSpeed = Math.random() * 2+ 0.5;
            this.curve = Math.random()*200 + 50;
        }
        update() {
            this.x = this.curve* Math.sin(this.angle * Math.PI/200) + (canvas.width/2 - this.width/2);
            this.y = this.curve* Math.cos(this.angle * Math.PI/100) + (canvas.height/2 - this.height/2);
            this.angle += this.angleSpeed;
            if(this.x + this.width < 0) this.x = canvas.width;
            if (gameframe % this.flapSpeed == 0)
                this.frame > 4 ? this.frame = 0 : this.frame++;
        }
        draw() {
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    };

    for (let i = 0; i < noOdEnemies; i++) {
        enemiesArray.push(new Enemy());
    }

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        enemiesArray.map((enemy) => {
            enemy.draw();
            enemy.update();
        })
        gameframe++;
        requestAnimationFrame(animate);
    }
    animate();
}


function animateCanvas4() {
    const canvas = document.getElementById("canvas4");
    const ctx = canvas.getContext("2d");
    CANVAS_WIDTH = canvas.width = 300;
    CANVAS_HEIGHT = canvas.height = 700;
    const noOdEnemies = 5;
    const enemiesArray = [];
    let gameframe = 0;

    class Enemy {
        constructor() {
            this.image = new Image();
            this.image.src = 'enemies/enemy4.png';
            this.speed = Math.random() * 4+1;
            this.spriteWidth = 213;
            this.spriteHeight = 213;
            this.height = this.spriteHeight / 2;
            this.width = this.spriteWidth / 2;
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            this.newX = Math.random()*(canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
            this.frame = 0;
            this.interval = Math.floor(Math.random()* 200+50);
            this.flapSpeed = Math.floor(Math.random() * 3 + 1);// between 1 and 4
        }
        update() {
            if(gameframe % this.interval  == 0){
                this.newX = Math.random() * (canvas.width - this.width);
                this.newY = Math.random() * (canvas.height - this.height);
            }
            let dx = this.x - this.newX;
            let dy = this.y - this.newY;
            this.x -= dx/20;
            this.y -= dy/20;

            if(this.x + this.width < 0) this.x = canvas.width;
            if (gameframe % this.flapSpeed == 0)
                this.frame > 4 ? this.frame = 0 : this.frame++;
        }
        draw() {
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    };

    for (let i = 0; i < noOdEnemies; i++) {
        enemiesArray.push(new Enemy());
    }

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        enemiesArray.map((enemy) => {
            enemy.draw();
            enemy.update();
        })
        gameframe++;
        requestAnimationFrame(animate);
    }
    animate();
}


function animateAll(){
    animateCanvas1()
    animateCanvas2()
    animateCanvas3()
    animateCanvas4()
}
window.onload = animateAll();