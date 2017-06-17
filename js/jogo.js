var jogojs ={


    mostrarjogo: function () {
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
    jogadorjs.actualizarjogador($("#jogador"));



    //clear out all the canoss if there are any
    $(".canos").remove();
    canoss = new Array();

    //make everything efeito again
    $(".efeito").css('animation-play-state', 'running');
    $(".efeito").css('-webkit-animation-play-state', 'running');

    //fade in the splash

    $("#splash").css("opacity","1");


},

    iniciarjogo: function () {
    estadoAtual = estado.ecrajogo;

    //fade out the splash
    $("#splash").stop();

$("#splash").css("opacity","0");

    //update the big pontos
    pontosjs.setmaiorpontuacao();



    //start up our loops
    var updaterate = 17; //gravidade
    loopdojogo = setInterval(jogojs.jogoloop, updaterate);
    loopdoscanos = setInterval(canosjs.refescarcanos, 1400);

    //salto depois de comecar
    jogadorjs.jogadorsaltos();
},


    jogoloop: function () {
    var jogador = $("#jogador");

    //update the jogador speed/posicao
    velocidade += gravidade;
    posicao += velocidade;

    //update the jogador
    jogadorjs.actualizarjogador(jogador);

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
        jogadorjs.jogadormorto();
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
            jogadorjs.jogadormorto();
            return;
        }
    }


    //have we passed the imminent danger?
    if (boxleft > canosDireita) {
        //yes, remove it
        canoss.splice(0, 1);

        //and pontos a point
        jogadorjs.jogadorpontos();
    }
}

};
