var conn = require('./config_database.js');

exports.join = function(request, response){
    var email = request.body.email;
    var pw = request.body.pw;
    var tel = request.body.tel;
    var addr = request.body.addr;

    console.log("email : " + email);
    console.log("pw : " + pw);
    console.log("tel : " + tel);
    console.log("addr : " + addr);

    var sql = "insert into WEB_MEMBER values(?,?,?,?)";
    conn.query(sql,[email, pw, tel, addr], function(err, rows){
        if(!err){
            console.log("입력성공!");
            response.redirect("http://localhost:3000/Message");
        }else{
            console.log(err);
        }
    }); //DB에 쿼리를 전송
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
    var sql = "select * from member1";
    conn.query(sql, function(err, rows){
        if(!err){
            response.render('allSelect', {
                rows: rows,
                user: request.session.user
            });
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
    var email = request.body.email;
    var pw = request.body.pw;

    console.log(email, pw);
    var sql = "select * from WEB_MEMBER where email = ? and pw = ?";

    conn.query(sql,[email, pw], function(err, rows){
        console.log(conn.query(sql, [email, pw]).sql);
        if(rows[0]){
            request.session.user = {
                email : email,
                tel : rows[0].tel,
                addr : rows[0].address
            };

            response.redirect("/Message");
        }else{
            response.render("LoginF");
        }
    }); //DB에 쿼리를 전송
}

exports.update = function(request, response){
    var pw = request.body.pw;
    var tel = request.body.tel;
    var addr = request.body.address;

    var sql = "update WEB_MEMBER set pw = ?, tel = ?, address = ? where email = ?";

    conn.query(sql,[pw, tel, addr, request.session.user.email], function(err, rows){
        if(!err){
            request.session.user = {
                email : request.session.user.email,
                tel : tel,
                addr : addr
            };

            response.render('Message', {
                user : request.session.user
            });
        }else{
            console.log(err);
        }
    }); //DB에 쿼리를 전송
}