var pontuacaomelhor = 0;

var pontosjs = {



    mostrarpontos: function () {

//quadro dos pontos
        $("#quadropontos").css("display", "block");


        pontosjs.setmaiorpontuacao(true);

// compara os quadros dos pontos
        if (pontos > pontuacaomelhor) {
            pontuacaomelhor = pontos;
//grava
        }

// actualiza pontuação
        pontosjs.setpontuacaomenor();
        pontosjs.setmelhorpontuacao();
        var wonmedal = medalhasjs.setmedalhas();



        //mostra quadro dos pontos
        $("#quadropontos").css({
            y: '40px',
            opacity: 0
        });
        $("#repetir").css({
            y: '40px',
            opacity: 0
        });
        // faz efeito de trancisao
        $("#quadropontos").transition({
            y: '0px',
            opacity: 1
        }, 600, 'ease', function () {
            //quando a animação acaba aparece o botao de replay

            $("#repetir").transition({
                y: '0px',
                opacity: 1
            }, 600, 'ease');

            //medalhas
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

        // butao de replay com modo click
        replayclickable = true;
    },

    setmelhorpontuacao: function () {
        var elemscore = $("#pontuacaomelhor");
        elemscore.empty();


// incremeta o numero dos pontos e faz apend a imagem para aparecer pontos em forma de imagem
        var digits = pontuacaomelhor.toString().split('');
        for (var i = 0; i < digits.length; i++)
            elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>");
    },


    // quadro depois de morrer o passaro
    setpontuacaomenor: function () {
        var elemscore = $("#pontuacao");
        elemscore.empty();

        var digits = pontos.toString().split('');
        for (var i = 0; i < digits.length; i++)
            elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>");
    },

    setmaiorpontuacao: function (erase) {
        var elemscore = $("#maiorpontuacao");
        elemscore.empty();

        if (erase)
            return;

        var digits = pontos.toString().split('');
        for (var i = 0; i < digits.length; i++)
            elemscore.append("<img src='assets/font_big_" + digits[i] + ".png' alt='" + digits[i] + "'>");
    }


};
