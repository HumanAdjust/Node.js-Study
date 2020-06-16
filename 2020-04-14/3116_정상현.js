var http = require('http');
// 로컬IP : 217.0.0.1 / localhost
// nodejs에서 사용하는 가장 기본적인 모듀 / 웹 서버를 생성하는 것과 관련된 모든 기능을 담당
var fs = require('fs');
// 파일처리와 관련된 모듈 
var url = require('url');
// url정보를 가져와서 분석 / 문자열로 바꿔주는 모듈

var temp = require("./Temp.js");

http.createServer(function(request,response){

    
    var path = url.parse(request.url, true).pathname;
    var query = url.parse(request.url, true).query;

    console.log(request.url); // 파일명과 쿼리스트링값을 하나로
    console.log(path); // url에서 분석한 파일명
    console.log(query.id); // url에서 분석한 쿼리스트링

    if(path ==='/html'){
        var res = temp.template("HTML", query.id);
        //temp.js에서 template함수를 호출(매개변수)

        response.end(res);
        //template함수에서 return하는 응답코드를 사용자에게 출력
    }
    else if(path ==='/nodejs'){
        var res = temp.template("Nodejs", query.id);

        response.end(res);
    }else if(path === '/table'){
        var res = temp.table(query.id);

        response.end("<table border='1'><tr>"+res+"</tr></table>");

    }else if(path === '/query'){
        var res = temp.template("query", query.id, query.id2);

        response.end(res);
    }
    else{
        response.end("Not Found");
    };
}).listen(3000);