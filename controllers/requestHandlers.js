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
            aux +="<tr>"+
                "<td>"+res[n].fecha+"</td>"+
                "<td>"+res[n].hora+"</td>";
            if (res[n].fichero.equals("null")){
                aux += "<td> No adjunto </td>";
            }else{
                aux += "<td><a href='"+PATH+res[n].fichero+"'>"+res[n].fichero+"</a></td>";
            }
            aux+= "<td></td>";
        }
    });
}

function setMemo(response, request) {

}

function deleteMemo(response, request) {

}

function showMemo(response, request){

}

function login (response, request){

}

function register (response, request ){
    
}

exports.show = show;
exports.setMemo = setMemo;
exports.deleteMemo = deleteMemo;
exports.showMemo = showMemo;
exports.login = login;
exports.register = register;



var tabla  = '<!DOCTYPE html><html lang=\"en\"><head><title>Gestor Tareas</title>"+
    '<meta charset=\"utf-8\"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">'+
    '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>'+
    '<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>'+
    '</head><body><div class="container"><h2>Gestor Tareas</h2>'+
    '<table class="table"><thead>' +
    '<tr><th>Fecha Limite</th><th>Comentarios</th><th>Fichero</th><th>Eliminar</th></tr></thead><tbody>'+
    '<tr><td>John</td><td>Doe</td><td>john@example.com</td><td><button class = "btn btn-danger btn-xs">' +
    '<span class="glyphicon glyphicon-trash"></span></button></td></tr>';



