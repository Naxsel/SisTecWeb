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

    try: function (){
        connection.query("SELECT id FROM notes", function (err, res) {
            if (err) throw err;
            console.log('The solution is: ', res);
        });
    },
    
    /**      Notas       */

    /*
     * Añade una nueva nota
     */
    addNote: function (note,callback){
        connection.query("INSERT into notas (fecha,texto,path) VALUES ('"+note.fecha+"','"+note.texto+"','"+note.ruta+"')" , function (err,res){
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
     */
    FindByID : function(id, callback){
        connection.query("SELECT * FROM notes WHERE id ='"+id+"'", function(err,res){
            if(err) throw err;
            callback(res);
        });
    },

    /*
     * Elimina una nota, dado un id
     */
    DeleteByID: function(id, callback){
        connection.query("DELETE FROM notes WHERE id ='"+id+"'", function(err,res){
            if(err) throw err;
            callback(res);
        });
    },


}