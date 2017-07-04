var canoss = new Array();
var canosheight = 120;
var canoswidth = 52;

var canosjs = {



    refescarcanos: function () {


        //adicionar canos
        var padding = 80;
        var constraint = areajogo - canosheight - padding;
        var topheight = Math.floor((Math.random() * constraint) + padding*2);
        var bottomheight = (areajogo - canosheight) - topheight;
        var newcanos = $('<div class="canos efeito"><div class="canos_cima" style="height: ' + topheight + 'px;"></div><div class="canos_baixo" style="height: ' + bottomheight + 'px;"></div></div>');
        $("#area-de-jogo").append(newcanos);
        canoss.push(newcanos); //canos
    }


};
