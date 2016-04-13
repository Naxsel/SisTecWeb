var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    mysql = require("./mysql-connector");


var PATH = "ficheros/"

function show(response) {
    console.log("Request handler 'show' was called.");
    var aux = tabla;
    mysql.FindAll(function(res){
        for (var n = 0; n<res.lenght;n++){
            aux +='<tr><td><a class="btn btn-default" href="showMemo?id='+res[n].id+'">' +
                '<span class="glyphicon glyphicon-search"></span></a></td>'+
                '<td>"+res[n].fecha+"</td>'+
                '<td>"+res[n].hora+"</td>';
            if (res[n].fichero.equals("null")){
                aux += '<td> No adjunto </td>';
            }else{
                aux += '<td><a href="'+PATH+res[n].fichero+'">'+res[n].fichero+'</a></td>';
            }
            aux+= '<td><a class = "btn btn-danger btn-xs" href="deleteMemo?id='+res[n].id+'">' +
                '<span class="glyphicon glyphicon-trash"></span></td>';
        }
        aux+=form;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(aux);
        response.end;
    });
}

function setMemo(response, request) {
    console.log("Request handler 'setMemo' was called.");
    var aux = tabla;

}

function deleteMemo(response, request) {
    console.log("Request handler 'deleteMemo' was called.");

}

function showMemo(response, request){
    console.log("Request handler 'showMemo' was called.");

}

exports.show = show;
exports.setMemo = setMemo;
exports.deleteMemo = deleteMemo;
exports.showMemo = showMemo;
exports.login = login;
exports.register = register;



var tabla  = '<!DOCTYPE html><html lang="en"><head><title>Gestor Tareas</title>'+
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">'+
    '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>'+
    '<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>'+
    '</head><body><div class="container"><h2>Gestor Tareas</h2><table class="table"><thead>'+
    '<tr><th>Tarea</th><th>Fecha Limite</th><th>Comentarios</th><th>Fichero</th><th>Eliminar</th></tr></thead><tbody>'+
    '<tr><td><a class="btn btn-default"><span class="glyphicon glyphicon-search"></span></a></td><td>John</td><td>Doe</td><td>john@example.com</td><td>' +
    '<a class = "btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></td></tr>';


var form = '</tbody></table></br><h4>Añade una tarea</h4>' +
    '<form action="/setMemo" method="post" enctype="multipart/form-data"' +
    '<input type="date" required placeholder="DD/MM/YYYY" name="fecha" pattern="\\d{1,2}-\\d{1,2}-\\{4}">' +
    '<input type="text" required placeholder="Info" name="texto">' +
    '<input type="file" name="fichero" multiple="multiple">' +
    '<input type="submit" value="Subir Fichero" ></form>' +
    '</body></html>';



