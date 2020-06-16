exports.template = function(page, query1, query2){
    return "<html><head><meta charset='utf-8'></head><body><font size='7' color='red'>"+page+" Page!!!</font>"
    +"<br>사용자가 보내주는 QueryString1 : "+query1+"</br><br>사용자가 보내주는 QueryString2  : "+query2+"</br></body></html>";
}

exports.table = function(td){
    var res = "";
    for(var i = 1; i<=td;i++){
        res += "<td>"+i+"</td>";
    }
    return res;
}