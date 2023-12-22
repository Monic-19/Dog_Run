import Player from "./components/player.js";
import InputHandler from "./components/input.js";
import { Background } from "./components/background.js";
import { FlyingEnemy , GroundEnemy , ClimbingEnemy } from "./components/enemies.js";
import UI from "./components/ui.js";

window.addEventListener("load", runGame());

function runGame(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 40;
    canvas.height = 500;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxspeed = 4;
            this.background = new Background(this);
            this.player = new Player(this);
            this.inputHandler = new InputHandler(this);
            this.ui = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0; 
            this.fontColor = 'black';
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.minScoreToWin = 25;
            this.lives = 3;
        } 
        update(deltatime){
            this.time += deltatime;
            if(this.time > this.maxTime)
                this.gameOver = true;
            this.background.update();
            this.player.update(this.inputHandler.keys, deltatime);

            //handle enemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }
            else{
                this.enemyTimer += deltatime;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltatime);
                if(enemy.markedForDeletion) 
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
            })

            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if(particle.markedForDeletion) 
                    this.particles.splice(index, 1);
            })

            if(this.particles.length > this.maxParticles)
                this.particles = this.particles.slice(0,50);

            // handle collisions

            this.collisions.forEach((collision, index) => {
                collision.update(deltatime);
                if(collision.markedForDeletion) 
                    this.collisions.splice(index, 1);
            })

        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.collisions.forEach(collision => {
                collision.draw(context);
            })
            this.ui.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.3)
                this.enemies.push(new GroundEnemy(this));
            else if(Math.random() > 0.7)
                this.enemies.push(new ClimbingEnemy(this));
            else
            this.enemies.push(new FlyingEnemy(this));
            // console.log(this.enemies);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    // console.log(game);
    let lastime = 0;

    function animate(timestamp){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        const deltatime = timestamp - lastime;
        lastime = timestamp;
        game.update(deltatime);
        game.draw(ctx);
        
        if(game.gameOver){
            game.sound = new Audio();
            game.sound.volume = 0.4;
            if(game.lives > 0){
                game.sound.src = 'assets/sounds/GameOver.mp3';
                game.sound.play();
            }
            else{
                game.sound.src = 'assets/sounds/KOSFX.mp3';
                game.sound.play();
            }
        }

        if(!game.gameOver)
            requestAnimationFrame(animate);
    }
    animate(0);
}