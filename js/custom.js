function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

$( document ).ready( function(){ 
    
    setTimeout( show , 500 );

    var obs = $("#likes");
    
    if( obs.length > 0 ){
     var clearint = null;
     var obswordsNotShuffled = obs.attr("data-words").split(",");
     var obswords = shuffle(obswordsNotShuffled);
     var delayletteradd = 100;
     var delayletterremove = 50;
     var delayworddisplay = 2000;
        
        obs.attr("data-currword",obswords[0]);
        obs.attr("data-currind",0);
        obs.attr("data-printing",true);
      
         setInterval(function(obs,obswords){
          var l = obs.text().length;
          var currentword = obs.attr("data-currword");
             
              if( l < currentword.length && obs.attr("data-printing")=="true" ){
                 // adds letter by letter
                 obs.text( obs.text() + currentword[l] );

                  // entire word is spelled out
                  if( l+1 == currentword.length ){
                      
                      obs.attr("data-printing",false);

                      setTimeout(function(obs,obswords){
                           clearint = setInterval(function(obs,obswords){
                             // removes letter by letter
                             obs.text( obs.text().slice(0,obs.text().length-1) );

                             // word has been completely removed
                             if( obs.text().length == 0 ){
                                 
                              obs.attr("data-currind", (parseInt(obs.attr("data-currind"))+1) % obswords.length );
                              obs.attr("data-currword", obswords[obs.attr("data-currind")] );
                              obs.attr("data-printing", true);

                              clearInterval( clearint );
                             }
                           },delayletterremove,obs,obswords);
                      },delayworddisplay,obs,obswords);
                  } // end of if( l+1 == currentword.length ){
              }

         },delayletteradd,obs,obswords);
         
     //} // for loop
    }
    
});

function show(){
 var hidetags = $(".hide");
 var scrollpos = $(window).scrollTop();
 var count = 0;
    
     if( scrollpos > 0 ){
      $("nav").addClass("float");
     } else {
      $("nav").removeClass("float");
     }
 
     hidetags.each(function( i ){
      var height = $(this).height();
         
      if( height > 200 && height < 99999 )
        { height = 200; }
         
      if( height > 0 && height < 99999 ){
          if( scrollpos + $(window).height() >
              $(this).offset().top + height ){
              
                count++;
                setTimeout(function(dis){
                    $(dis).removeClass("hide");
                    $(dis).addClass("show");
                }, 200*count , this );
               }
      }
     });

var mainproj = $("main#projdetail");
    
 if( mainproj.length > 0 ){
  var links = mainproj.find("ol:nth-child(1) a");
  var ids = null;
  var navh = $("nav").height();
  var idstr = "";
     
  links.each(function( i ){
    idstr += this.hash;
    if( i < links.length-1 ){ idstr += ", "; }
  });
     
  ids = $(idstr);
     
  ids.each(function( i ){
      if( scrollpos + navh > $(this).offset().top ){
       links.removeClass("active");
       links.eq(i).addClass("active");
      }
  });
 }
    
} // end of show()

$( window ).scroll( show );