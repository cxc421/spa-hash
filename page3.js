var web = web || {};

web.p3 = (function(){
	//----------BEGIN MODULE SCOPE VARIABLES ------------//
	var configMap = {
		showText: 'PAGE_3',
		bkColor: '#7FFFD4'
	};
	//----------END MODULE SCOPE VARIABLES ------------//

	//----------BEGIN PRIVATE FUNCTION ------------//
	function initHTML ($container) {		
		$container.html( String()
			+ '<div class="page" style="background:' + configMap.bkColor + '">'				
				+ '<h1>' + configMap.showText + '</h1>'				
			+ '</div>'
		);
	}
	//----------END PRIVATE FUNCTION ------------//

	//----------BEGIN PUBLIC FUNCTION ------------//
	function initModule ($container) {
		initHTML($container);
	}
	//----------END PUBLIC FUNCTION ------------//
	return {initModule: initModule};
})();