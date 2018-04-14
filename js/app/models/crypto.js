define(function() {

    function Crypto(crypto) {
        this.symbol = crypto.symbol;
        this.name = crypto.name;
        this.rank = crypto.rank;
        this.price_eur = crypto.price_eur;
        this.id = crypto.id;
        this.percent_change_1h = crypto.percent_change_1h;
        this.percent_change_24h = crypto.percent_change_24h;
        this.percent_change_7d = crypto.percent_change_7d;

    }

    return Crypto;
});
