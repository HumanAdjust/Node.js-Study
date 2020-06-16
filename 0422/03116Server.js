var http = require('http');
var url = require('url');
var qs = require("querystring");
//1. 모듈설정

http.createServer(function(request, response){
//2. 서버생성
    var path = url.parse(request.url, true).pathname;
    var query = url.parse(request.url, true).query;

    if(path === '/plus'){
        var num1 = parseInt(query.num1);
        var num2 = parseInt(query.num2);
        var cal = query.cal;
        var sum = 0;
        
        if(cal === '+'){
            sum = parseInt(num1) + parseInt(num2);
            response.end("<h1>" + parseInt(num1) + " + " + parseInt(num2) + " = " +  sum + "</h1>");
        }else if(cal === '-'){
            sum = parseInt(num1) - parseInt(num2);
            response.end("<h1>" + parseInt(num1) + " - " + parseInt(num2) + " = " +  sum + "</h1>");
        }else if(cal === '*'){
            sum = parseInt(num1) * parseInt(num2);
            response.end("<h1>" + parseInt(num1) + " x " + parseInt(num2) + " = " +  sum + "</h1>");
        }else if(cal === '/'){
            sum = parseInt(num1) / parseInt(num2);
            response.end("<h1>" + parseInt(num1) + " / " + parseInt(num2) + " = " +  sum + "</h1>");
        }
        
    }else if(path === '/grade'){

        var body = "";

        request.on('data', function(data){
            body += data;
        });
        //post 방식으로 값을 전송했을 때 data를 읽어들이는 방법
        //request변수 안에 값이 담겨있음 / request를 분석

        request.on('end', function(){
            
            var post = qs.parse(body);

            var name = post.name;
            var html = post.html;
            var css = post.css;
            var nodejs = post.nodejs;
            var android = post.android;

            var sum = parseInt(html)+parseInt(css)+parseInt(nodejs)+parseInt(android);
            var avg = sum/4;

            var grade_rank = rank(avg);

            response.end(`
            <html>
            <head><meta charset='utf-8'></head>
            name : ${name}<br>
            html : ${html}<br>
            css : ${css}<br>
            nodejs : ${nodejs}<br>
            android : ${android}<br>
            avg : ${avg}<br>
            grade : ${grade_rank}<br>
            </html>`)
        });
        //request변수에 해당하는 분석이 모두 끝났을  때
        //기능을 정의

    }

    function rank(avg){
        if(avg<=100&&avg>=95){
            return 'A+';
        }else if(avg<=94&&avg>=90){
            return 'A';
        }else if(avg<=89&&avg>=85){
            return 'B+';
        }else if(avg<=84&&avg>=80){
            return 'B';
        }else if(avg<=79&&avg>=75){
            return 'C';
        }else{
            return 'F';
        }
    }
}).listen(3001);

