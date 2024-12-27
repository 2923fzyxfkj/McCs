const McCs = (function () {
    const createAntiInfiltrateHandler = (/** @type {boolean} */ returnNotInited) => {
        return (_, key) => {
            if (inited && !validKeys.includes(key)) {
                console.warn('bro就你想渗透');
                return false;
            } else {
                return true;
            }
        };
    }

    /** @type {(keyof McCs)[]} */
    const validKeys = ['commandResultProcesser', 'registerRouter', 'HTMLMIMEType', 'summon'];

    /** @type {McCs} */
    const exports = new Proxy({
        commandResultProcesser(command, ...moreInfo) {
            alert(`命令: ${command}\n你可以直接粘贴(Ctrl+V)命令到MC中执行`);
            navigator.clipboard.writeText(command);
            console.log(command);
            for (const info of [...moreInfo]) {
                console.log(info);
            }
        },
        registerRouter(options) {
            hashes = [...new Set(options.filter(item => typeof item === 'string').concat(options.filter(item => Array.isArray(item)).map(item => item[0])))].concat(hashes);
            hashHandlers = hashHandlers.concat(options.filter(item => Array.isArray(item)));
            if (!registeredFirstRouter) {
                window.addEventListener('hashchange', hashChangeHandler);
                registeredFirstRouter = true;
            }
            hashChangeHandler();
        },
        HTMLMIMEType: 'text/html'
    }, {
        set: createAntiInfiltrateHandler(),
        setPrototypeOf: createAntiInfiltrateHandler(true),
        deleteProperty: createAntiInfiltrateHandler(),
        defineProperty: createAntiInfiltrateHandler()
    });

    const HTMLMIMEType = exports.HTMLMIMEType;
    let inited = false;
    let hashes = [];
    let hashHandlers = [];
    let registeredFirstRouter = false;

    Object.setPrototypeOf(exports, null);

    inited = true;

    const hashChangeHandler = () => {
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
                        if (script.type === 'importmap') {
                            return;
                        }
                        if (script.src) {
                            if (script.type === 'module') {
                                console.warn('动态加载暂不支持模块。接下来很可能紧接着出现一个报错。');
                            }
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
    };

    return exports;
})();