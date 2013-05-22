
(function(scope){
	function init(){
		document.addEventListener('mouseup', function() {
    	var selection = scope.getSelection().toString().trim();
    
   		chrome.extension.sendMessage({
        request: 'updateContextMenu',
        selection: selection
    	});
		});
	};
	scope.onload = init;
}(window));
