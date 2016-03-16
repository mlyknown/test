;(function() {
    var vueTap = {};
    vueTap.install = function(Vue) {
        Vue.directive('tap', {
            isFn : true,
            params: ['a'],
            acceptStatement:true,
            bind : function() {
                debugger
            },
            update : function(fn) {
                
                 var self = this; //存下this，方便以后用
                //在directive上绑定的属性和方法
                //都可通过self.xxx   self.touchstart()获取
                self.tapObj = {}; //初始化我们的tap对象

                if(typeof fn !== 'function') {
                //你别给我搞事！
                    return console.error('The param of directive "v-tap" must be a function!');
                }
                
                self.handler = function(e) { //给当前directive存个handler方便之后调用
                    debugger
                    e.tapObj = self.tapObj; 
                    //把我们的tap对象赋值给原生event对象上，方便回调里获取参数
                    fn.call(self,e);
                };
                
                //把我们的start和end剥离出来，写在directive上
                //由于只有tap事件，所以我们在move过程就不需要做处理
                this.el.addEventListener('touchstart',function(e) {
                    self.touchstart(e,self);
                },false);
                
                this.el.addEventListener('touchend',function(e) {
                    console.log(e.changedTouches[0].clientX);
                    self.touchend(e,self,fn);
                },false);
                this.el.addEventListener('touchmove',function(e) {
                    // console.log(e.changedTouches[0].clientX);
                },false);
            },
            unbind : function() {},
            isTap : function() {
                var tapObj = this.tapObj;
                return this.time < 150 && Math.abs(tapObj.distanceX) < 2 && Math.abs(tapObj.distanceY) < 2;
            },
            touchstart : function(e,self) {
                var touches = e.touches[0];
                var tapObj = self.tapObj;
                tapObj.pageX = touches.pageX;
                tapObj.pageY = touches.pageY;
                tapObj.clientX = touches.clientX;
                tapObj.clientY = touches.clientY;
                self.time = +new Date();
            },
            touchend : function(e,self) {
                var touches = e.changedTouches[0];
                var tapObj = self.tapObj;
                self.time = +new Date() - self.time;
                tapObj.distanceX = tapObj.pageX - touches.pageX;
                tapObj.distanceY = tapObj.pageY - touches.pageY;

                if (self.isTap(tapObj))
                    self.handler(e);
            }
        });
    };        

    if (typeof exports == "object") {
        module.exports = vueTap;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return vueTap })
    } else if (window.Vue) {
        window.vueTap = vueTap;
        Vue.use(vueTap);
    }

})();