let activeTab = "";
let startTime = Date.now();

const blockedSites = ["youtube.com", "instagram.com", "facebook.com"];

chrome.tabs.onActivated.addListener(async (info) => {
    const tab = await chrome.tabs.get(info.tabId);
    if (tab.url) handleTab(tab.url);
});

chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        handleTab(tab.url);
    }
});

function handleTab(url) {

    // Ignore chrome internal pages
    if (
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.includes("newtab") ||
    url === ""
) {
    return;
}
    // BLOCK WEBSITE
    if (blockedSites.some(site => url.includes(site))) {
        chrome.tabs.update({ url: chrome.runtime.getURL("blocked.html") });
        return;
    }

    if (!activeTab) {
        activeTab = url;
        startTime = Date.now();
        return;
    }

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // avoid saving 0 sec
    if (timeSpent > 0) {
        fetch("http://localhost:5000/api/activity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: activeTab,
                timeSpent
            })
        }).catch(err => console.log(err));
    }

    activeTab = url;
    startTime = Date.now();
}