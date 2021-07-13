$(document).ready(function () {

  // Startseite

  $('.nav-link').on({
    mouseenter: function(){
      $(this).css("color", "rgb(186, 184, 184)");
    },   
    mousedown: function(){
      $(this).css("color", "rgb(255, 255, 255)");
    },
    mouseup: function(){
      $(this).css("color", "rgb(186, 184, 184)");
    },
    mouseleave: function(){
      $(this).css("color", "rgb(0, 0, 0)");
      
    },
  }); 

  
  $('.nav-link1').on({
    mouseenter: function(){
      $(this).css("color", "rgb(186, 184, 184)");
    },   
    mousedown: function(){
      $(this).css("color", "rgb(255, 255, 255)");
    },
    mouseup: function(){
      $(this).css("color", "rgb(186, 184, 184)");
    },
    mouseleave: function(){
      $(this).css("color", "rgb(0, 0, 0)");
      
    },
  }); 

  

  

  
   //--------------------------------------------------------------------------Brennweiten

   let stepBrennweite=0;

  function forward(){
    $("#P1").animate({
      opacity:0.4,
      width:120},100,
      function(){
        $("#P1").animate({opacity:1.0,width:80},100)
      });
    if(stepBrennweite==0){
      $("#F11").fadeOut(500);
      stepBrennweite=1;
    }else if(stepBrennweite==1){
      
      $("#F12").fadeOut(500);
      stepBrennweite=2;
    }else if(stepBrennweite==2){
      
      $("#F13").fadeOut(500);
      stepBrennweite=3;
    }else if(stepBrennweite==3){
    }
  };

  function back(){
    $("#P2").animate({
      opacity:0.4,
      width:120},100,
      function(){
        $("#P2").animate({opacity:1.0,width:80},100)
      });
    if(stepBrennweite==0){
    }else if(stepBrennweite==1){
      $("#F11").fadeIn(500);
      stepBrennweite=0;
    }else if(stepBrennweite==2){
      $("#F12").fadeIn(500);
      stepBrennweite=1;
    }else if(stepBrennweite==3){
      $("#F13").fadeIn(500);
      stepBrennweite=2;
    }
  };
  
  $("#P1").click(forward);
  $("#P2").click(back);

  //--------------------------------------------------------Tiefenschärfe

  $("#F31").click(function(){
    $("#F31").fadeOut(1000);
  });
  $("#F32").click(function(){
    $("#F31").fadeIn(1000);
  });


//------------------------------------------------------------Beleuchtung

  $("#SF41").on({
    mouseenter: function(){
      $(this).fadeOut(200);
      $("#F41").css("filter","none");
    },
  });

  $("#F41").on({
    mouseleave: function(){  
      $("#SF41").fadeIn(200);
      $("#F41").css("filter","blur(4px)");
    },
  });

  $("#SF42").on({
    mouseenter: function(){
      $(this).fadeOut(200);
      $("#F42").css("filter","none");
    },
  });

  $("#F42").on({
    mouseleave: function(){
      $("#SF42").fadeIn(200);
      $("#F42").css("filter","blur(4px)");
    },
  });

  $("#SF43").on({
    mouseenter: function(){
      $(this).fadeOut(200);
      $("#F43").css("filter","none");
    },
  });

  $("#F43").on({
    mouseleave: function(){
      $("#SF43").fadeIn(200);
      $("#F43").css("filter","blur(4px)");
    },
  });

  $("#SF44").on({
    mouseenter: function(){
      $(this).fadeOut(200);
      $("#F44").css("filter","none");
    },
  });

  $("#F44").on({
    mouseleave: function(){
      $("#SF44").fadeIn(200);
      $("#F44").css("filter","blur(4px)");
    },
  });


  $("#SF45").on({
    mouseenter: function(){
      $(this).fadeOut(100);
      $("#F45").css("filter","none");
    },
  });

  $("#F45").on({
    mouseleave: function(){
      $("#SF45").fadeIn(100);
      $("#F45").css("filter","blur(4px)");
    },
  });

  $("#SF46").on({
    mouseenter: function(){
      $(this).fadeOut(100);
      $("#F46").css("filter","none");
    },
  });

  $("#F46").on({
    mouseleave: function(){
      $("#SF46").fadeIn(100);
      $("#F46").css("filter","blur(4px)");
    },
  });

  /*----------------------------------------Farbkontraste-------------------------------*/

 /*------------------------------Albumcover und Schwarz Weiß-------------------------------*/

/*-------------------------------Corona Spray----------------------------------*/

  $("#F73").click(function(){
    $("#F73").fadeOut(1000);
  });
  $("#F72").click(function(){
    $("#F73").fadeIn(1000);
  });

});

