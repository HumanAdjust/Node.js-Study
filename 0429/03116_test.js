var http = require('http');
var url = require('url');
var port = 3001;

http.createServer(function(request, response){
    path = url.parse(request.url, true).pathname;
    query = url.parse(request.url, true).query;

    if(path === '/page'){
        page = query.pageNo;
        console.log(page);
    }else if(path === '/board'){
        page = query.pageNo;
        date = query.targetDt;
        console.log(`Date: ${date}\nboard 1 Page!`);
        response.end(`<h1>Date: ${date}<br>board ${page} Page!</h1>`);
    }
    console.log(path);
}).listen(port);