window.onload=function(){
    let player1="X";
    let player2="O";
    let currentTurn=1;
    let movesMade=0;
    let sqr = document.getElementsByClassName('square');
    let reset=document.getElementById('button');
    let winnerContainer = document.getElementsByClassName('winner');
    let player_1=document.getElementById('player1');
    let player_2=document.getElementById('player2');
    let player_1_score=0;
    let player_2_score=0;
    for (const key in sqr) {
        sqr[key].ondblclick = function(){
           movesMade++;
           if(currentTurn===1){
                event.target.innerHTML=player1;
                event.target.style.backgroundColor="#E57373";
                currentTurn++;
           } else{
               event.target.innerHTML=player2;
               event.target.style.backgroundColor="#2ad031";
               currentTurn--;
           }
           if (checkForWinner()) {
            theWinner = currentTurn == 1 ? "player2" : "player1";
            declareWinner(theWinner,currentTurn);
           }
           else if(movesMade==9){
                handleClick();
           }
           
        };
    }
    function checkForWinner(){
        if(movesMade>4){
            let moves=Array.prototype.slice.call(document.getElementsByClassName('square'));
            let results=moves.map(function(square){
                return square.innerHTML;
            });
            let winningCombinations=[
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ];
            return winningCombinations.find(function(combo) {
                if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
    reset.onclick=handleClick;
    function handleClick(){
        document.getElementById('winner').style.display='none';
        document.getElementById('board').style.display='flex';
        var moves = Array.prototype.slice.call(document.getElementsByClassName('square'));
        moves.map((m) => {
            m.innerHTML = "";
            m.style.backgroundColor="transparent";
        });
        currentTurn = 1;
    }
    function declareWinner(theWinner,currentTurn){
        let a=document.getElementById('board');
        a.style.display='none';
        let x =document.getElementById('winner');
        x.style.display='flex';
        x.innerHTML="Congratulations "+theWinner
        x.style.fontSize="40px";
        if(currentTurn==1){
            player_2_score++;
            player_2.innerHTML=player_2_score;
        }
        else{
            player_1_score++;
            player_1.innerHTML=player_1_score;
        }
    }
};