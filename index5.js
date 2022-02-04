const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path')

let currentDir = process.cwd();
let userPath = './';

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        userPath = './';
    } else if (req.url === '/favicon.ico') {
        console.log('favi')
    } else {
        userPath = req.url
    }
    const fullPath = path.join(currentDir, userPath);
    const isDir = fs.lstatSync(fullPath).isDirectory();
    if (isDir) {
        const fileDirList = fs.readdirSync(fullPath);
        const listDir = `<ul>${fileDirList.map(i => `<li><a href= 'http://localhost:5555${req.url}/${i}'>${i}</a></li> `).join('')}</ul>`
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.end(listDir)
    } else {
        const readStream = fs.createReadStream(fullPath)
        readStream.pipe(res)
    }
})

server.listen(5555);