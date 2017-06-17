var medalhasjs = {

    setmedalhas: function () {
        var elemmedal = $("#medalhas");
        elemmedal.empty();

        if (pontos < 2)
            //signal that no medalhas has been won
            return false;

        if (pontos >= 2)
            medalhas = "bronze";
        if (pontos >= 5)
            medalhas = "silver";
        if (pontos >= 30)
            medalhas = "gold";
        if (pontos >= 40)
            medalhas = "platinum";

        elemmedal.append('<img src="assets/medal_' + medalhas + '.png" alt="' + medalhas + '">');

        //signal that a medalhas has been won
        return true;
    }


};
