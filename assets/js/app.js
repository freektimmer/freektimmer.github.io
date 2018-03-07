(function () {
    var depth = function () {

        var defaults = {
        };

        // Merge given proporties with defaults
        if (!arguments[1] || typeof arguments[1] === "object") {
            this.options = mergeObjects(defaults, arguments[1]);
        }

        if (arguments[0]) {
            this.instance = document.querySelectorAll(arguments[0])[0];
            this.instance = initInstance(this.instance);
        }

        function mergeObjects() {
            var obj = {};
            for (var i = 0; i < arguments.length; i++) {
                for (var property in arguments[i]) {
                    obj[property] = arguments[i][property];
                }
            }
            return obj;
        }
        
        function initInstance(el){
          el.style.willChange = 'transform';
          el.style.transformStyle = 'preserve-3d';
          return el;
        }

        initScreen();
        window.addEventListener('resize', initScreen.bind(this));

        function initScreen() {
            this.vw = window.innerWidth;
            this.vh = window.innerHeight;
            this.instance.rect = this.instance.getBoundingClientRect();
            this.instance.rect.cx = this.instance.rect.x + this.instance.rect.width / 2;
            this.instance.rect.cy = this.instance.rect.y + this.instance.rect.height / 2;
        }

        document.addEventListener('mousemove', initEvent.bind(this));

        function initEvent(e) {
            var x = (e.clientX - this.instance.rect.cx) / 1000 * 40;
            var y = (e.clientY - this.instance.rect.cy) / 1000 * 40;
            this.instance.style.transform = 'perspective(300px) rotateY(' + -x + 'deg) ' + 'rotateX(' + y + 'deg)';   
        }
    }
    window.depth = depth;
})();

depth('.js-depth');
