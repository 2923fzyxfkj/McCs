/**
 * @param {string} command
 * @param {...string} moreInfo
 */
export function commandResultProcesser(command, ...moreInfo) {
    alert(`命令: ${command}\n你可以直接粘贴(Ctrl+V)命令到MC中执行`);
    navigator.clipboard.writeText(command);
    console.log(command);
    for (const info of [...moreInfo]) {
        console.log(info);
    }
}

/**
 * @param { (string | [string, ((location: Location) => void)])[] } hashesOrHashsAndHandlers
 */
export function createRouter(hashesOrHashsAndHandlers) {
    const HTMLMIMEType = 'text/html';
    const hashes = hashesOrHashsAndHandlers.filter(item => typeof item === 'string').concat(hashesOrHashsAndHandlers.filter(item => Array.isArray(item)).map(item => item[0]));
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
                .then(text => document.documentElement.innerHTML = new DOMParser().parseFromString(text, HTMLMIMEType).documentElement.innerHTML);
        }

        const indexOfHashOfHashesOrHashsAndHandlers = hashes.indexOf(hash);
        if (Array.isArray(indexOfHashOfHashesOrHashsAndHandlers)) {
            const handler = indexOfHashOfHashesOrHashsAndHandlers[1];
            if (typeof handler === 'function') {
                handler(location);
            }
        }
    });
}