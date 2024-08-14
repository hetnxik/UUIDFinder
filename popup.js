document.getElementById('saveButton').addEventListener('click', function() {
    const prefix = document.getElementById('prefix').value;
    const postfix = document.getElementById('postfix').value;

    console.log('Saving prefix:', prefix);
    console.log('Saving postfix:', postfix);

    chrome.storage.local.set({ prefix, postfix }, function() {
        if (chrome.runtime.lastError) {
            console.error('Error saving settings:', chrome.runtime.lastError);
        } else {
            console.log('Settings saved successfully');
        }
    });
});

chrome.storage.local.get(['prefix', 'postfix'], function(items) {
    if (items.prefix) {
        document.getElementById('prefix').value = items.prefix;
    }
    if (items.postfix) {
        document.getElementById('postfix').value = items.postfix;
    }
});
