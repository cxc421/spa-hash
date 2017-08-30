var web = (function(){
	//---------- BEGIN MODULE SCOPE VARIABLES ----------//
	var configMap = {
				headerDef : [
					{text: 'Page 1', script: 'page1.js', prop: 'p1'},
					{text: 'Page 2', script: 'page2.js', prop: 'p2'},
					{text: 'Page 3', script: 'page3.js', prop: 'p3'},
					{text: 'Page 4', script: 'page4.js', prop: 'p4'},
				]
			},
			stateMap = {

			},
			jqueryMap = {

			};
	//---------- END MODULE SCOPE VARIABLES ----------//

	//---------- BEGIN PRIVATE FUNCTIONS -----------//
	function initHTML ($container) {
		var headerDef = configMap.headerDef;
		$container.html( String()
			+ '<div class="web">'
				+ '<div class="header">'
					+ headerDef.reduce(function(tot,obj){
						return tot + ('<div class="nav">' + obj.text  + '</div>');
					}, '')
				+ '</div>'
				+ '<div class="main-content">'
				+ '</div>'
				+ '<div class="mask"></div>'
			+ '</div>'
		);
	}
	function setJqueryMap ($container) {
		jqueryMap = {
			$nav        : $container.find('.header').find('.nav'),
			$mainContent: $container.find('.main-content'),
		};
	}
	function setSelectNavBackground (navDef) {
		var $preSelectNav = null;
		var idx = configMap.headerDef.findIndex(function(obj){
			return obj === navDef;
		});				
		if (idx >= 0) {
			$preSelectNav = jqueryMap.$nav.filter('.nav-select');
			if ($preSelectNav.length) {
				$preSelectNav.removeClass('nav-select');
			}
			jqueryMap.$nav.eq(idx).addClass('nav-select');
		}
	}

	var loadScript = (function(){
		var alreadyLoad = {};
		var xhr = null;
		return function (url, callback) {
      if(xhr && xhr.readyState != 4){
         xhr.abort();
      }	
      if (alreadyLoad[url]) {
      	return callback(true);
      }
      xhr = $.ajax({
      	url: url,
			  dataType: "script",
			  success: function(){
			  	//setTimeout(function(){
				  	alreadyLoad[url] = true;
				  	callback(true);
			  	//}, 1000);
			  },
			  error: function () {
			  	callback(false);
			  }
      });		
		};
	})();
	function setHash (newHash) {
		if(history.pushState) {
		    history.pushState(null, null, '#' + newHash);
		}
		else {
		    location.hash = '#' + newHash;
		}	
		$(window)	.trigger('hashchange');		
	}
	//---------- END PRIVATE FUNCTIONS -----------//

	//---------- BEGIN EVENT FUNCTIONS -----------//
	function onClickNav () {
		var index = jqueryMap.$nav.index($(this));		
		var newHash = configMap.headerDef[index].prop;
		setHash(newHash);
	}
	function onHashchange (evt) {
		var hash = location.hash.slice(1);				
		var headerDef = configMap.headerDef;		
		//console.log('hash change');
		//console.log(hash);
		var obj = headerDef.find(function(obj){
			return obj.prop === hash;
		});
		
		if (!obj) {
			return setHash(headerDef[0].prop);
		}		

		console.log('hash change');
		console.log(hash);

		NProgress.configure({ easing: 'ease', speed: 300 });
		NProgress.start();
		//NProgress.set(0.4);

		loadScript(obj.script, function(success){

			NProgress.done();
			if (success) {
				console.log('OK');
				web[obj.prop].initModule(jqueryMap.$mainContent);	
				setSelectNavBackground(obj);
			}
			else {
				console.log('FAILED');
			}
			//web[obj.prop].initModule(jqueryMap.$mainContent);
		});
	}
	//---------- END EVENT FUNCTIONS -----------//

	//---------- BEGIN PUBLIC FUNCTIONS -----------//
	function initModule ($container) {
		initHTML($container);
		setJqueryMap($container);

		jqueryMap.$nav.click(onClickNav);
    $(window)
      .on( 'hashchange', onHashchange )      
      .trigger( 'hashchange' );
	}
	//---------- END PUBLIC FUNCTIONS -----------//	
	return {initModule: initModule};
})();