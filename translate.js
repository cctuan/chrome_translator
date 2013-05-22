
var contexts = ["selection"];
var cmid;
for (var i = 0; i < contexts.length; i++) {

  var context = contexts[i];
  var title = "Translating %s"  ;
  var id = chrome.contextMenus.create({
  	"title": title, 
  	"contexts":[context],
		"onclick": genericOnClick
	});

  console.log("'" + context + "' item:" + id);

}
function genericOnClick(e){
	translator(e.selectionText);

}
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'updateContextMenu') {
        var type = msg.selection;
        if (type == '') {
            // Remove the context menu entry
            
        } else { 
        	translator(type,function(data){
        		chrome.contextMenus.update(id,{
        			title : data,
        			contexts : ['selection']

        		});

        	});
      /*      var options = {
                title: type,
                contexts: ['selection'],
                onclick: cm_clickHandler
            };
            if (cmid != null) {
                chrome.contextMenus.update(cmid, options);
            } else {
                // Create new menu, and remember the ID
                cmid = chrome.contextMenus.create(options);
            }
        */}
    }
});

function parser(text){
	var result = "";
	try{
		var ret = JSON.parse(text.replace(/,,/g,",null,").replace(/,,/g,",null,"));

		var dep = ret;

		while(typeof dep !== "string"){
			dep = dep[0];
		}
		result = dep;		
	}catch(e){
		result = "cannot translate";
	}

	return result;
}

function translator(text,callback){
	var translateUrl = "https://translate.google.com/translate_a/t?client=t&hl=zh-TW&sl=auto&tl=zh-TW&ie=UTF-8&oe=UTF-8&&uptl=zh-TW&sc=1&q="+text;

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		 if (xhr.readyState==4 && xhr.status==200){
		 		callback(parser(xhr.responseText));
		 }

	};

	xhr.open("GET",translateUrl);

	xhr.send(null);
}

