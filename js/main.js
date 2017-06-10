var states = Object.freeze({
    SplashScreen: 0,
    GameScreen: 1,
    ScoreScreen: 2
});

var currentstate;

var gravidade = 0.25;
var velocidade = 0;
var posicao = 180;
var rotacao = 0;
var salto = -4.6;
var flyArea = $("#area-de-jogo").height();

var score = 0;
var pontuacaomelhor = 0;

var canosheight = 90;
var canoswidth = 52;
var canoss = new Array();

var replayclickable = false;



//loops
var loopGameloop;
var loopPipeloop;

$(document).ready(function () {

    if (window.location.search == "?easy")
        canosheight = 200;



    //start with the splash screen
    showSplash();
});




function showSplash() {
    currentstate = states.SplashScreen;

    //set the defaults (again)
    velocidade = 0;
    posicao = 180;
    rotacao = 0;
    score = 0;

    //update the jogador in preparation for the proximo game
    $("#jogador").css({
        y: 0,
        x: 0
    });
    updatePlayer($("#jogador"));



    //clear out all the canoss if there are any
    $(".canos").remove();
    canoss = new Array();

    //make everything efeito again
    $(".efeito").css('animation-play-state', 'running');
    $(".efeito").css('-webkit-animation-play-state', 'running');

    //fade in the splash

    $("#splash").css("opacity","1");


}

function startGame() {
    currentstate = states.GameScreen;

    //fade out the splash
    $("#splash").stop();

$("#splash").css("opacity","0");

    //update the big score
    setBigScore();



    //start up our loops
    var updaterate = 1000.0 / 60.0; //60 times a second
    loopGameloop = setInterval(gameloop, updaterate);
    loopPipeloop = setInterval(updatePipes, 1400);

    //salto from the start!
    jogadorJump();
}

function updatePlayer(jogador) {
    //rotacao
    rotacao = Math.min((velocidade / 10) * 90, 90);

    //apply rotacao and posicao
    $(jogador).css({
        rotate: rotacao,
        top: posicao
    });
}

function gameloop() {
    var jogador = $("#jogador");

    //update the jogador speed/posicao
    velocidade += gravidade;
    posicao += velocidade;

    //update the jogador
    updatePlayer(jogador);

    //create the bounding box
    var box = document.getElementById('jogador').getBoundingClientRect();
    var origwidth = 34.0;
    var origheight = 24.0;

    var boxwidth = origwidth - (Math.sin(Math.abs(rotacao) / 90) * 8);
    var boxheight = (origheight + box.height) / 2;
    var boxleft = ((box.width - boxwidth) / 2) + box.left;
    var boxtop = ((box.height - boxheight) / 2) + box.top;
    var boxright = boxleft + boxwidth;
    var boxbottom = boxtop + boxheight;



    //did we hit the ground?
    if (box.bottom >= $("#imagem-baixo").offset().top) {
        jogadorDead();
        return;
    }

    //have they tried to escape through the tijolo? :o
    var tijolo = $("#tijolo-de-cima");
    if (boxtop <= (tijolo.offset().top + tijolo.height()))
        posicao = 0;

    //we can't go any further without a canos
    if (canoss[0] == null)
        return;

    //determine the bounding box of the proximo canoss inner area
    var proximocanos = canoss[0];
    var proximocanoscima = proximocanos.children(".canos_cima");

    var canostop = proximocanoscima.offset().top + proximocanoscima.height();
    var canosEsquerda = proximocanoscima.offset().left - 2; // for some reason it starts at the inner pipes offset, not the outer pipes.
    var canosDireita = canosEsquerda + canoswidth;
    var canosbottom = canostop + canosheight;



    //have we gotten inside the pipe yet?
    if (boxright > canosEsquerda) {
        //we're within the canos, have we passed between upper and lower canoss?
        if (boxtop > canostop && boxbottom < canosbottom) {
            //yeah! we're within bounds

        } else {
            //no! we touched the canos
            jogadorDead();
            return;
        }
    }


    //have we passed the imminent danger?
    if (boxleft > canosDireita) {
        //yes, remove it
        canoss.splice(0, 1);

        //and score a point
        jogadorScore();
    }
}


//Handle mouse down OR touch start
if ("ontouchstart" in window)
    $(document).on("touchstart", screenClick);
else
    $(document).on("mousedown", screenClick);

function screenClick() {
    if (currentstate == states.GameScreen) {
        jogadorJump();
    } else if (currentstate == states.SplashScreen) {
        startGame();
    }
}

function jogadorJump() {
    velocidade = salto;
    //play salto sound

}

function setBigScore(erase) {
    var elemscore = $("#maiorpontuacao");
    elemscore.empty();

    if (erase)
        return;

    var digits = score.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_big_" + digits[i] + ".png' alt='" + digits[i] + "'>");
}

function setSmallScore() {
    var elemscore = $("#pontuacao");
    elemscore.empty();

    var digits = score.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>");
}

function setHighScore() {
    var elemscore = $("#pontuacaomelhor");
    elemscore.empty();

    var digits = pontuacaomelhor.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>");
}

function setMedal() {
    var elemmedal = $("#medalhas");
    elemmedal.empty();

    if (score < 2)
        //signal that no medal has been won
        return false;

    if (score >= 2)
        medal = "bronze";
    if (score >= 5)
        medal = "silver";
    if (score >= 30)
        medal = "gold";
    if (score >= 40)
        medal = "platinum";

    elemmedal.append('<img src="assets/medal_' + medal + '.png" alt="' + medal + '">');

    //signal that a medal has been won
    return true;
}

function jogadorDead() {
    //stop animating everything!
    $(".efeito").css('animation-play-state', 'paused');
    $(".efeito").css('-webkit-animation-play-state', 'paused');

    //drop the bird to the floor
    var jogadorbottom = $("#jogador").position().top + $("#jogador").width(); //we use width because he'll be rotated 90 deg
    var floor = flyArea;
    var movey = Math.max(0, floor - jogadorbottom);
    $("#jogador").transition({
        y: movey + 'px',
        rotate: 90
    }, 1000, 'easeInOutCubic');

    //it's time to change states. as of now we're considered ScoreScreen to disable left click/flying
    currentstate = states.ScoreScreen;

    //destroy our gameloops
    clearInterval(loopGameloop);
    clearInterval(loopPipeloop);
    loopGameloop = null;
    loopPipeloop = null;


    //skip right to showing score
    showScore();


}

function showScore() {
    //unhide us
    $("#quadropontos").css("display", "block");

    //remove the big score
    setBigScore(true);

    //have they beaten their high score?
    if (score > pontuacaomelhor) {
        //yeah!
        pontuacaomelhor = score;
        //save it!
    }

    //update the scoreboard
    setSmallScore();
    setHighScore();
    var wonmedal = setMedal();

    //SWOOSH!


    //show the quadropontos
    $("#quadropontos").css({
        y: '40px',
        opacity: 0
    }); //move it down so we can slide it up
    $("#repetir").css({
        y: '40px',
        opacity: 0
    });
    $("#quadropontos").transition({
        y: '0px',
        opacity: 1
    }, 600, 'ease', function () {
        //When the animation is done, animate in the replay button and SWOOSH!

        $("#repetir").transition({
            y: '0px',
            opacity: 1
        }, 600, 'ease');

        //also animate in the MEDAL! WOO!
        if (wonmedal) {
            $("#medalhas").css({
                scale: 2,
                opacity: 0
            });
            $("#medalhas").css({
                opacity: 1,
                scale: 1
            }, 1200, 'ease');

        }
    });

    //make the replay button clickable
    replayclickable = true;
}

$("#repetir").click(function () {
    //make sure we can only click once
    if (!replayclickable)
        return;
    else
        replayclickable = false;
    //SWOOSH!


    //fade out the quadropontos
    $("#quadropontos").transition({
        y: '-40px',
        opacity: 0
    }, 1000, 'ease', function () {
        //when that's done, display us back to nothing
        $("#quadropontos").css("display", "none");

        //start the game over!
        showSplash();
    });
});

function jogadorScore() {
    score += 1;

    setBigScore();
}

function updatePipes() {
    //Do any canoss need removal?
    $(".canos").filter(function () {
        return $(this).position().left <= -100;
    }).remove()

    //add a new canos (top height + bottom height  + canosheight == flyArea) and put it in our tracker
    var padding = 80;
    var constraint = flyArea - canosheight - (padding * 2); //double padding (for top and bottom)
    var topheight = Math.floor((Math.random() * constraint) + padding); //add lower padding
    var bottomheight = (flyArea - canosheight) - topheight;
    var newcanos = $('<div class="canos efeito"><div class="canos_cima" style="height: ' + topheight + 'px;"></div><div class="canos_baixo" style="height: ' + bottomheight + 'px;"></div></div>');
    $("#area-de-jogo").append(newcanos);
    canoss.push(newcanos);
}
