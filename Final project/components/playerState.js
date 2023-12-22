import { Dust, Fire , Splash} from "./particles.js";

const states = {
    SITTING : 0, 
    RUNNING : 1,
    JUMPING : 2,
    FALLING : 3,
    ROLLING : 4,
    DIVING :  5,
    HIT    :  6,
}

class state{
    constructor(state , game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends state{
    constructor(game){
        super("SITTING", game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    }

    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING ,1);
        }
        else if(input.includes('Enter'))
            this.game.player.setState(states.ROLLING ,2);

    }
}


export class Running extends state{
    constructor(game){
        super("RUNNING", game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }

    handleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5 , this.game.player.y + this.game.player.height));
        if(input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING, 0);
        }
        else if(input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 1);
        }
        else if(input.includes('Enter'))
            this.game.player.setState(states.ROLLING ,2);
    }
}


export class Jumping extends state{
    constructor(game){
        super("JUMPING", game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        if(this.game.player.onGround()) this.game.player.vy -= 25;
        this.game.player.frameY = 1;
    }

    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING,1);
        }
        else if(input.includes('Enter'))
            this.game.player.setState(states.ROLLING ,2);
        else if(input.includes('ArrowDown'))
            this.game.player.setState(states.DIVING ,0);
    }
}

export class Falling extends state{
    constructor(game){
        super("FALLING", game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
    }

    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }
        else if(input.includes('ArrowDown'))
        this.game.player.setState(states.DIVING ,0);
    }
}

export class Rolling extends state{
    constructor(game){
        super("ROLLING", game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }

    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5 , this.game.player.y +  this.game.player.height * 0.5 ));
        if(this.game.player.onGround() && !input.includes('Enter')){
            this.game.player.setState(states.RUNNING, 1);
        }
        else if(!this.game.player.onGround() && !input.includes('Enter')){
            this.game.player.setState(states.FALLING, 1);
        }
        else if(input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()){
            this.game.player.vy -= 25;
        }
        else if(input.includes('ArrowDown') && !this.game.player.onGround())
        this.game.player.setState(states.DIVING ,0);
    }
}


export class Diving extends state{
    constructor(game){
        super("DIVING", game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vy = 15;
        this.sound = new Audio();
        this.sound.src = 'assets/sounds/blast.flac';
    }

    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5 , this.game.player.y +  this.game.player.height * 0.5 ));

        
        if(this.game.player.onGround() ){
            this.game.player.setState(states.RUNNING, 1);
            for(let i= 0 ; i < 30 ; i++){
                this.game.particles.unshift(new Splash(this.game, this.game.player.x, this.game.player.y));
            }
        }
        else if(this.game.player.onGround() && input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 2);
        }
        
        this.sound.volume = 0.2;
        this.sound.play();
        
    }
}

export class Hit extends state{
    constructor(game){
        super("HIT", game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
    }

    handleInput(input){
 
        if(this.game.player.onGround()  && this.game.player.frameX >= 10){
            this.game.player.setState(states.RUNNING, 1);
        }
        else if(!this.game.player.onGround()  && this.game.player.frameX >= 10){
            this.game.player.setState(states.FALLING, 1);
        }
       
    }
}

