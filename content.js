const uuidRegex = /\b[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/gi;

chrome.storage.local.get(['prefix', 'postfix'], function(items) {
    const prefix = items.prefix || '';
    const postfix = items.postfix || '';

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;

    while (node = walker.nextNode()) {
        const matches = node.nodeValue.match(uuidRegex);

        if (matches) {
            const span = document.createElement('span');
            let lastIndex = 0;

            matches.forEach(match => {
                const matchIndex = node.nodeValue.indexOf(match, lastIndex);

                if (matchIndex > lastIndex) {
                    span.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, matchIndex)));
                }

                const link = document.createElement('a');
                console.log(link)
                link.href = prefix + encodeURIComponent(match) + postfix;
                console.log(link.href)
                link.textContent = match;
                link.style.color = "blue";
                link.style.textDecoration = "underline";

                link.target = "_blank";
                link.rel = "noopener noreferrer";

                span.appendChild(link);
                lastIndex = matchIndex + match.length;
            });

            if (lastIndex < node.nodeValue.length) {
                span.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
            }

            node.parentNode.replaceChild(span, node);
        }
    }
});
