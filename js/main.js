//botao de click desativado
var replayclickable = false;


//conjela o estado
var estado = Object.freeze({
    iniciarjogo: 0,
    ecrajogo: 1,
    ScoreScreen: 2
});


//prepara para iniciar o jogo quando a pagina carrega
$(document).ready(function () {

    jogojs.mostrarjogo();
});



//replay ao jogo
$("#repetir").click(function () {
//força so 1 click
    if (!replayclickable)
        return;
    else
        replayclickable = false;


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




//click do rato ou touch
if ("ontouchstart" in window)
    $(document).on("touchstart", clicknoecra);
else
    $(document).on("mousedown", clicknoecra);


//controlar os click no ecra
function clicknoecra() {
    if (estadoAtual == estado.ecrajogo) {
        jogadorjs.jogadorsaltos();//ver estado
    } else if (estadoAtual == estado.iniciarjogo) {
        jogojs.iniciarjogo();//ver o estado
    }
}
