const McCs = (function () {
    /** @type {McCs} */
    const exports = {
        commandResultProcesser(command, ...moreInfo) {
            alert(`命令: ${command}\n你可以直接粘贴(Ctrl+V)命令到MC中执行`);
            navigator.clipboard.writeText(command);
            console.log(command);
            for (const info of [...moreInfo]) {
                console.log(info);
            }
        },
        registerRouter(options) {
            const HTMLMIMEType = 'text/html';
            hashes = [...new Set([...options.filter(item => typeof item === 'string').concat(options.filter(item => Array.isArray(item)).map(item => item[0])), hashes])];
            hashHandlers.concat(options);
            if (!registeredFirstRouter) {
                window.addEventListener('hashchange', () => {
                    const hash = location.hash.slice(2);
                    if (hashes.includes(hash)) {
                        fetch('/' + hash + '.html', {
                            headers: {
                                accept: HTMLMIMEType
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    console.groupCollapsed('网络报错信息');
                                    console.log('状态:', response.statusText);
                                    console.log('请求URL:', response.url);
                                    console.groupEnd();
                                    alert('网络错误! 请重试\n可在控制台查看详情');
                                }

                                return response.text();
                            })
                            .then(text => {
                                if (text.startsWith('<!')) {
                                    const firstNewlineIndex = text.indexOf('\n');

                                    text = firstNewlineIndex !== -1 ? text.slice(firstNewlineIndex + 1) : text;
                                }
                                const doc = new DOMParser().parseFromString(text, HTMLMIMEType);
                                document.body.replaceWith(doc.body);
                                doc.querySelectorAll('script').forEach(script => {
                                    if (script.src) {
                                        fetch(script.src, {
                                            headers: {
                                                accept: 'text/javascript'
                                            }
                                        })
                                            .then(async response => new Function(await response.text())());
                                    } else {
                                        new Function(script.textContent);
                                    }
                                    /* script.addEventListener('load', () => {
                                        console.log('加载成功:', script.src);
                                    });
                                    document.head.appendChild(script); */
                                });
                            });
                    }

                    const indexOfHashOfHashesOrHashsAndHandlers = hashes.indexOf(hash);
                    if (Array.isArray(indexOfHashOfHashesOrHashsAndHandlers)) {
                        const handler = indexOfHashOfHashesOrHashsAndHandlers[1];
                        if (typeof handler === 'function') {
                            handler(location);
                        }
                    }
                });
                registeredFirstRouter = true;
            }
        }
    };
    Object.setPrototypeOf(exports, null);

    let hashes = [];
    const hashHandlers = [];
    let registeredFirstRouter = false;

    return exports;
})();