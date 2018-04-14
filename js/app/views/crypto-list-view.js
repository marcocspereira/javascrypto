define(function() {

    // public
    function render(params) {
        var appDivContainer = document.getElementById('app');

        appDivContainer.innerHTML = inputCryptoSearch();

        if (!params.cryptos) {
            errorNotification('No cryptos');
            return;
        }

        appDivContainer.innerHTML +=  '<div uk-grid class="uk-flex uk-flex-center">' + cryptoCardMaker(params.cryptos) + '</div>';
        appDivContainer.innerHTML += footer(params.page, params.lastCryptoIndex);


    }

    //public
    function bindPrevButton(handler) {
        console.log('estou no prevButon');
        $('#prev-button').on('click', handler);
    }

    // public
    function bindNextButton(handler) {
        console.log('estou no nextButton');
        $('#next-button').on('click', handler);
    }

    //public
    function bindClickedRow(handler) {
        console.log('estou na clickedRow');
        $('.crypto-row').on('click', handler);
    }

    // public
    function bindSubmitedSearch(handler) {
        console.log('estou no botao submit-search');
        $('#submit-search').on('click', handler);
    }

    // public
    function errorNotification(message) {
        console.log('Message before the notifications: ' + message);
        // UIkit API
        UIkit.notification(
            {
                message: '<span uk-icon=\'icon: bolt\'></span> The crypto-thing was not found!',
                icon: 'check',
                pos: 'top-right',
                status: 'danger'
            }
        );
    }

    // private
    function footer(page, lastCryptoIndex) {

        var drawFooter = '<div id="crypto-list-footer">';
        drawFooter += toTopFeature();
        drawFooter += pagination(page, lastCryptoIndex);
        drawFooter += '</div>';
        return drawFooter;
    }

    // private
    function pagination(page, lastCryptoIndex) {
        var drawPagination= '';
        if (page > 0) {
            // previous button
            drawPagination += '<div id="left-side-of-the-force"><a href="#" id="prev-button"><span class="uk-margin-small-right" uk-pagination-previous></span> Previous</a></div>';
        }
        if (page >= lastCryptoIndex) {
            lastPageNotification();
            return drawPagination;
        }
        // next button
        drawPagination += '<div id="right-side-of-the-force"><a href="#" id="next-button">Next <span class="uk-margin-small-left" uk-pagination-next></span></a></div>';
        return drawPagination;
    }

    // private
    function toTopFeature() {
        return '<a href="#" uk-totop uk-scroll id="to-top-feature"></a>';
    }

    // private
    function lastPageNotification() {
        // UIkit API
        UIkit.notification(
            {
                message: '<span uk-icon=\'icon: bolt\'></span> Last page!',
                icon: 'comment',
                pos: 'top-right',
                status: 'warning'
            }
        );
    }

    // private
    function inputCryptoSearch() {
        var idSearchContainer = 'search-container',
            idSearchWrapper = 'search-wrapper',
            idInputSearch = 'crypto-search',
            idSubmitSearch = 'submit-search';
        return '<div id="'+ idSearchContainer +'"<div class="uk-margin" id="' + idSearchWrapper + '">' +
                    '<div class="uk-inline">' +
                        '<span class="uk-form-icon" uk-icon="icon: search"></span>' +
                        '<input class="uk-input" id="' + idInputSearch + '" name="cryptoinput" placeholder="Search crypto . . .">' +
                    '</div>' +
                    ' <button class="uk-button uk-button-primary" id="' + idSubmitSearch + '">Search</button>' +
                '</div></div>';
    }

    // private
    function cryptoCardMaker(cryptos) {
        var cryptosInsideCards = cryptos.map(cryptoCard);
        return cryptosInsideCards.join('');
    }

    // private
    function cryptoCard(crypto) {
        var  classForHandling = 'crypto-row';
        return  '<div><div class="uk-card uk-card-default uk-card-hover uk-card-body">' +
                    '<div class="uk-card-header">' +
                        '<div class="uk-grid-small uk-flex-middle" uk-grid>' +
                            '<div class="uk-width-expand">' +
                                '<h3 class="uk-card-title uk-margin-remove-bottom">'+ '<span class="uk-badge">' + crypto.rank + '</span>' + crypto.name +'</h3>' +
                                '<p class="uk-text-meta uk-margin-remove-top">€ ' + crypto.price_eur + ' / ' + crypto.symbol + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="uk-card-body">' +
                        '<table class="uk-table uk-table-divider uk-table-middle">' +
                            '<thead><tr><th>1h</th><th>24h</th><th>7d</th></tr></thead>' +
                            '<tr>' +
                                '<td>' + labelPercentChange(crypto.percent_change_1h) + '</td>' +
                                '<td>' + labelPercentChange(crypto.percent_change_24h) + '</td>' +
                                '<td>' + labelPercentChange(crypto.percent_change_7d) + '</td>' +
                            '</tr>' +
                        '</table>' +
                    '</div>' +
                    '<div class="uk-card-footer">' +
                        '<a href="#" class="uk-button uk-button-text ' + classForHandling + '" id="' + crypto.id + '">Read more</a>' +
                    '</div>' +
                '</div></div>';

    }

    // private
    function labelPercentChange(percent) {
        if (percent < 0) {
            return '<span class="uk-label uk-label-danger">'+ percent +'%</span>';
        } else if (percent > 0) {
            return '<span class="uk-label uk-label-success">'+ percent +'%</span>';
        }else {
            return '<span class="uk-label">'+ 0 +'%</span>';
        }
    }

    return {
        callRender: render,
        bindClickedRow: bindClickedRow,
        bindSubmitedSearch: bindSubmitedSearch,
        errorNotification: errorNotification,
        bindPrevButton: bindPrevButton,
        bindNextButton: bindNextButton
    };
});

