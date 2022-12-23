var toggle = false;
var statuss = 'on';
var the_tab_id = '';


function toggle_extension(tab){
    // Set icon
    chrome.tabs.executeScript({ code: 'var extension_statuss = "'+statuss+'"' });
    chrome.tabs.executeScript({ file: 'html2Canvas.js'})
    chrome.tabs.executeScript({ file: 'inject.js' });
    the_tab_id = tab.id;
}


chrome.browserAction.onClicked.addListener(function(tab) {
    toggle_extension(tab);
});