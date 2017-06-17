


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




