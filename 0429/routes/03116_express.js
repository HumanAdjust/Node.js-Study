var express = require('express'); //express 모듈 로드
var bodyParser = require('body-parser');
var sessionP = require('express-session')
var app = express(); //express app생성
var port = 3000;

var func = require('../conf/func_database.js');
const { response } = require('express');

// app.use(function(request, response, next){
//     console.log("첫번째 미들웨어 실행!");
//     next();
// });

// app.use(function(request, response, next){
//     console.log("두번째 미들웨어 실행!");
// });
// 어떤 라우터든 실행을 하면 무조건 동작하는 기능: 미들웨어
app.use(bodyParser.urlencoded({extended:false}));
app.use(sessionP({
    secret : "smart0317",
    resave : false,
    saveUninit : true
}));

app.set('views', '../views');
//views 폴더 지정
app.use(express.static('../public'));
//public 폴더 지정
app.set('view engine', 'ejs'); //view engine 중 ejs 사용
//post 방식 -> 패킷(바디) 값이 서버로 넘어옴
//패킷(바디)부분을 해석(인코딩 : application/x-www-form-urlencoded)

// GET방식 요청에 대한 처리 
app.get('/', function(request, response){
    request.session.user = {
        "name" : "jason",
        "age" : "20"
    };
    console.log("Session 생성 완료");
    // 웹 페이지에 문자열 데이터 전송
    response.render('index', {num: 5});
});

app.get('/page', function(request, response){
    //QueryString 방식
    response.send(`Data : ${request.query.targetDt}<br>board ${request.query.pageNo} Page!$`);
});

app.get('/admin/:id/:Dt', function(request, response){
    ///Semantic URL 형식
    response.send(`${request.params.id}<br>${request.params.Dt}`);
});

app.get('/siteMove', function(request, response){
    siteMove = request.query.go_site;

    if(siteMove === 'naver'){
        response.redirect("http://www.naver.com");
    }else if(siteMove === 'daum'){
        response.redirect("http://www.daum.net");
    }else if(siteMove === 'google'){
        response.redirect("http://www.google.com");
    }else{
        response.end("잘못된 접근입니다!");
    }
});

app.get('/numberSum', function(request, response){
    //Semantic URL 형식
    start = parseInt(request.query.start);
    end = parseInt(request.query.end);
    sum = 0;

    for(var i = start; i <= end; i++){
        sum += i;
    }

    response.send(`<h1>${start}~${end}까지의 합<br><br>결과: ${sum}`);
});

app.post('/loginCheck', function(request, response){
    func.checklogin(request, response);
});

app.post('/gugudan', function(request, response){
    for(var i = 1; i <= 9; i++){
        response.send(`${request.body.num} X ${i} = ${request.body.num * i}<br>`);
    }   
});

app.post('/Join',function(request, response){
    func.join(request, response);
   //response.send("ID : " + id + "PW : " + pw + "NICK : " +nick);
});

app.get('/delete',function(request, response){
    console.log("delete 호출 성공!")
    func.delete(request, response);
   //response.send("ID : " + id + "PW : " + pw + "NICK : " +nick);
});

app.post('/delete',function(request, response){
    func.delete(request. response);
   //response.send("ID : " + id + "PW : " + pw + "NICK : " +nick);
});     

app.post('/update',function(request, response){
    func.update(request, response);
   //response.send("ID : " + id + "PW : " + pw + "NICK : " +nick);
});

app.post('/oneSelect',function(request, response){
    func.selectone(request, response);
   //response.send("ID : " + id + "PW : " + pw + "NICK : " +nick);
});

app.post('/allSelect',function(request, response){
    func.selectall(request, response);
   //response.send("ID : " + id + "PW : " + pw + "NICK : " +nick);
});

app.get('/allSelect',function(request, response){
    console.log("session영역에 있는 user값 : " + request.session.user.name);
    func.selectall(request, response);
   //response.send("ID : " + id + "PW : " + pw + "NICK : " +nick);
});

app.post('/table', function(request, response){
    response.render('index.ejs', { num: parseInt(request.body.table) });
});

app.get('/message', function(req, res){
    if(req.session.user){
        res.render('Message', {
            user : req.session.user
        });
    }else{
        res.render('Message', {
            user : null
        });
    }
});

app.get('/mail', function(req, res){
    res.render('mail', {})
})

app.get('/login', function(req, res){
    if(req.session.user){
        res.render('Login', {
            user : req.session.user
        });
    }else{
        res.render('Login', {
            user : null
        });
    }
});

app.get('/Logout', function(req, res){
    delete req.session.user;

    res.redirect("http://localhost:3000/Login");
})

// express app 실행
app.listen(port,function(){
    console.log(`${port}포트로 서버 실행!`);
});