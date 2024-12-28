const { readFile } = require('fs/promises');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    console.log(req.url);
    res.statusCode = 200;
    res.setHeader('Cache-Control', 'no-cache');
    res.end(
        await readFile(req.url === '/' ? 'main.html' : req.url.slice(1))
            .catch((e) => { if (e.errno = -4058) { res.statusCode = 404 } })
    );
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});