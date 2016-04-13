var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    url = require("url"),
    mysql = require("./mysql-connector");


var PATH = "ficheros/"

function show(response) {
    console.log("Request handler 'show' was called.");
    var aux = tabla;
    mysql.FindAll(function(res){
        console.log(res);
        for (var n = 0; n<res.length;n++){
            aux +='<tr><td><a class="btn btn-default" href="showMemo?id='+res[n].id+'">' +
                '<span class="glyphicon glyphicon-search"></span></a></td>'+
                '<td>"'+res[n].fecha+'"</td>'+
                '<td>"'+res[n].texto+'"</td>';
            if (res[n].fichero=="null"){
                aux += '<td> No adjunto </td>';
            }else{
                aux += '<td><a href="'+PATH+res[n].fichero+'">'+res[n].fichero+'</a></td>';
            }
            aux+= '<td><a class = "btn btn-danger btn-xs" href="deleteMemo?id='+res[n].id+'">' +
                '<span class="glyphicon glyphicon-trash"></span></td>';
        }
        console.log(aux);
        aux+=form;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(aux);
        response.end;
    });
}

function setMemo(response, request) {
    console.log("Request handler 'setMemo' was called.");
    var load = new formidable.IncomingForm();
    load.parse(req, function(err,fields,files){
        var file ="null";
        if(files.fichero.name != ''){
           fs.rename(files.fichero.path,PATH+files.fichero.name, function(error){
           });
        }else{

        }
    });
    return;
    var aux = tabla;

}

function deleteMemo(response, request) {
    console.log("Request handler 'deleteMemo' was called.");

}

function showMemo(response, request){
    console.log("Request handler 'showMemo' was called.");
    var aux = tabla;
    var params = url.parse(request.url,true);
    console.log(params);
    mysql.FindByID(params.query.id,function(res){
        console.log(res);
        aux +='<tr><td><a class="btn btn-default" href="showMemo?id='+res[0].id+'">' +
            '<span class="glyphicon glyphicon-search"></span></a></td>'+
            '<td>"'+res[0].fecha+'"</td>'+
            '<td>"'+res[0].texto+'"</td>';
        if (res[0].fichero=="null"){
            aux += '<td> No adjunto </td>';
        }else{
            aux += '<td><a href="'+PATH+res[0].fichero+'">'+res[0].fichero+'</a></td>';
        }
        aux+= '<td><a class = "btn btn-danger btn-xs" href="deleteMemo?id='+res[0].id+'">' +
            '<span class="glyphicon glyphicon-trash"></span></td>';
        console.log(aux);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(aux);
        response.end;
    });

}

exports.show = show;
exports.setMemo = setMemo;
exports.deleteMemo = deleteMemo;
exports.showMemo = showMemo;

var tabla  = '<!DOCTYPE html><html lang="en"><head><title>Gestor Tareas</title>'+
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">'+
    '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>'+
    '<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>'+
    '</head><body><div class="container"><h2>Gestor Tareas</h2><table class="table"><thead>'+
    '<tr><th>Tarea</th><th>Fecha Limite</th><th>Comentarios</th><th>Fichero</th><th>Eliminar</th></tr></thead><tbody>';

var memo = '<!DOCTYPE html><html lang="en"><head><title>Tarea</title>'+
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">'+
    '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>'+
    '<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>'+
    '</head><body><div class="container"><h2>Gestor Tareas</h2><table class="table"><thead>'+
    '<tr><th>Tarea</th><th>Fecha Limite</th><th>Comentarios</th><th>Fichero</th><th>Eliminar</th></tr></thead><tbody>';


var form = '</tbody></table></br></br><h4>Añade una tarea</h4>' +
    '<form class="form-horizontal" role="form"><div class="form-group">'+
    '<label class="control-label col-sm-2" for="email">Fecha:</label><div class="col-sm-10">'+
    '<input type="fecha" class="form-control" id="fecha" placeholder="DD/MM/YYYY"></div></div>'+
    '<div class="form-group"><label class="control-label col-sm-2" for="pwd">Texto:</label>'+
    '<div class="col-sm-10"><input type="text" class="form-control" id="text" placeholder="Info"></div></div>' +
    '<div class="form-group"><div class="col-sm-offset-2 col-sm-10">'+
    '<input type="file" class="form-control-life" name="fichero"></div></div><div class="form-group">'+
    '<div class="col-sm-offset-2 col-sm-10"><button type="submit" class="btn btn-default">Submit</button>'+
    '</div></div></form></body></html>';



