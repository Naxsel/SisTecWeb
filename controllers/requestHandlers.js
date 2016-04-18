/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: server.js
 * Fecha: 17/4/2016
 * Funcion: Funciones y Endpoints del sistema
 */


var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    url = require("url"),
    mysql = require("./mysql-connector");


var PATH = "ficheros/";


/**
 * Muestra la lista de todos los elementos disponibles. Es la página princial
 * Ademas incluye un formulario para añadir nuevas tareas.
 * @param response
 */
function show(response) {
    console.log("Request handler 'show' was called.");
    var aux = header+tabla;
    mysql.FindAll(function(res){
        for (var n = 0; n<res.length;n++){
            aux +='<tr><td><a href="showMemo?id='+res[n].id+'" class="btn btn-xs btn-info">' +
                '<span class="glyphicon glyphicon-tag"></span></a></td>'+
                '<td>"'+res[n].fecha+'"</td>'+
                '<td>"'+res[n].texto+'"</td>';
            if (res[n].fichero=="null"){
                aux += '<td> No adjunto </td>';
            }else{
                aux += '<td><a href="'+PATH+res[n].fichero+'">'+res[n].fichero+'</a></td>';
            }
            aux+= '<td><a class = "btn btn-danger btn-xs" href="deleteMemo?id='+res[n].id+"&fichero="+res[n].fichero+'">' +
                '<span class="glyphicon glyphicon-trash"></span></td>';
        }
        aux+=form;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(aux);
        response.end();
    });
}

/**
 * Procedimiento para añadir una nueva tarea al sistema
 * @param response
 * @param request
 */
function setMemo(response, request) {
    console.log("Request handler 'setMemo' was called.");
    var parse = new formidable.IncomingForm();
    parse.parse(request, function(err,fields,files){
        if(files.fichero.name != ''){
            var nombre = files.fichero.name.replace(/ /g,"_");
            fs.rename(files.fichero.path,PATH+nombre, function(err){
                if(err){
                    console.log("Error");
                }else{
                    mysql.addNote(fields.fecha,fields.texto,nombre, function(res){
                        console.log();
                    });
                }

            });
        }else{
            mysql.addNote(fields.fecha, fields.texto, "null", function(res){
                console.log();
            }); 
        }
        response.writeHead(302, {'Location': '/'});
        response.end();
    });

}

/**
 * Elimina un elemento de la lista de tareas
 * @param response
 * @param request
 */
function deleteMemo(response, request) {
    console.log("Request handler 'deleteMemo' was called.");
    var params = url.parse(request.url,true);
    mysql.DeleteByID(params.query.id,function(res){
        if (params.query.fichero != "null"){
            mysql.isUsed(params.query.fichero,function(res) {
                if (res[0].total == 0) {
                    fs.unlink(PATH + params.query.fichero, function (err) {
                        if (err) console.log("Error al eliminar fichero");
                    });
                }
            });
        }
        response.writeHead(302, {'Location': '/'});
        response.end(); 
    });


}

/**
 * Muestra una Tarea de forma individual
 * @param response
 * @param request
 */
function showMemo(response, request){
    console.log("Request handler 'showMemo' was called.");
    var aux = header + tabla;
    var params = url.parse(request.url,true);
    mysql.FindByID(params.query.id,function(res){
        aux +='<tr><td><a class="btn btn-xs btn-info" href="showMemo?id='+res[0].id+'">' +
            '<span class="glyphicon glyphicon-tag"></span></a></td>'+
            '<td>"'+res[0].fecha+'"</td>'+
            '<td>"'+res[0].texto+'"</td>';
        if (res[0].fichero=="null"){
            aux += '<td> No adjunto </td>';
        }else{
            aux += '<td><a href="'+PATH+res[0].fichero+'">'+res[0].fichero+'</a></td>';
        }
        aux+= '<td><a class = "btn btn-danger btn-xs" href="deleteMemo?id='+res[0].id+"&fichero="+res[0].fichero+'">' +
            '<span class="glyphicon glyphicon-trash"></span></td>';
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(aux);
        response.end();
    });

}

exports.show = show;
exports.setMemo = setMemo;
exports.deleteMemo = deleteMemo;
exports.showMemo = showMemo;


/**
 *  Fragmentos de HTML usados en las funciones.
 */

var header = '<!DOCTYPE html>' +
    '<html lang="en"><head><title>Gestor Tareas</title>'+
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">'+
    '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>'+
    '<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script></head>';

var logIn = ''+
    '<div class="container">' +
    '<div class="row">'+
    '<div class="span12">'+
    '<form class="form-horizontal" action="" method="POST">'+
    '<fieldset>' +
    '<div id="legend">'+
    '<legend class="">Login</legend>'+
    '</div>'+
    '<div class="control-group">'+
    '<label class="control-label"  for="username">Username</label>'+
    '<div class="controls">'+
    '<input type="text" id="username" name="username" placeholder="" class="input-xlarge">'+
    '</div>'+
    '</div>'+
    '<div class="control-group">'+
    '<label class="control-label" for="password">Password</label>'+
    '<div class="controls">'+
    '<input type="password" id="password" name="password" placeholder="" class="input-xlarge">'+
    '</div>'+
    '</div>'+
    '<div class="control-group">'+
    '<div class="controls">'+
    '<button class="btn btn-success">Login</button>'+
    '</div>'+
    '</div>'+
    '</fieldset>'+
    '</form>'+
    '</div>'+
    '</div>'+
    '</div>';


var tabla  = '<body>' +
    '<div class="container">' +
    '<h2>Gestor Tareas</h2>' +
    '<table class="table"><thead>'+
    '<tr>' +
    '<th>Tarea</th>' +
    '<th>Fecha Limite</th>' +
    '<th>Comentarios</th>' +
    '<th>Fichero</th>' +
    '<th>Eliminar</th>' +
    '</tr></thead>' +
    '<tbody>';


var form = '</tbody></table></br></br><h4>Añade una tarea</h4>' +
    '<form class="form-horizontal" role="form" enctype="multipart/form-data" action="/setMemo" method="post">' +
    '   <div class="form-group">'+
    '       <label class="control-label col-sm-1" for="email">Fecha:</label>' +
    '       <div class="col-sm-5">'+
    '           <input type="date" class="form-control" name="fecha" placeholder="DD/MM/YYYY" required>' +
    '       </div>' +
    '   </div>'+
    '   <div class="form-group">' +
    '       <label class="control-label col-sm-1" for="pwd">Texto:</label>'+
    '        <div class="col-sm-10">' +
    '           <textarea type="text" class="form-control" rows="3" name="texto" placeholder="Info" required></textarea>' +
    '       </div>' +
    '   </div>' +
    '   <div class="form-group">' +
    '       <div class="col-sm-offset-1 col-sm-10">'+
    '           <input type="file" class="form-control-life" name="fichero">' +
    '       </div>' +
    '   </div>' +
    '   <div class="form-group">'+
    '       <div class="col-sm-offset-1 col-sm-10">' +
    '           <button type="submit" value="Upload file" class="btn btn-default">Submit</button>'+
    '       </div>' +
    '   </div>' +
    '</form></body></html>';



