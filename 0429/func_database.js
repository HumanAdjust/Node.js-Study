var conn = require('./config_database.js');

exports.join = function(request, response){
    var id = request.body.id;
    var pw = request.body.pw;
    var nick = request.body.nick;

    var sql = "insert into member1 values(?,?,?)";
    conn.query(sql,[id, pw, nick], function(err, rows){
        if(!err){
            console.log("입력성공!");
        }else{
            console.log(err);
        }
    }); //DB에 쿼리를 전송

    response.send("DB연결성공");
}

exports.delete = function(request, response){
    var id = request.query.id;
    console.log("QueryString으로 넘어온 값: " + id);
    var sql = "delete from member1 where id=?";
    conn.query(sql,[id], function(err, rows){
        if(!err){
            console.log("삭제성공!");
            response.redirect('/allSelect');
        }else{
            console.log("삭제실패!");
        }
    }); //DB에 쿼리를 전송
}

exports.update = function(request, response){
    var id = request.body.id;
    var pw = request.body.pw;

    var sql = "update member1 set pw = ? where id=?";
    conn.query(sql,[pw, id], function(err, rows){
        if(!err){
            console.log("변경성공!");
        }else{
            console.log("변경실패!");
        }
    }); //DB에 쿼리를 전송

    response.send("DB연결성공");
}

exports.selectall = function(request, response){
    console.log("session영역에 있는 user값 : " + request.session.user.name);
    var sql = "select * from member1";
    conn.query(sql, function(err, rows){
        if(!err){
            response.render('allSelect', {rows: rows});
            // response.write('<html>');
            // response.write('<body>');
            // response.write('<table border=1>');
            // for(var i=0; i < rows.length; i++){
            //     response.write('<tr>');
            //     response.write('<td>');
            //     response.write(rows[i].ID);
            //     response.write('</td>');
            //     response.write('<td>');
            //     response.write(rows[i].NICKNAME);
            //     response.write('</td>');
            //     response.write('</tr>');
            // };
            // response.write('</table>');
            // response.write('</body>');
            // response.write('</html>')
            // response.end();
        }else{
            response.send("검색 실패!"+err);
        }
    }); //DB에 쿼리를 전송
}

exports.selectone = function(request, response){
    var id = request.body.id;

    var sql = "select * from member1 where id=?";
    conn.query(sql,[id], function(err, rows){
        if(!err){
            response.send(rows[0].id + rows[0].pw + rows[0].nickname);
        }else{
            response.send("검색 실패!"+err);
        }
    }); //DB에 쿼리를 전송
}

exports.checklogin = function(request, response){
    var id = request.body.id;
    var pw = request.body.pw;

    console.log(id, pw);
    var sql = "select * from member1 where id = ? and pw = ?";

    conn.query(sql,[id, pw], function(err, rows){
        console.log(conn.query(sql, [id, pw]).sql);
        if(rows[0]){
            response.render("LoginS", {send_id: id});
        }else{
            response.redirect("http://127.0.0.1:5500/Node.js-Study/0429/views/LoginF.html");
        }
    }); //DB에 쿼리를 전송
}