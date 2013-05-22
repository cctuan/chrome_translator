
console.log("content Script");

document.addEventListener('mouseup', function() {
    var selection = window.getSelection().toString().trim();
    
    chrome.extension.sendMessage({
        request: 'updateContextMenu',
        selection: selection
    });
});
