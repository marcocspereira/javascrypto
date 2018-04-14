define(['models/crypto', 'models/detail'], function(Crypto, Detail) {
    var API_BASE_URL = 'https://api.coinmarketcap.com/v1/';
    var MAGIC_LIMIT = 1500;
    var MAGIC_PER_PAGE = 100;
    var cryptoName;
    var page = 0;

    // private
    function promiseApiRequest(path) {
        // Promise
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: API_BASE_URL + path,
                dataType: 'json',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    // private
    function promiseCryptos(results) {
        return results.map( function(crypto) {
            var newCrypto = new Crypto(crypto);
            return newCrypto;
        });
    }

    // private
    function handlingWrongCall(error) {
        console.log('Something goes wrong with the call...I promise');
        console.log(error.responseJSON.error);
    }

    // public
    function setNextPage() {
        page += MAGIC_PER_PAGE;
    }

    // public
    function setPrevPage() {
        page -= MAGIC_PER_PAGE;
    }

    // public
    function getPage() {
        return page;
    }

    // public
    function setCryptoName(name) {
        cryptoName = name;
    }

    // public
    function getCryptoName() {
        return cryptoName;
    }

    // public
    function getCryptos(start, limit, cryptoNameToSearch) {
        var path;

        if( cryptoNameToSearch ) {
            path = 'ticker/' + cryptoNameToSearch + '/?convert=EUR';
        } else {
            path = 'ticker/?convert=EUR&start=' + start + '&limit=' + limit;
        }

        return promiseApiRequest(path)
            .catch(handlingWrongCall)
            .then(promiseCryptos);
    }

    // public
    function getSelectedCrypto(selectedCrypto) {
        var path = 'ticker/' + selectedCrypto + '/?convert=EUR';

        return promiseApiRequest(path).then(function(results) {
            results = results[0];
            var newCryptoDetail = new Detail(results);
            return newCryptoDetail;
        });

    }

    // public
    function getTheListLimit() {
        return MAGIC_LIMIT;
    }

    // public
    function getCryptoPerPage() {
        return MAGIC_PER_PAGE;
    }

    return {
        getCryptos: getCryptos,
        getSelectedCrypto: getSelectedCrypto,
        getCryptoName: getCryptoName,
        setCryptoName: setCryptoName,
        setNextPage: setNextPage,
        setPrevPage: setPrevPage,
        getPage: getPage,
        getTheListLimit: getTheListLimit,
        getCryptoPerPage: getCryptoPerPage
    };

});
