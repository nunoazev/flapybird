var pontosjs = {


mostrarpontos: function () {
    //unhide us
    $("#quadropontos").css("display", "block");

    //remove the big pontos
    pontosjs.setmaiorpontuacao(true);

    //have they beaten their high pontos?
    if (pontos > pontuacaomelhor) {
        //yeah!
        pontuacaomelhor = pontos;
        //save it!
    }

    //update the pontosboard
    pontosjs.setpontuacaomenor();
    pontosjs.setmelhorpontuacao();
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
},

    setmelhorpontuacao: function () {
    var elemscore = $("#pontuacaomelhor");
    elemscore.empty();



    var digits = pontuacaomelhor.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>");
},
   setpontuacaomenor: function () {
    var elemscore = $("#pontuacao");
    elemscore.empty();

    var digits = pontos.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>");
},
    setmaiorpontuacao:function (erase) {
    var elemscore = $("#maiorpontuacao");
    elemscore.empty();

    if (erase)
        return;

    var digits = pontos.toString().split('');
    for (var i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_big_" + digits[i] + ".png' alt='" + digits[i] + "'>");
}


};
