var mongoose=require("mongoose");
require("./mekansema");
//var dbURI = "mongodb://localhost/mekanbul";
var dbURI = 'mongodb+srv://mekan32:yenisifrexd18*@mekanbul.coiba8v.mongodb.net/mekanbul?retryWrites=true&w=majority';
mongoose.connect(dbURI);
function kapat(msg,callback){
    mongoose.connection.close(function(){
        console.log(msg);
        callback();
    });
}
process.on("SIGINT",function(){
    kapat("uygulama kapatıldı",function(){
        process.exit(0);
    });
});
mongoose.connection.on("connected",function(){
    console.log(dbURI + " adresindeki veritabanına bağlanıldı!\n"); 
});
mongoose.connection.on("error",function(){
    console.log("baglantı hatası\n");
});
mongoose.connection.on("disconnected", function(){
    console.log("baglantı kesildi\n");
});
