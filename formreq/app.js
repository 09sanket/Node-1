const http = require('http');
const fs = require('fs');
const server = http.createServer((req , res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');

        // Display existing messages from the file
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (!err) {
                const messages = data.split('\n').filter(Boolean);
                res.write('<h2>Messages:</h2><ul>');
                messages.forEach(message => {
                    res.write(`<li>${message}</li>`);
                });
                res.write('</ul>');
            }

            res.write('</body></html>');
            return res.end();
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];

            // Append the new message to the file
            fs.appendFile('message.txt', message + '\n', (err) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Error adding message');
                }

                // Redirect to the home page (GET request)
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>First Page</title></head>');
        res.write('<body><h1>Hello, I\'m Sanket here</h1></body>');
        res.write('</html>');
        return res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
