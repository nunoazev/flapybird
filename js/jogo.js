//variaveis para controlar o salto ou o nivel de gravidade do passaro
var gravidade = 0.25;
var salto = -4.6;

var jogojs = {


    //mostra o ecra do jogo
    mostrarjogo: function () {
        estadoAtual = estado.iniciarjogo;

// definir variaveis de inicio
        velocidade = 0;
        posicao = 180;
        rotacao = 0;
        pontos = 0;

        //centra o passaro no jogo
        $("#jogador").css({
            y: 0,
            x: 0
        });
        jogadorjs.actualizarjogador($("#jogador"));
        //atualiza


// verifica se tem algum cano gerado e remove
        $(".canos").remove();
        canoss = new Array();

        //faz gera os efeitos
        $(".efeito").css('animation-play-state', 'running');
        $(".efeito").css('-webkit-animation-play-state', 'running');

        //mostra o menu do tap tap para começar

        $("#splash").css("opacity", "1");


    },

    //inicia o jogo
    iniciarjogo: function () {
        estadoAtual = estado.ecrajogo;

        //para o splash
        $("#splash").stop();

        //remove o splash tap tap
        $("#splash").css("opacity", "0");

        //define a maior pontuaçao atravez do set
        pontosjs.setmaiorpontuacao();



        //começa o loops
        var updaterate = 17; //gravidade
        loopdojogo = setInterval(jogojs.jogoloop, updaterate);
        loopdoscanos = setInterval(canosjs.refescarcanos, 1400); //tempo de refresh aos canos

        //salto depois de comecar
        jogadorjs.jogadorsaltos();
    },


    jogoloop: function () {
        var jogador = $("#jogador");

        //atualiza a velocidade e gravidade
        velocidade += gravidade;
        posicao += velocidade;

        //atualiza jogador
        jogadorjs.actualizarjogador(jogador);

        //cria passagem nos tubos
        var box = document.getElementById('jogador').getBoundingClientRect();
        var larguraOrigem = 34.0;
        var alturaOrigem = 24.0;

        var boxwidth = larguraOrigem - (Math.sin(Math.abs(rotacao) / 90) * 8);
        var boxheight = (alturaOrigem + box.height) / 2;
        var boxleft = ((box.width - boxwidth) / 2) + box.left;
        var boxtop = ((box.height - boxheight) / 2) + box.top;
        var boxright = boxleft + boxwidth;
        var boxbottom = boxtop + boxheight;



//bateu no chao?
        if (box.bottom >= $("#imagem-baixo").offset().top) {
            jogadorjs.jogadormorto();
            return;
        }

        //bater na tijolo de cima?
        var tijolo = $("#tijolo-de-cima");
        if (boxtop <= (tijolo.offset().top + tijolo.height()))
            posicao = 0;


        //determina se passa ou nao no cano, area limitador do proximo
        var proximocanos = canoss[0];
        var proximocanoscima = proximocanos.children(".canos_cima");

        var canostop = proximocanoscima.offset().top + proximocanoscima.height();
        var canosEsquerda = proximocanoscima.offset().left - 2;
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


// comfirma que passa
        if (boxleft > canosDireita) {
//remove
            canoss.splice(0, 1);

            //ponto
            jogadorjs.jogadorpontos();
        }
    }

};
