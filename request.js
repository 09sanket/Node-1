const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Get the URL requested by the user
    const url = req.url;

    // Set the content type for the response
    res.setHeader('Content-Type', 'text/plain');

    // Handle different URL paths
    if (url === '/home') {
        res.end('Welcome home');
    } else if (url === '/about') {
        res.end('Welcome to About Us page');
    } else if (url === '/node') {
        res.end('Welcome to my Node.js project');
    } else {
        res.end('404 Not Founds'); // Default response for other URLs
    }
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
