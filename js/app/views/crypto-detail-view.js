define(function() {

    // public
    function render(params) {

        var appDivContainer = document.getElementById('app');

        title = writeTitle(params.name, params.rank);
        prices = writePrices(params.price_usd, params.price_eur, params.price_btc);
        supply = writeSupply(params.market_cap_usd, params.available_supply, params.total_supply, params.symbol);
        appDivContainer.innerHTML = '<div class="uk-container">' + title + prices + divider() + supply + '</div>';

    }


    // private
    function writeTitle(name, rank) {
        //return '<h1>' + name + ' (' + rank + ')' + '</h1>';
        return '<h1 class="uk-heading-line uk-text-center"><span>' + name + '</span></h1>';
    }

    // private
    function writePrices(usd, euro, btc) {
        return '<h1 class="uk-heading-bullet">Prices</h1>' +
                '<ul class="uk-list uk-list-large uk-list-bullet">' +
                '<li> <span class="uk-label">USD</span> $' + usd + '</li>'+
                '<li> <span class="uk-label">Euro</span> € ' + euro + '</li>'+
                '<li> <span class="uk-label">Bitcoin</span> BTC ' + btc+ '</li>'+
                '</ul>';
    }

    // private
    function writeSupply(market_cap_usd, available_supply, total_supply, symbol) {
        return '<h1 class="uk-heading-bullet">Supply</h1>' +
                '<ul class="uk-list uk-list-large uk-list-bullet">' +
                '<li> <span class="uk-label supplies">Market Cap (USD):</span> $ ' + market_cap_usd + '</li>'+
                '<li> <span class="uk-label supplies">Available Supply:</span> ' + available_supply + ' ' + symbol + '</li>'+
                '<li> <span class="uk-label supplies">Total Supply:</span> ' + total_supply + ' ' + symbol + '</li>'+
                '</ul>';
    }

    // private
    function divider() {
        return '<hr class="uk-divider-icon">';
    }

    return {
        render: render
    };

});
