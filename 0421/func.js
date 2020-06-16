call1();
function call1(){
    console.log("call1 호출!");
}//함수선언

var call2 = function(){
    console.log("call2 호출!");
}//함수표현
call2();

var call3 = function(){
    return "Hello"
}

var res = call3();
console.log(res);
//호시으팅: 함수 안에 있는 선언들을 모두 끌어올려서
// 해당 함수 유효 범위의 최상단에 선언하는 것