(function (window) {
    //'use strict';

    var app = document.querySelector('#app');
    var appAuth = null;

    app.addEventListener('template-bound', function () {
        var testDlg = document.querySelector("#testDlg");
        //var testDemIn = document.querySelector("#testDemIn");
        var loginPage = document.querySelector('#loginPage');
        var editUserRegistration = document.querySelector("#editUserRegistration");
        //var mainPage = document.querySelector('#mainPage');
        console.log('Our app is ready to rock!');
    });

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function () {
        document.querySelector('body').removeAttribute('unresolved');
        appAuth = document.querySelector("#appAuth");
        appAuth.initialize();
        app.select = "login";
    });

})(window);