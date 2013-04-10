(function () {

    var baseURL = 'https://secure.slic.dev/assets';

    var urlMatches = {
        js: new RegExp('.*\\/resource\\/1365555934000\\/slic_assets\\/js/'),
        styles: new RegExp('.*\\/resource\\/1365555934000\\/slic_assets\\/styles/')
    };

    chrome.webRequest.onBeforeRequest.addListener(function (details) {

        if ( details.url.match(urlMatches.styles) ) {

            return {
                redirectUrl: details.url.replace(urlMatches.styles, baseURL + '/styles/')
            };

        }

        if ( details.url.match(urlMatches.js) ) {

            return {
                redirectUrl: details.url.replace(urlMatches.js, baseURL + '/js/')
            };

        }

    }, { urls: ['<all_urls>'] }, ['blocking']);

})();