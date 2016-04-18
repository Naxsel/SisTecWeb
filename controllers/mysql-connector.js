/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: server.js
 * Fecha: 17/4/2016
 * Funcion: Conexion y funcionalidad de la base de datos en MySQL
 */


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'stw3'
});

connection.connect();

module.exports = {

    /**     Test        */
    /*
     * Funcion de testing para la base de datos
     */
    try: function (){
        connection.query("SELECT id FROM notes", function (err, res) {
            if (err) throw err;
            console.log('The solution is: ', res);
        });
    },
    
    /**      Notas       */

    /*
     * Añade una nueva nota
     *
     * fecha: Campo Fecha de la tarea
     * texto: Campo Texto de la tarea
     * fichero: Nombre del fichero asociado a la tarea
     *
     */
    addNote: function (fecha,texto,fichero,callback){
        connection.query("INSERT into notes (fecha,texto,fichero) VALUES ('"+fecha+"','"+texto+"','"+fichero+"')" , function (err,res){
            if(err) throw err;
            callback(res);
        });
    },

    /*
     * Devuelve la lista completa de notas
     */
    FindAll : function(callback){
        connection.query("SELECT * FROM notes", function(err,res){
            if(err) throw err;
            callback(res);
        });

    },

    /*
     * Devuelve la nota correspondiente al id introducido
     *
     * id: Identificador de la nota
     */
    FindByID : function(id, callback){
        connection.query("SELECT * FROM notes WHERE id ='"+id+"'", function(err,res){
            if(err) throw err;
            callback(res);
        });
    },

    /*
     * Elimina una nota, dado un id
     *
     * id: Identificador de la nota
     */
    DeleteByID: function(id, callback){

        var note = connection.query("SELECT fichero FROM notes WHERE id ='"+id+"'");
        connection.query("DELETE FROM notes WHERE id ='"+id+"'", function(err,res){
            if(err) throw err;
            callback(res);
        });
    },

    /*
     * Dado el nombre de un fichero, devuelve el número de usuarios que lo estan usando
     *
     * fichero: Nombre del fichero en cuestion
     */
    isUsed: function(fichero,callback){
        connection.query("SELECT COUNT (*) as total FROM notes WHERE fichero='"+fichero+"'",function(err,res){
            if(err) throw err;
            callback(res);
        });
    },

}