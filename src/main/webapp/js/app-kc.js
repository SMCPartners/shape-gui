(function (window) {
    //'use strict';

    var keycloak = Keycloak();

    function loadProfile() {
        keycloak.loadUserProfile().success(function (profile) {
            output(profile);
        }).error(function () {
            output('Failed to load profile');
        });
    }

    function refreshToken(minValidity) {
        keycloak.updateToken(minValidity).success(function (refreshed) {
            if (refreshed) {
                output(keycloak.tokenParsed);
            } else {
                output('Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(function () {
            output('Failed to refresh token');
        });
    }

    function showExpires() {
        if (!keycloak.tokenParsed) {
            output("Not authenticated");
            return;
        }

        var o = 'Token Expires:\t\t' + new Date(keycloak.tokenParsed.exp * 1000).toLocaleString() + '\n';
        o += 'Token Expires in:\t' + Math.round(keycloak.tokenParsed.exp - new Date().getTime() / 1000) + ' seconds\n';

        o += 'Refresh Token Expires:\t' + new Date(keycloak.refreshTokenParsed.exp * 1000).toLocaleString() + '\n';
        o += 'Refresh Expires in:\t' + Math.round(keycloak.refreshTokenParsed.exp - new Date().getTime() / 1000) + ' seconds';
        output(o);
    }

    function output(data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data, null, '  ');
        }
        console.log(data);
    }

    keycloak.onAuthSuccess = function () {
        console.log('Auth Success');
        mainPage.route = 'home';
        app.select = 'main';
    };

    keycloak.onAuthError = function () {
        console.log('Auth Error');
    };

    keycloak.onAuthRefreshSuccess = function () {
        console.log('Auth Refresh Success');
    };

    keycloak.onAuthRefreshError = function () {
        console.log('Auth Refresh Error');
    };

    keycloak.onAuthLogout = function () {
        console.log('Auth Logout');
    };

    keycloak.init().success(function (authenticated) {
        output('Init Success (' + (authenticated ? 'Authenticated' : 'Not Authenticated') + ')');
    }).error(function () {
        output('Init Error');
    });

    app.addEventListener('template-bound', function () {
        var testDlg = document.querySelector("#testDlg");
        var loginPage = document.querySelector('#loginPage');
        var mainPage = document.querySelector('#mainPage');
        console.log('Our app is ready to rock!');
    });

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function () {
        document.querySelector('body').removeAttribute('unresolved');
        keycloak.init().success(function(authenticated) {
            output('Init Success (' + (authenticated ? 'Authenticated' : 'Not Authenticated') + ')');
        }).error(function() {
            output('Init Error');
        });
        app.select = "login";
    });

    kc = keycloak;

})(window);
