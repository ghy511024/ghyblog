$(document).ready(function () {
    Main.init();
});
var Main = (function ($) {
    var main = {
        init: function () {
            this.layout();
        },
        layout: function () {
            $("#header").load("../model/header.html");
            $("#footer").load("../model/footer.html");
            hljs.configure({tabReplace: '    '});
            hljs.initHighlightingOnLoad();
        },
        initEvent: function () {

        }
    };
    return main;
})(jQuery)
