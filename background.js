var toggle = false;
var statuss = "on";
var the_tab_id = "";

function toggle_extension(tab) {
  // Set icon
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: (statuss) => {
        window.extension_statuss = statuss;
      },
      args: [statuss],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    }
  );

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["html2Canvas.js"],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    }
  );

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["inject.js"],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    }
  );

  the_tab_id = tab.id;
}

chrome.action.onClicked.addListener((tab) => {
  toggle_extension(tab);
});
