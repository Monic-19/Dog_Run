export default class UI{
    constructor(game){
        this.game = game;
        this.livesImage = document.getElementById('lives');
        this.gamesound = new Audio();
        this.gamesound.volume = 0.4;
    }

    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = '30px Rubik Scribble';
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;


        //score
        context.fillText('Score : '+ this.game.score , 20,50);

        // game timer
        context.font = '30px Rubik Scribble';
        if(this.game.maxTime-this.game.time > 0)
            context.fillText('Time : '+ ((this.game.maxTime-this.game.time) * 0.001).toFixed(1) , 20,90);
        else
            context.fillText('Time : 0', 20,90);

        // lives
        for(let i = 0 ; i < this.game.lives ; i++){
            context.drawImage(this.livesImage, 20 * 1.5*i + 20 ,105 ,25,25);
        }

        // game over
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = '50px Bebas Neue';
            
            if(this.game.score >= this.game.minScoreToWin){
                context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5);

                this.gamesound.src = 'assets/sounds/You_Win.mp3';
                setTimeout(() => { 
                    context.font = '40px Bebas Neue';
                    context.fillStyle = 'black';
                    context.fillText('YOU WIN', this.game.width * 0.5 - 60, this.game.height * 0.5 + 50);
                    this.gamesound.play(); 
                }, 2000);
            }
            else{
                context.textAlign = 'center';
                context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5);
                
                this.gamesound.src = 'assets/sounds/You_Lose.mp3';
                setTimeout(() => {  
                    this.gamesound.play(); 
                    context.font = '40px Bebas Neue';
                    context.fillStyle = 'black';
                    context.fillText('YOU LOSE', this.game.width * 0.5 - 60, this.game.height * 0.5 + 50);
                }, 2000);
            }

            // context.fillText("Restart Game" , this.game.width * 0.5, this.game.height * 0.5 + 80)

        }
        context.restore();
    }
}