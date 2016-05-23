// JavaScript Document
/*Lazyload v1.2*/
/*written by Lecaf*/
/*update by 2011.4.8*/
var Lazyload=function(options){
	this._init(options);/*初始化*/
	this._doLoad();/*第一次加载*/
	if(!this.elems.length)this._release();/*如果加载元素为空，释放*/
}
var proto={
	/*初始化参数*/
	_init:function(options){
		this.binder=null; /*加载容器对象*/
		this.range={}; /*加载容器显示范围*/
		this.elems=[];/*加载对象队列*/
		this.container=null;
		this.mode="";
		this.lock=false;/*加载容器锁定*/
		this.elock=false;/*加载元素锁定*/
		this.timer=null;/*_doLoad计时器*/
		this.options={ /*定制参数*/
			container:window,/*加载容器*/
			elems:null,/*加载数据集合*/
			mode:"v",/*加载模式 v(垂直加载) h(水平加载) c(交叉加载) 默认v*/
			ondataload:null,/*数据加载方式*/
			ondataend:function(){}/*数据加载完毕*/
		}
		extendJson(this.options,options||{});
		this.elems=$A(this.options.elems);/*加载对象转换成数组*/
		this.mode=this.options.mode;
		this._onDataLoad=this.options.ondataload || function(elem){ /*数据加载*/
			var h=elem.getElementsByTagName("textarea");
			if(h.length){
				var js=h[0].value.getJS(); /*解决innerHTML javascript不执行的问题*/
				if(js){
					elem.innerHTML=h[0].value.removeJS(); /*删除javascript字符串*/
					elem.appendChild(js);
				}else{
					elem.innerHTML=h[0].value;
				}
			}
			this.elock=false;
		}
		this._onDataEnd=this.options.ondataend; /*所有内容加载完执行*/
		this._initContainer(this.options.container);/*初始化容器*/
	},
	/*初始化容器*/
	_initContainer:function(c){
		var doc=document;
		var _this=this;
		var isWin = c==window||c==doc||c==null||!c.tagName||/body|html/i.test(c.tagName);/*判断容器是否是window*/
		if(isWin)c=doc.documentElement;
		this.container=c;
		/*获取容器显示范围方法*/
		var _getContainerRange=isWin&&window.innerWidth?function(){
			return {top:0,left:0,right:window.innerWidth,bottom:window.innerHeight}
		}:function(){
			return _this._getRect(c);
		}
		this._refreshRange=function(){
			_this.range=_getContainerRange();
		}
		this._refreshRange();
		this._scrollload=function(){
			if(!isWin){_this._refreshRange();}
			_this._doLoad();
		}
		this._resizeload=function(){
			_this._refreshRange();
			_this._doLoad();
		}
		this.binder = isWin ? window : c;
		addEventHandler(this.binder,"scroll",this._scrollload);
		addEventHandler(this.binder,"resize",this._resizeload);
		
		this._noWinScroll=function(){ /*解决刷新时window滚动条定位后造成range错误bug*/
			_this.range=_getContainerRange();
			removeEventHandler(window,"scroll",_this._noWinScroll);
		}
		if(!isWin)addEventHandler(window,"scroll",this._noWinScroll);
	},
	/*获取元素位置参数*/
	_getRect:function(elem){
		var r=elem.getBoundingClientRect();/*元素到窗口左上角距离*/
		return {top:r.top,left:r.left,bottom:r.bottom,right:r.right}
	},
	/*加载判断，防止多次调用
	 @lock锁定，加载过程中锁定。如果为false，执行加载；如果为true，延迟递归
	*/
	_doLoad:function(){
		var _this=this;
		if(!this.lock){
			this.lock=true;
			setTimeout(function(){_this._loadRun()},100);
		}else{
			clearTimeout(this.timer);
			var self=arguments.callee;
			this.timer=setTimeout(function(){self.call(_this)},100);
		}
	},
	/*加载运行*/
	_loadRun:function(){
		var elems=this.elems;
		if(elems.length){
			for(var i=0;i<elems.length;i++){
				var rect=this._getRect(elems[i]);
				var side=this._isRange(this._inRange(rect));
				if(side&&side!=0){
					if(side==1&&!this.elock){
						this.elock=true;
						this._onDataLoad(elems[i]);
						elems.splice(i--,1);/*加载完之后将该对象从队列中删除*/
					}else{break;}
				}
			}			
			if(!elems.length){
				this._release();
			}
		}
		this.lock=false;
	},
	/*判断对象相对容器位置*/
	_inRange:function(rect){
		var range=this.range;
		var side={
			v : rect.top<=range.bottom ? rect.bottom>=range.top ? "in" : "" : "bottom",/*垂直位置*/
			h : rect.left<=range.right ? rect.right>=range.left ? "in" : "" : "right" /*水平位置*/
		};
		return side;
	},
	_isRange:function(side){
		/*1：加载 -1：跳出循环 0：不加载执行下一个*/
		return {
			v:side.v ? side.v=="in"?1:-1 : 0,
			h:side.h ? side.h=="in"?1:-1 : 0,
			c:side.v&&side.h ? side.v=="in"&&side.h=="in"? 1:side.v!="in"?-1:0 : 0
		}[this.mode||"c"]
	},
	/*释放*/
	_release:function(){
		removeEventHandler(this.binder,"scroll",this._scrollload);
		removeEventHandler(this.binder,"resize",this._resizeload);
		this._onDataEnd();
	}
}

window.onload=function(){
	var Divload=$class(Lazyload,proto);
	var divload=new Divload({
		elems:$id('loadmain').getElementsByTagName('div'),
		container:$id("loadbox"),
		mode:"c"
	});
	var Winload=$class(Lazyload,proto);
	var winload=new Winload({
		elems:$id("ajaxbox").getElementsByTagName("div"),
		container:window,
		ondataload:function(elem){		
			var othis=this;
			ajaxFun({
				url:"ajax.html",
				beforeSend:function(){
					elem.getElementsByTagName("p")[0].style.display="";
				},
				success:function(msg){
					var box=document.getElementById("ajaxload");
					box.innerHTML=box.innerHTML+msg;
				},
				complete:function(){
					othis.elock=false;
				}
			})
		}
	})
}
