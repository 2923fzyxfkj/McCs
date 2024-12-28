import { readFile } from 'fs/promises';
import mime from 'mime';
import http from 'http';
import chardet from 'chardet';

const hostname = '127.0.0.1';
const port = 3000;

/**
 * @param {http.ServerResponse} res
 * @param {Error & { code: any }} e
 */
function reply500(res, e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        '': 'Internal Server Throws Error',
        message: e.message,
        stack: e.stack,
        code: e.code,
    }));

    console.error(e);
}

const server = http.createServer(async (req, res) => {
    try {
        const filepath = req.url.slice(1);

        process.stdout.write(req.method + ' ' + req.url);
        res.statusCode = 200;
    
        if (req.url === '/' || req.url === '/index.html' || req.url === '') {
            res.statusCode = 302;
            res.setHeader('Location', '/main.html');
            res.end();
            console.log(' |', res.statusCode);
            return;
        }
        const file = await readFile(filepath)
            .then(data => {
                const encoding = chardet.detect(data);

                res.setHeader('Content-Type', mime.getType(filepath).concat(encoding ? '; charset=' + encoding : ''));
                res.setHeader('Cache-Control', 'no-cache');

                return data;
            })
            .catch(e => {
                if (e.errno = -4058) {
                    res.statusCode = 404;
                } else {
                    reply500(res, e);
                }
            });
        res.end(file);
        console.log(' |', res.statusCode);
    } catch (e) {
        reply500(res, e);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});