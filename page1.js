var web = web || {};

web.p1 = (function(){
	//----------BEGIN MODULE SCOPE VARIABLES ------------//
	var configMap = {
		showText: 'PAGE_1',
		bkColor: 'pink'
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