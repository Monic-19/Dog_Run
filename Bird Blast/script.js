function startGame() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const collisionCanvas = document.getElementById("collisionCanvas");
    const collisionCtx = collisionCanvas.getContext('2d');
    collisionCanvas.width = window.innerWidth;
    collisionCanvas.height = window.innerHeight;

    let timeToNextRaven = 0;
    let ravenInterval = 500;
    let lastTime = 0;
    let score = 0;
    ctx.font = '50px Impact';
    let gameover = false;

    let ravens = [];
    let explosions = [];
    // let backgroundSound = new Audio();
    // backgroundSound.src = 'background.mp3';
    // backgroundSound.volume = 0.2;
    // window.onload = backgroundSound.play();

    class Raven {
        constructor() {
            this.sprteWidth = 271;
            this.spriteHeight = 194;
            this.sizeModifier = Math.random() * 0.6 + 0.4;
            this.width = this.sprteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - this.height);
            this.directionX = Math.random() * 5 + 3;
            this.directionY = Math.random() * 5 - 2.5;
            this.markedForDeletion = false;
            this.image = new Image();
            this.image.src = 'raven.png';
            this.frame = 0;
            this.maxFrame = 4;
            this.timeSinceFlap = 0;
            this.flapInterval = Math.random() * 50 + 50;
            this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
            this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
        }
        update(deltaTime) {

            if (this.y < 0 || this.y > canvas.height - this.height) {
                this.directionY *= -1;
            }

            this.x -= this.directionX;
            this.y += this.directionY;

            if (this.x < 0 - this.width)
                this.markedForDeletion = true;
            this.timeSinceFlap += deltaTime;
            if (this.timeSinceFlap > this.flapInterval) {
                if (this.frame > this.maxFrame) this.frame = 0;
                else this.frame++;
                this.timeSinceFlap = 0;
            }
            if (this.x < 0 - this.width) gameover = true;
        }
        draw() {
            collisionCtx.fillStyle = this.color;
            collisionCtx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.frame * this.sprteWidth, 0, this.sprteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class Explosions {
        constructor(x, y, size) {
            this.image = new Image();
            this.image.src = 'burst.png';
            this.spriteWidth = 200;
            this.spriteHeight = 179;
            this.size = size;
            this.x = x;
            this.y = y;
            this.frame = 0;
            this.sound = new Audio();
            this.sound.src = 'pop_.mp3';
            this.timeSinceLastFrame = 0;
            this.frameInterval = 200;
            this.markedForDeletion = false;
        }
        update(deltaTime) {
            if (this.frame == 0) {
                this.sound.play();
            }
            this.timeSinceLastFrame += deltaTime;
            if (this.timeSinceLastFrame > this.frameInterval) {
                this.frame++;
                this.timeSinceLastFrame = 0;
                if (this.frame > 5) this.markedForDeletion = true;
            }
        }
        draw() {
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size);
        }
    }

    function drawScore() {
        ctx.font = '70px Impact';
        ctx.fillStyle = 'black';
        ctx.fillText('BIRD BLAST', 50,100);
        ctx.fillStyle = 'white';
        ctx.fillText('BIRD BLAST', 55,105);
        ctx.font = '50px Impact';
        ctx.fillStyle = 'black';
        ctx.fillText('Score: ' + score, 1230, 780);
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, 1235, 785);
    }

    function drawGameOver() {
        let sound = new Audio();
        sound.src = 'GameOver.mp3';
        sound.play();

        ctx.font = '70px Impact';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = 'white';
        ctx.fillText('GAME OVER your score is ' + score, canvas.width / 2 + 5, canvas.height / 2 + 5);

    }


    window.addEventListener('click', function (e) {
        const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
        // console.log(detectPixelColor);
        const pc = detectPixelColor.data;
        ravens.forEach(object => {
            if (object.randomColors[0] == pc[0] && object.randomColors[1] == pc[1] && object.randomColors[2] == pc[2]) {
                //Collision Detected
                object.markedForDeletion = true;
                score++;
                explosions.push(new Explosions(object.x, object.y, object.width));
                // console.log(explosions)
            }
        })
    })


    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        timeToNextRaven += deltaTime;

        if (timeToNextRaven > ravenInterval) {
            ravens.push(new Raven());
            timeToNextRaven = 0;
            ravens.sort(function (a, b) { return a.width - b.width })
        }

        drawScore();
        [...ravens, ...explosions].forEach(object => object.update(deltaTime));
        [...ravens, ...explosions].forEach(object => object.draw());

        ravens = ravens.filter(object => !object.markedForDeletion);
        explosions = explosions.filter(object => !object.markedForDeletion);

        if (!gameover)
            requestAnimationFrame(animate);
        else drawGameOver();
    }
    animate(0);

}

window.onload = startGame()