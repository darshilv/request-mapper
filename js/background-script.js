(function () {

    var mapper, mappers, storedMappers;

    storedMappers = window.localStorage.getItem('requestMapper');

    if (storedMappers !== null && storedMappers !== 'null') {

        mappers = JSON.parse(storedMappers);

        for (mapper in mappers) {
            mappers[mapper].findRegEx = new RegExp(mappers[mapper].find);
        }

        chrome.webRequest.onBeforeRequest.addListener(function (details) {
            var mapper;
            for (mapper in mappers) {
                if (details.url.match(mappers[mapper].findRegEx)) {
                    return {
                        redirectUrl: details.url.replace(mappers[mapper].findRegEx, mappers[mapper].replace)
                    };
                }
            }
        }, { urls: ['<all_urls>'] }, ['blocking']);

    }

})();