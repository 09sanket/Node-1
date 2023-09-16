// const http = require('http');
// http.createServer((req , resp) =>{
// resp.write("<h1>hello sanket is live now </h1>");
// resp.end();
// }).listen(4000);

// another method where we will pass function to server 

const http = require('http');

function dataControl(req , resp){
    resp.write("<h1>hello and welcom sanket is live now </h1>");
    resp.end();
}

http.createServer(dataControl).listen(4000);

