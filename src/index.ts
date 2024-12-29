export function commandResultProcesser(command: string, ...moreInfo: string[]) {
    alert(`命令: ${command}\n你可以直接粘贴(Ctrl+V)命令到MC中执行`);
    navigator.clipboard.writeText(command);
    console.log(command);
    for (const info of moreInfo) {
        console.log(info);
    }
}

export type RouterHandler = (location: Location) => void;
export function registerRouter(options: (
    string | [string, RouterHandler]
)[]) {
    hashes = [...new Set(options.filter((item) => typeof item === 'string').concat(options.filter((item) => Array.isArray(item)).map((item) => item[0])))].concat(hashes);
    hashHandlers = hashHandlers.concat(options.filter((item) => Array.isArray(item)));
    if (!registeredFirstRouter) {
        window.addEventListener('hashchange', hashChangeHandler);
        registeredFirstRouter = true;
    }
    hashChangeHandler();
}
export function getFetchOptions<T extends string>(mime: T): {
    headers: {
        accept: `${T}; charset=utf-8`;
        'cache-control': 'no-cache';
    };
    cache: 'no-cache';
} {
    return {
        headers: {
            accept: `${mime}; charset=utf-8`,
            'cache-control': 'no-cache'
        },
        cache: 'no-cache'
    }
}

let hashes: string[] = [];
let hashHandlers: [string, RouterHandler][] = [];
let registeredFirstRouter = false;

function hashChangeHandler() {
    const hash = location.hash.slice(2);
    if (hashes.includes(hash)) {
        fetch('/' + hash + '.html', getFetchOptions('text/html'))
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

                const doc = new DOMParser().parseFromString(text, 'text/html');
                document.body.replaceWith(doc.body);

                doc.querySelectorAll('script').forEach(script => {
                    if (script.type === 'importmap') {
                        throw new TypeError('不支持importmap');
                    }
                    if (script.src) {
                        if (script.type === 'module') {
                            import(script.src).then(m => {
                                const def = m.default;
                                if (def) {
                                    window[def.name ?? 'summon'] = def;
                                }
                            });
                            return;
                        }
                        fetch(script.src, getFetchOptions('text/javascript'))
                            .then(async (response) => new Function(await response.text())());
                    } else {
                        new Function(script.textContent ?? '')();
                    }
                });
            });
    }


    const indexOfHashOfHashHandlers = hashes.indexOf(hash);
    if (Array.isArray(indexOfHashOfHashHandlers)) {
        const handler = indexOfHashOfHashHandlers[1];
        if (typeof handler === 'function') {
            handler(location);
        }
    }
};