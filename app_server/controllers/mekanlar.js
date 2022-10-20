const anaSayfa = function(req,res){
    res.render('anasayfa', 
    { 
    "baslik": "Anasayfa",
    "sayfaBaslik":{
        "siteAd":"MekanBul",
        "slogan":"Civardaki Mekanları Kesfet"
    },
    "mekanlar":[
        {
            "ad": "starbucks",
            "puan":"3",
            "adres":"centrum garden avm",
            "imkanlar":["dünya kahveleri","pastalar","kekler"],
            "mesafe":"10km"
                    
        },
        { 
            "ad": "gloria jeans",
            "puan":"1",
            "adres":"SDÜ Doğu Kampüsü",
            "imkanlar":["cay","kek","kahve"],
            "mesafe":"5km"
        }   
    ]
});
}
const mekanBilgisi = function(req,res){
    res.render('mekanbilgisi',
     {
        "baslik": "Mekan Bilgisi",
        "mekanBaslik" : "Starbucks",
        "mekanDetay":{
            "ad":"Starbucks",
            "puan":"3",
            "adres":"Centrum Garden avm",
            "saatler":[
                {
                    "gunler":"pazartesi-cuma",
                    "acilis":"9:00",
                    "kapanis":"23:00",
                    "kapali": false
                },
                {
                    "gunler":"cumartesi-pazar",
                    "acilis":"8:00",
                    "kapanis":"22:00",
                    "kapali": false
                }
            ],
            "imkanlar":["kahve","çay","kek"],
            "koordinatlar":
            {
                "enlem":"37.7",
                "boylam":"30.5"
            },
            "yorumlar":[
                {
                    "yorumYapan":"Asım Sinan",
                    "yorumMetini":"berbaaat",
                    "tarih":"20 ekim 2022",
                    "puan":"1"
                }
            ]
        }
});
}
const yorumEkle=function(req,res,){
    res.render('yorumekle', { "title":"Yorum Sayfası" });
};

module.exports = {
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}
