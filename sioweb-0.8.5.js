/**
* Some cool shit :)
* @author Sascha Weidner, Sioweb
* @copyright Sascha Weidner, Sioweb
* @date 2014-03-04
*
* This Javascript-Library is a minimal Code for higher Browser bigger than 
* Internet Explorer 8. It contains a very simple Class/ID-Selector, and no big 
* Engine like Sizzle - but maybe in for future?! 
*/

(function(window){
var document = window.document,
	sioweb = (function(){

		/* Initialize the System */
		var sioweb = function( val ){
			return new sioweb.cl.newLbr( val );
		};

		/* Something like a constructor :) */
		sioweb.cl = sioweb.prototype = {
			newLbr: function( val ){
				var elem = null,
					AttributSelector = /([a-zA-Z]*)=+(.*)/.exec(val);

				/* some cool CSS stuff */
				if(AttributSelector !== null)
					if(AttributSelector[1] == 'name')
						return sioweb.merge({0:document.getElementsByName(AttributSelector[2])});

				if(val == document)
					return sioweb.merge({0:[document]},sioweb);
				else if(val == 'body')
					return sioweb.merge({0:[document.body]},sioweb);
				else
				{
					if(sioweb.is_string(val))
					{
						if(val.substring(0,1) == '.')
							elem = sioweb.merge({0:document.getElementsByClassName(val.substring(1))},sioweb);
						else
							elem = sioweb.merge({0:[document.getElementById(val)]},sioweb);
					}
					else
						elem = sioweb.merge({0:[val]},sioweb);
				}

				return elem;
				/* Do something cool like loading http://sizzlejs.com/ like jQuery (CSS-Slektor-Framework) */
				/* giving back the Elements? $s(SELECTOR); */
			}
		};

		/* rly rly important to increase the features! */
		sioweb.merge = sioweb.cl.merge = function(){
			var base = {},
				options = arguments[0] || {};
				
			if( arguments[1] === undefined && typeof arguments[1] != "boolean")
				base = this;
			
			for( var i= 0; i < arguments.length ; i++)
				if( arguments[i] !== null )
					for(var value in arguments[i])
						base[ value ] = arguments[i][value];
			
			return base;
		};

		sioweb.merge({
			initialize: function(){
				var scripts = document.getElementsByTagName('script');
				this.each(scripts, function(index, script){
					/**/
					if(typeof script.src != 'undefined' && script.src.match(/\?sioweb=true/i))
					{
						var params = script.src.split('?')[1];
						if(typeof params != 'undefined')
						{
							var paramGroups = params.split('&');
							for(var i = 0;i < paramGroups.length;i++)
							{
								var paramGroup = paramGroups[i].split('=');
								sioweb[paramGroup[0]] = paramGroup[1];
							}
						}
					}
					/**/
				});
			}
		});

		sioweb.merge({
			each: function( container, callback ){
				for(var c in container )
					if( callback( c, container[c]) === false )
						break;
			},
			click: function(){
				var func = arguments[0] || function(){};
				this.addEvent('click',func);
				return this;
			},
			addEvent: function(event, func){
				sioweb.each(this['0'],function(index, elem){
					if(sioweb.is_int(index))
					{
						elem.addEventListener (event, func, false);
						console.log(elem);
					}
				});
			},
			ready: function(callback){
				/**/
				if(this['0'][0].addEventListener)
					this['0'][0].addEventListener('DOMContentLoaded',callback, false);
				else if(this['0'][0].attachEvent)
					this['0'][0].attachEvent( "onreadystatechange", callback );
				/**/
				return this;
			}
		});

		sioweb.merge({
			dragenter: function(){
				var func = arguments[0] || function(){};
				this.addEvent('dragenter',func);
				return this;
			},
			dragexit: function(){
				var func = arguments[0] || function(){};
				this.addEvent('dragexit',func);
				return this;
			},
			dragover: function(){
				var func = arguments[0] || function(){};
				this.addEvent('dragover',func);
				return this;
			},
			dragleave: function(){
				var func = arguments[0] || function(){};
				sioweb.addEvent('dragleave',func);
				return this;
			},
			dragend: function(){
				var func = arguments[0] || function(){};
				sioweb.addEvent('dragend',func);
				return this;
			}
		});

		/* some php-Array-Functions */
		sioweb.merge({
			shuffle: function shuffle(o){ //v1.0
				for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			}
		});

		/* Some Dom-Content */
		sioweb.merge({
			html: function(){
				var Data = [];
				this.each(this[0],function(index, elem){
					if(sioweb.is_int(index))
						Data[index] = elem.innerHTML;
				});
				return Data;
			}
		});

		sioweb.merge({
			addClass: function(val){
				var className = this['0'][0].className;
				var regex = new RegExp("\\b" +val+ "\\b", 'i');
				if(!className.match(regex))
					this['0'][0].className += (className ? ' ' : '')+val;
			},
			removeClass: function(val) {
				var className = this['0'][0].className;
				var regex = new RegExp(".\\b" +val+ "\\b", 'i');

				this['0'][0].className = className.replace(regex,'');
			},
			get: function(val){

			},
			set: function(val){

			}
		});

		/* Some Datatypes */
		sioweb.merge({
			is_float: function(n) {
				n = parseFloat(n);
				return n === +n && n !== (n|0);
			},
			is_int: function(n) {
				n = parseInt(n,10);
				return n === +n && n === (n|0);
			},
			is_string: function(n){
				return (typeof n === "string");
			},
			is_object: function(m){
				return (typeof n == 'object');
			}
		});

		/* Some Ajax */
		sioweb.merge({
			ajax: function(settings){

				if(!settings)
					settings = {};

				/* return it as class to use awesome shit like $s.ajax().open(method,url,smth) */
				return new function(){

					var selfObj = this;
					
					if (window.XMLHttpRequest){
						selfObj.xhr = new XMLHttpRequest();
						//if (selfObj.xhr.overrideMimeType)
							//selfObj.xhr.overrideMimeType('text/xml');

					}
					else if (window.ActiveXObject)
					{
						try {
							selfObj.xhr = new ActiveXObject("Msxml2.XMLHTTP");
						} catch (err) {
							try {
								selfObj.xhr = new ActiveXObject("Microsoft.XMLHTTP");
							} catch (err) {}
						}
					}

					settings = sioweb.merge({
						url: settings.url||'index.php',
						method: settings.method||'post',
						data: settings.data||null,
						smth: settings.smth||true,
						contentMimeType: settings.contentMimeType||null,
						error: settings.error||function(msg){},
						success: settings.success||function(msg){},
						onsending: settings.onsending||function(state,status){
							if(state == 4)
								if(status == 200)
									selfObj.success(selfObj.xhr.responseText);
								else
									selfObj.error(selfObj.xhr.responseText);
						}
					},settings);

					this.success = function(msg){
						settings.success(msg);
					};

					this.error = function(msg){
						settings.error(msg);
					};

					this.onsending = function(){
						if(selfObj.xhr.readyState == 1)
							return false;
						settings.onsending(selfObj.xhr.readyState,selfObj.xhr.status);
					};

					this.open = function(){
						var method = arguments[0]||settings.method,
							url = arguments[1]||settings.url,
							smth = arguments[2]||settings.smth;

						selfObj.xhr.open('POST', url, smth);
					};

					this.send = function(){
						if(settings.contentMimeType !== null)
							selfObj.xhr.setRequestHeader("Content-Type", settings.contentMimeType);
						selfObj.xhr.setRequestHeader("X_REQUESTED_WITH", "XMLHttpRequest");
						
						selfObj.xhr.send(settings.data);
					};

					selfObj.xhr.onreadystatechange = this.onsending;
					this.open();
					this.send();
				};
			}
		});
	
		/* File-Uploader with Drag&Drop (HTML5 - >= IE9)*/
		sioweb.merge({
			uploadAjax: function(settings){
				var events = {},
					std_event = function(e){
						e.stopPropagation();
						e.preventDefault();
					};

				if(!settings)
					settings = {};

				settings = this.merge({
					url: settings.url||'',
					data: settings.data||{}
				},settings);

				events = this.merge({
					dragout: settings.dragout||std_event,
					dragleave: settings.dragleave||std_event,
					dragend: settings.dragend||std_event,
					dragover: settings.dragover||std_event,
					drop: settings.drop||function(e){
						var files;
						e.stopPropagation();
						e.preventDefault();

						if(typeof this.files != 'undefined')
							files = this.files;
						if(typeof e.dataTransfer != 'undefined')
							files = e.dataTransfer.files;

						sioweb(this).removeClass('sw_drag_over');
						
						sioweb.sendFiles(files,settings);
					}
				},events);

				this.each(this['0'],function(index, elem){
					if(sioweb.is_int(index))
						sioweb.each(events, function(evt, callback){
							elem.addEventListener(evt,callback,false);
						});
				});
			},
			sendFiles: function(files,settings){
				var form = this.FormData();

				if(settings.data)
					sioweb.each(settings.data,function(index, value){
						form.append(index, value);
					});

				for (var i = 0; i < files.length; i++)
					form.append('fileselect[]', files[i]);

				form.append('REQUEST_TOKEN',sioweb.request_token);

				this.ajax({
					contentMimeType: form.contentMimeType||null,
					url: settings.url,
					data: form
				});
			},
			FormData: function(){
				if(typeof window.FormData != 'undefined')
					return new FormData();

				return (function(sioweb){
					var dashdash = "--",
						boundary = '',
						fields = [],
						boundaryValues = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

					boundary = "--------FormData" + sioweb.shuffle(boundaryValues).slice(0,10).join('');
		
					this.contentMimeType = "multipart/form-data; boundary="+boundary;

					this.append = function(key, value) {
						fields.push([key, value]);
					};
					this.toString = function() {
						var body = "";
						sioweb.each(fields,function(index,field) {
							body += dashdash + boundary + "\r\n";
							// file upload
							if (field[1].name) {
								body += "Content-Disposition: form-data; name=\""+ field[0] +"\"; filename=\""+ field[1].name +"\"\r\n";
								body += "Content-Type: "+ field[1].type +"\r\n\r\n\r\n";
							} else {
								body += "Content-Disposition: form-data; name=\""+ field[0] +"\";\r\n\r\n";
								body += field[1] + "\r\n";
							}
						});
						body += dashdash + boundary + dashdash;
						return body;
					};

					return this;
				})(sioweb);
			}
		});
		return sioweb;
	})();
	/* Make'em Global :) but not with this damn $ (use $s) */
	window.$s = window.sioweb = sioweb;
	sioweb.initialize();
})(window);