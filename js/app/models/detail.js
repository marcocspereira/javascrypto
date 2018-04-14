// https://coinmarketcap.com/api/

define(function() {

    function Detail(cryptoDetail) {
        this.symbol = cryptoDetail.symbol;
        this.name = cryptoDetail.name;
        this.rank = cryptoDetail.rank;
        this.price_usd = cryptoDetail.price_usd;
        this.price_eur = cryptoDetail.price_eur;
        this.price_btc = cryptoDetail.price_btc;
        this.market_cap_usd = cryptoDetail.market_cap_usd;
        this.available_supply = cryptoDetail.available_supply;
        this.total_supply = cryptoDetail.total_supply;
    }

    return Detail;
});
