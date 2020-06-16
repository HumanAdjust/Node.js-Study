//웹서버 모듈
var http = require('http');

//url분석
var url = require('url');

//url정보를 가져와서 분석/ 문자열로 변환
var qs = require('querystring');

//웹서버생성
http.createServer(function(request, response){
    // console.log('Server 실행!');

    // path 분석
    var path = url.parse(request.url, true).pathname;
    // console.log('사용자가 요청한 path >>', path);
    if(path === '/grade'){
        var body = '';

        //정보수신
        request.on('data', function(data){
            body += data;
            // console.log(data);
        });

        //정보수신이 끝났을 때
        request.on('end', function(){
            //url을 통해서 전달된 데이터를 분석/객체로 변환
            var post = qs.parse(body);
            console.log(post);
            console.log('css점수>> ', post.css);

            var name = post.name;
            var html = parseInt(post.html);
            var css = parseInt(post.css);
            var nodejs = parseInt(post.nodejs);
            var android = parseInt(post.android);
            var avg = (html+css+nodejs+android) / 4;
            var grade = '';

            //평균값을 이용해서 등급판별
            if(avg >= 95){
                grade = 'A+';
            }else if(avg >= 90){
                grade = 'A';
            }

            //사용자에게 응답
            //`${}`: 템플릿문자열(백틱) -> 문자열 내 변수사용
            response.end(`
            <html>
                <meta charset='utf-8'>
                <body>
                    name: ${name}<br>
                    html: ${html}<br>
                    css: ${css}<br>
                    nodejs: ${nodejs}<br>
                    android: ${android}<br>
                    avg: ${avg}<br>
                    grade: ${grade}<br>
                </body>
            </html>
            `);
        });
    }
}).listen(3001);