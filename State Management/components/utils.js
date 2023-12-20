export function drawStatusText(context, input, player){
    context.fillStyle = 'white';
    context.font = '30px Helvetica';
    context.fillText('Last Input : '+ input.lastKey, 20,50);
    context.font = '20px Helvetica';
    context.fillText("Acitive State : "+ player.currentState.state, 20, 90);
}