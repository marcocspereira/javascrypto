/**
 * Revealing Module Pattern, which returns private attributes and methods
 *
 * 'define' function is provided by RequireJS and will make our module accessible from the outside
 */

define(['views/crypto-list-view', 'services/crypto-service'], function(CryptoListView, CryptoService) {

    // public
    function start() {

        CryptoService.getCryptos(CryptoService.getPage(), CryptoService.getCryptoPerPage(), null).then(listCryptos);

    }

    // private
    function listCryptos(cryptoObjects) {
        CryptoListView.callRender({
            cryptos: cryptoObjects,
            page: CryptoService.getPage(),
            lastCryptoIndex: CryptoService.getTheListLimit()
        });

        CryptoListView.bindClickedRow(cryptoHandler);
        CryptoListView.bindSubmitedSearch(searchCoin);
        CryptoListView.bindPrevButton(prevButtonHandler);
        CryptoListView.bindNextButton(nextButtonHandler);
    }

    // private
    function prevButtonHandler(event) {
        console.log(event);
        CryptoService.setPrevPage();
    }

    // private
    function nextButtonHandler(event) {
        console.log(event);
        CryptoService.setNextPage();
    }

    // private
    function cryptoHandler(event) {
        event.preventDefault();
        var selectedCryptoName = event.currentTarget.id;
        CryptoService.setCryptoName(selectedCryptoName);
        window.location.hash = '#details';

    }

    // private
    function searchCoin(event) {
        var selectedCryptoName = $('#crypto-search')[0].value;
        console.log('Searching: ' + selectedCryptoName + '...');
        CryptoService.getCryptos(null, null, selectedCryptoName).then(listCryptos).catch(CryptoListView.errorNotification);
    }


    return {
        start: start
    };
});
