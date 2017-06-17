var canosjs = {

refescarcanos: function () {
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


};
