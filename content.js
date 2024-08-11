fetch(chrome.runtime.getURL('config.json'))
    .then(response => response.json())
    .then(config => {
        const preUUID = config.preUUIDUrl;
        const postUUID = config.postUUIDUrl

        const uuidRegex = /\b[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/gi;

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
                    link.href = preUUID + encodeURIComponent(match) + postUUID;
                    link.textContent = match;
                    link.style.color = "blue"; // Customize the link color
                    link.style.textDecoration = "underline"; // Customize the link style

                    link.target = "_blank";
                    link.rel = "noopener noreferrer"; // Security measure for opening in a new tab

                    span.appendChild(link);
                    lastIndex = matchIndex + match.length;
                });

                if (lastIndex < node.nodeValue.length) {
                    span.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
                }

                node.parentNode.replaceChild(span, node);
            }
        }
    })
    .catch(error => console.error('Error loading config:', error));
