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
        },
        initEvent: function () {

        }
    };
    return main;
})(jQuery)
