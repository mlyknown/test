// JavaScript Document
/*my javascript library v1.2.2*/
/*written by Lecaf*/
/*update by 2011.5.5*/

/*getElementById
 * @param {String} id ID值
 */
var $id = function(id){
	if(typeof id != 'undefined' && typeof id === 'string'){
		return document.getElementById(id);
	}
	return null;
}

/*讲参数转换为数组
 * @param {all} a 参数
 */
var $A = function(a){
	if(!a)return [];
	if(a instanceof Array)return a;
	var arr = [],
		len = a.length;
	if(/string|number/.test(typeof a) || a instanceof Function || len === undefined){
		arr[0] = a;
	}else{
		for(var i = 0;i < len;i++){
			arr[i] = a[i];
		}
	}
	return arr;	
}

/*注销事件
 * @param {Object} oTarget 对象
 * @param {String} sEventType 事件类型
 * @param {Function} fnHandler 事件方法
 */
var removeEventHandler = function(oTarget, sEventType, fnHandler) {
	if(oTarget.listeners && oTarget.listeners[sEventType]){
		var listeners = oTarget.listeners[sEventType];
		for(var i = listeners.length-1;i >= 0 && fnHandler;i--){
			if(listeners[i] == fnHandler){
				listeners.splice(i,1);
			}
		}
		if((!listeners.length || !fnHandler) && listeners["_handler"]){
			oTarget.removeEventListener ? oTarget.removeEventListener(sEventType, listeners["_handler"], false) : oTarget.detachEvent('on' + sEventType, listeners["_handler"]);		
			delete oTarget.listeners[sEventType];
		}
	}	
}
/*添加事件
 * @param {Object} oTarget 对象
 * @param {String} sEventType 事件类型
 * @param {Function} fnHandler 事件方法
 */
var addEventHandler = function(oTarget, sEventType, fnHandler) {
	oTarget.listeners = oTarget.listeners || {};
	var listeners = oTarget.listeners[sEventType] = oTarget.listeners[sEventType] || [];
	listeners.push(fnHandler);
	if(!listeners["_handler"]){
		listeners["_handler"] = function(e){
			var e = e || window.event;
			for(var i = 0,fn;fn = listeners[i++];){
				fn.call(oTarget,e)
			}
		}
		oTarget.addEventListener ? oTarget.addEventListener(sEventType, listeners["_handler"], false) : oTarget.attachEvent('on' + sEventType, listeners["_handler"]);
	}	
}

/*触发事件
 * @param {Object} oTarget 对象
 * @param {String} sEventType 事件类型
 */
var dispatchEventHandler = function(oTarget,sEventType){
	if(oTarget.dispatchEvent){
		var e = document.createEvent('Event');
		e.initEvent(sEventType,true,true);
		oTarget.dispatchEvent(e);
	}else{
		oTarget.fireEvent('on'+sEventType);
	}
}

/*json扩展
 * @param {Object} arguments[0] 目标json
 * @param {Object} arguments[1,2,3,...,n] 源json
 */
var extendJson = function(){
	arguments[0] = arguments[0]||{}
	for(var i = 1,len = arguments.length;i < len;i++){
		for(var para in arguments[i]){
			arguments[0][para] = arguments[i][para];
		}
	}
	return arguments[0];
}

/*在目标元素之后插入新元素 js自带方法: target.appendChild(newDoc);target.insertBefore(newDoc,existingChild);
 * @param {Document} newEl 新元素
 * @param {Document} targetEl 目标元素
 */
var insertAfter = function(newEl,targetEl){
	var parentEl = targetEl.parentNode;
	if(parentEl.lastChild == targetEl){
		parentEl.appendChild(newEl);
	}else{
		parentEl.insertBefore(newEl,targetEl.nextSibling);
	}
}

/*动态加载CSS文件
 * @param {String} file css路径
 * @param {String} cssid css link ID
 */
var loadCSS = function (file,cssid){
	var cssTag = cssid ? document.getElementById(cssid) : null;
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) head.removeChild(cssTag);
    css = document.createElement('link');
    css.href = file;
    css.rel  = 'stylesheet';
    css.type = 'text/css';
    if(cssid){css.id = cssid;}
    head.appendChild(css);
}

/*$ajax封装
 * @Function sDomain 同域ajax $ajax.sDomain({...})
 * @Function cDomain 跨域ajax $ajax.cDomain({...}) url返回json格式的js对象:jsonp
 * @param {Object} options 参数集
 * @param {String} url 链接
 * @param {String} type 传参方式 'POST' or 'GET'（默认）
 * @param {Bool} async 是否异步 true异步（默认） false同步
 * @param {String} dataType 返回数据类型 'html'（默认） 'xml' 'json'
 * @param {Function} beforeSend 发送请求前调用函数
 * @param {Function} success 请求成功后回调函数
 * @param {Function} complete 请求完成后回调函数（不管成功与否）
 * @param {Bool} cache 读取缓存 true(默认) or false
 */
var $ajax = function(win){
	var ajaxops={
		url:'',
		type:'GET',
		async:true,
		dataType:'html',
		data:null,
		beforeSend:null,
		success:function(){},
		error:function(){},
		complete:null,
		cache:true
	}
	var isFF = navigator.userAgent.indexOf('Firefox')>0,
		//isIE = /*@cc_on!@*/!1,
		ie678 = !-[1,],
		opera = win.opera,
		doc  = win.document,
		head = doc.getElementsByTagName('head')[0];
		
	var createXMLHttpRequest = function(){
		var xmlHttp;
		try{
			// Firefox, Opera 8.0+, Safari
			xmlHttp = new XMLHttpRequest();
		}catch (e){
			// Internet Explorer
			try{
				xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			}catch (e){
				try{
					xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
				}catch (e){
					alert('您的浏览器不支持AJAX！');
					return false;
				}
			}
		}
		return xmlHttp;
	}
	var request = function(xmlHttp,sops){
		if(( xmlHttp.status >= 200 && xmlHttp.status < 300 ) || xmlHttp.status === 304 || xmlHttp.status === 1223 || xmlHttp.status === 0){
			var msg;
			switch(sops.dataType){
				case 'html':	/*返回html*/
					msg=xmlHttp.responseText;
					break;
				case 'xml':		/*返回xml*/
					msg=xmlHttp.responseXML;
					break;
				case 'json':	/*返回json格式字符串,通过new Function()转换为json对象*/
					msg=xmlHttp.responseText;
					msg=(new Function('return '+msg))();
					break;
				default:		/*其余情况视返回html*/
					msg=xmlHttp.responseText;
					break;
			}
			sops.success(msg);
		}else{
			sops.error();
		}
	}
	/*同域ajax,通过使用XMLHttpRequest*/
	var sAjax = function(options){
		var sops=extendJson({},ajaxops,options);
		
		if(sops.url){
			var xmlHttp = createXMLHttpRequest(),
				requestDone = false;
			if(!xmlHttp){return false;}
			var hasPara = /\?/.test(sops.url);
			if(sops.type.toUpperCase() == 'GET' && sops.data){
				sops.url += hasPara ? "&" : "?" + sops.data;
				sops.data = null;
			}
			if(!sops.cache){sops.url += hasPara ? "&ts=" : "?ts=" + (new Date).getTime();}
			
			if(!sops.async && isFF){
				/*同步ajax,FF不支持onreadystatechange,使用onload来解决*/
				xmlHttp.onload = function(){
					request(xmlHttp,sops);
					if(sops.complete && !requestDone){
						sops.complete();
						requestDone=true;
					}
				}
			}else{
				xmlHttp.onreadystatechange = function(){		
					if(xmlHttp.readyState === 4){
						request(xmlHttp,sops);
						if(sops.complete && !requestDone){
							sops.complete();
							requestDone = true;
						}
					}
				}
			}
			if(sops.beforeSend){
				sops.beforeSend();
			}
			xmlHttp.open(sops.type,sops.url,sops.async);
			if(sops.type.toUpperCase() == 'POST'){
				xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
			}  

			xmlHttp.send(sops.data);
		}
	}
	/*跨域ajax,通过使用script,返回一个json格式的js对象jsonp*/
	var cAjax = function(options){
		var cops = extendJson({},ajaxops,options),
			hasPara = /\?/.test(cops.url),
			done = false;
		if(cops.type.toUpperCase() == 'GET' && cops.data){
			cops.url += hasPara ? "&" : "?" + cops.data;
		}
		if(!cops.cache){cops.url += hasPara ? "&ts=" : "?ts=" + (new Date).getTime();}
		
		var script = doc.createElement('script');
		
		var callback = function(isSucc){
			if(isSucc){
				if(typeof jsonp != 'undefined'){
					done = true;
					cops.success(jsonp);
					delete jsonp;
				}else{
					cops.error();
				}
			}else{
				cops.error();
			}
				
			// Handle memory leak in IE
			script.onload = script.onerror = script.onreadystatechange = null;
			if( head && script.parentNode ){
				head.removeChild(script);
			}
		}
		if(ie678){
			script.onreadystatechange = function(){
				var readyState = this.readyState;
				if(!done && (readyState == 'loaded' || readyState == 'complete')){
					callback(true);
				}
			}
		}else{
			script.onload = function(){
				callback(true);
			}
			script.onerror = function(){
				callback();
			}
			if(opera){
				setTimeout(function(){
					if(!done){
						callback();
					}
				}, 5000);
			}
		}
		script.src = cops.url;
		head.insertBefore(script, head.firstChild);
	}
	return {sDomain:sAjax,cDomain:cAjax};
}(this)
/* 兼容老版本 */
var ajaxFun = function(options){
	$ajax.sDomain(options);
}

/*
 * $class 写类工具函数
 * @param {Function} constructor
 * @param {Object} prototype
 * write by Snandy http://www.cnblogs.com/snandy/
 */
var $class = function(constructor,prototype) {
	var c = constructor || function(){},
		p = prototype || {};
	return function() {
		for(var atr in p) {
			arguments.callee.prototype[atr] = p[atr];
		}			
		c.apply(this,arguments);
	}
}

/*
 * $extendPrototype 扩展prototype函数
 * @param {Function} constructor
 * @param {Object} prototype
 */
var $extendPrototype = function(constructor,prototype) {
	var c = constructor || function(){},
		p = prototype || {};
	for(var atr in p) {
		c.prototype[atr] = p[atr];
	}
	return c;
}

/* 
 * String扩展
 */
var strEx = {
	removeJS : function(){	/*删除Script字符串内容*/
		return this.replace(/<script[^>]*?>([\w\W]*?)<\/script>/ig,'');
	},
	getJS : function(){		/*将Script字符串转换为Script对象,返回Script or false*/
		var js = this.replace(/[\s\S]*?<script[^>]*?>([\w\W]*?)<\/script>[\s\S]*?/g,'$1\r');
		if(js == this){
			return false;
		}else{
			var s = document.createElement('script');
			s.text = js;
			return s;
		}
	},
	trim : function(str){	/*删除首尾相应内容,参数为空则删除空格*/
		var reg;
		if(str){
			str = str.replace(/([\.\+\?\*\\\^\&\[\]\(\)\{\}\$\,])/g,'\\$1');
			reg = new RegExp("^(" + str +")+|(" + str + ")+$","g");/* 特殊字符 (. + ? * \ ^ & [ ] ( ) { } $ ,) */
		}else{
			reg = /^\s+|\s+$/g;
		}
		return this.replace(reg,"");
	}
}
String = $extendPrototype(String,strEx);
