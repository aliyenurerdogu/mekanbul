const axios=require("axios");
var apiSecenekleri = {
    //sunucu: "http://localhost:3000",
    sunucu: "https://mekanbul.aliyenurerdogu.repl.co",
    apiYolu: "/api/mekanlar/"
}
var mesafeyiFormatla=function(mesafe){
var yeniMesafe,birim;
if(mesafe>1){
    yeniMesafe=parseFloat(mesafe).toFixed(1);
    birim=" km";
}
else{
    yeniMesafe=parseInt(mesafe*1000,10);
    birim=" m";
}
return yeniMesafe+birim;
}
var anasayfaOlustur=function(res,mekanlistesi){
    var mesaj;
    if(!(mekanlistesi instanceof Array)){
        mesaj="API HATASI:bir şeyler ters gitti.";
        mekanlistesi=[];
    }else{
        if(!mekanlistesi.length){
            mesaj="civarda herhangi bir mekan yok ";
        }
    }
    res.render("anasayfa",{
    "baslik": "Anasayfa",
    "sayfaBaslik":{
        "siteAd":"Mekanbul",
        "slogan":"Mekanları Keşfet"
    },
    "mekanlar":mekanlistesi,
    "mesaj":mesaj
});

}
var detaySayfasiOlustur = function(res,mekanDetaylari){
    mekanDetaylari.koordinat={
        "enlem":mekanDetaylari.koordinat[0],
        "boylam":mekanDetaylari.koordinat[1]
    }
    res.render('mekanbilgisi',
    {
        mekanBaslik: mekanDetaylari.ad,
        mekanDetay:mekanDetaylari
    });
}
var hataGoster = function(res,hata){
    var mesaj;
    if(hata.response.status==404){
        mesaj="404, Sayfa Bulunamadı!";
    }else {
        mesaj=hata.response.status+" hatası";
    }
    res.status(hata.response.status);
    res.render('error',{
        "mesaj":mesaj
    });
};
const anaSayfa = function(req,res){
    axios.get(apiSecenekleri.sunucu+apiSecenekleri.apiYolu,{
        params:{
            enlem:req.query.enlem,
            boylam:req.query.boylam
        }
    }).then(function(response){
        var i,mekanlar;
        mekanlar=response.data;
        for(i=0;i<mekanlar.length;i++){
            mekanlar[i].mesafe=mesafeyiFormatla(mekanlar[i].mesafe);
        }
        anasayfaOlustur(res,mekanlar);
    }).catch(function(hata){
        anasayfaOlustur(res,hata);
    });
}
const mekanBilgisi = function(req,res){
    axios
        .get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid)
        .then(function (response){
            detaySayfasiOlustur(res, response.data);
        })
        .catch(function (hata){
            hataGoster(res,hata);
        });
};
const yorumEkle=function(req,res,){
    res.render('yorumekle', { "title":"Yorum Sayfası" });
};

module.exports = {
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}
