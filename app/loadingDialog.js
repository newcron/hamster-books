(function () {
    var continueAnimation = false;
    var $canvas;
    var context;
    var height, width;

    var animationInvoker = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    function animate() {
        if (continueAnimation) {
            animationInvoker(animate);
        }


        context.clearRect(0, 0, width, height);
        var time = new Date().getTime() / 5000;

        render(14, 9, time);

        render(14, 9, time/2);
        render(14, 9, time/4);


    }

    function render(xMult, yMult, time) {

        var radius = height/20;
        var inset = radius * 1.2;
        var widthExtension = width / 2 - inset;
        var x = widthExtension * Math.sin(xMult * time) + widthExtension + inset;
        var heightExtension = height / 2 - inset;
        var y = heightExtension * Math.cos(yMult * time) + heightExtension + inset;
        context.beginPath();

        context.arc(x, y, radius, 0, 2 * Math.PI, true);
        context.fillStyle = '#353329';
        context.fill();
    }

    define(["view"], function (view) {
        return {
            show: function () {
                view.showAsDialog("loading-dialog", {title: "Laden"}, function(){
                    continueAnimation = false;
                });
                $canvas = $("#loading-spinner");
                width = $canvas[0].width;
                height = $canvas[0].height;
                context = $canvas[0].getContext("2d");
                continueAnimation = true;
                animationInvoker(animate);
            }
        }

    });
})();
