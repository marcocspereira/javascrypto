/**
 * Revealing Module Pattern, which returns private attributes and methods
 *
 * 'define' function is provided by RequireJS and will make our module accessible from the outside
 */

define(['views/crypto-detail-view', 'services/crypto-service'], function(CryptoDetailView, CryptoService) {

    // public
    function start() {
        var cryptoName = CryptoService.getCryptoName();

        CryptoService.getSelectedCrypto(cryptoName).then(showCrypto);
    }

    // private
    function showCrypto(params) {
        CryptoDetailView.render(params);
    }

    return {
        start: start
    };

});
