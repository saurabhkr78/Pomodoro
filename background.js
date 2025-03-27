// Keep track of the timer state across tabs
let timerState = {
    isRunning: false,
    minutes: 25,
    seconds: 0
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE_TIMER_STATE') {
        timerState = message.state;
        // Broadcast the update to all tabs
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    type: 'TIMER_STATE_UPDATE',
                    state: timerState
                });
            });
        });
    }
});

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // Send current timer state to the new tab
        chrome.tabs.sendMessage(tabId, {
            type: 'TIMER_STATE_UPDATE',
            state: timerState
        });
    }
});

// Handle tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
    // Send current timer state to the newly activated tab
    chrome.tabs.sendMessage(activeInfo.tabId, {
        type: 'TIMER_STATE_UPDATE',
        state: timerState
    });
}); 