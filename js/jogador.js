var areajogo = $("#area-de-jogo").height();

var jogadorjs = {

    jogadorsaltos: function () {
        velocidade = salto;

    },

    actualizarjogador: function (jogador) {
        //rotacao
        rotacao = Math.min((velocidade / 10) * 90, 90);

        //aplicar rotacao e posicao
        $(jogador).css({
            rotate: rotacao,
            top: posicao
        });
    },
    jogadorpontos: function () {
        pontos += 1;

        pontosjs.setmaiorpontuacao();
    },
    jogadormorto: function () {
// para as animações
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

 // sempre que o estado é igual ao do passar cano ele adiciona ponto
        estadoAtual = estado.ScoreScreen;

//para com os loops e jogo
        clearInterval(loopdojogo);
        clearInterval(loopdoscanos);
        loopdojogo = null;
        loopdoscanos = null;


// mostra pontos
        pontosjs.mostrarpontos();


    }

};
