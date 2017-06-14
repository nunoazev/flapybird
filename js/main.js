


var estadoAtual;

var gravidade = 0.25;
var velocidade = 0;
var posicao = 180;
var rotacao = 0;
var salto = -4.6;
var areajogo = $("#area-de-jogo").height();

var pontos = 0;
var pontuacaomelhor = 0;

var canosheight = 90;
var canoswidth = 52;
var canoss = new Array();

var replayclickable = false;



//loops
var loopdojogo;
var loopdoscanos;


var estado = Object.freeze({
    iniciarjogo: 0,
    ecrajogo: 1,
    ScoreScreen: 2
});

$(document).ready(function () {

    mostrarjogo();
});




function mostrarjogo() {
    estadoAtual = estado.iniciarjogo;

    //set the defaults (again)
    velocidade = 0;
    posicao = 180;
    rotacao = 0;
    pontos = 0;

    //update the jogador in preparation for the proximo game
    $("#jogador").css({
        y: 0,
        x: 0
    });
    actualizarjogador($("#jogador"));



    //clear out all the canoss if there are any
    $(".canos").remove();
    canoss = new Array();

    //make everything efeito again
    $(".efeito").css('animation-play-state', 'running');
    $(".efeito").css('-webkit-animation-play-state', 'running');

    //fade in the splash

    $("#splash").css("opacity","1");


}

function iniciarjogo() {
    estadoAtual = estado.ecrajogo;

    //fade out the splash
    $("#splash").stop();

$("#splash").css("opacity","0");

    //update the big pontos
    setmaiorpontuacao();



    //start up our loops
    var updaterate = 17; //gravidade
    loopdojogo = setInterval(jogoloop, updaterate);
    loopdoscanos = setInterval(refescarcanos, 1400);

    //salto depois de comecar
    jogadorsaltos();
}

function actualizarjogador(jogador) {
    //rotacao
    rotacao = Math.min((velocidade / 10) * 90, 90);

    //aplicar rotacao e posicao
    $(jogador).css({
        rotate: rotacao,
        top: posicao
    });
}

function jogoloop() {
    var jogador = $("#jogador");

    //update the jogador speed/posicao
    velocidade += gravidade;
    posicao += velocidade;

    //update the jogador
    actualizarjogador(jogador);

    //create the bounding box
    var box = document.getElementById('jogador').getBoundingClientRect();
    var larguraOrigem = 34.0;
    var alturaOrigem = 24.0;

    var boxwidth = larguraOrigem - (Math.sin(Math.abs(rotacao) / 90) * 8);
    var boxheight = (alturaOrigem + box.height) / 2;
    var boxleft = ((box.width - boxwidth) / 2) + box.left;
    var boxtop = ((box.height - boxheight) / 2) + box.top;
    var boxright = boxleft + boxwidth;
    var boxbottom = boxtop + boxheight;



    //did we hit the ground?
    if (box.bottom >= $("#imagem-baixo").offset().top) {
        jogadormorto();
        return;
    }

    //bater na tijolo de cima?
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
    var canosbaixo = canostop + canosheight;



    //dentro do cano?
    if (boxright > canosEsquerda) {
        //passou os canos? soma ponto
        if (boxtop > canostop && boxbottom < canosbaixo) {
            //yeah! we're within bounds

        } else {
            //morreu
            jogadormorto();
            return;
        }
    }


    //have we passed the imminent danger?
    if (boxleft > canosDireita) {
        //yes, remove it
        canoss.splice(0, 1);

        //and pontos a point
        jogadorpontos();
    }
}


//Handle mouse down OR touch start
if ("ontouchstart" in window)
    $(document).on("touchstart", clicknoecra);
else
    $(document).on("mousedown", clicknoecra);

function clicknoecra() {
    if (estadoAtual == estado.ecrajogo) {
        jogadorsaltos();
    } else if (estadoAtual == estado.iniciarjogo) {
        iniciarjogo();
    }
}

function jogadorsaltos() {
    velocidade = salto;

}

function setmaiorpontuacao(erase) {
    var elemscore = $("#maiorpontuacao");
    elemscore.empty();

    if (erase)
        return;

    var digits = pontos.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_big_" + digits[i] + ".png' alt='" + digits[i] + "'>");
}

function setSmallScore() {
    var elemscore = $("#pontuacao");
    elemscore.empty();

    var digits = pontos.toString().split('');
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

function setmedalhas() {
    var elemmedal = $("#medalhas");
    elemmedal.empty();

    if (pontos < 2)
        //signal that no medalhas has been won
        return false;

    if (pontos >= 2)
        medalhas = "bronze";
    if (pontos >= 5)
        medalhas = "silver";
    if (pontos >= 30)
        medalhas = "gold";
    if (pontos >= 40)
        medalhas = "platinum";

    elemmedal.append('<img src="assets/medal_' + medalhas + '.png" alt="' + medalhas + '">');

    //signal that a medalhas has been won
    return true;
}

function jogadormorto() {
    //stop animating everything!
    $(".efeito").css('animation-play-state', 'paused');
    $(".efeito").css('-webkit-animation-play-state', 'paused');

    //cair no chão
    var jogadorchao = $("#jogador").position().top + $("#jogador").width(); //we use width because he'll be rotated 90 deg
    var chao = areajogo;
    var movey = Math.max(0, chao - jogadorchao);
    $("#jogador").transition({
        y: movey + 'px',
        rotate: 90
    }, 1000, 'easeInOutCubic');

    //it's time to change estado. as of now we're considered ScoreScreen to disable left click/flying
    estadoAtual = estado.ScoreScreen;

    //destroy our jogoloops
    clearInterval(loopdojogo);
    clearInterval(loopdoscanos);
    loopdojogo = null;
    loopdoscanos = null;


    //skip right to showing pontos
    mostrarpontos();


}

function mostrarpontos() {
    //unhide us
    $("#quadropontos").css("display", "block");

    //remove the big pontos
    setmaiorpontuacao(true);

    //have they beaten their high pontos?
    if (pontos > pontuacaomelhor) {
        //yeah!
        pontuacaomelhor = pontos;
        //save it!
    }

    //update the pontosboard
    setSmallScore();
    setHighScore();
    var wonmedal = setmedalhas();

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

        //mostrar inicio do jogo
        mostrarjogo();
    });
});

function jogadorpontos() {
    pontos += 1;

    setmaiorpontuacao();
}

function refescarcanos() {
    //Do any canoss need removal?
    $(".canos").filter(function () {
        return $(this).position().left <= -100;
    }).remove()

    //add a new canos (top height + bottom height  + canosheight == areajogo) and put it in our tracker
    var padding = 80;
    var constraint = areajogo - canosheight - (padding * 2); //double padding (for top and bottom)
    var topheight = Math.floor((Math.random() * constraint) + padding); //add lower padding
    var bottomheight = (areajogo - canosheight) - topheight;
    var newcanos = $('<div class="canos efeito"><div class="canos_cima" style="height: ' + topheight + 'px;"></div><div class="canos_baixo" style="height: ' + bottomheight + 'px;"></div></div>');
    $("#area-de-jogo").append(newcanos);
    canoss.push(newcanos);
}
