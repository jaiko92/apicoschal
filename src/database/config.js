// 
var options = {};
 
options.host = '127.0.0.1';
options.port = 3050;
options.database = 'D:\\LecturacionMobil\\DataBase\\LECTURAMOBIL.FDB';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;  

module.exports = {
    options
}