


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

    jogojs.mostrarjogo();
});



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
        jogojs.mostrarjogo();
    });
});
























//click


//Handle mouse down OR touch start
if ("ontouchstart" in window)
    $(document).on("touchstart", clicknoecra);
else
    $(document).on("mousedown", clicknoecra);

function clicknoecra() {
    if (estadoAtual == estado.ecrajogo) {
        jogadorjs.jogadorsaltos();
    } else if (estadoAtual == estado.iniciarjogo) {
        jogojs.iniciarjogo();
    }
}



//pontos


function setmaiorpontuacao(erase) {
    var elemscore = $("#maiorpontuacao");
    elemscore.empty();

    if (erase)
        return;

    var digits = pontos.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_big_" + digits[i] + ".png' alt='" + digits[i] + "'>");
}

function setpontuacaomenor() {
    var elemscore = $("#pontuacao");
    elemscore.empty();

    var digits = pontos.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>");
}

function setmelhorpontuacao() {
    var elemscore = $("#pontuacaomelhor");
    elemscore.empty();



    var digits = pontuacaomelhor.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>");
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
    setpontuacaomenor();
    setmelhorpontuacao();
    var wonmedal = medalhasjs.setmedalhas();

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








