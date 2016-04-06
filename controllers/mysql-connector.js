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
        connection.query('SELECT id FROM users', function (err, res) {
            if (err) throw err;

            console.log('The solution is: ', res);
        });
    },

    /**      Notas       */

    /*
     *
     */
    FindAll : function(callback){
        connection.query('SELECT * FROM notes', function(err,res){
            if(err) throw err;
            callback(res);
        });

    },

    /*
     *
     */
    FindByID : function(id, callback){
        connection.query('SELECT * FROM notes WHERE id =\''+id+'\'', function(err,res){
            if(err) throw err;
        });
    },

    DeleteByID: function(id, callback){

    },

    FindByUser: function(user, callback){

    },

    


    /**     Usuarios       */



}